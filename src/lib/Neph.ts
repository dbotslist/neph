import { CLIENT_OPTIONS } from '#root/config';
import { container, SapphireClient } from '@sapphire/framework';

import { PrismaClient } from '@prisma/client';

export class NephClient extends SapphireClient {
	public override dev: boolean = process.env.NODE_ENV === 'development';

	public constructor() {
		super(CLIENT_OPTIONS);

		container.prisma = new PrismaClient();
	}

	public override async login(token?: string): Promise<string> {
		const response = await super.login(token);
		await container.prisma.$connect();
		return response;
	}

	public override async destroy(): Promise<void> {
		await container.prisma.$disconnect();
		return super.destroy();
	}
}
