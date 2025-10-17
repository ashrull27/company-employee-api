const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const Employee = require('../models/Employee');

const router = express.Router();

const validateEmployee = [
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('last_name').trim().notEmpty().withMessage('Last name is required'),
  body('company_id').isInt().withMessage('Valid company ID is required'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('phone').optional().trim()
];

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const employees = await Employee.findAll(limit, offset);
    const total = await Employee.count();

    res.json({
      data: employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateToken, validateEmployee, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, company_id, email, phone } = req.body;
    const id = await Employee.create({ first_name, last_name, company_id, email, phone });
    const employee = await Employee.findById(id);

    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateToken, validateEmployee, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, company_id, email, phone } = req.body;
    await Employee.update(req.params.id, { first_name, last_name, company_id, email, phone });
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const deleted = await Employee.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
