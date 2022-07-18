import {
    ApplicationCommandType,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import { CommandInteraction, PermissionString } from 'discord.js';

import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class TestCommand implements Command {
    public metadata: RESTPostAPIChatInputApplicationCommandsJSONBody = {
        type: ApplicationCommandType.ChatInput,
        name: Lang.getCom('chatCommands.test'),
        description: Lang.getRef('commandDescs.test', Lang.Default),
        dm_permission: true,
        default_member_permissions: undefined,
    };
    public deferType = CommandDeferType.HIDDEN;
    public requireClientPerms: PermissionString[] = [];

    public async execute(intr: CommandInteraction, data: EventData): Promise<void> {
        await InteractionUtils.send(
            intr,
            {
                embeds: [
                    {
                        title: 'Default Questions - Pack 1',
                        description:
                            '`1 (a3dfge)` 🖼️ What is your favorite boss battle in a video game?\n`2 (d3gfes)` What is your favorite video game?\n`3 (d3gfes)` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...\n`4 (dsf23g)` 🖼️ A pellentesque sit amet porttitor eget dolor morbi non. Nisi lacus sed viverra tellus in hac habitasse platea.\n`5 (46dsgw)` ~~Lobortis elementum nibh tellus molestie nunc non blandit massa.~~',
                        footer: {
                            text: 'Page 3 of 5 -- 5/356 Cards Posted',
                        },
                    },
                ],
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                style: 1,
                                customId: `row_0_button_0`,
                                disabled: false,
                                emoji: `⏪`,
                                type: 2,
                            },
                            {
                                style: 1,
                                customId: `row_0_button_1`,
                                disabled: false,
                                emoji: `◀️`,
                                type: 2,
                            },
                            {
                                style: 1,
                                customId: `row_0_button_3`,
                                disabled: false,
                                emoji: `🔄`,
                                type: 2,
                            },
                            {
                                style: 1,
                                customId: `row_0_button_4`,
                                disabled: false,
                                emoji: `▶️`,
                                type: 2,
                            },
                            {
                                style: 1,
                                customId: `row_0_button_5`,
                                disabled: false,
                                emoji: `⏩`,
                                type: 2,
                            },
                        ],
                    },
                    {
                        type: 1,
                        components: [
                            {
                                style: 2,
                                label: `View`,
                                customId: `row_3_button_0`,
                                disabled: false,
                                emoji: `🔍`,
                                type: 2,
                            },
                            {
                                style: 2,
                                label: `Add`,
                                customId: `row_3_button_1`,
                                disabled: false,
                                emoji: `➕`,
                                type: 2,
                            },
                            {
                                style: 2,
                                label: `Move`,
                                customId: `row_3_button_2`,
                                disabled: false,
                                emoji: `↗`,
                                type: 2,
                            },
                            {
                                style: 2,
                                label: `Delete`,
                                customId: `btn:delete_cards`,
                                disabled: false,
                                emoji: `❌`,
                                type: 2,
                            },
                        ],
                    },
                ],
            },
            true
        );
    }
}
