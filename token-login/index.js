import { webpackModules } from '@cumcord/modules'

let unpatch

export default {
  onLoad () {
    // TODO: Disable token warning
    // TODO: Learn react and create token box in login page
    // TODO: Learn discord modules and create account switcher plugin
    const MFA = /mfa\.[\w-]{84}/g
    const nMFA = /[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g
    unpatch = cumcord.patcher.after('sendMessage', webpackModules.findByProps('sendMessage'), args => {
      if (args[1].content.startsWith('!login')) {
        const token = args[1].content.split(' ')[1]
        if (!token) {
          cumcord.ui.toasts.showToast({ title: 'Token not provided!', duration: 5000 })
          args[1].content = ''
          return
        }
        if (MFA.test(token) || nMFA.test(token)) {
          console.log('Switching account...')
          webpackModules.findByProps('setToken').setToken(token)
          window.location.reload()
        } else {
          cumcord.ui.toasts.showToast({ title: 'Invalid token format!', duration: 5000 })
          args[1].content = ''
        }
      }
    })
  },

  onUnload () {
    unpatch()
  }
}
