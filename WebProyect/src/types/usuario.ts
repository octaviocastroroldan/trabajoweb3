import { array, email, nonEmpty, object, pipe, string, type InferOutput } from 'valibot';


export const UsuarioSchema = object({
    email: string(),
    password: string(),
})

export const UsuariosSchema = array(UsuarioSchema)

export type Usuario = InferOutput<typeof UsuarioSchema>

export const LoginFormSchema = object({
    email: pipe(string(), nonEmpty('Indique su Email'), email('Correo No Valido')),
    password: pipe(string(), nonEmpty('Indique su Password'))
})