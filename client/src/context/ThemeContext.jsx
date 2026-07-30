import { createContext, useContext, useEffect, useState, } from "react";

import { getTheme, updateTheme, } from "@/features/admin/services/adminThemeService";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "light";
        return localStorage.getItem("admin-theme") || "light";
    });
    const [loading, setLoading] = useState(true);

    const applyTheme = (mode) => {
        const html = document.documentElement;
        const body = document.body;

        html.classList.remove("dark");
        body.classList.remove("dark");

        if (mode === "dark") {
            html.classList.add("dark");
            body.classList.add("dark");
        } else if (mode === "system") {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

            if (prefersDark) {
                html.classList.add("dark");
                body.classList.add("dark");
            }
        }

        if (typeof window !== "undefined") {
            localStorage.setItem("admin-theme", mode);
        }
    };

    const loadTheme = async () => {
        try {
            const res = await getTheme();
            const savedTheme = res?.data?.theme || localStorage.getItem("admin-theme") || "light";
            setTheme(savedTheme);
            applyTheme(savedTheme);
        } catch (err) {
            console.error(err);
            const savedTheme = localStorage.getItem("admin-theme") || "light";
            setTheme(savedTheme);
            applyTheme(savedTheme);
        } finally {
            setLoading(false);
        }
    };

    const changeTheme = async (newTheme) => {
        setTheme(newTheme);
        applyTheme(newTheme);

        try {
            await updateTheme(newTheme);
        } catch (err) {
            console.error(err);
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