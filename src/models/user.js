import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';
//Posibles roles de usuario
const roles={
    values: ['ADMIN','EDITOR','RELATOR','USER'],
    message: '{VALUE} rol no válido'
};
const statusMatch={
    values: ['ENJUEGO','TERMINADO'],
    message: '{VALUE} rol no válido'
};
//Esquema de Usuario
const userSchema = new Schema({
    name:{type:String, lowercase:true, trim:true, minlength:[4,'demasiado corta'], maxlength: 15, required:[true, 'El nombre es requerido']},
    lastName:{type:String, lowercase:true, trim:true, minlength: 4, maxlength: 15, required:[true, 'El apellido es requerido']},
    nickName:{type:String,lowercase:true,trim:true},
    email:{
        type:String,
        lowercase:true,
        trim:true, 
        minlength: 4, 
        maxlength: 40,
        required:[true, 'El email es requerido'],
        unique: true
    },
    password:{type:String, trim:true, minlength: 6, required:[true, 'La contraseña es requerida']},
    date:{type:Date, default: Date.now},
    role:{type:String,default:'USER', enum: roles},
    active:{type:Boolean, default:false},
    resetLink:{type:String, default:''},
    // torneosHost:[
    //     {
    //         id:{type:String},
    //         position:{type:Number},
    //         score:{type:Number},
    //         status:{type:String,enum: statusMatch}
    //     }
    // ],
    // torneosJoin:[
    //     {
    //         id:{type:String},
    //         position:{type:Number},
    //         score:{type:Number},
    //         status:{type:String,enum: statusMatch}
    //     }
    // ],
    torneos:[]
});
// con esta parte vamos a ocultar la contraseña para que, aunque esté encriptada no sea vista en la base de datos ni en el token
userSchema.methods.toJSON = function(){
    const obj = this.toObject();
    delete obj.password;
    return obj
};
//validar para unico Email
userSchema.plugin(uniqueValidator, { message: 'Este {PATH} ya está en uso.' });
//exportacion del modulo
const User = mongoose.model('User',userSchema);
export default User;