import express from "express";
import { addSupplier, getListSupplier, editSupplier, deleteSupplier } from "../controllers/supplierController.js";

const supplierRoutes = express.Router()

//Them nha cung cap
supplierRoutes.post('/', addSupplier)

supplierRoutes.get('/', getListSupplier)

supplierRoutes.put('/:id', editSupplier)

supplierRoutes.delete('/:id', deleteSupplier)

export default supplierRoutes;