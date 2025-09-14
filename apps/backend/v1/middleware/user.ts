import type { NextFunction, Request, Response } from "express"
import type { JwtPayload } from "jsonwebtoken"
import jwt  from "jsonwebtoken"


export function userMiddleware(req:Request,res:Response,next:NextFunction){
    try{
        const token = req.headers.authorization
        if(!token){
            res.status(401).json({message:"Unauthorized"})
        }
        const decoded = jwt.verify(token as string,process.env.USER_JWT_SECRET as string) as JwtPayload
        req.userId = decoded.userId
        next()
    }
    catch(err){
        res.status(500).json({message:"Internal Server Errr!!"})
        console.log(err)
    }

}