module.exports = (client, message) => {
    const prefix = client.config.prefix;

    if (message.content == "Moin Leude Trymax hier") {
        const obj = message.author;
        obj.guild_id = message.guild.id;
        return client.emit("guildMemberAdd", obj);
    }
    
    if ((message.content.indexOf(prefix) !== 0) || (message.author.bot) || (message.channel.type === 'dm') || (message.channel.type === 'GROUP_DM')) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (!cmd) return;

    cmd.execute(client, message, args);
}