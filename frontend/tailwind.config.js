/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          deep: '#020203',
          base: '#050506',
          elevated: '#0a0a0c',
        },
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          hover: 'rgba(255, 255, 255, 0.08)',
        },
        foreground: {
          DEFAULT: '#EDEDEF',
          muted: '#8A8F98',
          subtle: 'rgba(255, 255, 255, 0.60)',
        },
        accent: {
          DEFAULT: '#5E6AD2',
          bright: '#6872D9',
          glow: 'rgba(94, 106, 210, 0.3)',
        },
        border: {
          default: 'rgba(255, 255, 255, 0.06)',
          hover: 'rgba(255, 255, 255, 0.10)',
          accent: 'rgba(94, 106, 210, 0.30)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)',
        'card-hover': '0 0 0 1px rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(94,106,210,0.1)',
        'glow': '0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)',
        'inner-highlight': 'inset 0 1px 0 0 rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-lighting': 'radial-gradient(ellipse at top, #0a0a0f 0%, #050506 50%, #020203 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 },
        }
      },
      animation: {
        'float-slow': 'float 10s ease-in-out infinite',
        'float-medium': 'float 8s ease-in-out infinite reverse',
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
