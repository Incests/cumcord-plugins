// ==UserScript==
// @name         Cumcord Injector
// @version      0.1
// @description  Cumcord Injector
// @author       hanahaneull
// @match        https://discord.com/*
// @match        https://canary.discord.com/*
// @match        https://ptb.discord.com/*
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
