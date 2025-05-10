import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/libs/i18n/request.ts')

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'f26fb1ab-b5a7-4cc9-928c-fe0a496c4c06.selstorage.ru'
			}
		]
	}
}

export default withNextIntl(nextConfig)
