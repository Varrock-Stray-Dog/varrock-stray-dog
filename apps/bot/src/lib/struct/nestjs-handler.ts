import Redis from 'ioredis';
import { v4 as uuid } from 'uuid';

export interface NestjsPayload {
    id: string;
    pattern: string;
    data: any;
}

export class NestjsHandler {
    private _config;
    private _timeout = 5000;

    constructor(config: any) {
        this._config = config;
    }

    send(pattern: any, data = null): any {
        const payload = this._createPayload({ cmd: pattern }, data);
        return this._request(payload);
    }

    private _createPayload(pattern, data): NestjsPayload {
        return {
            id: uuid(),
            pattern: JSON.stringify(pattern),
            data: data,
        };
    }

    private async _request(payload: NestjsPayload) {
        let isFinished = false;
        const promise = new Promise((resolve, reject) => {
            const sub = new Redis(this._config);
            const pub = new Redis(this._config);

            const { id, pattern } = payload;

            const replyChannel = `${pattern}.reply`;
            sub.subscribe(replyChannel, (err) => {
                if (err) {
                    return reject(err);
                }

                pub.publish(pattern, JSON.stringify(payload));
                pub.disconnect();

                setTimeout(() => {
                    if (!isFinished) {
                        sub.disconnect();
                        return reject('Timeout');
                    }
                }, this._timeout);
            });

            const responses = [];
            sub.on('message', (channel, payload) => {
                if (channel !== replyChannel) {
                    return;
                }

                payload = JSON.parse(payload);
                if (payload.id === id) {
                    responses.push(payload.response);
                }

                if (payload.isDisposed) {
                    sub.disconnect();
                    isFinished = true;
                    return resolve(
                        responses.length < 2 ? responses[0] : responses
                    );
                }
            });
        });

        return promise;
    }
}
