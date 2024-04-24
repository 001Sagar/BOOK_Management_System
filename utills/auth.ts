import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const secret = 'Guruji_Astro';

// Define custom type definitions for the Request object
interface CustomRequest extends ExpressRequest {
    user?: any; // Define the user property as optional
}

async function authenticate(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token || token === 'null') {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }
        jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) {
                console.error("Error verifying token:", err);
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                // Attach the decoded user information to the request object for further use
                req.user = decoded;
                next();
            }
        });
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default { authenticate };
