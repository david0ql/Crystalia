import { Request, Response } from "express";

import { RequestBodyPDF } from "../interfaces";
import { Services } from "../services";

class Controllers {


    constructor(
        private services: Services = Services.getInstance(),
    ) {
    }

    public GeneratePDFByPatient = async (request: Request<{ idPaciente: string }, {}, RequestBodyPDF>, response: Response) => {

        try {

            const pdf = await this.services.GeneratePDFByPatient();
            response.status(200).send(pdf);

        } catch (error) {

            console.log(error);
            response.status(500).send(error);

        }

    };

}

export { Controllers }