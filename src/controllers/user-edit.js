//Hash de contraseña para encriptarla,se necesita instalar antes: npm install bcrypt --save
import bcrypt from'bcrypt';  
const saltRounds = 10;
import jwt from 'jsonwebtoken'
//para filtrar campos de PUT, se necesita instalar npm install underscore --save, el _pick que sale en el put
import _ from'underscore';
//Modelo de Usuario
import User from '../models/user.js';
import torneo from "../models/torneo.js";


//Modulo para Actulizar info {name:askldlak,email:skskd} puede ser solo 1 o los 2, requiere token(headers), y id(url)
export const editInfo = async (req,res)=>{
    const _id = req.params.id;
    const DB = await User.findById({_id:_id})
    const body = req.body
    const body_filter = _.pick(req.body, ['name', 'email']); // el _pick de underscore nos permite filtrar los campos que se pueden editar , en este caso no esta el role
    try{
        //verificamos que su contraseña sea correcta para actualizar datos
        if(!bcrypt.compareSync(body.password,DB.password) || !body.password){
            return res.status(400).json({mensaje:'La contraseña no es correcta'})
        }
        const usuarioDB = await User.findByIdAndUpdate(
            _id,
            body_filter,
            {new:true, runValidators: true} // el primer new:true es para que se guarde el nuevo usuario. el segundo es para que solo cambie el nombre y email.
        )
        res.status(200).json(usuarioDB); 
    }
    catch(error){
        return res.status(400).json({mensaje:'Ocurrió un error al actualizar',error})
    }
};
 //Modulo para actualizar password, password1,password2 requiere token(headers), y id(url)
export const editPass = async (req,res)=>{
    try{
        const _id = req.params.id;
        const body = req.body;
        const DB = await User.findById({_id:_id})
        const body_filter = _.pick(req.body, ['password']); // el _pick de underscore nos permite filtrar los campos que se pueden editar , en este caso no esta el role
        //verficamos contraseña actual sea la correcta
        if(!bcrypt.compareSync(body.password,DB.password) || !body.password){
            return res.status(400).json({
                mensaje:'La contraseña actual no es correcta' 
            })
        }
        //verificamos que contraseñas nuevas coincidan
        if(body.password1 != body.password2){
            return res.status(400).json({
                mensaje:'nuevas contraseñas no coinciden'
            })
        }
        else{
        body_filter.password = bcrypt.hashSync(body.password1, saltRounds); // volvemos a encriptar la actual. de la password
        const usuarioDB = await User.findByIdAndUpdate(
            _id,
            body_filter,
            {new:true, runValidators: true} // el primer new:true es para que se guarde el nuevo usuario. el segundo es para que solo cambie el nombre y email.
        )
        res.status(200).json(usuarioDB); 
        }
    }
    catch(error){
        return res.status(400).json({
            mensaje:'Ocurrió un error al actualizar',
            error
        })
    }
};
//agregar id del torneo que este jugando al user
export const editTorneo = async (req,res)=>{
    try{
        const body =req.body;
        const usuarioDB = await User.findOne({_id:body.usuarioId});
        usuarioDB.torneos.push(body.torneoId)
        const nuevoUser = await User.findByIdAndUpdate(
            body.usuarioId,
            usuarioDB,
            {new:true} 
        )
        const token = jwt.sign(
            {data: nuevoUser},  
            process.env.TOKEN_ACTIVATE, 
            {expiresIn: 60*60*24*5} // duracion del token 60*60=1 hora, 60*60*24*30=1 mes, 'secret' es la clave que creamos. Tambien se le podria poner 20min (en ese formato)
        );
        return res.status(200).json(token)    
    }
    catch(error){
        return res.status(500).json({mensaje:'Ocurrió un error al ingresar'})
    }
}; 

export const deleteUserTorneo= async (req,res)=>{
    const _id = req.params.id;
    try{ 
        const torneoDB = await torneo.find();
        const usuarioDB = await User.findOne({_id:_id});
        const idTorneo=torneoDB[0]._id
        const indexTorneo=usuarioDB.torneos.findIndex(item=>item === idTorneo);
        usuarioDB.torneos.splice(indexTorneo,1)
        
        const indexJugador=torneoDB[0].players.findIndex(item=>item._id === _id);
        torneoDB[0].players.splice(indexJugador,1)
        const nuevoUser = await User.findByIdAndUpdate(
            _id,
            usuarioDB,
            {new:true} 
        )
        const nuevoTorneo = await torneo.findByIdAndUpdate(
            idTorneo,
            torneoDB[0],
            {new:true} 
        )
        return res.status(200).json(nuevoTorneo)
    }
    catch(error){
        return res.status(500).json({
            mensaje:'Ocurrió un error al eliminar'
        })
    }
};


 //Modulo para eliminar cuenta, password. requiere token(headers), y id(url)
 export const deleteUser= async (req,res)=>{
     const _id = req.params.id;
     const body = req.body;
     try{ 
         //verficamos contraseña actual sea la correcta
         if(!bcrypt.compareSync(body.password,DB.password) || !body.password){
             return res.status(400).json({
                 mensaje:'La contraseña no es correcta'
             })
         }    
         else{
             const userDb = await User.findByIdAndDelete({_id});
             if(!userDb){
                 return res.status(400).json({
                 mensaje: 'No se encontró el id indicado'
                 })
             }
             res.status(200).json(userDb)
         }
     }
     catch(error){
         return res.status(500).json({
             mensaje:'Ocurrió un error al eliminar'
         })
     }
};