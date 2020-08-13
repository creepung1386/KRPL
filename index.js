const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const moment = require("moment");
require("moment-duration-format");
const welcomeChannelName = "🖐안녕하세요";
const byeChannelName = "🖐안녕하세요";
const welcomeChannelComment = "환영합니다! KRPL 커뮤니티 규칙을 읽어주시고 쾌적한 커뮤니티를 만들어 갑시다!";
const byeChannelComment = "즐거웠습니다:sob:";
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warning.json", "utf8"));

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '!도움 을 쳐보세요' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "NOOB"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '!ping') {
    return message.channel.send('pong');
  }

  
  
  
  module.exports.run = async (bot, message, args) => {
  
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("명령어를 수행할 관리자 권한을 소유하고 있지 않습니다!");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("아무래도 찾지 못했나봐요");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("성공적으로 경고가 등록되었어요!");
    let reason = args.join(" ").slice(22);

    if (!warn [wUser.id]) warns[wUser.id] = {
      warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      if (err) changeCommandStringLength.log(err);
    });
    
    let warnEmbed = new Discord.RichEmbed()
    .setDescription("경고")
    .setAuthor(message.author.username)
    .setColor("#ed0000")
    .addField("경고받은 유저", wUser.tag)
    .addField("Warned In", message.channel)
    .addField("경고 횟수", warns[wUser.id].warns)
    .addField("사유", reason);

    let warnchannel = message.guild.channels.find(`name`, "🚨경고");
    if(!warnchannel) return message.reply("채널을 찾지 못했어요")

    warnchannel.send(warnEmbed);

    if(wans[wUser.id].warns == 2){
      let muterole = message.guild.roles.find(`name`, "뮤트")
      if(!muterole) return message.reply("역할을 찾지 못했어요");

      let mutetime = "1d";
      await(wUser.addRole(muterole.id));
      message.channel.send(`${wUser.tag} 님! 1일 뮤트를 드렸어요! 앞으론 조심해주세요!`);

      setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.channel.reply(`성공적으로 뮤트먹혔네요 ㅋㅋㄹㅃㅃ`)
      })
    }
    if(wans[wUser.id].warns == 3){
      let muterole = message.guild.roles.find(`name`, "뮤트")
      if(!muterole) return message.reply("역할을 찾지 못했어요");

      let mutetime = "10d";
      await(wUser.addRole(muterole.id));
      message.channel.send(`${wUser.tag} 님! 10일 뮤트를 드렸어요! 그러게 왜 나쁜짓을..`);

      setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.channel.reply(`성공적으로 뮤트먹혔네요 ㅋㅋㄹㅃㅃ .....저런 사람들은 없어져야되요..`)
    })

  }
  
  module.exports.help = {
    name: "warn"
  }
  
  
  
  
  if(message.content == '!si') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#186de6')
    embed.setAuthor('KRPL', img)
    embed.setFooter(`KRPL`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }

if(message.content == '!도움') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '!도움', desc: '도움을 준다'},
      {name: '!ping', desc: '현재 핑 상태'}
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
      {name: '!전체공지2', desc: 'dm으로 전체 embed 형식으로 공지 보내기'},
      {name: '!청소', desc: '텍스트 지움'},
      {name: '!초대코드', desc: '해당 채널의 초대 코드 표기'},
      {name: '!초대코드2', desc: '봇이 들어가있는 모든 채널의 초대 코드 표기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of KRPL', helpImg)
      .setColor('#186de6')
      .setFooter(`KRPL`)
      .setTimestamp()
  
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });
    
   if(message.content == '!도움 관리자') {
      let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
      let commandList = [
        {name: '!이벤트 등록', desc: '이벤트 등록하기'},
        {name: '!이벤트 목록', desc: '등록한 이벤트 확인하기'},
      ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Admin Help of KRPL', helpImg)
      .setColor('#ed0000')
      .setFooter(`KRPL`)
      .setTimestamp()
     
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '!초대코드2') {
    client.guilds.array().forEach(x => {
      x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    });
  } else if(message.content == '!초대코드') {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if(err.code == 50013) {
          message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
        }
      })
  } else if(message.content.startsWith('!DM공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!DM공지'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('공지 of KRPL')
        .setColor('#186de6')
        .setFooter(`KRPL`)
        .setTimestamp()
      
      embed.addField('공지: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('!청소'.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. ``(이 메세지는 잠시 후에 사라집니다.)``");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);