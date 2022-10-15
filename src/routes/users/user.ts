import { ApiResponseIdentifiers } from '#lib/types/Enum';
import { ApplyOptions } from '@sapphire/decorators';
import { ApiRequest, ApiResponse, HttpCodes, methods, Route } from '@sapphire/plugin-api';
import { isNullish } from '@sapphire/utilities';

@ApplyOptions<Route.Options>({ route: 'user/:id' })
export class UserRoute extends Route {
	public async [methods.GET](request: ApiRequest, response: ApiResponse) {
		const { id } = request.params;
		const include = request.query.include ?? [''];

		const user = await this.container.prisma.client.user.findFirst({
			where: { id },
			include: {
				bots: include.includes('bots'),
				reviews: include.includes('reviews')
			}
		});

		if (isNullish(user)) {
			return response.notFound({
				identifier: ApiResponseIdentifiers.NOTFOUND
			});
		}

		return response.ok({
			data: user,
			identifier: ApiResponseIdentifiers.SUCCESS,
			status: HttpCodes.OK
		});
	}

	public async [methods.POST](request: ApiRequest, response: ApiResponse) {
		const { id } = request.params;

		try {
			const user = await this.container.prisma.client.user.create({
				data: {
					id
				}
			});

			return response.created({
				data: user,
				identifier: ApiResponseIdentifiers.UserCreated,
				status: HttpCodes.Created
			});
		} catch (error) {
			return response.unauthorized({
				identifier: ApiResponseIdentifiers.UserAlreadyExists,
				status: HttpCodes.Unauthorized
			});
		}
	}
}
