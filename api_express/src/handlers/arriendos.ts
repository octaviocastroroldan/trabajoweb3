import {Request, Response} from 'express'
import Arriendo from '../models/Arriendo'
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

export const getArriendos= async(request:Request, response:Response)=>{
   try{      
        const patentes = await Arriendo.findAll();
        console.log(patentes)
        response.json({ data: patentes });
   }catch(error){
        response.status(500).json({error:"error"})
   }
}



export const getArriendosUnique= async(request:Request, response:Response)=>{
   try{
        const patentes = await Arriendo.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('patente_vehiculo')), 'patente']],
        });
        console.log(patentes)
        response.json({ data: patentes });
   }catch(error){
        response.status(500).json({error:"error"})
   }
}


export const getActiveArriendos = async (request: Request, response: Response) => {
  try {
    const registros = await Arriendo.findAll({
      where: {
        fecha_fin: null,
      },
    });
    response.json({ data: registros });
  } catch (error) {
    response.status(500).json({ error: "Error fetching active rentals" });
  }
};

export const getRentalHistory = async (request: Request, response: Response) => {
  try {
    const completedRentals = await Arriendo.findAll({
      where: {
        fecha_fin: {
          [Op.not]: null,
        },
      },
    });
    response.json({ data: completedRentals });
  } catch (error) {
    response.status(500).json({ error: "Error fetching rental history" });
  }
};


export const checkPatenteExists = async (request: Request, response: Response) => {
  const { patente } = request.params;

  try {
    const exists = await Arriendo.findOne({
      where: { patente_vehiculo: patente },
    });

    response.json({ exists: !!exists }); // true or false
  } catch (error) {
    response.status(500).json({ error: "Error checking patente" });
  }
};

export const countByCarType = async (request: Request, response: Response) => {
  const { tipo } = request.params;

  try {
    const count = await Arriendo.count({
      where: { tipo_vehiculo: tipo }
    });

    response.json({ count });
  } catch (error) {
    response.status(500).json({ error: "Error counting car type", details: error });
  }
};


export const updateArriendo = async(request: Request, response: Response)=>{
  const {id} = request.params
  const arriendo = await Arriendo.findByPk(id)
  await arriendo.update(request.body)
  response.json({data:arriendo})

}


export const createArriendo = async (request: Request, response: Response) => {
  try {
    const newEntry = await Arriendo.create(request.body);
    response.status(201).json({ data: newEntry });
  } catch (error) {
    response.status(500).json({ error: "Error creating rental record", details: error });
  }
};

export const deleteArriendo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const arriendo = await Arriendo.findByPk(id)
    await arriendo.destroy()

    res.json({ message: "Active rental deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting active rental", details: error });
  }
};



