import { clean } from '@varrock-stray-dog/bot';
import { ApplyOptions } from '@sapphire/decorators';
import { Args, CommandOptions } from '@sapphire/framework';
import { Type } from '@sapphire/type';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { Message } from 'discord.js';
import { inspect } from 'util';
import { StrayDogCommand } from 'apps/bot/src/lib';

/**
 * @copyright 2019-2020 Soumil07
 * @license GNU Affero General Public License v3.0
 */
@ApplyOptions<CommandOptions>({
    name: 'eval',
    aliases: ['ev'],
    quotes: [],
    preconditions: ['OwnerOnly'],
    strategyOptions: {
        flags: ['async', 'hidden', 'showHidden', 'silent', 's'],
        options: ['depth'],
    },
})
export default class extends StrayDogCommand {
    public async run(message: Message, args: Args) {
        const code = await args.restResult('string');
        if (!code.success) throw 'Missing required argument: code';

        const { result, success, type } = await this.eval(message, code.value, {
            async: args.getFlags('async'),
            depth: Number(args.getOption('depth')) ?? 0,
            showHidden: args.getFlags('hidden', 'showHidden'),
        });
        const output = clean(
            success
                ? codeBlock('js', result)
                : `**ERROR**: ${codeBlock('bash', result)}`
        );
        if (args.getFlags('silent', 's')) return null;

        const typeFooter = `**Type**: ${codeBlock('typescript', type)}`;

        if (output.length > 2000) {
            if (message.channel.attachable) {
                return message.channel.woofSend(
                    `Output was too long... sent the result as a file.\n\n${typeFooter}`,
                    {
                        files: [
                            {
                                attachment: Buffer.from(output),
                                name: 'output.txt',
                            },
                        ],
                    }
                );
            }
            console.log(output);
            return message.channel.woofSend(
                `Output was too long... logged the result to console\n\n${typeFooter}`
            );
        }

        return message.channel.woofSend(`${output}\n${typeFooter}`);
    }

    private async eval(
        message: Message,
        code: string,
        flags: { async: boolean; depth: number; showHidden: boolean }
    ) {
        if (flags.async) code = `(async () => {\n${code}\n})();`;
        let success = true;
        let result = null;
        try {
            // eslint-disable-next-line no-eval
            result = eval(code);
        } catch (error) {
            if (error && error.stack) this.context.client.logger.error(error);
            result = error;
            success = false;
        }

        const type = new Type(result).toString();
        if (isThenable(result)) result = await result;

        if (typeof result !== 'string') {
            result = inspect(result, {
                depth: flags.depth,
                showHidden: flags.showHidden,
            });
        }

        return { result, success, type };
    }
}
