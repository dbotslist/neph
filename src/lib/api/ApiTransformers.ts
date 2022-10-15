import type { User } from 'discord.js';

export interface FlattenedUser {
	avatar: string | null;

	bot: boolean;

	discriminator: string;

	id: string;

	username: string;
}

export function flattenUser(user: User): FlattenedUser {
	return {
		id: user.id,
		bot: user.bot,
		username: user.username,
		discriminator: user.discriminator,
		avatar: user.avatar
	};
}
