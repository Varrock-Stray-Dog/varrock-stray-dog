import { I18nContext } from '@sapphire/plugin-i18next';

export const fetchLanguage = async (context: I18nContext): Promise<string> => {
    const guild = context.guild;
    if (!guild) {
        return 'en-US';
    }

    const { language } = await guild.settings();
    return language;
};
