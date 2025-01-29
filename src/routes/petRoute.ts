import { Router } from "express";

import checkExistsUserAccount from "../middlewares/checkExistsUserAccount";
import petController from "../controllers/petController";

const petRoute = Router();

petRoute.post("/", checkExistsUserAccount, petController.createPet);
petRoute.get("/", checkExistsUserAccount, petController.findAllPets);
petRoute.put("/:id", checkExistsUserAccount, petController.updatePet);
petRoute.patch("/:id/vaccinated", checkExistsUserAccount, petController.vaccinatePet);
petRoute.delete("/:id", checkExistsUserAccount, petController.deletePet)

export default petRoute;