"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer = require("multer");
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
exports.upload = upload;
