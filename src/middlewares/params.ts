import { Request, Response, NextFunction } from "express";

import { ParamDefinition } from "../interfaces";

export const validateBody = (paramDefinitions: ParamDefinition[]) => {

  return (req: Request, res: Response, next: NextFunction) => {

    const params = req.body;
    const errors: { [key: string]: string } = {};

    for (const paramDef of paramDefinitions) {
      const paramName = paramDef.name;
      const paramType = paramDef.type;

      if (!params.hasOwnProperty(paramName) || typeof params[paramName] !== paramType) {
        errors[paramName] = `Invalid parameter "${paramName}". Expected type "${paramType}". Received type "${typeof params[paramName]}".`;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: errors,
        message: "The parameters in the request body are invalid"
      });
    }

    next();

  };

};

export const validateParams = (paramDefinitions: ParamDefinition[]) => {

  return (req: Request, res: Response, next: NextFunction) => {

    const params = req.params;
    const errors: { [key: string]: string } = {};

    for (const paramDef of paramDefinitions) {
      const paramName = paramDef.name;
      const paramType = paramDef.type;

      if (!params.hasOwnProperty(paramName) || typeof params[paramName] !== paramType) {
        errors[paramName] = `Invalid parameter "${paramName}". Expected type "${paramType}". Received type "${typeof params[paramName]}".`;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: errors,
        message: "The parameters in the request path are invalid"
      });
    }

    next();

  };

}