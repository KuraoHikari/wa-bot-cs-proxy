import "dotenv/config";

import { StatusCodes } from "http-status-codes";

import prisma from "../utils/prisma.js";

export async function getSetting(req, res) {
 try {
  const { id: userId } = req.user;
  const setting = await prisma.setting.findUnique({
   where: {
    userId,
   },
  });

  return res.status(StatusCodes.OK).send(setting);
 } catch (error) {
  return res
   .status(StatusCodes.INTERNAL_SERVER_ERROR)
   .json({ error: "Internal Server Error" });
 }
}
export async function getPdf(req, res) {
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

export async function updateSetting(req, res) {
 try {
  const { id: userId } = req.user;
  const { stopAiResponse } = req.body;
  const setting = await prisma.setting.update({
   where: {
    userId,
   },
   data: {
    stopAiResponse: stopAiResponse,
   },
  });
  return res.status(StatusCodes.OK).send(setting);
 } catch (error) {
  return res
   .status(StatusCodes.INTERNAL_SERVER_ERROR)
   .json({ error: "Internal Server Error" });
 }
}

export async function updateSettingGpt(req, res) {
 try {
  const { id: userId } = req.user;
  const { prompt, gptModel } = req.body;

  let updateData = {};

  if (prompt) {
   updateData.prompt = prompt;
  }
  if (gptModel) {
   updateData.gptModel = gptModel;
  }
  const setting = await prisma.setting.update({
   where: {
    userId,
   },
   data: updateData,
  });
  return res.status(StatusCodes.OK).send(setting);
 } catch (error) {
  return res
   .status(StatusCodes.INTERNAL_SERVER_ERROR)
   .json({ error: "Internal Server Error" });
 }
}

export async function updateSettingPdf(req, res) {
 try {
  //   const { id: userId } = req.user;
  //   const filePath = req.file.path; // Get the path to the uploaded file
  //   console.log("File uploaded successfully:", filePath);
  //   // Call your function to process the PDF
  //   await loadPDFIntoPinecone(filePath);
  //   // res.status(200).send("PDF successfully uploaded and processed.");
  //   const setting = await prisma.setting.update({
  //    where: {
  //     userId,
  //    },
  //    data: {
  //     pdf: filePath,
  //    },
  //   });
  //   return res.status(StatusCodes.OK).send({ setting });
 } catch (error) {
  return res
   .status(StatusCodes.INTERNAL_SERVER_ERROR)
   .json({ error: "Internal Server Error" });
 }
}
