const db = require('../config/database');

class Company {
  static async findAll(limit = 10, offset = 0) {
    const result = await db.query(
      'SELECT * FROM companies ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM companies WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { name, email, address, website } = data;
    const result = await db.query(
      'INSERT INTO companies (name, email, address, website) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, address, website]
    );
    return result.rows[0].id;
  }

  static async update(id, data) {
    const { name, email, address, website } = data;
    const result = await db.query(
      'UPDATE companies SET name = $1, email = $2, address = $3, website = $4 WHERE id = $5',
      [name, email, address, website, id]
    );
    return result.rowCount > 0;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM companies WHERE id = $1', [id]);
    return result.rowCount > 0;
  }

  static async count() {
    const result = await db.query('SELECT COUNT(*) as total FROM companies');
    return parseInt(result.rows[0].total, 10);
  }
}

module.exports = Company;