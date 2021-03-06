import { Attachment, Message, MessageCollector, RichEmbed } from 'discord.js';
import * as moment from 'moment-timezone';
import * as path from 'path';
import { CharacterSearchBuilder } from '../utilities/character';
import { WeaponSearchBuilder } from '../utilities/weapon';

// Command Group Name
const group = path.parse(__filename).name;

const prefix = process.env.PREFIX ?? '!!';

// ---- rotation ----

const DAYOFWEEK: { [key: string]: number } = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  星期日: 0,
  星期一: 1,
  星期二: 2,
  星期三: 3,
  星期四: 4,
  星期五: 5,
  星期六: 6
};

const rotation = {
  name: 'rotation',
  group,
  // should not force args
  args: false,
  usage: '<Day of week>',
  aliases: ['r'],
  description: '查詢素材關',
  execute(message: Message, args: Array<string>) {
    const attachments = [
      './assets/charts/all.png',
      './assets/charts/light.png',
      './assets/charts/fire.png',
      './assets/charts/water.png',
      './assets/charts/wind.png',
      './assets/charts/thunder.png',
      './assets/charts/dark.png'
    ];
    // moment.tz.setDefault('GMT');
    // const monentW = String(
    //   moment()
    //     .add(4, 'h')
    //     .format('ddd')
    // ).toLowerCase();
    // let dayOfWeek = DAYOFWEEK[monentW];
    // if (Array.isArray(args) && args.length > 0) {
    //   // replace chinese mutation
    //   let arg = String(args[0]).toLowerCase();
    //   arg = arg
    //     .replace('周末', '星期六')
    //     .replace('禮拜', '星期')
    //     .replace('拜', '星期')
    //     .replace('週', '星期');
    //   dayOfWeek = DAYOFWEEK[arg] ?? dayOfWeek;
    // }
    // const attachment = new Attachment(attachments[dayOfWeek] ?? attachments[DAYOFWEEK[monentW]], 'all.png');
    const attachment = new Attachment(attachments[0]);

    return message.channel.send('', attachment);
  }
};

// ---- tls ----

const tls = {
  name: 'translation',
  group,
  aliases: ['tl'],
  description: '中文翻譯連結',
  async execute(message: Message) {
    const tlCharDoc =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vS5OvhecdUnTXEeO2fpdERfiZh3PzadSoGcpQ1IEhAPCSfcv2iLk7p0V7MFiZ7AZNnPVRSzUsRI5Wye/pubhtml#';

    const tlWeaponDoc = 'https://bbs.nga.cn/read.php?tid=19615906&rand=876';
    const msg = (await message.channel.send(
      new RichEmbed()
        .setTitle('角色中文翻譯')
        .setColor(10181046) // purple
        .setURL(tlCharDoc)
    )) as Message;

    return msg.channel.send(
      new RichEmbed()
        .setTitle('武器中文翻譯')
        .setColor(3447003) // blue
        .setURL(tlWeaponDoc)
    );
  }
};

const character = {
  name: 'character',
  group,
  args: true,
  usage: '[-attribute/a <屬性>] [-ability/abi <能力>] <名稱>',
  aliases: ['c'],
  description: `查詢角色資訊\n**e.g.**\n${prefix}c <名稱>\n${prefix}c -a <屬性> -abi <能力>`,
  async execute(message: Message, args: Array<string>) {
    const result = await new CharacterSearchBuilder(message, args).search();
    await result.similar().send();
  }
};

// ---- weapon ----
const weapon = {
  name: 'weapon',
  group,
  args: true,
  usage: '<武器名稱>',
  aliases: ['w'],
  description: '查詢武器資訊',
  async execute(message: Message, args: Array<string>) {
    const result = await new WeaponSearchBuilder(message, args).search();
    await result.similar().send();
  }
};

export default [rotation, tls, character, weapon];
