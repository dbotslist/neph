import { CLIENT_OPTIONS } from '#root/config';
import { container, SapphireClient } from '@sapphire/framework';

import { ModelMangar } from '#lib/database/ModelManager';
import { PrismaClient } from '@prisma/client';

export class NephClient extends SapphireClient {
	public override dev: boolean = process.env.NODE_ENV === 'development';

	public constructor() {
		super(CLIENT_OPTIONS);

		container.prisma = new ModelMangar(new PrismaClient());
	}

	public override async login(token?: string): Promise<string> {
		const response = await super.login(token);
		await container.prisma.client.$connect();
		return response;
	}

	public override async destroy(): Promise<void> {
		await container.prisma.client.$disconnect();
		return super.destroy();
	}
}
