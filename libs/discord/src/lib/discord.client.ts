import {
    Injectable,
    Logger,
    Optional,
    Inject,
    OnApplicationShutdown,
} from '@nestjs/common';
import {
    AkairoClient,
    CommandHandler,
    Command,
    InhibitorHandler,
    ListenerHandler,
    Inhibitor,
    Listener,
} from 'discord-akairo';
import {
    DISCORD_CLIENT_CONFIG_TOKEN,
    DISCORD_CLIENT_COMMANDS_TOKEN,
} from './discord.constants';
import { DiscordConfig } from './discord.interfaces';

// extends AkairoClient
@Injectable()
export class DiscordClient extends AkairoClient
    implements OnApplicationShutdown {
    private _logger = new Logger('Discord Client');

    public inhibitorHandler: InhibitorHandler;
    public listenerHandler: ListenerHandler;
    public commandHandler: CommandHandler;

    constructor(
        @Optional()
        @Inject(DISCORD_CLIENT_CONFIG_TOKEN)
        public readonly config: DiscordConfig
    ) {
        super(
            {
                ownerID: config.ownerID ?? '',
            },
            {
                // Options for discord.js goes here.
            }
        );

        this.inhibitorHandler = new InhibitorHandler(this, {});
        this.listenerHandler = new ListenerHandler(this, {});
        this.commandHandler = new CommandHandler(this, {
            prefix: config.defaultPrefix,
        });

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler,
        });

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);
    }

    public registerCommands(commands: Command[]) {
        commands.map((command) => this.commandHandler.register(command));
    }

    public registerInhibitors(inhibitors: Inhibitor[]) {
        inhibitors.map((inhibitor) =>
            this.inhibitorHandler.register(inhibitor)
        );
    }

    public registerListeners(listeners: Listener[]) {
        listeners.map((listener) => this.listenerHandler.register(listener));
    }

    public async init() {
        await this.login(this.config.token);
        this._logger.log(`Discord connected as ${this.user.username}`);
    }

    onApplicationShutdown() {
        this._logger.log('Discord disconnecting');
        this.destroy();
    }
}
