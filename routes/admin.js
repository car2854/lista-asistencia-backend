/*
  Path: 'api/admin'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validateFields } = require('../middleware/validate-fileds');
const { validarJWT } = require('../middleware/validate-jwt');

const { 
  createAdmin,
  getAdmin
} = require('../controllers/admin.controller');

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La ci es obligatorio').not().isEmpty(),
    validateFields
  ],
  createAdmin
);

router.get('/', validarJWT, getAdmin);

module.exports = router;
