import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {

        // sans: ['var(--font-chakra_petch)'],
        // mono: ['var(--font-chakra_petch)'],

        //sans: ['Chakra Petch','Graphik', 'sans-serif'],
        //serif: ['Merriweather', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        yellow: '#D9F04C',
        gray: {
          DEFAULT: '#525252',
          '60': '#3E3A3A99',
        },
        black: '#232222',
      },
      fontWeight: {
        semibold: '600',
      },
    },
    darkMode: 'class',
    plugins: [nextui()],
  },
  plugins: [],
};
export default config;
