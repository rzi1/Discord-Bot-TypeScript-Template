import { ButtonInteraction, Message, MessageEmbed } from 'discord.js';

import { EventData } from '../models/internal-models.js';
import { InteractionUtils } from '../utils/interaction-utils.js';
import { ButtonDeferType } from './button.js';
import { Button } from './index.js';

export class DeleteBtn implements Button {
    public ids = ['btn:delete_cards'];
    public deferType = ButtonDeferType.NONE;
    public requireGuild = true;
    public requireEmbedAuthorTag = false;
    public async execute(intr: ButtonInteraction, msg: Message, data: EventData): Promise<void> {
        console.log('hello');
        await InteractionUtils.send(
            intr,
            {
                embeds: [
                    new MessageEmbed({
                        description: "Choose which cards you'd like to delete",
                    }),
                ],
                components: [
                    {
                        type: 'ACTION_ROW',
                        components: [
                            {
                                type: 'SELECT_MENU',
                                customId: 'sm:delete_cards',
                                minValues: 1,
                                maxValues: 5,
                                options: [
                                    {
                                        label: 'sASF54',
                                        description:
                                            'What is your favorite boss battle in a video game?',
                                        value: 'sASF54',
                                    },
                                    {
                                        label: 'nSPE-x',
                                        description:
                                            "What's the most interesting documentary you've ever watched?",
                                        value: 'nSPE-x',
                                    },
                                    {
                                        label: 'mzOUzx',
                                        description:
                                            'How do you feel about putting pineapple on pizza?',
                                        value: 'mzOUzx',
                                    },
                                    {
                                        label: 'sdsdf32',
                                        description:
                                            'What food have you never eaten but would really like to try?',
                                        value: 'sdsdf32',
                                    },
                                    {
                                        label: 'TtbvdD',
                                        description:
                                            'If someone came up to you and said "Hey, do that thing you do!", what thing would pop into your...',
                                        value: 'TtbvdD',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            true
        );
        return;
    }
}
