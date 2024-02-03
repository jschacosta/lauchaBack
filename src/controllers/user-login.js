import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const signup = async (req, res, next) => {
  console.log("buenas", req.body);
  try {
    if (req.body.password1 != req.body.password2) {
      return res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
    } else {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        lastName: req.body.lastname,
        password: req.body.password1,
      };
      newUser.password = bcrypt.hashSync(req.body.password1, saltRounds); // HASH que encripta la contraseña
      const usuarioDB = await User.create(newUser); // crea el usuario
      const token = jwt.sign(
        //se genera el token
        { data: usuarioDB }, // esta data se utiliza en autenticacion.js (se puede cambiar el nombre) se puede ver en jwt.io
        process.env.TOKEN_ACTIVATE,
        { expiresIn: 60 * 60 * 24 * 5 } // duracion token 60*60=1 hora, 60*60*24*30=1 mes. Otra opcion: 20min o 1h (en ese formato)
      );
      return res
        .status(200)
        .json({ mensaje: "Cuenta Creada", usuarioDB, token });
    }
  } catch (error) {
    next(error);
    return res
      .status(500)
      .json({ mensaje: "Ocurrió un error al registrar usuario", error });
  }
};
// Modulo de Ingreso/Signin de Usuario : {email:"",password1:""}
export const signin = async (req, res) => {
  try {
    console.log("--SIGN IN--");
    const body = req.body;
    const usuarioDB = await User.findOne({ email: body.email });
    console.log("user", usuarioDB);
    if (!usuarioDB) {
      return res.status(400).json({ mensaje: "Email   incorrectos" });
    }
    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({ mensaje: "contraseña incorrectos" });
    }
    const token = jwt.sign(
      { data: usuarioDB }, // esta data se utiliza en autenticacion.js (se puede cambiar el nombre) se puede ver en jwt.io
      process.env.TOKEN_ACTIVATE,
      { expiresIn: 60 * 60 * 24 * 5 } // duracion del token 60*60=1 hora, 60*60*24*30=1 mes, 'secret' es la clave que creamos. Tambien se le podria poner 20min (en ese formato)
    );
    return res
      .status(200)
      .json({ mensaje: "Acceso Correcto", usuarioDB, token });
  } catch (error) {
    next(error);
    return res.status(500).json({ mensaje: "Ocurrió un error al ingresar" });
  }
};
//Modulo de envio a correo de recuperación de contraseña: {email:""}
export const forgotPassword = async (req, res, next) => {
  try {
    console.log("--FORGOT PASSWORD--");
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ mensaje: "El email no está registrado" });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_RESET, {
        expiresIn: "20min",
      });
      const tokenNuevo = token.replace(/[.,]/g, function (m) {
        return m === "." ? "," : ".";
      });
      const nombre = user.name.replace(/\b\w/g, (l) => l.toUpperCase());
      await user.updateOne({ resetLink: token });
      const email = await resend.emails.send({
        from: "Luacha Team <laucha@sostvl.com>",
        to: [email], // va dirigido al usuario
        subject: "Laucha Team - Link de recuperación de contraseña",
        html: ` <h3>Hola ${nombre}:</h3>
        <h4>Por favor copia la siguiente dirección en tu navegador o haz click en el link para recuperar tu contraseña.</h4>
        <a href="${process.env.URL_FRONTEND}/reset-password/${tokenNuevo}">${process.env.URL_FRONTEND}/reset-password/${tokenNuevo}</a>
    `,
      });
      if (email.data.error) {
        return res.status(400).json({ mensaje: "No se pudo enviar el correo" });
      }
      res.status(200).json({
        mensaje:
          "Se ha enviado un mensaje a su correo para recuperar su contraseña",
      });
    }
  } catch (error) {
    next(error);
    res.status(500).json({ mensaje: "Error de servidor", error });
  }
};
//Modulo de cambio de contraseña
export const resetPassword = async (req, res, next) => {
  console.log("--RESET PASSWORD--", req.body);
  try {
    const body = req.body;
    const token = req.params.token;
    const tokenNuevo = token.replace(/[,.]/g, function (m) {
      // m is the match found in the string
      // If `,` is matched return `.`, if `.` matched return `,`
      return m === "," ? "." : ",";
    });
    jwt.verify(tokenNuevo, process.env.TOKEN_RESET, async (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ mensaje: "solicitud expirada, inténtelo denuevo", error });
      } else {
        console.log("vamos bien");
        const user = await User.findOne({ email: body.email });
        if (body.password1 != body.password2) {
          return res
            .status(400)
            .json({ mensaje: "Las contraseñas no coinciden" });
        }
        if (bcrypt.compareSync(body.password1, user.password)) {
          return res.status(400).json({
            mensaje: "La nueva contraseña debe ser diferente a la anterior",
          });
        } else {
          console.log("vamos bien2");
          user.password = bcrypt.hashSync(body.password1, saltRounds);
          user.resetLink = "";
          await user.save();
          return res
            .status(200)
            .json({ mensaje: "La contraseña ha sido cambiada" });
        }
      }
    });
  } catch (error) {
    next(error);
    return res
      .status(500)
      .json({ error: "No se logró el cambio de contraseña" });
  }
};
