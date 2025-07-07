import { safeParse } from "valibot"
import { ArriendosSchema } from "../types/arriendo"
import axios from "../services/axiosInstance"

export async function getArriendosCompletados(){
    try{
        console.log("completados")
        //const url = 'http://localhost:3000/api/arriendos/not-active'
        //const url = `${import.meta.env.VITE_API_URL}/arriendos/not-active`
        const url = '/arriendos/not-active'
        const {data:arriendos} = await axios.get(url)
        const formattedData = arriendos.data.map((item: any) => ({
            ...item,
            fechaInicio: new Date(item.fechaInicio),
            fechaFin: new Date(item.fechaFin),
        }));
        const resultado = safeParse(ArriendosSchema, formattedData)
        if(resultado.success){
            return resultado.output
        }
        else{
            throw new Error('Hubo un problema al pedir datos')
        }
    }catch(error){
        console.log(error)
    }
}

export async function getArriendosEnCurso(){
    try{
        console.log("en curso")
        //const url = 'http://localhost:3000/api/arriendos/active'
        //const url = `${import.meta.env.VITE_API_URL}/arriendos/active`
        const url = '/arriendos/active'
        const {data:arriendos} = await axios.get(url)
        const formattedData = arriendos.data.map((item: any) => ({
            ...item,
            fechaInicio: new Date(item.fechaInicio),
            fechaFin: new Date(item.fechaFin),
            
        }));
        const resultado = safeParse(ArriendosSchema, formattedData)
        if(resultado.success){
            return resultado.output
        }
        else{
            throw new Error('Hubo un problema al pedir datos')
        }
    }catch(error){
        console.log(error)
    }
}


export async function getTipoCounts(tipo: string): Promise<number> {
  //const url = `http://localhost:3000/api/arriendos/cantidad/${tipo}`;
  //const url = `${import.meta.env.VITE_API_URL}/arriendos/cantidad/${tipo}`
  const url = `/arriendos/cantidad/${tipo}`
  const { data } = await axios.get(url);
  return data.count; 
}

export async function arriendoUpdate(categoriaId: number){
    try{
        //const url = `http://localhost:3000/api/arriendos/${categoriaId}`
        //const url = `${import.meta.env.VITE_API_URL}/arriendos/${categoriaId}`
        const url = `/arriendos/${categoriaId}`
        await axios.put(url,{
            fechaFin: new Date()
        })
         
    }catch(error){
        return {success: false, error: "no se pudo editar"}
    }
}


export async function encontrarPatente(patente: string){
    try{
        //const url = `http://localhost:3000/api/arriendos/${patente}`
        //const url = `${import.meta.env.VITE_API_URL}/arriendos/${patente}`
        const url = `/arriendos/${patente}`
        const response = await axios.get(url);
        return { success: true, exists: response.data.exists }
    }catch(error){
        return {success: false, error: "no se pudo encontrar"}
    }
}



export async function agregarArriendo(datos: {
  fechaInicio: string;
  fechaFin: string | null;
  patenteVehiculo: string;
  tipoVehiculo: string;
  rutCliente: string;
  nombreCliente: string;
}) {
  try {
    //const url = `${import.meta.env.VITE_API_URL}/arriendos`
    const url = 'arriendos'
    const response = await axios.post(url, datos);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating arriendo:", error);
    return { success: false, error };
  }
}


export async function deleteArriendo (id: number){
    try {
            //await axios.delete(`http://localhost:3000/api/arriendos/${fecha}`)
            await axios.delete(`arriendos/${id}`)

        } catch (error) {
            console.error("Error deleting arriendo", error);
        }

}

export async function updateArriendo (id: number){
    try {
        await axios.put(`arriendos/${id}`, {
            fechaFin: new Date().toISOString(),
        });
        } catch (error) {
            console.error("Error updating arriendo", error);
        }
}