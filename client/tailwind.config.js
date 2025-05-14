/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // —— Primary action blue (buttons, active tabs)
        'custom-ruddy-blue': '#3A8BF1',  
        // —— Walnut shell brown (panels, cards)
        'custom-caf-noir':   '#5C4528',  
        // —— Light, warm background for cards / surfaces
        'custom-lion':       '#F7F4F0',  
        // —— Very light neutral (page background)
        'custom-antiflash-white': '#F9FAFB',
        // —— Dark text / headings
        'custom-gunmetal':   '#1E293B',
        // —— Accent yellow for highlights / hover
        'custom-earth-yellow':'#D69E2E',
        // —— Deep page-background for dark-mode
        'custom-oxford-blue':'#0F172A',
        // —— Off-white for light surfaces
        'custom-baby-powder':'#FFFFFF',

        // 'custom-ruddy-blue': '#2e6aa9', //'#4072AE',//'#305786', // '#60a5fa',
        // 'custom-caf-noir': '#3F301E', //'#4b3621',
        // 'custom-lion': '#FEE2C6' , //'#DEB078', // '#A67D44', '#b08b5e',
        // 'custom-antiflash-white': '#e5e7eb',
        // 'custom-gunmetal': '#1e2a32',
        // 'custom-earth-yellow': '#d19c59',
        // 'custom-oxford-blue': '#0f172a',
        // 'custom-baby-powder': '#faf9f6',
      },
      fontFamily: {
        'inter': ["Inter", "sans-serif"],
        'roboto': ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}

