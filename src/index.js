const { Client, Collection } = require("discord.js");
const { token } = require("../config.json");
const { readdirSync } = require("fs");

const client = new Client({
    intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"]
});

client.commands = new Collection();

const eventFiles = readdirSync(process.cwd() + "/src/events");
const commandFiles = readdirSync(process.cwd() + "/src/commands");

for (const eventFileName of eventFiles) {

    const eventFilePath = process.cwd() + '/src/events/' + eventFileName;
    const eventFile = require(eventFilePath);

    client.on(eventFile.name, eventFile.run.bind(null, client));
}

for (const commandFileName of commandFiles) {

    const commandFilePath = process.cwd() + '/src/commands/' + commandFileName;
    const commandFile = require(commandFilePath);

    client.commands.set(commandFile.info.name, commandFile);
}

client.login(token);