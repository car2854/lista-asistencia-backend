const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Admin = require('../models/admin.model');

const createAdmin = async(req, res = response) => {

  const { email, password } = req.body;

  try {
    
    // Verificar Email
    const adminDB = await Admin.findOne({email});

    if (adminDB){
      return res.status(402).json({
        ok: false,
        msg: "Ya existe ese admin"
      });
    }

    const admin = new Admin(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    admin.password = bcrypt.hashSync(password, salt);

    await admin.save();

    // generar token
    const token = await generarJWT(admin.id);

    res.json({
      ok: true,
      admin,
      token
    });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });

  }


}

const getAdmin = async(req, res = response) => {

  const profesor = req.uid;
  const _id = req.params.id;

  try {


    const profesor = await Admin.findById({_id});
    
    if(!profesor){
      return res.status(404).json({
        ok: false,
        msg: "No existe ese profesor"
      });
    }

    res.json({
      ok: true,
      profesor,
    });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });

  }


}

module.exports = {
  createAdmin,
  getAdmin
}