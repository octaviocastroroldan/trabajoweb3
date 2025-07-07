import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { logIn } from "../services/UsuarioService";

export default function LogIn(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const result = await logIn(email,password)
        if(result){
            navigate('/menu')
        }
        else{
            setMessage("Wrong Credentials")
        }
    }



    return(
        <>
          <form onSubmit={handleSubmit}>
            <h5>LogIn</h5>
            <div className="form-group">
                <label htmlFor="InputEmail">Email</label>
                <input type="email" 
                       className="form-control" 
                       id="InputEmail" 
                       aria-describedby="emailHelp" 
                       maxLength={50}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                       />
            </div>
            <div className="form-group">
                <label htmlFor="InputPassword">Password</label>
                <input type="password"
                       className="form-control" 
                       id="InputPassword"
                       onChange={(e) => setPassword(e.target.value)}
                       required
                       />
            </div>
            <div className="fw-bold text-danger">
                                 {message}
                       </div>
            <div className="d-flex gap-2 mt-2">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-warning" onClick={()=>navigate('/new-password')}>Change Password</button>
                <button type="button" className="btn btn-success" onClick={()=>navigate('/new-account')}>New Account</button>
            </div>
           </form>
           <img src="public/img/auto1.jpg" className="mx-auto d-block mt-5" alt="Auto" height="400"/>
        </>

    )
}