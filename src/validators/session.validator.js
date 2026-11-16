// What a well-formed request looks like. Never asks the database.
const { body, param } = require('express-validator');

const codeParam = [
  param('code')
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage('the join code must be six digits.'),
];

const createRules = [
  body('max_players')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('max_players must be a whole number from 1 to 100.')
    .toInt(),
];

const statusRules = [
  ...codeParam,
  body('status')
    .exists()
    .withMessage('status is required.')
    .bail()
    .isIn(['RUNNING', 'CLOSED'])
    .withMessage('status must be RUNNING or CLOSED.'),
];

const joinRules = [
  ...codeParam,
  body('nickname')
    .exists()
    .withMessage('nickname is required.')
    .bail()
    .isString()
    .withMessage('nickname must be text.')
    .bail()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('nickname must be 2 to 20 characters long.'),
];

module.exports = { codeParam, createRules, statusRules, joinRules };
