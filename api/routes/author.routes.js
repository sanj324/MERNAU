import express from "express";
import { Signup } from "../controlers/auth.controler.js";


const router = express.Router();


router.post("/Signup",Signup);

export default router