import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from "mongoose-unique-validator";

const teamSchema = new Schema({
  nombre: { type: String },
  seleccion: {
    fifa: {
      mundialAdult: { type: Array },
      olimpJuv: { type: Array },
      mundialSub20: { type: Array },
      mundialSub17: { type: Array },
    },
    uefa: {
      eurocopa: { type: Array },
      ligaNacUefa: { type: Array },
      europeSub21: { type: Array },
      europeSub19: { type: Array },
      europeSub17: { type: Array },
    },
    conmebol: {
      copaAmerica: { type: Array },
      clasificatoria: { type: Array },
      preolimpSub23: { type: Array },
      sudamSub20: { type: Array },
      sudamSub17: { type: Array },
      sudamSub15: { type: Array },
    },
    concacaf: {
      copaOro: { type: Array },
      clasificatoria: { type: Array },
      ligaNacConcacaf: { type: Array },
      copaConcacaf: { type: Array },
      preolimp: { type: Array },
      campSub20: { type: Array },
      campSub17: { type: Array },
      campSub15: { type: Array },
    },
  },
  club: {
    internacional: {
      fifa: {
        mundialClubes: { type: Array },
      },
      uefa: {
        champions: { type: Array },
        europaleague: { type: Array },
        supercopaUefa: { type: Array },
        conferencia: { type: Array },
      },
      conmebol: {
        libert: { type: Array },
        sudam: { type: Array },
        recopaConmebol: { type: Array },
        libertSub20: { type: Array },
      },
      concacaf: {
        ligaCamp: { type: Array },
        LigaConcacaf: { type: Array },
      },
    },
    nacional: {
      sudamerica: {
        chile: {
          liga1Chile: { type: Array },
          liga2Chile: { type: Array },
          copaChile: { type: Array },
          superCopaChile: { type: Array },
        },
        argentina: {
          liga1Arg: { type: Array },
          liga2Arg: { type: Array },
          copaArg: { type: Array },
          superCopaArg: { type: Array },
        },
        brasil: {},
        colombia: {},
        venezuela: {},
        bolivia: {},
        ecuador: {},
      },
      centroamerica: {},
      norteamerica: {},
      europa: {
        espana: {
          liga1Esp: { type: Array },
          liga2Esp: { type: Array },
          copaEsp: { type: Array },
          superCopaEsp: { type: Array },
        },
        italia: {
          liga1Ita: { type: Array },
          liga2Ita: { type: Array },
          copaIta: { type: Array },
          superCopaIta: { type: Array },
        },
        francia: {
          liga1IFran: { type: Array },
          liga2Fran: { type: Array },
          copaFran: { type: Array },
          superCopaFran: { type: Array },
        },
        alemania: {
          liga1Ale: { type: Array },
          liga2Ale: { type: Array },
          copaAle: { type: Array },
          superCopaAle: { type: Array },
        },
        inglaterra: {
          liga1Ing: { type: Array },
          liga2Ing: { type: Array },
          copaIng: { type: Array },
          facup: { type: Array },
          superCopaIng: { type: Array },
        },
      },
    },
  },
});

// Validator
teamSchema.plugin(uniqueValidator, {
  message: "Error en {PATH}, ya existe un equipo con ese nombre",
});

//exportacion del modulo
const Team = mongoose.model("Team", teamSchema);
export default Team;
