/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // 'sans' is the default Tailwind body font
        // We set it to use the CSS variable you defined: var(--font-geist-sans)
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        
        // 'mono' is used for code blocks (like in your API service file names)
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  }
};