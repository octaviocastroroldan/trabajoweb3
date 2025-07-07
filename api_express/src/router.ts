import { Router } from "express"
import { checkPatenteExists, countByCarType, createArriendo, deleteArriendo, getActiveArriendos, getArriendos, getArriendosUnique, getRentalHistory, updateArriendo } from "./handlers/arriendos"
import { cambiarPassword, checkUsuario, crearUsuario, login } from "./handlers/usuarios"
import { verifyToken } from "./middleware/verifyToken"

const router = Router()

//Usuarios
router.post('/login',login)
router.post('/usuarios/crear', crearUsuario)
router.post('/usuarios/check-usuario', checkUsuario)
router.put('/usuarios/change',cambiarPassword)

//MiddleWare
router.use(verifyToken)

//Arriendos
router.get('/arriendos/unique', getArriendosUnique)
router.get('/arriendos/active',getActiveArriendos) 
router.get('/arriendos/not-active',getRentalHistory) 
router.get('/arriendos/cantidad/:tipo',countByCarType) 
router.get('/arriendos',getArriendos) 
router.get('/arriendos/:patente',checkPatenteExists) 


router.post('/arriendos/',createArriendo)
router.put('/arriendos/:id',updateArriendo) 
router.delete('/arriendos/:id',deleteArriendo) 






export default router