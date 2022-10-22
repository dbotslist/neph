import { Command, RegisterSubCommand } from '@kaname-png/plugin-subcommands-advanced';

@RegisterSubCommand('bot', (builder) => builder.setName('lookup').setDescription('-> lookup a queued bot to approve, denial or nothing'))
export class BotCommand extends Command {
	public override async chatInputRun(interaction: Command.ChatInputInteraction) {}
}
