import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                playfair: [
                    "Playfair Display",
                    ...defaultTheme.fontFamily.serif,
                ],
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                niramit: ["Niramit", ...defaultTheme.fontFamily.sans],
                merriweather: ["Merriweather", ...defaultTheme.fontFamily.sans],
                jost: ["Jost", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                animatedgradient: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
            },
            backgroundSize: {
                "300%": "300%",
            },
            animation: {
                gradient: "animatedgradient 4s ease infinite alternate",
            },
            colors: {
                ...defaultTheme.colors,
                primary: "#FAFAFA",
                secondary: "#FFF3E3",
                accent: "#B88E2F",
                dark: "#292F36",
                brown: "#704012",
                primaryWhite: "#F9F5F2",
                white: "#FFFFFF",
                green: "#198754",
                transparentWhite: "rgba(255,255,255,0.3)",
                transparent: "transparent",
                primaryRed: "#DC0D0D",
                primaryBlack: "#000000",
                primaryPink: "#ff69b4",
                bg1: "#F8F6F3",
                bg2: "#F3F0EB",
                text1: "#171414",
                text2: "#424242",
                text3: "#9D7C5D",
                deco1: "#AD9B87",
                deco2: "#D3C6B4",
                primaryAdmin: "#005596",
            },
            padding: {
                ...defaultTheme.padding,
                boxS: "1rem",
                boxMd: "2.5rem",
                boxXl: "3rem",
                boxReg: "6.25rem",
            },
        },
    },
    plugins: [forms],
};
