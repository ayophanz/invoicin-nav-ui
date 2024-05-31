/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '.nav-container',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
		preflight: true
	},
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
