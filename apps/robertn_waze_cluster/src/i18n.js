// SPDX-License-Identifier: GPL-3.0-or-later
'use strict';

const LOCALES = require('./locales.js');
let current = null;

/* CommonTypes.Language names; English until the HMI supplies a supported one. */
function setHmiLanguage(value) {
    const next = LOCALES.find((l) => l.hmiLanguages.indexOf(value) >= 0) || null;
    if (next === current) {
        return false;
    }
    current = next;
    return true;
}

/* English keys, with arguments kept verbatim (names, reasons, errors). */
function t(key, ...args) {
    const words = current && current.words;
    const text = words && Object.prototype.hasOwnProperty.call(words, key) ? words[key] : key;
    return text.replace(/\{(\d+)\}/g, (match, i) => (Number(i) < args.length ? String(args[i]) : match));
}

module.exports = { setHmiLanguage, t };
