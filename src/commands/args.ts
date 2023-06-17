import { APIApplicationCommandBasicOption, ApplicationCommandOptionType } from 'discord.js';

import { HelpOption, InfoOption } from '../enums/index.js';
import { Language } from '../models/enum-helpers/index.js';
import { Lang } from '../services/index.js';

export class Args {
    public static readonly HELP_OPTION: APIApplicationCommandBasicOption = {
        name: Lang.getRef('arguments.option', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('arguments.option'),
        description: Lang.getRef('argDescs.helpOption', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('argDescs.helpOption'),
        type: ApplicationCommandOptionType.String,
        choices: [
            {
                name: Lang.getRef('helpOptionDescs.contactSupport', Language.Default),
                name_localizations: Lang.getRefLocalizationMap('helpOptionDescs.contactSupport'),
                value: HelpOption.CONTACT_SUPPORT,
            },
            {
                name: Lang.getRef('helpOptionDescs.commands', Language.Default),
                name_localizations: Lang.getRefLocalizationMap('helpOptionDescs.commands'),
                value: HelpOption.COMMANDS,
            },
        ],
    };
    public static readonly FILTER_OPTION: APIApplicationCommandBasicOption = {
        name: Lang.getRef('arguments.filter', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('arguments.filter'),
        description: Lang.getRef('argDescs.filterOption', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('argDescs.filterOption'),
        type: ApplicationCommandOptionType.String,
    };
    public static readonly INTERVAL_OPTION: APIApplicationCommandBasicOption = {
        name: Lang.getRef('arguments.interval', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('arguments.interval'),
        description: Lang.getRef('argDescs.intervalOption', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('argDescs.intervalOption'),
        type: ApplicationCommandOptionType.Integer,
    };
    public static readonly INFO_OPTION: APIApplicationCommandBasicOption = {
        name: Lang.getRef('arguments.option', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('arguments.option'),
        description: Lang.getRef('argDescs.helpOption', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('argDescs.helpOption'),
        type: ApplicationCommandOptionType.String,
        choices: [
            {
                name: Lang.getRef('infoOptions.about', Language.Default),
                name_localizations: Lang.getRefLocalizationMap('infoOptions.about'),
                value: InfoOption.ABOUT,
            },
            {
                name: Lang.getRef('infoOptions.translate', Language.Default),
                name_localizations: Lang.getRefLocalizationMap('infoOptions.translate'),
                value: InfoOption.TRANSLATE,
            },
            {
                name: Lang.getRef('infoOptions.dev', Language.Default),
                name_localizations: Lang.getRefLocalizationMap('infoOptions.dev'),
                value: InfoOption.DEV,
            },
        ],
    };
}
