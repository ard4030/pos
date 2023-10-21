'use client'

import { createContext, useState } from "react"

export const ProductContext = createContext();
export const ProductWrapper = ({children}) => {
    const [details, setDetails] = useState({
        name:"",
        price:"",
        images:[],
        brand:"",
        specifications:[],
        status:"new",
        count:1,
        id:null
    });

    const setDef = () => {
        setDetails({
            name:"",
            price:"",
            images:[],
            brand:"",
            specifications:[],
            status:"new",
            count:1,
            id:null
        })
    }

    const addSpes = (e) => {
        let x = details.specifications;
        x.push({name:"",value:""});
        setDetails({...details,specifications:x})
    }

    const changeName = (e,index) => {
        let x = details.specifications;
        x[index].name = e.target.value;
        setDetails({...details,specifications:x})
    }

    const changeValue = (e,index) => {
        let x = details.specifications;
        x[index].value = e.target.value;
        setDetails({...details,specifications:x})
    }

    const deleteSpec = (index) => {
        let x = details.specifications;
        delete x[index];
        setDetails({...details,specifications:x})
    }


    return (
        <ProductContext.Provider value={{details,setDetails,addSpes,changeName,changeValue,deleteSpec,setDef}} >
            {children}
        </ProductContext.Provider>
    )
}