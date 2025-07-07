import { useNavigate } from "react-router-dom"
import type { Arriendo } from "../types/arriendo"
import axios from "axios"

type ArriendoFilaProps = {
    index: number,
    arriendo:Arriendo
}

export default function FilaCompletados({index,arriendo}:ArriendoFilaProps){
    index = index
    const navigate = useNavigate()
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
               <td>{arriendo.fechaFin.toLocaleDateString()}</td>
               <td>{arriendo.patenteVehiculo}</td>
               <td>{arriendo.tipoVehiculo}</td>
               <td>{arriendo.rutCliente}</td>
               <td>{arriendo.nombreCliente}</td>
               <td>
                   <button className="btn btn-sm btn-danger mx-1" onClick={() => borrarArriendo()}>
                         <i className="bi bi-trash"></i>
                   </button>
               </td>
           </tr>
        </>
    )
}