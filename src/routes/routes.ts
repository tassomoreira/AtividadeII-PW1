import { Router } from "express";

import petshopRoute from "./petshopRoute";

const route = Router();

route.use("/petshops", petshopRoute);

export default route;