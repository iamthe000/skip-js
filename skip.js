/*Skip.js - 面倒な儀式をスキップして、すぐにロジックを書くためのライブラリ*/
(function (global) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const Skip = {
        start: async function (config = {}) {
            const defaults = {
                targetId: 'special_start',
                lang: 'ja',
                title: 'SkipJS App',
                charset: 'UTF-8',
                viewport: 'width=device-width, initial-scale=1.0',
                themeColor: '#ffffff',
                autoClear: false,
            };

            const settings = { ...defaults, ...config };
            
            document.documentElement.lang = settings.lang;

            const updateMeta = (name, content, isHttpEquiv = false) => {
                let meta;
                if (name === 'charset') {
                    meta = document.querySelector('meta[charset]');
                    if (!meta) {
                        meta = document.createElement('meta');
                        meta.setAttribute('charset', content);
                        document.head.prepend(meta);
                        return;
                    }
                    meta.setAttribute('charset', content);
                } else {
                    const attr = isHttpEquiv ? 'http-equiv' : 'name';
                    meta = document.querySelector(`meta[${attr}="${name}"]`);
                    if (!meta) {
                        meta = document.createElement('meta');
                        meta.setAttribute(attr, name);
                        document.head.appendChild(meta);
                    }
                    meta.content = content;
                }
            };

            if (settings.title) document.title = settings.title;

            updateMeta('charset', settings.charset);
            updateMeta('viewport', settings.viewport);

            const appDiv = document.getElementById(settings.targetId);
            if (!appDiv) {
                console.warn(`Skip.js: <div id="${settings.targetId}"> was not found. It will be created directly under the body.`);
                const newDiv = document.createElement('div');
                newDiv.id = settings.targetId;
                document.body.appendChild(newDiv);
            }
            
            const target = document.getElementById(settings.targetId);
            if(settings.autoClear) target.innerHTML = '';

            const print = (html) => {
                const div = document.createElement('div');
                div.innerHTML = html;
                target.appendChild(div);
            };

            const helpers = { print, sleep, $, $$ };

            if (config.run && typeof config.run === 'function') {
                try {
                    await config.run(helpers);
                } catch (e) {
                    console.error("Skip.js Error:", e);
                    print(`<div style="color:red; font-weight:bold;">Error: ${e.message}</div>`);
                }
            }
        }
    };
    
    global.Skip = Skip;
})(window);
