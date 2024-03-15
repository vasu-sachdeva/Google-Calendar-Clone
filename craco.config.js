//CREATE REACT APP CONFIGURATION OVERRIDE

module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        }
    }
};