import "dotenv/config";

import { StatusCodes } from "http-status-codes";
import kyInstance, { isHTTPError } from "../api/baseWaApi.js";

export async function getQrCode(req, res) {
 try {
  const response = await kyInstance
   .get(`whatsapp/qr-code`, {
    timeout: 25000 * 4, // Timeout in milliseconds (10 seconds in this case)
    headers: {
     token: req.headers.token,
    },
   })
   .json();
  console.log("🚀 ~ getQrCode ~ response:", response);

  return res.status(StatusCodes.OK).json(response);
 } catch (error) {
  console.log("🚀 ~ getQrCode ~ error:", error);
  if (isHTTPError(error)) {
   const errorResponse = await error.response.json();

   return res.status(StatusCodes.BAD_REQUEST).send(errorResponse);
  }
  return res
   .status(StatusCodes.INTERNAL_SERVER_ERROR)
   .json({ error: "Failed to fetch data" });
 }
}

export async function logout(req, res) {
 try {
  const response = await kyInstance
   .post(`whatsapp/logout`, {
    timeout: 25000 * 4, // Timeout in milliseconds (10 seconds in this case)
    headers: {
     token: req.headers.token,
    },
   })
   .json();

  console.log("🚀 ~ getQrCode ~ response:", response);

  return res.status(StatusCodes.OK).json(response);
 } catch (error) {
  if (isHTTPError(error)) {
   const errorResponse = await error.response.json();

   return res.status(StatusCodes.BAD_REQUEST).send(errorResponse);
  }
  return res
   .status(StatusCodes.INTERNAL_SERVER_ERROR)
   .json({ error: "Failed to fetch data" });
 }
}
