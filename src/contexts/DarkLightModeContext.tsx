'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'




export const DarkLightModeContext = createContext({
    mode: 'light',
    toggleMode: () => { },
})




export function DarkLightModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<"dark" | "light">("dark")

    const toggleMode = () => {
        setMode(mode === "dark" ? "light" : "dark")
    }

    
    return (
        <DarkLightModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </DarkLightModeContext.Provider>
    );
}


export const useDarkLightMode = () => {
    const context = useContext(DarkLightModeContext);
    if (context === undefined) {
        throw new Error('useGallery must be used within a DarkLightModeProvider');
    }
    return context;
}




