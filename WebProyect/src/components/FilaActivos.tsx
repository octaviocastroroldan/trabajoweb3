import { useNavigate } from "react-router-dom"
import type { Arriendo } from "../types/arriendo"
import axios from "axios"

type ArriendoFilaProps = {
    index: number,
    arriendo:Arriendo
}

export default function FilaActivos({index,arriendo}:ArriendoFilaProps){
    index = index
    const navigate = useNavigate()
    const completarArriendo = async () => {
        try {
        await axios.put(`http://localhost:3000/api/arriendos/${arriendo.id}`, {
            fechaFin: new Date().toISOString(),
        });
        navigate(".", { replace: true }); 
        } catch (error) {
            console.error("Error updating arriendo", error);
        }
    }
    const borrarArriendo = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/arriendos/${arriendo.id}`);
            navigate(".", { replace: true });
 
        } catch (error) {
            console.error("Error deleting arriendo", error);
        }
    }
    return(
        <>
           <tr>
               <td>{arriendo.id}</td>
               <td>{arriendo.fechaInicio.toLocaleDateString()}</td>
               <td>En Curso</td>
               <td>{arriendo.patenteVehiculo}</td>
               <td>{arriendo.tipoVehiculo}</td>
               <td>{arriendo.rutCliente}</td>
               <td>{arriendo.nombreCliente}</td>
               <td>
                   <button className="btn btn-sm btn-warning mx-1" onClick={() => completarArriendo()}>
                         <i className="bi bi-check"></i>
                   </button>
                   <button className="btn btn-sm btn-danger mx-1" onClick={() => borrarArriendo()}>
                         <i className="bi bi-trash"></i>
                   </button>
               </td>
           </tr>
        </>
    )
}