const multer = require("multer");
import { Request, Response } from "express";

const path = require("path");

// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: (req: Request, file: any, cb: any) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });

const storageConfig = multer.memoryStorage();
const upload = multer({ storage: storageConfig });

export { upload };
