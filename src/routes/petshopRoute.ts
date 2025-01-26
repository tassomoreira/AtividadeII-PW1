import { Router } from "express";

import petshopController from "../controllers/petshopController";

const petshopRoute = Router();

petshopRoute.post("/", petshopController.createPetshop);

export default petshopRoute;