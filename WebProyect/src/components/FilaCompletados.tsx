import { useNavigate } from "react-router-dom"
import type { Arriendo } from "../types/arriendo"
import { deleteArriendo } from "../services/ArriendoService"

type ArriendoFilaProps = {
    index: number,
    arriendo:Arriendo
}

export default function FilaCompletados({index,arriendo}:ArriendoFilaProps){
    index = index
    const navigate = useNavigate()

    const borrandoArriendo = async () => {
        try {
            await deleteArriendo(arriendo.id)
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
                   <button className="btn btn-sm btn-danger mx-1" onClick={() => borrandoArriendo()}>
                         <i className="bi bi-trash"></i>
                   </button>
               </td>
           </tr>
        </>
    )
}