import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { APIMessage, MessageTarget, MessageEmbed } from 'discord.js';

export interface LeaderBoardRows {
    userId: string;
    value: string | number;
}

const formatUser = (
    row: LeaderBoardRows,
    indexTop10: number,
    chunkIndex: number
) => {
    let str = `#${indexTop10 * (chunkIndex * 10)}`;

    if (chunkIndex === 0 && indexTop10 === 0) {
        str = `:first_place:`;
    }
    if (chunkIndex === 0 && indexTop10 === 1) {
        str = `:second_place:`;
    }
    if (chunkIndex === 0 && indexTop10 === 2) {
        str = `:third_place:`;
    }

    return `${str} <@${row.userId}> - ${row.value}`;
};

export const createLeaderBoardEmbed = (
    title: string,
    target: MessageTarget,
    rows: LeaderBoardRows[],
    chunkSize: number = 10
): PaginatedMessage => {
    const chunked = rows.chunk(chunkSize);
    const handler = new PaginatedMessage();

    for (let i = 0; i < chunked.length; i++) {
        const chunk = chunked[i];

        handler.addPage(
            new APIMessage(target, {
                embed: new MessageEmbed()
                    .setTitle(title)
                    .addField(
                        i === 0
                            ? `Top ${chunkSize} players:`
                            : `Top players ${i * chunkSize + 1} - ${
                                  i * chunkSize + chunkSize
                              }`,
                        chunk
                            .map((p, index) => `${formatUser(p, index, i)}`)
                            .join('\n')
                    )
                    .setFooter(`Page ${i + 1}/${chunked.length}`),
            })
        );
    }

    if (chunked.length === 1) {
        handler.setActions([
            {
                id: '⏹️',
                run: async ({ response, collector }) => {
                    await response.reactions.removeAll();
                    collector.stop();
                },
            },
        ]);
    }

    return handler;
};
