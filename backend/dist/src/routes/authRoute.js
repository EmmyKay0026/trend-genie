"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post("/sign-up", authController_1.signUpUser);
router.post("/sign-in", authController_1.signInUser);
exports.default = router;
