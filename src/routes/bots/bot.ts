import { authenticated, ratelimit } from '#lib/api/utils';
import { ApiResponseIdentifiers } from '#lib/types/Enum';
import type { Bot } from '@prisma/client';
import { ApplyOptions } from '@sapphire/decorators';
import { Time } from '@sapphire/duration';
import { ApiRequest, ApiResponse, HttpCodes, methods, Route } from '@sapphire/plugin-api';
import { cast, isNullish } from '@sapphire/utilities';

@ApplyOptions<Route.Options>({ route: 'bot/:id' })
export class UserRoute extends Route {
	public async [methods.GET](request: ApiRequest, response: ApiResponse) {
		const { id } = request.params;
		const include = request.query.include ?? [''];

		const bot = await this.container.prisma.bots._model.findFirst({
			where: { id },
			include: {
				owners: include.includes('owners'),
				reviews: include.includes('reviews')
			}
		});

		if (isNullish(bot)) {
			return response.notFound({
				identifier: ApiResponseIdentifiers.NOTFOUND
			});
		}

		return response.ok({
			data: bot,
			identifier: ApiResponseIdentifiers.SUCCESS,
			status: HttpCodes.OK
		});
	}

	@authenticated()
	@ratelimit(Time.Minute * 5, 1, true)
	public async [methods.DELETE](request: ApiRequest, response: ApiResponse) {
		const { id } = request.params;

		const bot = await this.container.prisma.bots._model.delete({
			where: { id }
		});

		return response.ok({
			data: bot,
			identifier: ApiResponseIdentifiers.BotDeleted,
			status: HttpCodes.OK
		});
	}

	@authenticated()
	@ratelimit(Time.Minute * 7, 1, true)
	public async [methods.POST](request: ApiRequest, response: ApiResponse) {
		const { id } = request.params;
		const { description, prefix, shortDescription, tags } = cast<Bot & { tags: string[] }>(request.body);

		const { avatar, username: name } = await this.container.client.users.fetch(id, { cache: true });

		const bot = await this.container.prisma.bots._model.create({
			data: {
				name,
				avatar,
				description,
				owners: {
					connectOrCreate: {
						where: { id: request.auth!.id },
						create: { id: request.auth!.id }
					}
				},
				tags: {
					connect: tags.map((tag) => ({ name: tag }))
				},
				prefix,
				shortDescription,
				id
			},
			include: {
				owners: true
			}
		});

		return response.created({
			data: bot,
			identifier: ApiResponseIdentifiers.BotCreated
		});
	}
}
