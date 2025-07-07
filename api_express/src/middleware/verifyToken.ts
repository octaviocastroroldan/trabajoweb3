import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export function verifyToken(request:Request, response:Response, next:NextFunction){
    const authHeader = request.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        response.status(401).json({error: 'Token no proporcionado'})
    }
    const token = authHeader.split(' ')[1]
    const SECRET = process.env.SECRET_KEY!
    try{
         const decoded = jwt.verify(token, SECRET)
         ;(request as any).usuario = decoded
         next()
 

    }catch(error){
        response.status(403).json({error: 'Token Invalido o Expirado'})
  
    }
    
}