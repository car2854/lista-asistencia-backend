/*
  Path: 'api/auth'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validateFields } = require('../middleware/validate-fileds');

const { validarJWT } = require('../middleware/validate-jwt');
const { loginProfesor, loginEstudiante, renewTokenEstudiante, renewTokenProfesor, recoAwd, loginAdmin, renewTokenAdmin } = require('../controllers/auth.controller');


router.post('/login/profesor', 
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ],
  loginProfesor
);

router.post('/login/estudiante',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('ci', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ], 
  loginEstudiante
);

router.post('/login/admin',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ], 
  loginAdmin
);

router.get('/renewProfesor',validarJWT ,renewTokenProfesor);

router.get('/renewEstudiante',validarJWT ,renewTokenEstudiante);

router.get('/renewAdmin',validarJWT ,renewTokenAdmin);

router.get('/recoAws', recoAwd);


module.exports = router;
