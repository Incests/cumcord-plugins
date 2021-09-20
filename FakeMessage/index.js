import { webpackModules } from '@cumcord/modules'
import { instead } from '@cumcord/patcher'
const { getChannelId } = webpackModules.findByProps('getChannelId')
const { getUser } = webpackModules.findByProps('getUser')
const sendMessage = webpackModules.findByProps('sendMessage')
const { receiveMessage } = webpackModules.findByProps('receiveMessage')

let unpatch

const spawnClyde = (message) => {
  const channelId = getChannelId()
  const { avatar, bot, discriminator, id } = getUser('1')
  receiveMessage(channelId, {
    channel_id: channelId,
    author: {
      avatar,
      bot,
      discriminator,
      username: 'FakeMessage',
      id
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
    console.log('cumcord', 'FakeMessage loaded!')
    unpatch = instead('sendMessage', sendMessage, (args, org) => {
      let arg = args[1].content.split(' ')
      if (arg[0] === '!fake') {
        arg = args[1].content.split(' ')
        if (isNaN(arg[1])) {
          return spawnClyde('Invalid USERID!\nExample: ```!fake [USERID] [MESSAGE]```')
        }
        const channelId = getChannelId()
        // TODO: Fix unable to send message in current channel when
        //       USERID is not found
        //       Fix: Switch to another channel and come back again
        //            will unlock the textbox
        const { avatar, bot, discriminator, username, id } = getUser(arg[1] || '1')
        if (username === 'Clyde' || typeof avatar === 'undefined') {
          return spawnClyde('Invalid argument!\nExample: ```!fake [USERID] [MESSAGE]```')
        }
        // TODO: Make the user somehow clickable
        receiveMessage(channelId, {
          author: {
            avatar,
            bot,
            discriminator,
            username,
            id
          },
          content: arg.slice(2).join(' ') || 'I\'m stupid, cause I can\'t read the example',
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
      } else org(...args)
    })
  },

  onUnload () {
    unpatch()
  }
}
