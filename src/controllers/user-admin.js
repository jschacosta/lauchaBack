//Hash de contraseña para encriptarla,se necesita instalar antes: npm install bcrypt --save
import bcrypt from "bcrypt";
const saltRounds = 10;
//para filtrar campos de PUT, se necesita instalar npm install underscore --save, el _pick que sale en el put
import _ from "underscore";
//Modelo de Usuario
import User from "../models/user.js";

//Modulo para obtener todos los usuarios (solo requiere token)
export const allUsers = async (req, res, next) => {
  try {
    const userDb = await User.find();
    res.json(userDb);
  } catch (error) {
    next(error);
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
//Modulo para obtener usuario específico por correo
export const findUser = async (req, res, next) => {
  const correo = req.body;
  try {
    const userDB = await User.findOne({ email: correo.email }); //findOne verbo de mongo
    res.json(userDB); // en este caso se demuestra que no es necesario agregar el status 200, viene x defecto
  } catch (error) {
    next(error);
    return res.status(400).json({ mensaje: "Ocurrio un error", error });
  }
};
//Modulo Crear un nuevo Usuario de cualquier tipo
export const newUser = async (req, res, next) => {
  const body = req.body;
  try {
    const correo = await User.findOne({ email: body.email });
    if (correo) {
      return res.status(400).json({ mensaje: "Este email ya está en uso" });
    }
    if (body.password1 != body.password2) {
      return res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
    } else {
      const newUser = {
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        password: body.password1,
        role: body.role,
      };
      newUser.password = bcrypt.hashSync(body.password1, saltRounds); // HASH que encripta la contraseña
      const userDB = await User.create(newUser);
      res.status(200).json(userDB);
    }
  } catch (error) {
    next(error);
    return res
      .status(500)
      .json({ mensaje: "Ocurrió un error al registrar usuario", error });
  }
};

export const newRole = async (req, res, next) => {
  try {
    const body = req.body;
    const correo = await User.findOne({ email: body.email });
    const body_filter = _.pick(correo, ["role"]); // el _pick de underscore nos permite filtrar los campos que se pueden editar , en este caso no esta el role
    body_filter.role = body.role;
    const usuarioDB = await User.findByIdAndUpdate(
      correo._id,
      body_filter,
      { new: true, runValidators: true } // el primer new:true es para que se guarde el nuevo usuario. el segundo es para que solo cambie el rol.
    );
    res.status(200).json(usuarioDB);
  } catch (error) {
    next(error);
    return res
      .status(400)
      .json({ mensaje: "Ocurrió un error al actualizar", error });
  }
};
//Modulo para Borrar un Usuario
export const borrarUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const usuarioDb = await User.findByIdAndDelete({ _id });
    if (!usuarioDb) {
      return res
        .status(400)
        .json({ mensaje: "No se encontró el id indicado", error });
    }
    res.json(usuarioDb);
  } catch (error) {
    next(error);
    return res.status(500).json({ mensaje: "Ocurrio un error", error });
  }
};
