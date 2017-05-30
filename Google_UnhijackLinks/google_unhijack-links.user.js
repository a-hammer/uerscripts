// ==UserScript==
// @name         Google - Unhijack Links
// @description  Disable Google replacing direct search result links with internal Google links. Works on Google Search, Images, and more.
// @version      0.0.2
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/Google_UnhijackLinks
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/Google_UnhijackLinks/google_unhijack-links.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/Google_UnhijackLinks/google_unhijack-links.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @noframes
// @match        https://*.google.com/*
// @match        https://*.google.ad/*
// @match        https://*.google.ae/*
// @match        https://*.google.com.af/*
// @match        https://*.google.com.ag/*
// @match        https://*.google.com.ai/*
// @match        https://*.google.al/*
// @match        https://*.google.am/*
// @match        https://*.google.co.ao/*
// @match        https://*.google.com.ar/*
// @match        https://*.google.as/*
// @match        https://*.google.at/*
// @match        https://*.google.com.au/*
// @match        https://*.google.az/*
// @match        https://*.google.ba/*
// @match        https://*.google.com.bd/*
// @match        https://*.google.be/*
// @match        https://*.google.bf/*
// @match        https://*.google.bg/*
// @match        https://*.google.com.bh/*
// @match        https://*.google.bi/*
// @match        https://*.google.bj/*
// @match        https://*.google.com.bn/*
// @match        https://*.google.com.bo/*
// @match        https://*.google.com.br/*
// @match        https://*.google.bs/*
// @match        https://*.google.bt/*
// @match        https://*.google.co.bw/*
// @match        https://*.google.by/*
// @match        https://*.google.com.bz/*
// @match        https://*.google.ca/*
// @match        https://*.google.cd/*
// @match        https://*.google.cf/*
// @match        https://*.google.cg/*
// @match        https://*.google.ch/*
// @match        https://*.google.ci/*
// @match        https://*.google.co.ck/*
// @match        https://*.google.cl/*
// @match        https://*.google.cm/*
// @match        https://*.google.cn/*
// @match        https://*.google.com.co/*
// @match        https://*.google.co.cr/*
// @match        https://*.google.com.cu/*
// @match        https://*.google.cv/*
// @match        https://*.google.com.cy/*
// @match        https://*.google.cz/*
// @match        https://*.google.de/*
// @match        https://*.google.dj/*
// @match        https://*.google.dk/*
// @match        https://*.google.dm/*
// @match        https://*.google.com.do/*
// @match        https://*.google.dz/*
// @match        https://*.google.com.ec/*
// @match        https://*.google.ee/*
// @match        https://*.google.com.eg/*
// @match        https://*.google.es/*
// @match        https://*.google.com.et/*
// @match        https://*.google.fi/*
// @match        https://*.google.com.fj/*
// @match        https://*.google.fm/*
// @match        https://*.google.fr/*
// @match        https://*.google.ga/*
// @match        https://*.google.ge/*
// @match        https://*.google.gg/*
// @match        https://*.google.com.gh/*
// @match        https://*.google.com.gi/*
// @match        https://*.google.gl/*
// @match        https://*.google.gm/*
// @match        https://*.google.gp/*
// @match        https://*.google.gr/*
// @match        https://*.google.com.gt/*
// @match        https://*.google.gy/*
// @match        https://*.google.com.hk/*
// @match        https://*.google.hn/*
// @match        https://*.google.hr/*
// @match        https://*.google.ht/*
// @match        https://*.google.hu/*
// @match        https://*.google.co.id/*
// @match        https://*.google.ie/*
// @match        https://*.google.co.il/*
// @match        https://*.google.im/*
// @match        https://*.google.co.in/*
// @match        https://*.google.iq/*
// @match        https://*.google.is/*
// @match        https://*.google.it/*
// @match        https://*.google.je/*
// @match        https://*.google.com.jm/*
// @match        https://*.google.jo/*
// @match        https://*.google.co.jp/*
// @match        https://*.google.co.ke/*
// @match        https://*.google.com.kh/*
// @match        https://*.google.ki/*
// @match        https://*.google.kg/*
// @match        https://*.google.co.kr/*
// @match        https://*.google.com.kw/*
// @match        https://*.google.kz/*
// @match        https://*.google.la/*
// @match        https://*.google.com.lb/*
// @match        https://*.google.li/*
// @match        https://*.google.lk/*
// @match        https://*.google.co.ls/*
// @match        https://*.google.lt/*
// @match        https://*.google.lu/*
// @match        https://*.google.lv/*
// @match        https://*.google.com.ly/*
// @match        https://*.google.co.ma/*
// @match        https://*.google.md/*
// @match        https://*.google.me/*
// @match        https://*.google.mg/*
// @match        https://*.google.mk/*
// @match        https://*.google.ml/*
// @match        https://*.google.com.mm/*
// @match        https://*.google.mn/*
// @match        https://*.google.ms/*
// @match        https://*.google.com.mt/*
// @match        https://*.google.mu/*
// @match        https://*.google.mv/*
// @match        https://*.google.mw/*
// @match        https://*.google.com.mx/*
// @match        https://*.google.com.my/*
// @match        https://*.google.co.mz/*
// @match        https://*.google.com.na/*
// @match        https://*.google.com.nf/*
// @match        https://*.google.com.ng/*
// @match        https://*.google.com.ni/*
// @match        https://*.google.ne/*
// @match        https://*.google.nl/*
// @match        https://*.google.no/*
// @match        https://*.google.com.np/*
// @match        https://*.google.nr/*
// @match        https://*.google.nu/*
// @match        https://*.google.co.nz/*
// @match        https://*.google.com.om/*
// @match        https://*.google.com.pa/*
// @match        https://*.google.com.pe/*
// @match        https://*.google.com.pg/*
// @match        https://*.google.com.ph/*
// @match        https://*.google.com.pk/*
// @match        https://*.google.pl/*
// @match        https://*.google.pn/*
// @match        https://*.google.com.pr/*
// @match        https://*.google.ps/*
// @match        https://*.google.pt/*
// @match        https://*.google.com.py/*
// @match        https://*.google.com.qa/*
// @match        https://*.google.ro/*
// @match        https://*.google.ru/*
// @match        https://*.google.rw/*
// @match        https://*.google.com.sa/*
// @match        https://*.google.com.sb/*
// @match        https://*.google.sc/*
// @match        https://*.google.se/*
// @match        https://*.google.com.sg/*
// @match        https://*.google.sh/*
// @match        https://*.google.si/*
// @match        https://*.google.sk/*
// @match        https://*.google.com.sl/*
// @match        https://*.google.sn/*
// @match        https://*.google.so/*
// @match        https://*.google.sm/*
// @match        https://*.google.sr/*
// @match        https://*.google.st/*
// @match        https://*.google.com.sv/*
// @match        https://*.google.td/*
// @match        https://*.google.tg/*
// @match        https://*.google.co.th/*
// @match        https://*.google.com.tj/*
// @match        https://*.google.tk/*
// @match        https://*.google.tl/*
// @match        https://*.google.tm/*
// @match        https://*.google.tn/*
// @match        https://*.google.to/*
// @match        https://*.google.com.tr/*
// @match        https://*.google.tt/*
// @match        https://*.google.com.tw/*
// @match        https://*.google.co.tz/*
// @match        https://*.google.com.ua/*
// @match        https://*.google.co.ug/*
// @match        https://*.google.co.uk/*
// @match        https://*.google.com.uy/*
// @match        https://*.google.co.uz/*
// @match        https://*.google.com.vc/*
// @match        https://*.google.co.ve/*
// @match        https://*.google.vg/*
// @match        https://*.google.co.vi/*
// @match        https://*.google.com.vn/*
// @match        https://*.google.vu/*
// @match        https://*.google.ws/*
// @match        https://*.google.rs/*
// @match        https://*.google.co.za/*
// @match        https://*.google.co.zm/*
// @match        https://*.google.co.zw/*
// @match        https://*.google.cat/*
// @grant        none
// ==/UserScript==

(function() {

    // Google's 'rwt' function hijacks direct search result links.
    // Override and disable further overriding.
    Object.defineProperty(window, 'rwt', {
        value: function() {},
        configurable: false,
        writable: false
    });

})();
