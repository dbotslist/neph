import { gql } from '#utils/constants';
import { Events, Listener } from '@sapphire/framework';
import { envParseString } from '@skyra/env-utilities';
import type { GuildMember } from 'discord.js';

export class UserListener extends Listener<typeof Events.GuildMemberUpdate> {
	public async run(oldMember: GuildMember, newMember: GuildMember) {
		if (!oldMember.user.bot) return; // To make sure that we're only handling bots

		await fetch(envParseString('API_URL'), {
			body: JSON.stringify({
				operationName: null,
				query: gql`
					mutation ($id: String!, $name: String!, $avatar: String!) {
						updateBotInformation(id: $id, name: $name, avatar: $avatar) {
							id
						}
					}
				`,
				variables: {
					id: newMember.id,
					name: newMember.user.username,
					avatar: newMember.user.avatar
				}
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: envParseString('API_KEY')
			}
		}).catch(console.error);
	}
}
