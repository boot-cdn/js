/* Static bundle | version 734556389 */
/* Ad Manager */
(function () {
  "use strict";

  var config = {"version":734556389,"unknownCountryAllowed":true,"siteEnabled":true,"campaigns":[{"id":"47c5517dd690c356b7ea4a81","kind":"script","zone":"default","placement":"inline","enabled":true,"weight":100,"countries":["US"],"countryMode":"include","devices":["desktop","mobile","tablet"],"timezoneMode":"include","systems":["android","ios","pc"],"sourceType":"all","visitorType":"all","utcHourMode":"all","utcStartHour":8,"utcEndHour":23,"probability":100,"script":"\u003cscript async src=\"https://js.wpadmngr.com/static/adManager.js\" data-admpid=\"405215\"\u003e\u003c/script\u003e"}]};
  var script = document.currentScript;
  if (!script || !config || config.siteEnabled === false) return;

  
  

  

  

  

  

  

  

  

  

  
  function detectCountry() {
    var forced = String(script.dataset.country || "").toUpperCase();
    if (/^[A-Z]{2}$/.test(forced)) return forced;
    var languages = navigator.languages || [navigator.language || navigator.userLanguage || ""];
    for (var i = 0; i < languages.length; i++) {
      var match = String(languages[i]).match(/[-_]([A-Za-z]{2})(?:$|[-_])/);
      if (match) return match[1].toUpperCase();
    }
    return "";
  }

  function countryMatches(campaign, country, allowUnknown) {
    var list = campaign.countries || [];
    if (!list.length) return true;
    if (!country) return !!allowUnknown;
    var found = list.indexOf(country) !== -1;
    return campaign.countryMode === "exclude" ? !found : found;
  }
  

  

  

  

  

  
  function mountRoot(campaign) {
    var host = document.createElement("div");
    host.dataset.adManagerCampaign = campaign.id;
    var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    if (campaign.placement === "inline") script.parentNode.insertBefore(host, script.nextSibling);
    else document.body.appendChild(host);
    return { host: host, root: root };
  }
  

  

  
  function renderScript(campaign) {
    var mounted = mountRoot(campaign);
    var template = document.createElement("template");
    template.innerHTML = campaign.script || "";
    Array.prototype.slice.call(template.content.childNodes).forEach(function (node) {
      if (node.nodeName !== "SCRIPT") {
        mounted.root.appendChild(node.cloneNode(true));
        return;
      }
      var replacement = document.createElement("script");
      Array.prototype.slice.call(node.attributes || []).forEach(function (attribute) {
        replacement.setAttribute(attribute.name, attribute.value);
      });
      replacement.text = node.textContent || "";
      mounted.root.appendChild(replacement);
    });
  }
  

  function executeCampaign(campaign) {
    
    
    
    if (campaign.kind === "script") {
      renderScript(campaign);
      return;
    }
    
    
  }

  

  function run() {
    
    
    
    
    var country = detectCountry();
    
    
    
    
    var candidates = config.campaigns.filter(function (campaign) {
      return true
        
        
        
        
        
        && countryMatches(campaign, country, config.unknownCountryAllowed)
        
        
        
        
        
        ;
    });
    if (!candidates.length) return;
    
    var picked = candidates[0];
    
    executeCampaign(picked);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
})();
