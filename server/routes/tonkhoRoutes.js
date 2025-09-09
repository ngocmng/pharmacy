import express from "express";
import { getTonKho } from "../controllers/quan_ly_kho/tonkhoController.js";

const tonkhoRoutes = express.Router()

tonkhoRoutes.get('/', getTonKho);

export default tonkhoRoutes;