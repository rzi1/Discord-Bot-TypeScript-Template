import { Message, MessageEmbed, SelectMenuInteraction } from 'discord.js';

import { EventData } from '../models/internal-models.js';
import { InteractionUtils } from '../utils/interaction-utils.js';
import { SelectMenu } from './index.js';
import { SelectMenuDeferType } from './select-menu.js';

export class DeleteSelectMenu implements SelectMenu {
    public ids = ['sm:delete_cards'];
    public deferType = SelectMenuDeferType.NONE;
    public requireGuild = true;
    public requireEmbedAuthorTag = false;
    public async execute(
        intr: SelectMenuInteraction,
        msg: Message,
        data: EventData
    ): Promise<void> {
        console.log('hello');
        await InteractionUtils.update(intr, {
            embeds: [
                new MessageEmbed({
                    description: 'Cards deleted.',
                }),
            ],
            components: [],
        });
        return;
    }
}
