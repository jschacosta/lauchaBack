import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const estados={
    values: ['PENDIENTE','POR JUGAR','JUGANDO','TERMINADO','GUARDADO'],
    message: '{VALUE} rol no válido'
}
const matchSchema = new Schema({
    local: {type:String,required:[true, 'El equipo Local es requerido']},
    visita: {type:String,required:[true, 'El equipo Visitante es requerido']},
    torneo:{type:String,required:[true, 'El torneo es requerido']},
    //etapa:{type:String},required: [true, 'Etapa obligatorio'],
    fechaPartido:{type:String},
    fechaIngreso:{type: Date, default: Date.now},
    horaPartido:{type:String},
    score:{type:Array, default: [null,null]},
    apuesta:{type:Array},
    estado:{type:String, default: "PENDIENTE", enum: estados},
    rules:{type:Array},
    ruleResult:{type:Array, default:[]}, 
    ruleApuesta:{type:Array, default:[]},
});
//exportacion del modulo
const match = mongoose.model('Match',matchSchema);
export default match;