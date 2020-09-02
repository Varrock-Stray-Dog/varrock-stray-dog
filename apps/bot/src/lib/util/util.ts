/* eslint-disable valid-jsdoc */
import { StrayDogClient } from '../client';
import { Events } from '@sapphire/framework';
import { isThenable } from '@sapphire/utilities';

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
