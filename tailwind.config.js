/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'btn-hover-profile': 'rgb(231, 233, 234, 0.1)',
                'modal-bg': 'rgba(91, 112, 131, 0.4)',
                'reply-hover': 'rgb(29, 155, 240)',
                'like-hover': 'rgb(249, 24, 128)',
                'tweet-img-hover': 'rgba(29, 155, 240, 0.1)',
                'tweet-hover': 'rgba(255, 255, 255, 0.03)',
            },
            boxShadow: {
                'pfp-dialog':
                    'rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px',
            },
        },
    },
    plugins: [],
}
