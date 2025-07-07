import { useState } from "react";
import { crearUsuario } from "../services/UsuarioService";

export default function NewAccount(){
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(true);
    const allowedExtensions = ['com', 'org', 'net'];

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isTouched, setIsTouched] = useState(false);
    const passwordsMatch = password === confirmPassword;
    const [message, setMessage] = useState("")

    const isValidInput = (value: string): boolean => {
        if (value.startsWith('@') || (value.match(/@/g) || []).length !== 1) {
            return false;
        }
        if (value.charAt(value.length - 4) !== '.') {
            return false;
        }
        const ext = value.slice(-3);
        if (!allowedExtensions.includes(ext)) {
            return false;
         }
        return true;
        };


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setEmail(newValue);
            setIsValid(isValidInput(newValue));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        if(password !== confirmPassword){
            setMessage("Different Passwords")
        }
        else{
            const estado = await crearUsuario(email,password)
            if(estado){
                setMessage("Account Correctly Created")
            }
            else{
                setMessage("Error: Account May Exists or Wrong Inputs")
            }
        }
    }

    return(
        <>
          <div className="d-flex justify-content-center align-items-center bg-primary bg-opacity-50" style={{ minHeight: '100vh', paddingTop: '56px' }}>
              <div className="card">
                   <div className="card-body">
                        <h5 className="card-title">Create New Account</h5>
                        <form onSubmit={handleSubmit}>
                           <div className="form-group">
                               <label htmlFor="InputEmail">Input Email</label>
                               <input 
                                   type="email" 
                                   className={`form-control ${isValid ? "" : "is-invalid"}`} 
                                   id="InputEmail" 
                                   aria-describedby="emailHelp" 
                                   maxLength={50}
                                   value={email}
                                   onChange={handleEmailChange}
                                   required
                                />
                                {!isValid && (
                                <div className="invalid-feedback">
                                     Must include a single “@” and end in ".com/org/net".
                                </div>
                            )}
                           </div>                          
                           <div className="form-group">
                               <label htmlFor="InputPassword1">Input Password</label>
                               <input 
                                   type="password" 
                                   className="form-control" 
                                   id="InputPassword1"
                                   minLength={6}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                                />
                          </div>
                          <div className="form-group">
                               <label htmlFor="InputPassword2">Input Password Again</label>
                               <input 
                                   type="password" 
                                   id="InputPassword2"
                                   minLength={6}
                                   className={`form-control ${!passwordsMatch && isTouched ? "is-invalid" : ""}`}
                                   value={confirmPassword}
                                   onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setIsTouched(true); 
                                   }}
                                   required
                                />
                                {!passwordsMatch && isTouched && (
                                    <div className="invalid-feedback">
                                             Passwords do not match.
                                    </div>
                                )}
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

          
        </>

    )
}