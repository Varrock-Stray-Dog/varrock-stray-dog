import { Command, PrefixSupplier } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import { stripIndents } from 'common-tags';

export class HelpCommand extends Command {
    public constructor() {
        super('help', {
            aliases: ['help', 'h'],
            description: {
                content:
                    'Displays a list of available commands, or detailed information for a specified command.',
                usage: '[command]',
            },
            category: 'util',
            clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
            ratelimit: 2,
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                },
            ],
        });
    }

    public async exec(message: Message, { command }: { command: Command }) {
        const prefix = (this.handler.prefix as PrefixSupplier)(message);
        if (!command) {
            const embed = new MessageEmbed().setColor(3447003).addField(
                '❯ Commands',
                stripIndents`A list of available commands.
						For additional info on a command, type \`${prefix}help <command>\`
					`
            );
            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `❯ ${category.id.replace(/(\b\w)/gi, (lc) =>
                        lc.toUpperCase()
                    )}`,
                    `${category
                        .filter((cmd) => cmd.aliases.length > 0)
                        .map((cmd) => `\`${cmd.aliases[0]}\``)
                        .join(' ')}`
                );
            }

            return message.channel.send(embed);
        }

        const embed = new MessageEmbed()
            .setColor(3447003)
            .setTitle(
                `\`${command.aliases[0]} ${command.description.usage || ''}\``
            )
            .addField('❯ Description', command.description.content || '\u200b');

        if (command.aliases.length > 1)
            embed.addField(
                '❯ Aliases',
                `\`${command.aliases.join('` `')}\``,
                true
            );
        if (command.description.examples?.length)
            embed.addField(
                '❯ Examples',
                `\`${command.aliases[0]} ${command.description.examples.join(
                    `\`\n\`${command.aliases[0]} `
                )}\``,
                true
            );

        return message.channel.send(embed);
    }
}