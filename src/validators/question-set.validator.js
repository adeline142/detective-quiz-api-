const { body, param } = require('express-validator');

const idParam = [
    param('id').isInt({ min: 1 }).withMessage('id must be a whole number of 1 or more.').toInt(),
];

const titleRule = body('title')
  .isString()
  .withMessage('title must be text.')
  .bail()
  .isLength({ min: 3, max: 100 })
  .withMessage('title must be 3 to 100 characters.');

const createRules = [titleRule];
const updateRules = [...idParam, titleRule];

module.exports = { idParam, createRules, updateRules };