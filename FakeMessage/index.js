import { webpackModules } from '@cumcord/modules'
import { after } from '@cumcord/patcher'
const { getChannelId } = webpackModules.findByProps('getChannelId')
const { getUser } = webpackModules.findByProps('getUser')
const sendMessage = webpackModules.findByProps('sendMessage')
const { receiveMessage } = webpackModules.findByProps('receiveMessage')

let unpatch

const spawnClyde = (message) => {
  const channelId = getChannelId()
  receiveMessage(channelId, {
    channel_id: channelId,
    author: {
      avatar: 'clyde',
      bot: true,
      discriminator: '0000',
      username: 'FakeMessage',
      id: '1'
    },
    content: message,
    id: (+new Date() - 1420070400000) * 4194304,
    timestamp: new Date().toISOString(),
    attachment: [],
    embeds: [],
    flags: 64,
    loggingName: undefined,
    mention_channels: [],
    mention_everyone: false,
    mention_roles: [],
    mentions: [],
    pinned: false,
    state: 'SENT',
    tts: false,
    type: 0
  })
}

export default {
  onLoad () {
    unpatch = after('sendMessage', sendMessage, (args) => {
      let arg = args[1].content.split(' ')
      if (arg[0] === '!fake') {
        arg = args[1].content.split(' ')
        let target = arg[1]
        // TODO: Search discord userid regex. <@63453745645654>  -->  63453745645654
        if (!target.startsWith('<@!') && isNaN(target)) {
          args[1].content = ''
          spawnClyde('Invalid USERID!\nExample: ```!fake [USERID/@mention] [MESSAGE]```')
          return
        }
        target = target.replace('<@!', '').replace('>', '') // See line 46
        const channelId = getChannelId()
        let author = {
          avatar: 'clyde',
          bot: true,
          discriminator: '0000',
          username: 'FakeMessage',
          id: '1'
        }
        let failed = false
        try {
          const { avatar, bot, discriminator, username, id } = getUser(target)
          author = {
            avatar,
            bot,
            discriminator,
            username,
            id
          }
        } catch (e) {
          failed = true
        }
        // TODO: Make the user somehow clickable & have role color
        receiveMessage(channelId, {
          author,
          content: failed ? 'Unable to fetch user' : arg.slice(2).join(' '),
          id: (+new Date() - 1420070400000) * 4194304,
          timestamp: new Date().toISOString(),
          attachment: [],
          embeds: [],
          loggingName: undefined,
          mention_channels: [],
          mention_everyone: false,
          mention_roles: [],
          mentions: [],
          pinned: false,
          state: 'SENT',
          tts: false,
          type: 0
        })
        args[1].content = ''
      }
    })
  },

  onUnload () {
    unpatch()
  }
}
