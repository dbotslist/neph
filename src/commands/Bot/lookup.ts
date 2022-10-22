import { fakeQueue } from '#utils/constants';
import { Command, RegisterSubCommand } from '@kaname-png/plugin-subcommands-advanced';
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';

@RegisterSubCommand('bot', (builder) =>
	builder //
		.setName('lookup')
		.setDescription('-> lookup a queued bot to approve, denial or nothing')
		.addStringOption((option) =>
			option //
				.setName('id')
				.setDescription('-> bot id to lookup')
				.setRequired(true)
		)
)
export class BotCommand extends Command {
	public override async chatInputRun(interaction: Command.ChatInputInteraction) {
		const id = interaction.options.getString('id', true);

		const bot = fakeQueue.find((b) => b.id === id);

		if (!bot) return interaction.reply({ content: 'Bot not found', ephemeral: true });

		const embed = new MessageEmbed().setTitle(bot.name).setDescription(bot.short_description).setImage(bot.avatar).setFooter({ text: bot.id });
		const component = new MessageActionRow() //
			.addComponents(
				new MessageButton() //
					.setCustomId(`approve_bot:${bot.id}`)
					.setEmoji('✅')
					.setLabel('Approve')
					.setStyle('SUCCESS'),
				new MessageButton() //
					.setCustomId(`decline_bot:${bot.id}`)
					.setEmoji('❌')
					.setLabel('Decline')
					.setStyle('DANGER'),
				new MessageButton() //
					.setCustomId(`wait_bot:${bot.id}`)
					.setEmoji('❓')
					.setLabel('Wait')
					.setStyle('SECONDARY')
			);

		interaction.reply({ embeds: [embed], components: [component] });
	}
}
