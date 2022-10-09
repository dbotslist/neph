import { rootFolder } from '#utils/constants';
import { LogLevel } from '@sapphire/framework';
import { setup } from '@skyra/env-utilities';
import { ClientOptions, IntentsBitField, Options, Partials } from 'discord.js';
import { join } from 'node:path';

setup(join(rootFolder, 'src', '.env'));

export const CLIENT_OPTIONS: ClientOptions = {
	disableMentionPrefix: true,
	intents: [IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.Guilds],
	makeCache: Options.cacheEverything(),
	loadDefaultErrorListeners: process.env.NODE_ENV !== 'production',
	rest: { offset: 0 },
	logger: { level: process.env.NODE_ENV === 'production' ? LogLevel.Info : LogLevel.Debug },
	partials: [Partials.Channel, Partials.Message],
	allowedMentions: { users: [], roles: [] }
};
