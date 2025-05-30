/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#004AAD',
					main: '#004AAD',
					10: '#f9fafb',
					50: '#ebf8ff',
					100: '#d1f1ff',
					200: '#aee7ff',
					300: '#76daff',
					400: '#35c3ff',
					500: '#079fff',
					600: '#0079ff',
					700: '#0060ff',
					800: '#004fd7',
					900: '#004aad',
					950: '#062c65'
				},
				secondary: {
					DEFAULT: '#F9FAF3',
					main: '#F9FAF3'
				},
				status: {
					success: '#1FBB82',
					pending: {
						yellow: '',
						red: '#FF5A5A'
					},
				},
				light: {
					'100': '#E6EDCE',
					'200': '#676767'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
}