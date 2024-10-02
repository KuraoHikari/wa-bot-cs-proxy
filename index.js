import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
 res.send("Hello World");
});

app.use(router);

app.use(
 "/proxy/pdf/:filename",
 createProxyMiddleware({
  target: process.env.WA_API_URL, // Base URL of the remote server
  changeOrigin: true,
  pathRewrite: (path, req) => {
   // Modify the path to match the remote server's structure
   const filename = req.params.filename;
   return `/setting/pdf/${filename}`;
  },
 })
);

app.use((req, res) => {
 res.send("route tidak ditemukan.");
});

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});

export default app;
