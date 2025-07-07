import { array, date, number, object, string, type InferOutput } from 'valibot';


export const ArriendoSchema = object({
    id: number(),
    fechaInicio: date(),
    fechaFin: date(),
    patenteVehiculo: string(),
    tipoVehiculo: string(),
    rutCliente: string(),
    nombreCliente: string(),
})

export const ArriendosSchema = array(ArriendoSchema)

export type Arriendo = InferOutput<typeof ArriendoSchema>

