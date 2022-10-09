import type { PrismaClient } from '@prisma/client';
import type { ArrayString } from '@skyra/env-utilities';

declare module 'discord.js' {
	interface Client {
		dev: boolean;
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		prisma: PrismaClient;
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		OwnerOnly: never;
	}
}

declare module '@skyra/env-utilities' {
	interface Env {
		CLIENT_OWNERS: ArrayString;

		DATABASE_URL: string;
		DISCORD_TOKEN: string;
	}
}

export default undefined;
