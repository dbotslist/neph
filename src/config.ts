import { rootFolder } from '#utils/constants';
import { LogLevel } from '@sapphire/framework';
import type { ServerOptions, ServerOptionsAuth } from '@sapphire/plugin-api';
import { envParseArray, envParseNumber, envParseString, setup } from '@skyra/env-utilities';
import { ClientOptions, IntentsBitField, Options, Partials } from 'discord.js';
import { join } from 'node:path';

setup(join(rootFolder, 'src', '.env'));

function parseApiAuth(): ServerOptionsAuth | undefined {
	if (!process.env.OAUTH_SECRET) return undefined;

	return {
		id: envParseString('CLIENT_ID'),
		secret: envParseString('OAUTH_SECRET'),
		cookie: envParseString('OAUTH_COOKIE'),
		redirect: envParseString('OAUTH_REDIRECT_URI', undefined),
		scopes: envParseArray('OAUTH_SCOPE', ['identify']),
		domainOverwrite: envParseString('OAUTH_DOMAIN_OVERWRITE', undefined)
	};
}

function parseServerOptions(): ServerOptions {
	return {
		listenOptions: { port: envParseNumber('API_PORT', 4000) },
		prefix: envParseString('API_PREFIX', '/'),
		origin: envParseString('API_ORIGIN'),
		auth: parseApiAuth()
	};
}

export const CLIENT_OPTIONS: ClientOptions = {
	disableMentionPrefix: false,
	regexPrefix: /^(hey +)?neph[,! ]/i,
	intents: [IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.Guilds],
	makeCache: Options.cacheEverything(),
	loadDefaultErrorListeners: process.env.NODE_ENV !== 'production',
	rest: { offset: 0 },
	logger: { level: process.env.NODE_ENV === 'production' ? LogLevel.Info : LogLevel.Debug },
	partials: [Partials.Channel, Partials.Message],
	loadMessageCommandListeners: true,
	allowedMentions: { users: [], roles: [] },
	api: parseServerOptions()
};
