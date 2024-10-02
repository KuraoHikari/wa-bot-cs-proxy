import { Router } from "express";
import "dotenv/config";

import { authenticationMiddleware } from "../middleware/authMiddleware.js";
import { getQrCode, logout } from "../controllers/whatsappController.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const whatsappRoute = Router();

whatsappRoute.use(authenticationMiddleware);

// whatsappRoute.get("/qr-code", getQrCode);
whatsappRoute.post("/logout", logout);

whatsappRoute.get(
 "/qr-code",
 createProxyMiddleware({
  target: process.env.WA_API_URL, // Base URL of the remote server
  changeOrigin: true,
  pathRewrite: (path, req) => {
   // Modify the path to match the remote server's structure

   return `whatsapp/qr-code`;
  },
 })
);

whatsappRoute.post(
 "/logout",
 createProxyMiddleware({
  target: process.env.WA_API_URL, // Base URL of the remote server
  changeOrigin: true,
  pathRewrite: (path, req) => {
   // Modify the path to match the remote server's structure

   return `whatsapp/logout`;
  },
 })
);

export default whatsappRoute;
