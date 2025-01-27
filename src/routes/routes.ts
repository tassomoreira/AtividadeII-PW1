import { Router } from "express";

import petshopRoute from "./petshopRoute";
import petRoute from "./petRoute";

const route = Router();

route.use("/petshops", petshopRoute);
route.use("/pets", petRoute);

export default route;