import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Esquema de Usuario
const leagueNameSchema = new Schema({
    keyName:{type:String, required:[true, 'El nombre clave es requerido'],},
    CurrentName:{type:String, required:[true, 'El nombre actual es requerido'],},
    season: {type:number,  min:1980, max: new Date().getFullYear()}
});
//exportacion del modulo
const leagueName = mongoose.model('leagueName',leagueNameSchema);
export default leagueName;