import { defaultColor, fakeQueue } from '#utils/constants';
import { Command, RegisterSubCommand } from '@kaname-png/plugin-subcommands-advanced';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { MessageEmbed } from 'discord.js';

@RegisterSubCommand('bot', (builder) => builder.setName('queue').setDescription('-> bots queue'))
export class BotCommand extends Command {
	public override async chatInputRun(interaction: Command.ChatInputInteraction) {
		const { screen } = this.buildEmbed();

		await screen.run(interaction, interaction.user);
		return interaction;
	}

	private buildEmbed() {
		const screen = new PaginatedMessage({
			template: new MessageEmbed().setColor(defaultColor)
		});

		for (const bot of fakeQueue) {
			screen.addPageEmbed((embed) =>
				embed //
					.setTitle(bot.name)
					.setThumbnail(bot.avatar)
					.setDescription(`>>> Run \`/bot lookup id:${bot.id}\` to approve, denial or nothing`)
			);
		}

		return { screen };
	}
}
