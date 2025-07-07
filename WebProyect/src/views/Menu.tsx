import { useState } from "react";
import { agregarArriendo, encontrarPatente, getArriendosCompletados, getArriendosEnCurso, getTipoCounts } from "../services/ArriendoService";
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import type { Arriendo } from "../types/arriendo";
import FilaActivos from "../components/FilaActivos";
import FilaCompletados from "../components/FilaCompletados";

export async function loader(){
    const token = localStorage.getItem('token');
    if (!token) {
        return redirect('/');
    }
    else{
        const [completados, activos, cuenta1, cuenta2, cuenta3]= await Promise.all([
        getArriendosCompletados(),
        getArriendosEnCurso(),
        getTipoCounts("Sedan"),
        getTipoCounts("SUV"),
        getTipoCounts("Camioneta"),
        ])
        return {completados, activos, cuenta1, cuenta2, cuenta3}
    } 
}

export default function Menu(){
    const [platePart1, setPlatePart1] = useState("");
    const [platePart2, setPlatePart2] = useState("");
    const [idPart1, setIdPart1] = useState("");
    const [idPart2, setIdPart2] = useState("");
    const [tipo, setTipo] = useState("");
    const [nombre, setNombre] = useState("");
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const {completados, activos, cuenta1, cuenta2, cuenta3} = useLoaderData() as {
        completados: Arriendo[];
        activos: Arriendo[];
        cuenta1: number;
        cuenta2: number;
        cuenta3: number;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const savename = nombre
        const savetipo = tipo
        const rut = `${idPart1}-${idPart2}`
        const plate = `${platePart1}${platePart2}`
        const revisar = await encontrarPatente(plate)
        console.log("Nombre:", savename);
        console.log("tipo:", savetipo)
        console.log("rut:",rut)
        console.log("plate: ", plate)
        
        if(revisar.exists){
            console.log("Se Encuentra")
            const usado = activos.some(a => a.patenteVehiculo === plate)
            if(usado){
                console.log("Usado")
                setMessage("Auto no Disponible")
            }
            else{
                const disponible = completados.some(b => {
                    const isMatch = b.tipoVehiculo === savetipo;
                    console.log(`Comparando: ${b.tipoVehiculo} === ${savetipo} → ${isMatch}`);
                    return isMatch;
                })
                if(disponible){
                    console.log("Disponible")
                    await agregarArriendo({
                        fechaInicio: new Date().toISOString(),
                        fechaFin: null,
                        patenteVehiculo: plate,
                        tipoVehiculo: tipo,
                        rutCliente: rut,
                        nombreCliente: nombre,
                    })
                    navigate(".", { replace: true });
                    setMessage("")
                }
                else{
                    setMessage("Tipos de Auto no Coinciden")
                    console.log("Tipos de Auto No Coinciden")
                }
            }
        }
        else{
            console.log("No se Encuentra")
            await agregarArriendo({
                        fechaInicio: new Date().toISOString(),
                        fechaFin: null,
                        patenteVehiculo: plate,
                        tipoVehiculo: tipo,
                        rutCliente: rut,
                        nombreCliente: nombre,
                })
                navigate(".", { replace: true });
                setMessage("")
        }
    }

    console.log(completados)
    console.log("luego")
    console.log(activos)

    return(
        <>
           <div className="row">
                <div className="col-3">
                    <div className="row">
                            <div className="card m-4">
                                <div className="card-body">
                                    <h5 className="card-title">Make New Rental</h5>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="InputPlate1">Input License Plate</label>
                                            <div className="d-flex align-items-center gap-2">
                                                <input 
                                                     type="text" 
                                                     className="form-control" 
                                                     id="InputPlate1" 
                                                     pattern="[A-Z]{4}" 
                                                     maxLength={4} 
                                                     style={{ maxWidth: "100px" }}
                                                     value={platePart1}
                                                     onChange={(e) => {
                                                        const onlyLetters = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
                                                        if (onlyLetters.length <= 4) setPlatePart1(onlyLetters);
                                                     }}
                                                     required
                                                />
                                                -
                                                <input 
                                                     type="text" 
                                                     className="form-control" 
                                                     id="InputPlate2" pattern="[0-9]{2}" 
                                                     maxLength={2} 
                                                     style={{ maxWidth: "100px" }}
                                                     value={platePart2}
                                                     onChange={(e) => {
                                                        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                                        if (onlyNums.length <= 2) setPlatePart2(onlyNums);
                                                     }}
                                                     required
                                                     />
                                            </div>           
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="InputType">Car Type</label>
                                            <select
                                                 className="form-control"
                                                 id="InputType"
                                                 value={tipo}
                                                 onChange={(e) => setTipo(e.target.value)}
                                                 required
                                            >
                                                <option value="" disabled>-- Selecciona Tipo de Auto --</option>
                                                <option value="Camioneta">Camioneta</option>
                                                <option value="Sedan">Sedan</option>
                                                <option value="SUV">SUV</option>                                            
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="InputRut">Input ID</label>
                                            <div className="d-flex align-items-center gap-2">
                                                <input 
                                                     type="text" 
                                                     className="form-control" 
                                                     id="InputRut" 
                                                     pattern="[0-9]{8}" 
                                                     maxLength={8} 
                                                     style={{ maxWidth: "100px" }}
                                                     value={idPart1}
                                                     onChange={(e) => {
                                                        const onlyNums2 = e.target.value.replace(/[^0-9]/g, '');
                                                        if (onlyNums2.length <= 8) setIdPart1(onlyNums2);
                                                     }}
                                                     required
                                                />
                                                -
                                                <input 
                                                     type="text" 
                                                     className="form-control" 
                                                     id="InputRut2" pattern="[0-9K]" 
                                                     maxLength={1} 
                                                     style={{ maxWidth: "100px" }}
                                                     value={idPart2}
                                                     onChange={(e) => {
                                                        const input = e.target.value.toUpperCase();
                                                        const isValid = /^[0-9K]{0,1}$/.test(input);
                                                        if (isValid) setIdPart2(input);
                                                     }}
                                                     required
                                                />
                                            </div>           
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="InputName">Input Name</label>
                                            <input type="text" className="form-control" id="InputName" maxLength={50} value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                                        </div>
                                        <div className="d-flex gap-2 mt-2">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                    <div className="fw-bold text-danger">
                                        {message}
                                    </div>                      
                                </div>                  
                            </div>
                    </div>
                    <div className="row">
                        <span className="fw-bold ms-4 fs-4">Renting</span>
                        <table className="table-bordered ms-4">
                            <tbody>
                                <tr>
                                    <td>Sedán</td>
                                    <td>{cuenta1}</td>

                                </tr>
                                <tr>
                                    <td>SUV</td>
                                    <td>{cuenta2}</td>

                                </tr>
                                <tr>
                                    <td>Camionetas</td>
                                    <td>{cuenta3}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row ms-4">
                        <span className="fw-bold ms-4 fs-4">Currently Rented</span>
                        <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto", overflowX:"auto", maxWidth: "800px" }}>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>License Plate</th>
                                        <th>CarType</th>
                                        <th>ClientId</th>
                                        <th>ClientName</th>
                                        <th>Complete/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activos.map((activo,index)=>(
                                        <FilaActivos key={activo.id} index={index} arriendo={activo}/>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mt-4 ms-4">
                        <span className="fw-bold ms-4 fs-4">Past Rentals</span>
                        <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto", overflowX:"auto", maxWidth: "800px" }}>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>License Plate</th>
                                        <th>Car Type</th>
                                        <th>Client Id</th>
                                        <th>Client Name</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completados.map((completado,index)=>(
                                        <FilaCompletados key={completado.id} index={index} arriendo={completado}/>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> 
           </div>
        </>
    )
}