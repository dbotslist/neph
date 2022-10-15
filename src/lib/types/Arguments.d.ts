import type { ModelMangar } from '#lib/database/ModelManager';
import type { ArrayString, NumberString } from '@skyra/env-utilities';

declare module 'discord.js' {
	interface Client {
		dev: boolean;
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		prisma: ModelMangar;
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		OwnerOnly: never;
	}
}

declare module '@skyra/env-utilities' {
	interface Env {
		// CLIENT
		CLIENT_OWNERS: ArrayString;
		CLIENT_ID: string;

		// API
		API_PORT: NumberString;
		API_PREFIX: string;
		API_ORIGIN: string;

		// OAUTH
		OAUTH_COOKIE: string;
		OAUTH_REDIRECT_URI: string;
		OAUTH_DOMAIN_OVERWRITE: string;
		OAUTH_SCOPE: ArrayString;

		// SECRETS
		DATABASE_URL: string;
		DISCORD_TOKEN: string;
		OAUTH_SECRET: string;
	}
}

export default undefined;
