import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '3/4': '3 / 4',
        '2/1': '2 / 1',
        '2/3': '2 / 3',
      },
    },
  },
  plugins: [],
}
export default config
