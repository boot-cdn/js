/* Static bundle | version 1212476758 */
/* Ad Manager */
(function () {
  "use strict";

  var config = {"version":1212476758,"unknownCountryAllowed":true,"siteEnabled":true,"campaigns":[{"id":"47c5517dd690c356b7ea4a81","kind":"script","zone":"default","placement":"inline","enabled":true,"weight":100,"countryMode":"include","devices":["mobile","tablet"],"timezoneMode":"include","systems":["android","ios"],"sourceType":"all","visitorType":"all","utcHourMode":"all","utcStartHour":8,"utcEndHour":23,"probability":100,"cooldownHours":12,"script":"\u003cscript async src=\"https://js.wpadmngr.com/static/adManager.js\" data-admpid=\"373783\"\u003e\u003c/script\u003e"}]};
  var script = document.currentScript;
  if (!script || !config || config.siteEnabled === false) return;

  
  

  
  function detectDevice() {
    var ua = navigator.userAgent || "";
    if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) return "tablet";
    if (/Mobi|Android|iPhone|iPod|IEMobile|Opera Mini/i.test(ua)) return "mobile";
    return "desktop";
  }
  

  
  function detectSystem() {
    var ua = navigator.userAgent || "";
    if (/Android/i.test(ua)) return "android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    return "pc";
  }
  

  

  

  
  function frequencyBlocked(campaign) {
    try {
      if (campaign.oncePerVisitor && localStorage.getItem("admanager_ran_" + campaign.id) === "true") return true;
      var hours = Math.max(0, Number(campaign.cooldownHours) || 0);
      if (!hours) return false;
      var previous = Number(localStorage.getItem("admanager_last_" + campaign.id) || 0);
      return previous > 0 && Date.now() - previous < hours * 60 * 60 * 1000;
    } catch (_) {
      return false;
    }
  }

  function markCampaignRun(campaign) {
    try {
      if (campaign.oncePerVisitor) localStorage.setItem("admanager_ran_" + campaign.id, "true");
      if (Number(campaign.cooldownHours) > 0) localStorage.setItem("admanager_last_" + campaign.id, String(Date.now()));
    } catch (_) {}
  }
  

  

  

  

  

  
  function includes(list, value) {
    return !list || !list.length || list.indexOf(value) !== -1;
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
    
    markCampaignRun(campaign);
    
    if (campaign.kind === "script") {
      renderScript(campaign);
      return;
    }
    
    
  }

  

  function run() {
    var device = detectDevice();
    var system = detectSystem();
    
    
    
    
    
    
    
    var candidates = config.campaigns.filter(function (campaign) {
      return true
        
        && includes(campaign.devices, device)
        && includes(campaign.systems, system)
        
        
        
        
        
        
        
        && !frequencyBlocked(campaign)
        ;
    });
    if (!candidates.length) return;
    
    var picked = candidates[0];
    
    executeCampaign(picked);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
})();
