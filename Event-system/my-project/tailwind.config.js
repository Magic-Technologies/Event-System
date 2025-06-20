/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#7B61FF',
                accent: '#FF6AC1',
                sidebar: '#F5F6FF',
                graybg: '#F8F9FB',
                bordergray: '#E9EAF0',
                textgray: '#BFC3D4',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'
        },
    },
    plugins: [],
}