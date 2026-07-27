/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // NOTE: token names kept stable across palette revisions so
        // components never need touching — only the hex values move.
        //   midnight/charcoal/warmdark = dark surfaces (bg → cards)
        //   ivory = light text · fog = muted text · gold = primary accent
        midnight: '#0D0B0A', // warm near-black — page base (Veronix)
        charcoal: '#15110E', // warm dark — alt sections
        warmdark: '#1C1712', // warm dark card
        ivory: '#F5F0EA', // warm off-white — primary text
        fog: '#9A9088', // warm muted gray — secondary text
        gold: {
          DEFAULT: '#FF5A1E', // vivid orange — primary/dominant accent
          light: '#FF8A4C', // lighter orange — hover/soft states
        },
        // accent family (orange-forward warm dark theme)
        lavender: '#FF8A4C', // light orange
        mint: '#12B8A6', // teal (rare)
        peach: '#FF5A1E', // orange
        sky: '#4C8DFF', // blue (rare)
        coral: '#FF3D6E', // pink-coral
        sunny: '#FFB020', // amber
      },
      fontFamily: {
        display: ['"Clash Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Satoshi"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      letterSpacing: { widest: '0.25em' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        breathe: { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.01)' } },
        'float-slow': { '0%, 100%': { transform: 'translateY(-10px)' }, '50%': { transform: 'translateY(10px)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'blob-drift': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(4%, -6%) scale(1.08)' },
          '66%': { transform: 'translate(-5%, 4%) scale(0.95)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease forwards',
        marquee: 'marquee 40s linear infinite',
        breathe: 'breathe 8s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        'blob-drift': 'blob-drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
