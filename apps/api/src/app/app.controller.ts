import { Controller, Get } from '@nestjs/common';
import { uptime } from 'process';
import * as prettyMilliseconds from 'pretty-ms';
import { hostname } from 'os';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class AppController {
    @Get('/')
    @MessagePattern({ cmd: 'ping' })
    ping() {
        const uptimeMs = uptime() * 1000;

        return {
            name: '🐶 Varrock Stray Dog',
            url: 'https://varrock-stray.dog',
            container: hostname(),
            uptime: prettyMilliseconds(uptimeMs, { verbose: true }),
            uptimeRaw: Math.round(uptimeMs),
            env: process.env.NODE_ENV,
        };
    }
}
