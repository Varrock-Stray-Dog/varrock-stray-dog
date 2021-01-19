import { Args } from '@sapphire/framework';
import { Message } from '@varrock-stray-dog/bot';
import { User } from 'discord.js';

export const canEditPet = async (
    message: Message,
    args: Args
): Promise<{
    user: User;
    isSomeoneElse: boolean;
}> => {
    const user = await args.pick('user').catch(() => message.author);

    if (user?.id !== message?.author?.id) {
        const {
            pets: { moderatorRole },
        } = await message.guild.settings();
        if (!moderatorRole) {
            throw new Error('No pet moderator role');
        }

        const role = message.member.roles.cache.get(moderatorRole);
        if (!role) {
            throw new Error('User cannot edit other user.');
        }
    }

    return {
        user,
        isSomeoneElse: user?.id !== message?.author?.id,
    };
};
