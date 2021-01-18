/* eslint-disable valid-jsdoc */
import { StrayDogClient } from '../client';
import { Events } from '@sapphire/framework';
import { isThenable, regExpEsc } from '@sapphire/utilities';

/**
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */
export function clientErrorWrapper(
    client: StrayDogClient,
    promise: Promise<unknown>
) {
    if (isThenable(promise)) {
        promise.catch((error) => client.emit(Events.Error, error));
    }
}

/**
 * @copyright 2019-2020 Soumil07
 * @license GNU Affero General Public License v3.0
 */
const TOKENS = [
    process.cwd(),
    process.cwd().replace(/\\/g, '\\\\'),
    process.env.BOT_TOKEN,
];
const sensitiveTokens = new RegExp(TOKENS.map(regExpEsc).join('|'), 'gi');
export const clean = (text: string) =>
    text.replace(sensitiveTokens, '「ｒｅｄａｃｔｅｄ」');
