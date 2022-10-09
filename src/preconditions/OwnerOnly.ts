import { AllFlowsPrecondition } from '@sapphire/framework';
import { envParseArray } from '@skyra/env-utilities';
import type { Snowflake } from 'discord-api-types/v9';
import type { ChatInputCommandInteraction, ContextMenuCommandInteraction, Message } from 'discord.js';

export class UserPrecondition extends AllFlowsPrecondition {
	#message = 'This command can only be used by the bot owner.';

	public override chatInputRun(interaction: ChatInputCommandInteraction) {
		return this.doOwnerCheck(interaction.user.id);
	}

	public override contextMenuRun(interaction: ContextMenuCommandInteraction) {
		return this.doOwnerCheck(interaction.user.id);
	}

	public override messageRun(message: Message) {
		return this.doOwnerCheck(message.author.id);
	}

	private doOwnerCheck(userId: Snowflake) {
		return envParseArray('CLIENT_OWNERS').includes(userId) ? this.ok() : this.error({ message: this.#message });
	}
}
