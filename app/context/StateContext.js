import { createContext, useState } from "react";

export const StateContext = createContext({})

export const StateProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [theme, setTheme] = useState('undefined')

    return (
        <StateContext.Provider value={{
            auth, setAuth, 
            theme, setTheme
        }}>
            { children }
        </StateContext.Provider>
    )
}