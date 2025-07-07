import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (request:Request, response:Response) => {
    const {email,password} = request.body
    const SECRET = process.env.SECRET_KEY
    try{
        const usuario = await Usuario.findByPk(email)
        if(!usuario || !bcrypt.compareSync(password, usuario.password)){
            response.status(401).json({error: 'Credenciales Erroneas'})
        }
        const token = jwt.sign({email: usuario.email}, SECRET, {expiresIn: '1h'})
        response.json({token})

    } catch(error){
        console.error('error de login ', error)
        response.status(500).json({error: 'error del servidor'})

    }
}

export const checkUsuario = async (request:Request, response:Response)=>{
    const {email,password} = request.body
    try{
        const usuario = await Usuario.findByPk(email)
        if(!usuario || !bcrypt.compareSync(password, usuario.password)){
            response.status(401).json({valid: false})
        }
        else{
            response.status(200).json({valid: true})
        }

    } catch(error){
        console.error('error de login ', error)
        response.status(500).json({error: 'error del servidor'})
    }
}

export const crearUsuario = async (request:Request, response:Response) => {
    const {email,password} = request.body
    if(!email || !password){
         response.status(400).json({error: 'Complete Datos'})
    }
    try{
        const existente = await Usuario.findByPk(email)
        if(existente){
            response.status(409).json({error: 'Email ya ingresado'})
        }
        const nuevoUsuario = await Usuario.create({email, password})
        response.status(201).json({error: 'Usuario Creado'})

    }catch(error){
        console.error('error de registro ', error)
        response.status(500).json({error: 'error del servidor'})
    }
}





export const cambiarPassword = async (request:Request, response:Response) => {
    const {email,password} = request.body
    try{
        const usuario = await Usuario.findByPk(email)
        const hashedPassword = await bcrypt.hash(password,10)
        usuario.password=hashedPassword
        await usuario.save()
        response.status(200).json({error: 'Actualizado'})

    }catch(error){
        console.error('error de registro ', error)
        response.status(500).json({error: 'error del servidor'})
    }
}

