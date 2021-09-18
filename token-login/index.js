import { webpackModules } from '@cumcord/modules'

let unpatch;

export default {
    onLoad() {
        // TODO: Disable token warning
        // TODO: Learn react and create token box in login page
        // TODO: Learn discord modules and create account switcher plugin
        unpatch = cumcord.patcher.after('sendMessage', webpackModules.findByProps('sendMessage'), args => {
            if (args[1].content.startsWith('!login') && args[1].content.split(' ')[1] !== undefined) {
                console.log('Switching account...');
                webpackModules.findByProps('setToken').setToken(args[1].content.split(' ')[1])
                window.location.reload()
            }
        })
    },

    onUnload() {
        unpatch()
    }
}