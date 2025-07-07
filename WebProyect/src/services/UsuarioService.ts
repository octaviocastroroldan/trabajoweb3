import axios from "axios";

export async function checkUsuario(email:string, password:string){
  try {
        //const url = "http://localhost:3000/api/usuarios/check-usuario"
        const url = `${import.meta.env.VITE_API_URL}/usuarios/check-usuario`
        const res = await axios.post(url, {email, password});
        if (res.data.valid) {
            return true
        } else {
            return false
    }
  } catch (error) {
    console.error('Login request failed:', error);
  }
};

export async function logIn(email:string, password:string){
  try {
        //const url = "http://localhost:3000/api/usuarios/check-usuario"
        const url = `${import.meta.env.VITE_API_URL}/login`
        const res = await axios.post(url, {email, password});
        const {token} = res.data
        localStorage.setItem('token', token)
        return true       
  } catch (error) {
    console.error('Login request failed:', error);
    return false
  }
};

export async function updateUsuario(email: string, password: string) {
  try {
    //const url="http://localhost:3000/api/usuarios/change"
    const url = `${import.meta.env.VITE_API_URL}/usuarios/change`
    const res = await axios.put(url, {email, password});
    console.log("Password update response:", res.data);
    return true
  } catch (error) {
    console.error("Error updating password:", error);
    return false
  }
}



export async function crearUsuario(email: string, password: string) {
  try {
    //const url = "http://localhost:3000/api/usuarios/crear"
    const url = `${import.meta.env.VITE_API_URL}/usuarios/crear`
    const res = await axios.post(url, {email,password});
    console.log("Usuario creado:", res.data); 
    return true 
  } catch (error: any) {
    console.error("Error creando usuario:", error);
    return false
  }
}

