const { Client } = require("discord.js");
const client = new Client({ ignoreDirect: true, ignoreRoles: true, ignoreEveryone: true });

client.token = "ODA5NDA0MjMwMjI5Mjk1MTU1.YCUmbg.jbOIJgsCP2UNcpjc9gY6Y7fRpSk";

const nickchange = new Set();

let ban = [""];
let kick = [""];
let webhook = [""];
let kanal = [""];
let rol = [""];
let ekle = [""];
let isim = [""];
let botroles = [""];
let ytrole = [""];

let arr = [
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_NICKNAMES"
];

client.on("ready", async () => {
  ban.push(client.user.id);
  kick.push(client.user.id);
  webhook.push(client.user.id);
  kanal.push(client.user.id);
  rol.push(client.user.id);
  ekle.push(client.user.id);
  isim.push(client.user.id);
  ytrole.push(client.user.id);
  client.user.setPresence({ activity: { name: "well" }, status: "dnd" });
  console.log(client.user.tag + " olarak giriş yaptım.");
});

client.on("guildMemberUpdate", async (oldUser, newUser) => {
    if (oldUser.nickname != newUser.nickname) {
        let guild = newUser.guild;
        let logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_UPDATE" });
        let id = logs.entries.first().executor.id;
        if (!isim.includes(id)) {
            let uye = guild.members.cache.get(id);
            let clt = guild.members.cache.get(client.user.id);
            if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
            if (!nickchange[uye.id]) 
            nickchange[uye.id] = {
                sayi: 0
            };
            nickchange[uye.id].sayi++;
            if (nickchange[uye.id].sayi >= 5) {
                uye.ban({ reason: "well", days: 7 });
            }
            setTimeout(() => {
                if (nickchange[uye.id].sayi >= 1) {
                    nickchange[uye.id].sayi = 0;
                }
            }, 3600000);
        } else { };
    } else { };
});

client.on("guildMemberUpdate", async (oldUser, newUser) => {
  if (newUser.roles.cache.size > oldUser.roles.cache.size) {
    let guild = newUser.guild;
    let logs = await guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" });
    let id = logs.entries.first().executor.id;
    if (!ytrole.includes(id)) {
      let uye = guild.members.cache.get(id);
      let clt = guild.members.cache.get(client.user.id);
      if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
      if (arr.some(a => !oldUser.permissions.has(a) && newUser.permissions.has(a))) {
        newUser.roles.set(oldUser.roles.cache.map(role => role.id));
        uye.ban({ reason: "well", days: 7 });
      }
    }
  };
});

client.on("guildBanAdd", async (guild, user) => {
  const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
  const id = logs.entries.first().executor.id;
  if (!ban.includes(id)) {
    let uye = guild.members.cache.get(id);
    let clt = guild.members.cache.get(client.user.id);
    if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
    uye.ban({ reason: "well", days: 7 });
  } else { };
});

client.on("guildMemberRemove", async (user) => {
  const logs = await user.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
  const id = logs.entries.first().executor.id;
  if (!kick.includes(id)) {
    let uye = user.guild.members.cache.get(id);
    let clt = user.guild.members.cache.get(client.user.id);
    if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
    uye.ban({ reason: "well", days: 7 });
  } else { };
});

client.on("webhookUpdate", async (hook) => {
  hook.guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === "WEBHOOK_CREATE") {
      const id = logs.entries.first().executor.id;
      if (!webhook.includes(id)) {
        let uye = hook.guild.members.cache.get(id);
        let clt = hook.guild.members.cache.get(client.user.id);
        if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
        uye.ban({ reason: "well", days: 7 });
      } else { };
    } else { };
  });
});

client.on("webhookUpdate", async (hook) => {
  hook.guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === "WEBHOOK_DELETE") {
      const id = logs.entries.first().executor.id;
      if (!webhook.includes(id)) {
        let uye = hook.guild.members.cache.get(id);
        let clt = hook.guild.members.cache.get(client.user.id);
        if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
        uye.ban({ reason: "well", days: 7 });
      } else { };
    } else { };
  });
});

client.on("channelDelete", async (channel) => {
  channel.guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === "CHANNEL_DELETE") {
      const id = logs.entries.first().executor.id;
      if (!kanal.includes(id)) {
        let uye = channel.guild.members.cache.get(id);
        let clt = channel.guild.members.cache.get(client.user.id);
        if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
        uye.ban({ reason: "well", days: 7 });
      } else { };
    } else { };
  });
});

client.on("channelCreate", async (channel) => {
  channel.guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === "CHANNEL_CREATE") {
      const id = logs.entries.first().executor.id;
      if (!kanal.includes(id)) {
        let uye = channel.guild.members.cache.get(id);
        let clt = channel.guild.members.cache.get(client.user.id);
        if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
        uye.ban({ reason: "well", days: 7 });
      } else { };
    } else { };
  });
});

client.on("channelUpdate", async (channel) => {
  channel.guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === "CHANNEL_UPDATE") {
      const id = logs.entries.first().executor.id;
      if (!kanal.includes(id)) {
        let uye = channel.guild.members.cache.get(id);
        let clt = channel.guild.members.cache.get(client.user.id);
        if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
        uye.ban({ reason: "well", days: 7 });
      } else { };
    } else { };
  });
});

client.on("roleDelete", async (role) => {
  const guild = role.guild;
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === "ROLE_DELETE") {
      const id = logs.entries.first().executor.id;
      if (!rol.includes(id)) {
        let uye = guild.members.cache.get(id);
        let clt = guild.members.cache.get(client.user.id);
        if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
        uye.ban({ reason: "well", days: 7 });
      } else { };
    } else { };
  });
});

client.on("roleCreate", async (role) => {
  const guild = role.guild;
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === "ROLE_CREATE") {
      const id = logs.entries.first().executor.id;
      if (!rol.includes(id)) {
        let uye = guild.members.cache.get(id);
        let clt = guild.members.cache.get(client.user.id);
        if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
        uye.ban({ reason: "well", days: 7 });
      } else { };
    } else { };
  });
});

client.on("roleUpdate", async (oldRole, newRole) => {
  const guild = newRole.guild;
  guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === "ROLE_UPDATE") {
      const id = logs.entries.first().executor.id;
      if (!rol.includes(id)) {
        let uye = guild.members.cache.get(id);
        let clt = guild.members.cache.get(client.user.id);
        if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
        uye.ban({ reason: "well", days: 7 });
      } else { };
    } else { };
  });
});

client.on("guildBanAdd", async (guild, user) => {
  const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
  const id = logs.entries.first().executor.id;
  if (!ban.includes(id)) {
    let uye = guild.members.cache.get(id);
    let clt = guild.members.cache.get(client.user.id);
    if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
    guild.roles.cache.filter(r => {
      return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < clt.roles.highest.rawPosition)
    }).map(x => {
      x.edit({ permissions: x.permissions.remove(arr) });
    });
  } else { };
});

client.on("guildMemberRemove", async (user) => {
  const logs = await user.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
  const id = logs.entries.first().executor.id;
  if (!kick.includes(id)) {
    let uye = user.guild.members.cache.get(id);
    let clt = user.guild.members.cache.get(client.user.id);
    if (clt.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
    user.guild.roles.cache.filter(r => {
      return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < clt.roles.highest.rawPosition)
    }).map(x => {
      x.edit({ permissions: x.permissions.remove(arr) });
    });
  } else { };
});

process.on("uncaughtExpection", function (err) {
  if (err) console.log(err);
});

client.login(client.token).catch(err => console.error(err));
