import React, {useEffect, createContext, useState} from "react";
import {Router2,createRoutes} from "@7casa/clib22-helpers";
import {adminMenus, appTitle} from "./helpers";


export default function App(){

    const [title,setTitle] = useState<string>("")

    useEffect(() => {
        appTitle().then(setTitle)
    },[])


    const authorise = () => {
        return adminMenus()
    }


    const routes = createRoutes(["instruments","strategies","home"]).map((f => {
        if (f.uid === "instruments" || f.uid === "strategies"){
            return ({
                ...f,
                auth:authorise,
            })
        } else {
            return f
        }
    }))

    return (
        <Router2 routes={routes} importFn={(file) => import(`./pages/${file}`)} logo={{type:"image",value:title}} />
    )
}