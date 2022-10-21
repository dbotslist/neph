import { Command, RegisterSubCommand } from '@kaname-png/plugin-subcommands-advanced';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { MessageEmbed } from 'discord.js';

@RegisterSubCommand('bot', (builder) => builder.setName('queue').setDescription('-> bots queue'))
export class BotCommand extends Command {
	public readonly queue = [
		{
			name: 'Neph',
			avatar: 'https://media.discordapp.net/attachments/1029728202358259762/1033058794340618310/4892e36efdf899249d5740c75cbca35b.png?width=455&height=455'
		}
	];

	public override async chatInputRun(interaction: Command.ChatInputInteraction) {
		const { screen } = this.buildEmbed();

		await screen.run(interaction, interaction.user);
		return interaction;
	}

	private buildEmbed() {
		const screen = new PaginatedMessage({
			template: new MessageEmbed().setFooter({ text: ' Bots' })
		});

		for (const bot of this.queue) {
			screen.addPageEmbed((embed) =>
				embed //
					.setTitle(bot.name)
					.setThumbnail(bot.avatar)
			);
		}

		return { screen };
	}
}
