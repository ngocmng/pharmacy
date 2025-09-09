import express from "express";
import { addSupplier, getListSupplier } from "../controllers/supplierController.js";

const supplierRoutes = express.Router()

//Them nha cung cap
supplierRoutes.post('/', addSupplier)

supplierRoutes.get('/', getListSupplier)

export default supplierRoutes;