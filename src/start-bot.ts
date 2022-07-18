import { REST } from '@discordjs/rest';
import parser from 'cron-parser';
import { Options } from 'discord.js';
import { createRequire } from 'node:module';

import { Button, DeleteBtn } from './buttons/index.js';
import { HelpCommand, InfoCommand, TestCommand } from './commands/chat/index.js';
import { Command } from './commands/command.js';
import { ViewDateSent } from './commands/message/index.js';
import { ViewDateJoined } from './commands/user/index.js';
import {
    ButtonHandler,
    CommandHandler,
    GuildJoinHandler,
    GuildLeaveHandler,
    MessageHandler,
    ReactionHandler,
    TriggerHandler,
} from './events/index.js';
import { SelectMenuHandler } from './events/select-menu-handler.js';
import { CustomClient } from './extensions/index.js';
import { Job } from './jobs/index.js';
import { Bot } from './models/bot.js';
import { Reaction } from './reactions/index.js';
import { DeleteSelectMenu, SelectMenu } from './select-menus/index.js';
import { CommandRegistrationService, JobService, Logger } from './services/index.js';
import { Trigger } from './triggers/index.js';

const require = createRequire(import.meta.url);

let Config = require('../config/config.json');
let Logs = require('../lang/logs.json');

async function start(): Promise<void> {
    let interval = parser.parseExpression('0 * * * *', {
        currentDate: new Date(),
        tz: 'America/New_York',
    });

    console.log('Date: ', interval.next().toISOString());
    console.log('Date: ', interval.next().toISOString());
    console.log('Date: ', interval.next().toISOString());

    // Client
    let client = new CustomClient({
        intents: Config.client.intents,
        partials: Config.client.partials,
        makeCache: Options.cacheWithLimits({
            // Keep default caching behavior
            ...Options.defaultMakeCacheSettings,
            // Override specific options from config
            ...Config.client.caches,
        }),
    });

    // Commands
    let commands: Command[] = [
        // Chat Commands
        new HelpCommand(),
        new InfoCommand(),
        new TestCommand(),
        // User Context Commands
        new ViewDateJoined(),
        // Message Context Commands
        new ViewDateSent(),
        // TODO: Add new commands here
    ].sort((a, b) => (a.metadata.name > b.metadata.name ? 1 : -1));

    // Buttons
    let buttons: Button[] = [
        new DeleteBtn(),
        // TODO: Add new buttons here
    ];

    // Select Menus
    let selectMenus: SelectMenu[] = [new DeleteSelectMenu()];

    // Reactions
    let reactions: Reaction[] = [
        // TODO: Add new reactions here
    ];

    // Triggers
    let triggers: Trigger[] = [
        // TODO: Add new triggers here
    ];

    // Event handlers
    let guildJoinHandler = new GuildJoinHandler();
    let guildLeaveHandler = new GuildLeaveHandler();
    let commandHandler = new CommandHandler(commands);
    let buttonHandler = new ButtonHandler(buttons);
    let selectMenuHandler = new SelectMenuHandler(selectMenus);
    let triggerHandler = new TriggerHandler(triggers);
    let messageHandler = new MessageHandler(triggerHandler);
    let reactionHandler = new ReactionHandler(reactions);

    // Jobs
    let jobs: Job[] = [
        // TODO: Add new jobs here
    ];

    // Bot
    let bot = new Bot(
        Config.client.token,
        client,
        guildJoinHandler,
        guildLeaveHandler,
        messageHandler,
        commandHandler,
        buttonHandler,
        selectMenuHandler,
        reactionHandler,
        new JobService(jobs)
    );

    // Register
    if (process.argv[2] == 'commands') {
        try {
            let rest = new REST({ version: '10' }).setToken(Config.client.token);
            let commandRegistrationService = new CommandRegistrationService(rest);
            let localCmds = commands.map(cmd => cmd.metadata);
            await commandRegistrationService.process(localCmds, process.argv);
        } catch (error) {
            Logger.error(Logs.error.commandAction, error);
        }
        process.exit();
    }

    await bot.start();
}

process.on('unhandledRejection', (reason, _promise) => {
    Logger.error(Logs.error.unhandledRejection, reason);
});

start().catch(error => {
    Logger.error(Logs.error.unspecified, error);
});
