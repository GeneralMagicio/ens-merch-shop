export const IRON_SESSION_CONFIG = {
	cookieName: `siwe ENS Merch Shop`,
	password:
		process.env.IRON_SESSION_PASSWORD ??
		// UPDATE fallback password
		'complex_password_at_least_32_characters_long',
	cookieOptions: {
		// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
		secure: process.env.NODE_ENV === 'production',
	},
}
