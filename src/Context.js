import { createContext } from 'react'
export const MaskContext = createContext([])
export const LanguageContext= createContext(
    {
        language: "en",
        setLanguage: () => { }
    }
)

// set the defaults
