(function(n){"use strict";let e;var s={onLoad(){const c=/mfa\.[\w-]{84}/g,i=/[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g;e=cumcord.patcher.after("sendMessage",n.webpackModules.findByProps("sendMessage"),t=>{if(t[1].content.startsWith("!login")){const o=t[1].content.split(" ")[1];if(!o){cumcord.ui.toasts.showToast({title:"Token not provided!",duration:5e3}),t[1].content="";return}c.test(o)||i.test(o)?(console.log("Switching account..."),n.webpackModules.findByProps("setToken").setToken(o),window.location.reload()):(cumcord.ui.toasts.showToast({title:"Invalid token format!",duration:5e3}),t[1].content="")}})},onUnload(){e()}};return s})(cumcord.modules);
