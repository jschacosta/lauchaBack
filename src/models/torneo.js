import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const options={
    values: ['ENJUEGO','TERMINADO'],
    message: '{VALUE} rol no válido'
}
const torneoSchema = new Schema({
    name: {type:String,required:[true, 'El nombre es requerido']},
    date:{type: Date, default: Date.now},
    edition:{type:String}, //para habilitar edicion con true ó false ó id de partido específico
    password:{type:String, default:""},
    status:{type:String, default: "ENJUEGO", enum: options},
    PlayerLimit:{type:Number},
    reglasFinal:{type:Array, default:[]},
    matches:[
        {
            idMatch:{type:String},
            score:{type:Array},
            ruleResult:{type:Array},
            ruleApuesta:{type:Array},
            apuesta:{type:Array},
            valorApuestaRegla:{type:Array, default:[]},
        }
    ],
    players:[
        { 
            _id:{type:String}, 
            nickName:{type:String},
            email:{type:String},
            position:{type:Object}, 
            points:{type:Number,default: 0},
            matches:[
                {
                    _id:{type:String},
                    score:{type:Array},
                    ruleElections:{type:Array}, 
                }
            ]
        }
    ]
});
//exportacion del modulo
const Torneo = mongoose.model('Torneo',torneoSchema);
export default Torneo;