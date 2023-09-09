import { SendEmailCommand } from "@aws-sdk/client-ses"
import { SES } from "./awsClient.js";
import envar from "../config/envar.js";
// Definir los parámetros del correo electrónico
const params = {
    Source: envar().SES_EMAIL_AUTH, // Dirección de correo verificada con AWS
    Destination: {
        ToAddresses: [envar().SES_EMAIL_AUTH], // Lista de destinatarios
    },
    Message: {
        Subject: {
            Data: "Asunto del correo", // Asunto del correo
        },
        Body: {
            Text: {
                Data: "Hola, este es un correo de prueba enviado desde Node.js usando AWS SES v3", // Cuerpo del correo en texto plano
            },
        },
    },
};

export const testEmailAWS = async (file) => {
    console.log("entrando")
    // Create an object and upload it to the Amazon S3 bucket.
    try {
        // Crear el comando para enviar el correo electrónico
        const command = new SendEmailCommand(params);
        // Ejecutar el comando usando el cliente de SES
        SES.send(command, (err, data) => {
            if (err) {
                console.error(err); // Mostrar el error si ocurre
            } else {
                console.log(data); // Mostrar la respuesta de AWS si tiene éxito
            }
        });
    } catch (err) {
        console.log("Error", err);
    }
};
