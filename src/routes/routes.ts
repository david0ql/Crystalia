import { Router } from "express";

import { validateBody } from "../middlewares";
import { Controllers } from "../controllers";

export const Routes = Router()

const controller = new Controllers()

Routes
    .post("/generate-pdf-by-patient/:idPaciente",
    validateBody([
        { name: "numIngreso", type: "number" },
        { name: "tipoIngreso", type: "string" },
        { name: "opciones", type: "string" },
    ]),
    controller.GeneratePDFByPatient.bind(controller)
    )