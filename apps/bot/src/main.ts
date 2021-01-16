import 'reflect-metadata';

import { environment } from './environments/environment.prod';
import { StrayDogClient, clientErrorWrapper } from '.';

import { inspect } from 'util';
inspect.defaultOptions.depth = 1;

// eslint-disable-next-line @typescript-eslint/naming-convention
// const __rootdir = __dirname || process.cwd();

// if (TOKENS.SENTRY_DNS) {
//     Sentry.init({
//         dsn: TOKENS.SENTRY_DNS,
//         integrations: [
//             new Sentry.Integrations.Modules(),
//             new Sentry.Integrations.FunctionToString(),
//             new Sentry.Integrations.LinkedErrors(),
//             new Sentry.Integrations.Console(),
//             new Sentry.Integrations.Http({ breadcrumbs: true, tracing: true }),
//             new Dedupe(),
//             new ExtraErrorData({ depth: 2 }),
//             new RewriteFrames({ root: __rootdir })
//         ]
//     });
// }
const client = new StrayDogClient(environment);

const main = async () => {
    await client.checkApi();
    await client.login(environment.token);
};

clientErrorWrapper(client, main());
