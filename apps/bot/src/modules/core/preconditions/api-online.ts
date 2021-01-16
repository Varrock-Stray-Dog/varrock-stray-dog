import { PieceContext, Precondition } from '@sapphire/framework';
import { woofify } from 'apps/bot/src/lib';

export default class extends Precondition {
    constructor(context: PieceContext) {
        super(context, {
            name: 'ApiOnline',
        });
    }

    public async run() {
        const online = await this.context.client.nestjs
            .send('ping', null, 2000)
            .then(() => true)
            .catch((e) => {
                return false;
            });

        if (online) {
            return this.ok();
        }

        return this.error(this.name, {
            message: woofify(
                "I am sorry, the api is not responding and I couldn't process your request"
            ),
        });
    }
}
