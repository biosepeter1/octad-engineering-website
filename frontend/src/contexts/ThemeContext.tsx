'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type ThemeContextType = {
    isDark: boolean
    toggleDark: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: true,
    toggleDark: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(true) // Dark mode is the default

    // On mount, apply dark mode — unless user explicitly chose light before
    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved === 'light') {
            setIsDark(false)
            document.documentElement.classList.remove('dark')
        } else {
            // Default: dark mode always on unless user chose light
            setIsDark(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleDark = () => {
        setIsDark((prev) => {
            const next = !prev
            if (next) {
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            }
            return next
        })
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
