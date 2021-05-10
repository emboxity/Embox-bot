const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const util = require('util');
const prefix = '+';

module.exports = {
    name: 'eval',
    aliases: [],
    description: 'Evaluates code',
    cooldown: 0.01,
    run: async(client, message, args) => {
        let code = args.join(' ');
        const embed = new Discord.MessageEmbed();
        if (message.author.id !== '564135243225759752')
            return message.channel.send('no');

        if (!code) {

                const evalerror = new Discord.MessageEmbed()
                .setDescription(":no_entry_sign: Incorrect usage! +eval [code]")
                .setColor("#ff0808")
                .setFooter('Embox Bot * made by shiba#2254',client.user.displayAvatarURL())

                return message.reply(evalerror);
            ;
        }

        try {
            let evaled = await eval(code),
                output;
            if (evaled.constructor.name === `Promise`) {
                output = `📤 Output (Promise)`;
            } else {
                output = `📤 Output`;
            }
            if (evaled.length > 800) {
                evaled = evaled.substring(0, 800) + `...`;
            }
            embed
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(output, `\`\`\`js\n${evaled}\n\`\`\``)
                .setColor(client.color)
                .addField(`Status`, `Success`);
            return message.channel.send(embed);
        } catch (e) {
            console.log(e.stack);
            embed
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(`📤 Output`, `\`\`\`js\n${e}\n\`\`\``)
                .addField(`Status`, `Failed`)
                .setColor(client.color);
            return message.channel.send(embed);
        }
    }
};