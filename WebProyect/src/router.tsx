import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import LogIn from "./views/LogIn";
import NewAccount from "./views/NewAccount";
import NewPassword from "./views/NewPassword";
import Menu,{loader as loaderArriendos} from "./views/Menu";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children: [
            {
                index:true,
                element: <LogIn/>
            },
            {
                path:'new-account',
                element: <NewAccount/>
            },
            {
                path:'new-password',
                element: <NewPassword/>
            },
            {
                element:<PrivateRoute/>,
                children: [
                    {
                        path:'menu',
                        element: <Menu/>,
                        loader: loaderArriendos
                     }
                ]
            }            
        ]
    }
])