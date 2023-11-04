
import React, { createContext,useContext, useEffect } from "react";
import { useState } from "react";
const Crypto = createContext();

const CryptoContext = ({children}) => {

    const [Currency,setCurrency] = useState("INR") ;
    const [Symbol,setSymbol] = useState("₹") ; 


    useEffect(() => {
        if(Currency === "INR")
        {
            setSymbol("₹") ; 
        }
        else if(Currency === "USD")
        {
            setSymbol("$") ;
        }
    },[Currency]);

    const value = {
        Currency,
        Symbol, 
        setCurrency,
    }

    return (
        <Crypto.Provider value={value}>
            {children}
        </Crypto.Provider>
    );
};

export default CryptoContext;

export const CryptoState = () => 
{
    return useContext(Crypto) ;
}