import type { PrismaClient } from '@prisma/client';
import { BotModel } from './BotModel';

export class ModelMangar {
	public readonly bots: BotModel;

	public constructor(public client: PrismaClient) {
		this.bots = new BotModel(client.bot);
	}
}
