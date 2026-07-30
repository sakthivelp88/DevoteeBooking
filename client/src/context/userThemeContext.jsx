import { createContext, useContext, useEffect, useState, } from "react";

import { getTheme, updateTheme, } from "@/features/user/services/appearanceService";

const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside UserThemeProvider");
    }

    return context;
};

export const UserThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "light";
        return localStorage.getItem("app-theme") || "light";
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
            localStorage.setItem("app-theme", mode);
        }
    };

    const loadTheme = async () => {
        const savedTheme = localStorage.getItem("app-theme") || "light";
        const hasLocalUser = !!localStorage.getItem("user");

        // For logged-out users, keep local theme and skip authenticated API request.
        if (!hasLocalUser) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
            setLoading(false);
            return;
        }

        try {
            const res = await getTheme();
            const remoteTheme = res?.data?.theme || savedTheme;
            setTheme(remoteTheme);
            applyTheme(remoteTheme);
        } catch (err) {
            if (err?.response?.status !== 401) {
                console.error(err);
            }
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
            if (err?.response?.status !== 401) {
                console.error(err);
            }
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