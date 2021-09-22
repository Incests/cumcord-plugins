// ==UserScript==
// @name         Cumcord Injector
// @version      0.2
// @description  Cumcord Injector
// @author       hanahaneull
// @homepage     https://github.com/Incests/cumcord-plugins
// @supportURL   https://github.com/Incests/cumcord-plugins/issues
// @updateURL    https://raw.githubusercontent.com/Incests/cumcord-plugins/master/cumcord.user.js
// @downloadURL  https://raw.githubusercontent.com/Incests/cumcord-plugins/master/cumcord.user.js
// @match        https://discord.com/app
// @match        https://discord.com/login
// @match        https://discord.com/users/*
// @match        https://discord.com/register
// @match        https://discord.com/channels/*
// @match        https://canary.discord.com/app
// @match        https://canary.discord.com/login
// @match        https://canary.discord.com/users/*
// @match        https://canary.discord.com/register
// @match        https://canary.discord.com/channels/*
// @match        https://ptb.discord.com/app
// @match        https://ptb.discord.com/login
// @match        https://ptb.discord.com/users/*
// @match        https://ptb.discord.com/register
// @match        https://ptb.discord.com/channels/*
// @icon         https://www.google.com/s2/favicons?domain=discord.com
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    if (!window.cumcord) {
        const cum = await fetch('https://raw.githubusercontent.com/Cumcord/Cumcord/stable/dist/build.js')
        const cord = await cum.text()
        eval(cord)
    }
})();
