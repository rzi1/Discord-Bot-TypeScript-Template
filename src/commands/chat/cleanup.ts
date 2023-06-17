import { ChatInputCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { Language } from '../../models/enum-helpers/index.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { Command, CommandDeferType } from '../index.js';
import { InteractionUtils } from '../../utils/index.js';

export class CleanupCommand implements Command {
    public names = [Lang.getRef('chatCommands.cleanup', Language.Default)];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, data: EventData): Promise<void> {
        console.log(intr);
        let args = {
            filter: intr.options.getString(Lang.getRef('arguments.filter', Language.Default)),
            interval: intr.options.getInteger(Lang.getRef('arguments.interval', Language.Default)),
        };
        let replySent = false;
        const filter = args.filter;
        const interval = args.interval * 1000;
        while (true) {
            if (!replySent) {
                await InteractionUtils.send(
                    intr,
                    Lang.getEmbed('displayEmbeds.cleanup', data.lang, {
                        FILTER: filter,
                        INTERVAL: (interval / 1000).toString(),
                    })
                );
                replySent = true;
            }
            intr.channel.messages.fetch({ limit: 100 }).then(messages => {
                messages.forEach(message => {
                    if (
                        message.content.includes(filter) &&
                        !(message.author.id === intr.client.user.id)
                    ) {
                        console.log(`Deleting message containing text ${filter} now`);
                        message.delete();
                    }
                });
            });

            console.log(`Waiting ${interval / 1000} seconds for filter ${filter}`);
            await Sleep(interval);
        }
    }
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
