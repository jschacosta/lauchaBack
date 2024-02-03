import mongoose from 'mongoose';
const Schema = mongoose.Schema;
//Posibles roles de usuario
const types={
    values: ['BOLEANO','EVENTO','NUMERICO'],
    message: '{VALUE} no es un entrada válida'
}
const tipos={
    values: ['','VALORES FIJOS','RANGOS'],
    message: '{VALUE} no es un entrada válida'
}
//Esquema de Usuario
const ruleSchema = new Schema({
    name:{type:String, required:[true, 'El nombre es requerido']}, //nombre de la regla (identificador)
    text:{type:String, required:[true, 'La descripción es requerida']}, //descripcion regla (la pregunta para el usuario)
    type:{type:String, enum: types}, // tipo de pregunta
    numeric:{type:String, enum: tipos}, // tipo de pregunta numerica (sólo en caso de ser tipo numerica)
    options: {
        text:[],
        values:[],
    }, // opciones a la pregunta de la regla:el texto de la pregunta y sus valores de apuesta
    date:{type:Date, default: Date.now},
});
//exportacion del modulo
const Rule = mongoose.model('Rule',ruleSchema);
export default Rule;