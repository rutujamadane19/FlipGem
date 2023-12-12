import { createContext, useState } from 'react';
import { useSelector } from "react-redux";
export const LoginContext = createContext(null);

const ContextProvider = ({children}) => {
    const accdetails = useSelector(state => state?.auth?.user?.user);
    const [ account, setAccount ] = useState(accdetails);
    
    return (
        <LoginContext.Provider value={{ account, setAccount }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;