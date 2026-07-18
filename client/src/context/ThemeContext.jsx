import { createContext, useContext, useEffect, useState, } from "react";

import { getTheme, updateTheme, } from "@/services/admin/adminThemeService";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const [loading, setLoading] = useState(true);

    const applyTheme = (mode) => {
        const html = document.documentElement;

        html.classList.remove("dark");

        if (mode === "dark") {
            html.classList.add("dark");
        } else if (mode === "system") {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

            if (prefersDark) {
                html.classList.add("dark");
            }
        }
    };

    const loadTheme = async () => {
        try {
            const res = await getTheme();
            setTheme(res.data.theme);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const changeTheme = async (newTheme) => {
        setTheme(newTheme);

        try {
            await updateTheme(newTheme);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadTheme();
    }, []);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, changeTheme, loading }}>
            {children}
        </ThemeContext.Provider>
    );
};