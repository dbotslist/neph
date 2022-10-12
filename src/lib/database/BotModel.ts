import type { Prisma, PrismaClient } from '@prisma/client';

export class BotModel {
	public constructor(public readonly _model: PrismaClient['bot']) {}

	public async findUserBot({ userId, botId }: BotModel.FindBot, include?: Prisma.BotInclude) {
		return this._model.findFirst({
			where: {
				id: botId,
				owners: {
					some: {
						id: userId
					}
				}
			},
			include
		});
	}

	public async create({ userId: id, botId, ...options }: BotModel.CreateBot, include?: Prisma.BotInclude) {
		return this._model.create({
			data: {
				owners: {
					connectOrCreate: {
						create: {
							id
						},
						where: {
							id
						}
					}
				},
				id: botId,
				...options
			},
			include
		});
	}
}

export namespace BotModel {
	export type CreateBot = FindBot & {
		description: string | null;
		shortDescription: string | null;
		name: string;
	};

	export interface FindBot {
		userId: string;
		botId: string;
	}
}
