import envar from "../config/envar.js"
import axios from "axios";

export const generateAccessToken = async () => {
    console.log("generate token paypal")
    try {
        if (!envar().PAYPAL_CLIENT_ID || !envar().PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }

        const auth = Buffer.from(
            envar().PAYPAL_CLIENT_ID + ":" + envar().PAYPAL_CLIENT_SECRET,
        ).toString("base64");

        const response = await axios.post(
            `${envar().PAYPAL_BASE_URL}/v1/oauth2/token`,
            "grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const data = response.data;
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};

export const createOrderPaypal = async (data) => {
    console.log("--create order paypal--", data)
    // use the cart information passed from the front-end to calculate the purchase unit details
    // console.log(
    //     "shopping cart information passed from the frontend createOrder() callback:",
    //     cart,
    // );
    const accessToken = await generateAccessToken();
    console.log(accessToken)
    const url = `${envar().PAYPAL_BASE_URL}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: data.product.cost,
                    description: data.product.description,
                },
            },
        ],
    };

    try {
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
        });

        return response
    } catch (error) {
        console.error(error);
        // Handle the error as needed
        // You can use "res.status()" and "res.send()" to send an appropriate response to the client
    }
};

export const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
    try {
      const response = await axios.post(url, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
          // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
          // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        },
      });
  
      return response
    } catch (error) {
      console.error(error);
      // Manejar el error según tus necesidades
      // Puedes lanzar una excepción o devolver un mensaje de error, dependiendo de tus requisitos
    }
  };