import Express from 'express'
import router from './router'
import db from './config/database'
import cors, {CorsOptions} from 'cors'
import dotenv from 'dotenv'
const server = Express()


async function conectarDB(){
    try{
        await db.authenticate()
        db.sync()
        console.log("Conexion Exitosa")

    }catch (error){
        console.log('No se pudo Conectar')
        console.log(error)
    }
}

conectarDB()

const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        console.log(origin)
        if(!origin || origin===process.env.FRONTEND_URL){
            callback(null,true)
        }else{
            callback(new Error('Error de Cors'),false)
        }
    },
}

server.use(cors(corsOptions))
server.use(Express.json())
server.use('/api', router)

export default server