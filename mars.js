const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://alambot-js.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const mars = new Discord.Client();
const prefix = "n!";
mars.on("ready", async () => {
  console.log(`${mars.user.tag}!`);
  console.log(`Hay ${mars.users.silze} usuarios.`);
  mars.user.setGame(``);
});
/////////////بە ئیمبید نامەی بۆ دەچێت لەکاتی چۆینی سێرڤەر

mars.on("guildMemberAdd", member => {
  let memberavatar = member.user.avatarURL;
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField(":bust_in_silhouette: | name : ", `${member}`)
    .addField(":microphone2: | Welcome!", `بەخیربی بۆ سیرڤەرکەمان, ${member}`)
    .addField(":id: | User :", "**[" + `${member.id}` + "]**")
    .addField(
      ":family_mwgb: | ژمارەی میمبەری سیرڤەر",
      `${member.guild.memberCount}`
    )
    .addField("Name", `<@` + `${member.id}` + `>`, true)
    .addField("Server", `${member.guild.name}`, true)
    .setFooter(`${member.guild.name}`)
    .setTimestamp()
    .setImage(
      "https://cdn.discordapp.com/attachments/728333268918861845/732901673550479410/image0-5.gif"
    );
  member.send(embed);
});
///////////////لە وێلکۆم بەخێرهاتن دەکاتن

mars.on("guildMemberAdd", member => {
  let channel = member.guild.channels.find("name", "┃welcome");
  let memberavatar = member.user.avatarURL;
  if (!channel) return;
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField(" > :bust_in_silhouette: | ناوی مێمبەر : ", `${member}`)
    .addField(" > :hibiscus:| بەخێربێیت 😍", `, `)
    .addField(" > :id:| ئایدی میمبەر :", "**[" + `${member.id}` + "]**")
    .addField(" > :family_mwgb:⎮ تۆ کەسی ژمارە", `${member.guild.memberCount}`)
    .addField(" > ⎮ناوی سێرڤەر", `${member.guild.name}`, true)
    .setFooter(`${member.guild.name}`)
    .setImage(
      "https://cdn.discordapp.com/attachments/728333268918861845/732901673550479410/image0-5.gif"
    )
    .setTimestamp();

  channel.sendEmbed(embed);
});
//////////// ئەوەش بۆ لێفت کردنە
mars.on("guildMemberRemove", member => {
  let channel = member.guild.channels.find("name", "┃left");
  let memberavatar = member.user.avatarURL;
  if (!channel) return;
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField("ناوی مێمبەر:", `${member}`)
    .addField("لێفتی کرد لە سێرڤەر")
    .addField("درەنـگ لـێفـتـی ڪــرد 😒😂")
    .addField("ژمارەی مێمبەری سێرڤەر", `${member.guild.memberCount}` + " کەس")
    .setFooter(`${member.guild.name}`)
    .setImage(
      "https://cdn.discordapp.com/attachments/726345323211128863/727873771817402398/giphy.gif"
    )
    .setTimestamp();

  channel.sendEmbed(embed);

  ////////////////////////////////////////////
  ////////////////////////////////////////////
});

mars.on("message", message => {
  //mars
  if (message.content.includes("discord.gg")) {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
      message.delete();
      message.reply("__**ڕیـڪلام مـەڪـە هـەنـاسـە عـەیـبـە 😂❤**__");
      message.react("🚫");
    }
  }
});

mars.on("message", message => {
  if (message.content.startsWith("new")) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.guild.roles.exists(gg => gg.name === "Support Team"))
      return message.channel.send(
        `تکایە ڕۆڵێک بەو ناوە دروست بکە \`Support Team\`.`
      );
    if (
      message.guild.channels.filter(
        Channel =>
          Channel.name == `ticket-${message.author.id}` &&
          Channel.type == "text"
      ).size > 0
    )
      return message.channel.send(`You already have a ticket open.`);
    message.guild
      .createChannel(`ticket-${message.author.id}`, "text")
      .then(c => {
        let role = message.guild.roles.find(gg => gg.name === "Support Team");
        let role2 = message.guild.roles.find(gg => gg.name === "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.guild.id, {
          READ_MESSAGES: false
        });
        message.channel.send(
          `:white_check_mark: Your ticket has been created, ${c}.`
        );
        const embed = new Discord.RichEmbed()
          .setColor(0xcf40fa)
          .addField(
            `Hey ${message.author.username}!`,
            `بەخێربێیت لێرەدا ئەتوانی ڕەخنەکانت پێشنیار بکەیت بەزووترین کات وەڵامت ئەدرێتەوە لەلایەن**Support Staff**.`
          )
          .setTimestamp();
        c.send({
          embed: embed
        });
      })
      .catch(console.error);
  } else if (message.content.startsWith("closet")) {
    if (!message.guild.roles.exists(gg => gg.name === "Support Team"))
      return message.channel.send(` لازم تسوي رتبة اسمها \`Support Team\`.`);
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send("This isn't a ticket channel!");
    if (
      !message.member.roles.has(
        message.guild.roles.filter(r => r.name === "Support Team").first().id
      )
    )
      return message.channel.send("You don't have the `Support Team` role!");
    message.channel
      .delete()
      .catch(e => message.channel.send("Check my permissions!"));
  }
});

///////// CODEKE SADA BO OFLLINE BUNE MMEMBAR ///////////

mars.on("typingStart", (ch, user) => {
  if (user.presence.status === "offline") {
    ch.send(
      `${user}(: :blush: دەستەکەو کەشف بوو ئەوە خۆت ئۆفلاین ئەکەی خێرا خۆت ئۆنلاین کە`
    ) //lera chiw pe xosha bele
      .then(msg => {
        msg.delete(10000);
      });
  }
});

/////////// code invite ////////////

const invites = {};
const wait = require("util").promisify(setTimeout);
mars.on("ready", () => {
  wait(1000);
  mars.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  }); ///ByMARS
});

////// code invite ///////
mars.on("guildMemberAdd", member => {
  member.guild.fetchInvites().then(guildInvites => {
    const gamer = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => gamer.get(i.code).uses < i.uses);
    const inviter = mars.users.get(invite.inviter.id);
    const channel = member.guild.channels.find("name", "┃invite");
    channel.send(
      `__**[<@${member.id}>] **|invite kra la layan** | [<@${inviter.id}>] | **Zhmaray henan** |${invite.uses}**__`
    );
  });
});

///////// code krdnawa daxstne zhur /////////

mars.on("message", message => {
  if (!message.guild) return;
  if (message.content === "n!waravc") {
    if (message.member.voiceChannel) {
      message.member.voiceChannel
        .join()
        .then(connection => {
          message.reply("__ئـەوە هـاتـم__");
        })
        .catch(console.log);
    } else {
      message.reply("__بـڕۆ ڤـۆیـسـێـك ئـیـنـجـا دوبـارەی ڪـەرەوە__");
    }
  }
});

//////////// BORAGRTNI REKLAM SERVAR /////////////

mars.on("message", async Epic => {
  if (Epic.content.startsWith("voice")) {
    if (!Epic.guild.member(Epic.author).hasPermission("MANAGE_CHANNELS"))
      return Epic.reply(":x: **I Dont Have Permissions**");
    if (
      !Epic.guild
        .member(mars.user)
        .hasPermission(["MANAGE_CHANNELS", "MANAGE_ROLES_OR_PERMISSIONS"])
    )
      return Epic.reply(":x: **You Dont Have Permissions**");
    Epic.guild
      .createChannel(
        `voice online : [ ${
          Epic.guild.members.filter(m => m.voiceChannel).size
        } ]`,
        "voice"
      )
      .then(c => {
        console.log(`Voice Online Is Activation In ${Epic.guild.name}`);
        c.overwritePermissions(Epic.guild.id, {
          CONNECT: false,
          SPEAK: false
        });
        setInterval(() => {
          c.setName(
            `Voice Online : ${
              Epic.guild.members.filter(m => m.voiceChannel).size
            } .`
          );
        }, 1000);
      });
  }
});
/// ============ (antibots)===========

var Enmap = require("enmap");
mars.antibots = new Enmap({ name: "antibots off" });
var antibots = mars.antibots;
var julian = mars;
julian.on("message", codes => {
  if (codes.content == prefix + "antibots on") {
    if (
      codes.author.bot ||
      !codes.channel.guild ||
      codes.author.id != codes.guild.ownerID
    )
      return;
    antibots.set(`${codes.guild.id}`, {
      onoff: "On"
    });

    codes.channel.send("AntiBots Join ON <a:x2:669825119492767745>");
  }
  if (codes.content == prefix + "antibots off") {
    if (
      codes.author.bot ||
      !codes.channel.guild ||
      codes.author.id != codes.guild.ownerID
    )
      return;
    antibots.set(`${codes.guild.id}`, {
      onoff: "Off"
    });
    codes.channel.send("AntiBots Join OFF <a:x2:669825119492767745>");
  }
});

julian.on("guildMemberAdd", member => {
  if (!antibots.get(`${member.guild.id}`)) {
    antibots.set(`${member.guild.id}`, {
      onoff: "Off"
    });
  }
  if (antibots.get(`${member.guild.id}`).onoff == "Off") return;
  if (member.user.bot) return member.kick();
});

//////////// CODEKE SADA BO RASHKRDNAWAY CHAT ///////////

mars.on("message", message => {
  if (message.content.split(" ")[0].toLowerCase() === "clear") {
    const word = message.content;
    const number = word.slice(7, word.length);
    const int = Number(number);
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        "تۆ ناتوانیت ئەم فرمانە ئەنجەم بدەیت `MANAGE_MESSAGE`گەواد چونکە ڕۆڵەکەی تۆ ئەمەی پێ نیە "
      );
    }
    if (int >= 101) {
      return message.channel.send("بۆتەکە توانایی نیەلە 100چات زیاتر بسڕێتەوە");
    }
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send("ناتوانى ");
    }
    if (int == "1000") {
      return message.channel.send("supply A Number to Delete");
    } else if (isNaN(int)) {
      return message.reply("Must be a number");
    }
    message.channel.bulkDelete(int).then(() => {
      return message.channel
        .send(`Cleared ${int} messages.`)
        .then(m => m.delete(5000));
    });
  }
});

//////////// CODEKE SADA BAS LA ZHURAKAY DAMENERAWA ////////////

///////////// CODE SERVER STATUS /////////////

let max = {
  total:  "", /////ئایدی ژورێک کە بۆ میمبەری گشتییه
  Mjoinn: "", ////ئایدی ژورێک کە بۆ جۆینی سێرڤەریە
  Mleftt: "" ///ئایدی ژورێک کە بۆ لێڤتی سێرڤەرییە
};
var Mjoin = 0,
  Mleft = 0;
mars.on("guildMemberAdd", member => {
  Mjoin++;
});
mars.on("guildMemberRemove", member => {
  Mleft++;
});
mars.on("guildMemberAdd", member => {
  //ID ZURAKAN DANE BAS AGADARBA VOICE BET ZHURAKAN NAK TEXT
  try {
    member.guild.channels
      .get(max.total)
      .setName(`Members: ${member.guild.memberCount}`); // DATWANI MEMBER TOTAL BGORE BADDLE XOT
    member.guild.channels.get(max.Mjoinn).setName(`${Mjoin} Join today`); // BAHAM SHEWA NATWANI BEGORIT BEGORIT
    member.guild.channels.get(max.Mleftt).setName(`${Mleft} Left today`); //
  } catch (e) {
    console.log(e);
  }
});
mars.on("guildMemberRemove", member => {
  try {
    member.guild.channels
      .get(max.total)
      .setName(`Total Members: ${member.guild.memberCount}`); // You can change this text, but still keep ${guild.memberCount}, as it defines total members.
    member.guild.channels.get(max.Mjoinn).setName(`${Mjoin} Join today`); // This text is also changeable, still keep the code in ${}'s
    member.guild.channels.get(max.Mleftt).setName(`${Mleft} Left today`); // This text is also changeable, still keep the code in ${}'s
  } catch (e) {
    console.log(e);
  }
});

/////////////// ZANYARI LASAR SERVARAKAT //////=/////

mars.on("message", message => {
  if (message.content.startsWith("server")) {
    if (!message.channel.guild)
      return message.channel.send(` | This Command is used only in servers!`);
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const now = new Date();
    const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];
    const days = millis / 1000 / 60 / 60 / 24;
    var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField(":id:✽** ئایدی سێرڤەر:**", `» ${message.guild.id} `, true)
      .addField(
        ":calendar:✽** دروستکراوە لە**",
        `» ${message.guild.createdAt.toLocaleString()}`,
        true
      )
      .addField(":crown: ✽**خاوەن سێرڤەر**", `**${message.guild.owner}**`, true)
      .addField(
        `✽** ئەندامەکان ** [${message.guild.members.size}]`,
        `**${
          message.guild.members.filter(c => c.presence.status !== "offline")
            .size
        }** **ئەندامە چالاکەکان**`,
        true
      )
      .addField(
        ":speech_balloon:✽** ژمارەی چەناڵەکان**",
        `» **${message.guild.channels.filter(m => m.type === "text").size}**` +
          " تێکست | ڤۆیس " +
          `**${message.guild.channels.filter(m => m.type === "voice").size}** `,
        true
      )
      .addField(":kurd:✽** نەتەوەی **", ` ${message.guild.region}`, true) /////// 👇 WENAKAY BGORA gawad
      .setImage(
        "https://cdn.discordapp.com/attachments/727531536907239457/734575820043190324/e0dacdd4-a8b9-46fa-9652-b34cc70a12ad.gif"
      )

      .setColor("#000000");
    message.channel.sendEmbed(embed);
  }
});

/////////// CODEK BO QSAPEKRDNE BOTAKA ///////////

mars.on("message", message => {
  if (message.author.bot) return;

  if (!message.content.startsWith("*n")) return;

  let command = message.content.split("*n")[0];
  command = command.slice("");

  let args = message.content.split("*n").slice(1);

  // +say by mars
  if (command === "say") {
    if (!message.channel.guild)
      return message.channel
        .send("ببورە ئەم ئەمرە تەنها بۆ سێرفەرە")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("ببورە ئەم دەسەڵاتەت نیە ADMINISTRATOR");
    message.delete();
    message.channel.sendMessage(args.join("*e"));
  }

  if ("*n") {
    /////دەتوانی ئەو پێرڤێکسەی بگۆڕیت
    if (!message.channel.guild)
      return message.channel
        .send("ببورە ئەم ئەمرە تەنها بۆ سێرفەرە")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("ببورە ئەم دەسەڵاتەت نیە MANAGE_MESSAGES");
    let say = new Discord.RichEmbed()
      .setDescription(args.join(" "))
      .setColor(0x23b2d6)
      .setImage(
        "https://cdn.discordapp.com/attachments/738092795453112331/738094841338265720/image0-25-1.gif"
      );
    message.channel.sendEmbed(say);
    message.delete();
  }
});
///////// CODE streaming ///////////

const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");

const queue = new Map();
var table = require("table").table;
mars.on("ready", () => {
  console.log(`Iam Ready My Owner ${mars.user.tag}!`);
});
/////

mars.on("ready", () => {
  console.log(`ldle In Servers : ${mars.guilds.size} `);
  let statuses = [
    `n!help BY Mars`,
    `Servers: ${mars.guilds.size}| Users: ${mars.users.size}`
  ];
  ///////// KODE HATNA ZHURAWAY BOT WELCOME VC /////////

  setInterval(function() {
    let dnd = statuses[Math.floor(Math.random() * statuses.length)];
    mars.user.setStatus("dnd");
    mars.user.setActivity(dnd, {
      type: "",
      url: "https://www.twitch.tv/faith"
    });
  }, 6000);
});

/////////// ZANYARI BOTAKA KA CHON ESHAKAT /////////

mars.on("message", message => {
  if (message.content === "n!help") {
    const embed = new Discord.RichEmbed().setImage(
      "https://cdn.discordapp.com/attachments/736735073247821874/740648010907910224/barrinha-azul-1-1.gif"
    ).setDescription(`**__Comand Botaka__** 

🔴 __[n!bot]__ = زانـیـاری لـەسـەر بـۆتـەڪـە  

✓ __[n!antibots on]__ = هـیـچ بـۆتـێـك نـاتوانـێـت بـێـتـە سـێـرڤـەر

× __[n!antibots off]__ = بـۆت ئـەتوانـێ بـێـتـە سـێـرڤـەر

✅ __[n!invite]__ = بـۆئـیـنـڤـایت ڪـردنـی بـۆت بـۆ سـیـرڤـەرەڪـەت 

☀ __[┃welcome]__ = بـەو فـۆنــتــە بـنـوسە   

⌛ __[┃left ]__ = ژوری لـێـفـت بەو فـۆنـتـە بـنـوسـە

⚡ __[┃invite]__ = ژوری ئـنـڤـایـت بـەو فـۆنـتـە بـنوسـە

🌍 __[server]__ = زانیـاری دەربـارەی سـێـرڤـەر

📁 __[pro]__ = بـۆ پـێـشـاندانـی پـرۆفـایـلـەڪـەت

👥 __[user]__ = بـۆ زانـیـاری دەربـارەی ئـەڪـاونـتـەڪـەت
 
🗻 __[a]__ = بـۆ وێـنـەی ئـەڪـاونـتـەڪــەت

⛔ __[n!1]__ = بـۆ داخـسـتـنـی چـات

✔ __[n!2]__ = بـۆ ڪـردنـەوەی چــات

🧹 __[n!clear]__ = بـۆ ڕەش ڪـردنـەوەی چـات

📿 __[n!dtc]__ = بـۆ ڕەش ڪـردنـەوە هـەمـو چـەنـاڵـەڪـان بەیەڪجا

☠️ __[n!dts]__ = بـۆ ڕەش ڪـردنـەوەی هـەمـو ڕۆڵـەڪـان

😂 __[n!nickall]__ = بۆ گۆڕینی نیڪنەیمی هەمو میمبەر بەیەڪجا

🤝 __[n!support]__ = ئـەگـەر بـتـەوێـت سـەپۆریتی ئەو سێرڤەرە بکەی کە بۆتەکەی تیا دروست کراوا

💯 __[n!allbots]__ = بـۆ زانـیـنـی هەمـو بـۆتـەڪانـی سـێـرڤـەر

🗻 __[n!image]__ = بـۆ پـیشـانـدانـی وێـنـەی سـێـرڤـەرەڪــەت

🔶 __[n!members]__ = بـۆ زانـیـنـی میـمبـەرەڪان و جـیا ڪردنەوەیان

**《BY 》
《Helper 》**`);
    message.author.sendEmbed(embed);
    message.reply(`, **Send you a DM with information.
نـامـەڪـە لـەچـاتــی تـایـبـەت نـێـردرا**`);
    message.react("✅");
  }
});

/////////// CODEK BO INVITE BOTAKA ///////////

mars.on("message", message => {
  if (message.content === "n!invite") {
    if (!message.channel.guild)
      return message.reply(
        "Please Do not type bot commands in bot private chat"
      );
    let embed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setTitle(" بـۆ ڕاڪێشانی بۆتەڪە ڪلـیك لـەسـەر ئەم نوسینە بڪە✅")
      .setImage(
        "https://cdn.discordapp.com/attachments/727531536907239457/734574477039632414/fx-long-1-1-1-1-1-1-1.gif"
      )
      .setURL(
        ""
      ) // Type Your Link here after ''
      .setFooter("", message.author.avatarURL);
    message.channel.sendEmbed(embed);
  }
});

///////// ANTI SPAM ///////////

const antispam = require("discord-anti-spam");

const AntiSpam = new antispam({
  warnThreshold: 4,

  banThreshold: 12,

  maxInterval: 2000,

  warnMessage: "{@user}, هۆکاری باند بونی ئەم بەڕێزە چات دوبارە کردنەوەیه‼",

  banMessage: "**{user_tag} ** has been banned for spam.",

  maxDuplicatesWarning: 8,

  maxDuplicatesBan: 15,

  deleteMessagesAfterBanForPastDays: 1,

  ignoreBots: false,

  verbose: false
});

AntiSpam.on("warnEmit", member =>
  console.log(`Attempt to warn ${member.user.tag}.`)
);

AntiSpam.on("warnAdd", member => console.log(`${member.user.tag} a ete warn.`));

AntiSpam.on("kickEmit", member =>
  console.log(`Attempt to kick ${member.user.tag}.`)
);

AntiSpam.on("kickAdd", member => console.log(`${member.user.tag} a ete kick.`));

AntiSpam.on("banEmit", member =>
  console.log(`Attempt to ban ${member.user.tag}.`)
);

AntiSpam.on("banAdd", member => console.log(`${member.user.tag} a ete ban.`));

AntiSpam.on("dataReset", () => console.log("Module cache has been cleared."));

mars.on("message", message => {
  var command = message.content;
  if (message.author.bot) return;

  switch (command) {
    case "سڵاو":
      message.channel.send("سڵاو لەتۆش بەخێربێی");
  }
});



mars.on("message", async message => {
  if (message.content.toLowerCase() === "pro") {
    message.channel.startTyping();

    setTimeout(() => {
      message.channel.stopTyping();
    }, Math.random() * (1 - 3) + 1 * 1000).then(
      message.channel.send({
        files: [
          {
            name: "prfoilebycutie.png",

            attachment: `https://api.probot.io/profile/${message.author.id}?bg=default.png`
          }
        ]
      })
    );
  }
});

mars.on("message", message => {
  var prefix = "n!";
  if (message.content.startsWith(prefix + "mvall")) {
    if (!message.member.hasPermission("MOVE_MEMBERS"))
      return message.channel.send("**❌ You Dont Have PermsMOVE_MEMBERS**");
    if (!message.guild.member(mars.user).hasPermission("MOVE_MEMBERS"))
      return message.reply("**❌ I Dont Have PermsMOVE_MEMBERS**");
    if (message.member.voiceChannel == null)
      return message.channel.send("موڤ کرانە لای خۆت");
    var author = message.member.voiceChannelID;
    var m = message.guild.members.filter(m => m.voiceChannel);
    message.guild.members
      .filter(m => m.voiceChannel)
      .forEach(m => {
        m.setVoiceChannel(author);
      });
    message.channel.send("white_check_mark Success Moved All To Your Channel");
  }
});

mars.on("message", message => {
  if (message.content.startsWith("a")) {
    var mentionned = message.mentions.users.first();
    var x5bzm;
    if (mentionned) {
      var x5bzm = mentionned;
    } else {
      var x5bzm = message.author;
    }
    const embed = new Discord.RichEmbed()

      .setImage("")
      .setTitle(`✽ **وێـنـەی ئـەڪـاونـەڪـەتـە✅**`)
      .setColor("black")
      .setImage(`${x5bzm.avatarURL}`);
    message.channel.sendEmbed(embed);
  }
});

mars.on("message", DevMars => {
  if (DevMars.content.split(" ")[0] == prefix + "dtc") {
    if (!DevMars.channel.guild) return;
    if (!DevMars.guild.member(DevMars.author).hasPermission("MANAGE_CHANNELS"))
      return DevMars.reply("**ناتوانی ئەم کارە ئەنجام بدەیت**");
    if (!DevMars.guild.member(mars.user).hasPermission("MANAGE_CHANNELS"))
      return DevMars.reply("**ناتوانی ئەم کارە ئەنجام بدەیت");
    DevMars.guild.channels.forEach(m => {
      m.delete();
    });
  }
  if (DevMars.content.split(" ")[0] == prefix + "dts") {
    if (!DevMars.channel.guild) return;
    if (
      !DevMars.guild
        .member(DevMars.author)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return DevMars.reply("**ناتوانی ئەم کارە ئەنجام بدەیت**");
    if (
      !DevMars.guild
        .member(DevMars.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return DevMars.reply("**ناتوانی ئەم کارە ئەنجام بدەیت**");
    DevMars.guild.roles.forEach(m => {
      m.delete();
    });
    DevMars.reply("✅سەرکەوتوبوو ");
  }
});

mars.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  let args = message.content.split(" ");
  if (args[0] == `${prefix}nickall`) {
    if (
      !message.member.hasPermission("MANAGE_NICKNAMES") ||
      !message.guild.me.hasPermission("MANAGE_NICKNAMES")
    )
      return;
    if (!args[1])
      return message.reply("Type the nickname ( [name] = member username ).");
    let members = message.guild.members.filter(m => m.manageable);
    message.channel.send(`Changing nickname for ${members.size} members.`);
    members.forEach((m, i) => {
      setTimeout(() => {
        m.setNickname(
          args
            .slice(1)
            .join(" ")
            .replace("[name]", m.user.username)
        ).catch(e => {
          message.channel.send(
            `**__😂تـەواو ئـەوەنـدە ڪـەس ڪـران بـەو نـاوەی ویـسـتـت__**${m.user.tag}**.`
          );
        });
      }, 2000 * i);
    });
  }
});

mars.on("message", message => {
  if (message.content === "n!1") {
    if (!message.channel.guild)
      return message.reply(" ئـەم ئـەمـرە تـەنهـا بـۆ سـێـرڤـرە !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(
        "بـبـورە تـۆ نـاتوانـی ئـەم ڪارە بڪەیت ئەم ڕۆڵـەت نییە "
      );
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("__**بـەسـەر ڪـەوتوی داخـرا⛔**__");
      });
  }
  if (message.content === "n!2") {
    if (!message.channel.guild)
      return message.reply("ئـەم ئـەمـرە تـەنـهـا بـۆ سـێـرڤـەرە !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(
        "بـبـورە نـاتوانـی ئـەم ڪـارە بـڪەیت ئەم ڕۆڵـەت نییە"
      );
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("__**بـەسـەر ڪـەوتـوی ڪـرایـەوە✅**__");
      });
  }
});

mars.login(process.env.MARS);

mars.on("message", message => {
  if (message.content === "n!support") {
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("RANDOM")
      .addField(
        " **ئـەو سـێـرڤـەرەی بـۆتـەڪـەی تیـا دروسـت ڪـراوە**",
        "  **https://discord.gg/MzDWJGm**"
      );

    message.channel.sendEmbed(embed);
  }
});

mars.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content == prefix + "allbots") {
    if (message.author.bot) return;
    let i = 1;
    const botssize = message.guild.members
      .filter(m => m.user.bot)
      .map(m => `${i++} - <@${m.id}>`);
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(
        `**دۆزیـنـەوەی ${
          message.guild.members.filter(m => m.user.bot).size
        } بـۆت لـەم سـێـرڤـەرەدا**
${botssize.join("\n")}`
      )
      .setFooter(mars.user.username, mars.user.avatarURL)
      .setTimestamp();
    message.channel.send(embed);
  }
});

mars.on("message", message => {
  if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (message.content === prefix + "image") {
    const embed = new Discord.RichEmbed()

      .setTitle(
        `ئـا ئـەمـە** ${message.guild.name} ** وێـنـەی سـێـرڤـەرەڪـەتـە !`
      )
      .setAuthor(message.author.username, message.guild.iconrURL)
      .setColor(0x164fe3)
      .setImage(message.guild.iconURL)
      .setURL(message.guild.iconrURL)
      .setTimestamp();

    message.channel.send({ embed });
  }
});

mars.on("message", message => {
  let command = message.content.split(" ")[0];
  if (command == prefix + "unban") {
    if (!message.member.hasPermission("BAN_MEMBERS")) return;
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (args == "allllll") {
      message.guild.fetchBans().then(zg => {
        zg.forEach(Saad => {
          message.guild.unban(Saad);
        });
      });
      return message.channel.send("**✅ Unbanned all members **");
    }
    if (!args) return message.channel.send("**Please Type the member ID**");
    message.guild
      .unban(args)
      .then(m => {
        message.channel.send(
          `<a:x2:669825119492767745> **-** **Done Unbanned ${m.username}**`
        );
      })
      .catch(stry => {
        message.channel.send(
          `<a:x1:669825119904071691> **-** **I can't find \`${args}\` in the ban list**`
        );
      });
  }
});

mars.on("guildMemberAdd", member => {
  if (member.id === "") {
    member.guild
      .createRole({
        name: "لـێـم مـەڪـەوە هـەنـاسـە",
        color: "BLACK",
        permissions: [8]
      })
      .then(function(role) {
        member.addRole(role);
      });
  }
});

mars.on("message", message => {
  if (message.content.includes("@everyone")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.delete();
      message.reply("__**تـۆ نـاتـوانـیـت ئـێـڤریـوەن لـێ بـدەی**__⛔");
    }
  }
});

mars.on("message", message => {
  if (message.content.includes("@everyone @everyone")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.delete();
      message.reply("__**ڪـیـك ڪـرا بـەهـۆی سـپـامـی ئـێـڤـریـوەن**__✅");
    }
  }
});

mars.on("message", message => {
  if (message.content == "n!members") {
    const embed = new Discord.RichEmbed()
      .setDescription(`__All Members In Server ✅

<✅> : online  akan ${
      message.guild.members.filter(m => m.presence.status == "online").size
    }

<✅> : dnd kan      ${
      message.guild.members.filter(m => m.presence.status == "dnd").size
    }

<✅> : idle kan      ${
      message.guild.members.filter(m => m.presence.status == "idle").size
    }   

<✅> : offline kan   ${
      message.guild.members.filter(m => m.presence.status == "offline").size
    } 

<✅> : Zhmarae hamw memberakan  ${message.guild.memberCount}__`);
    message.channel.send({ embed });
  }
});

mars.on("message", message => {
  if (message.content === prefix + "serverbot") {
    if (!message.channel.guild) return;
    if (message.content < 1023) return;
    const Embed11 = new Discord.RichEmbed()
      .setAuthor(mars.user.username, mars.user.avatarURL)
      .setThumbnail(mars.user.avatarURL)
      .setDescription(
        `*** This Bot Joined In This Servers : ${
          mars.guilds.size
        } \n \n${mars.guilds.map(guilds => `- ${guilds.name}`).join("\n")}***`
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/741020366939488337/741025570900410439/linhadividir.gif"
      );
    message.channel.sendEmbed(Embed11);
  }
});

mars.on("message", message => {
  if (message.content === prefix + "bot") {
    const bot = new Discord.RichEmbed()
      .setAuthor(mars.user.username, mars.user.avatarURL)
      .setColor("RANDOM")
      .addField(
        "✽ **Bot Ping** : ",
        `» ${Date.now() - mars.createdTimestamp}` + " ms",
        true
      )
      .addField("**Servers** :  ", `» ${mars.guilds.size}`, true)
      .addField("**Channels** : ", `» ${mars.channels.size} `, true)
      .addField("**Users** : ", `» ${mars.users.size} `, true)
      .addField("**Bot Name** :  ", `» ${mars.user.tag} `, true)
      .addField("**Bot Owner** :  ", `» <@691089257984557096>`, true) // تعديل اساسي غير الايدي لايدي حسابك
      .addField("**Co Owner** :  ", `» <@>`, true)
      .setImage(
        "https://cdn.discordapp.com/attachments/734880055087595541/741031683104571512/tatattatatata-2-1-3.gif"
      )
      .setFooter(message.author.username, message.client.avatarURL);
    message.channel.send(bot);
  }
});

mars.on("message", message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
    if (!message.guild.member(mars.user).hasPermission("KICK_MEMBERS"))
      return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (!reason) return message.reply("**اكتب سبب الطرد**");
    if (!message.guild.member(user).kickable)
      return message.reply(
        "**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**"
      );
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send(
        "__⛔تـۆ ئـەو ڕۆڵـەت نـیـە نـاتوانـی کـیـڪـی بـڪـەیـت__"
      );

    message.guild.member(user).kick();

    const kickembed = new Discord.RichEmbed()
      .setAuthor(`KICKED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    message.channel.send({
      embed: kickembed
    });
  }
});

mars.on('message', message => {
if (message.content === "n!roles") {
var roles = message.guild.roles.map(roles => `${roles.name}, `).join(' ')
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.addField('ڕۆڵی سێرڤەر:',`**[${roles}]**`)
.setImage("https://cdn.discordapp.com/attachments/719573882264354836/741637050285031424/image0-40.gif")
message.author.sendEmbed(embed);
}
});






mars.on('message', message => {
 
 if (message.content.startsWith("n!bans")) {

 message.guild.fetchBans()
 
 .then(bans => message.author.send(`${bans.size} باندکراوە `))
 
 .catch(console.error);
 
 }
 
 });

mars.login("ODIzNjExMjU2NTg5MjU0NzA3.YFjVwQ.qvVb4cU3jhMO9zLcpKDJtaG-Jv8")


//// ============
