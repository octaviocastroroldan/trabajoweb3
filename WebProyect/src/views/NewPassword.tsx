import { useState } from "react";
import { checkUsuario, updateUsuario } from "../services/UsuarioService";

export default function NewPassword(){
    const [password, setPassword] = useState("");
    const [confirmNewPassword, setComfirmNewPassword] = useState("");
    const [email, setEmail] = useState("")
    const [isTouched, setIsTouched] = useState(false);
    const [message, setMessage] = useState("")
    const passwordsMatch = password === confirmNewPassword;
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(email)
        console.log(password)
        if(password === confirmNewPassword){
            setMessage("Password Must Not Match")
        }
        else{
            const existe = await checkUsuario(email,password)
            console.log(existe)
            if(existe){
                const existe2 = await updateUsuario(email,confirmNewPassword)
                if(existe2){
                    setMessage("Password Changed")
                }
                else{
                    setMessage("Mail Exists but Cannot Update")
                }              
            }
            else{
                setMessage("Credentials Do Not Match")
            }
        }

    }
    return(
        <>
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', paddingTop: '56px' }}>
              <div className="card">
                   <div className="card-body">
                        <h5 className="card-title">Change Password</h5>
                        <form onSubmit={handleSubmit}>
                           <div className="form-group">
                               <label htmlFor="InputEmail">Input Email</label>
                               <input type="email" 
                                      className="form-control" 
                                      id="InputEmail" 
                                      aria-describedby="emailHelp" 
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      maxLength={50}
                                      required/>
                           </div>
                           <div className="form-group">
                               <label htmlFor="InputPassword1">Input Current Password</label>
                               <input type="password" 
                                      className="form-control" 
                                      id="InputPassword1"
                                      value={password}
                                      minLength={6}
                                      onChange={(e) => setPassword(e.target.value)}
                                      required
                                />
                          </div>
                          <div className="form-group">
                               <label htmlFor="InputPassword2">Input New Password</label>
                               <input type="password" 
                                      id="InputPassword2"
                                      className={`form-control ${!passwordsMatch && isTouched ? "" : "is-invalid"}`}
                                      value={confirmNewPassword}
                                      minLength={6}
                                      onChange={(e) => {
                                            setComfirmNewPassword(e.target.value);
                                            setIsTouched(true); 
                                      }}
                                      required
                                />
                                {passwordsMatch && isTouched && (
                                    <div className="invalid-feedback">
                                             New Password cannot be the same as the Old Password
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