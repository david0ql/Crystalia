import { Request, Response, NextFunction } from 'express';

export const accessTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const xAccessToken = req.headers["x-access-token"];

    if( xAccessToken !== process.env.X_ACCESS_TOKEN ) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "You are not authorized to access this resource"
        });
    }

    next();

}