import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Esquema de Jugadores
const playerSchema = new Schema({
    name:{type:String, trim:true, maxlength: 20 ,required:[true, 'El nombre clave es requerido'],},
    type:{type:String, trim:true, maxlength: 20, required:[true, 'El apellido es requerido'],},
    players:{type:Array},  
});
const Player = mongoose.model('player',playerSchema);
export default Player;