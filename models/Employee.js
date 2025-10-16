const db = require('../config/database');

class Employee {
  static async findAll(limit = 10, offset = 0) {
    const result = await db.query(
      `SELECT e.*, c.name as company_name 
       FROM employees e 
       LEFT JOIN companies c ON e.company_id = c.id 
       ORDER BY e.created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query(
      `SELECT e.*, c.name as company_name 
       FROM employees e 
       LEFT JOIN companies c ON e.company_id = c.id 
       WHERE e.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  static async create(data) {
    const { first_name, last_name, company_id, email, phone } = data;
    const result = await db.query(
      'INSERT INTO employees (first_name, last_name, company_id, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [first_name, last_name, company_id, email, phone]
    );
    return result.rows[0].id;
  }

  static async update(id, data) {
    const { first_name, last_name, company_id, email, phone } = data;
    const result = await db.query(
      'UPDATE employees SET first_name = $1, last_name = $2, company_id = $3, email = $4, phone = $5 WHERE id = $6',
      [first_name, last_name, company_id, email, phone, id]
    );
    return result.rowCount > 0;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM employees WHERE id = $1', [id]);
    return result.rowCount > 0;
  }

  static async count() {
    const result = await db.query('SELECT COUNT(*) as total FROM employees');
    return parseInt(result.rows[0].total, 10);
  }
}

module.exports = Employee;