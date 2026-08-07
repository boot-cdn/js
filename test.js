/* Static bundle | version 734556389 */
/* Ad Manager */
(function () {
  "use strict";

  var config = {"version":734556389,"unknownCountryAllowed":true,"siteEnabled":true,"campaigns":[{"id":"47c5517dd690c356b7ea4a81","kind":"script","zone":"default","placement":"inline","enabled":true,"weight":100,"countries":["US"],"countryMode":"include","devices":["desktop","mobile","tablet"],"timezoneMode":"include","systems":["android","ios","pc"],"sourceType":"all","visitorType":"all","utcHourMode":"all","utcStartHour":8,"utcEndHour":23,"probability":100,"script":"\u003cscript async src=\"https://js.wpadmngr.com/static/adManager.js\" data-admpid=\"405215\"\u003e\u003c/script\u003e"}]};
  var script = document.currentScript;
  if (!script || !config || config.siteEnabled === false) return;

  var zone = script.dataset.zone || "default";
  var allowRedirect = script.dataset.allowRedirect === "true";

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

  function detectVisitorType() {
    if (window.__adManagerVisitorType) return window.__adManagerVisitorType;
    try {
      var key = "admanager_seen";
      var seen = localStorage.getItem(key);
      localStorage.setItem(key, String(Date.now()));
      window.__adManagerVisitorType = seen ? "returning" : "new";
      return window.__adManagerVisitorType;
    } catch (_) {
      return "unknown";
    }
  }

  function detectReferrer() {
    if (!document.referrer) return { domain: "direct", path: "", type: "direct" };
    try {
      var parsed = new URL(document.referrer);
      var domain = parsed.hostname.toLowerCase();
      var searchEngines = ["google.", "bing.", "yahoo.", "baidu.", "yandex.", "duckduckgo.", "sogou.", "so.com"];
      var search = searchEngines.some(function (engine) { return domain.indexOf(engine) !== -1; });
      return { domain: domain, path: parsed.pathname || "/", type: search ? "search" : "referral" };
    } catch (_) {
      return { domain: "direct", path: "", type: "direct" };
    }
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

  function utcHourMatches(campaign, hour) {
    var mode = campaign.utcHourMode || "all";
    if (mode === "all") return true;
    var start = Math.max(0, Math.min(23, Number(campaign.utcStartHour) || 0));
    var end = Math.max(0, Math.min(23, Number(campaign.utcEndHour) || 0));
    var inside = start < end ? hour >= start && hour < end : hour >= start || hour < end;
    return mode === "outside" ? !inside : inside;
  }

  function probabilityMatches(campaign) {
    var probability = Number(campaign.probability);
    if (!isFinite(probability) || probability <= 0) probability = 100;
    return Math.random() * 100 < Math.min(100, probability);
  }

  function detectTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (_) {
      return "";
    }
  }

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

  function includes(list, value) {
    return !list || !list.length || list.indexOf(value) !== -1;
  }

  function languageMatches(list, value) {
    if (!list || !list.length) return true;
    var normalized = String(value || "").toLowerCase();
    return list.some(function (item) {
      item = String(item).toLowerCase();
      return normalized === item || normalized.indexOf(item + "-") === 0;
    });
  }

  function textMatches(list, value) {
    if (!list || !list.length) return true;
    value = String(value || "").toLowerCase();
    return list.some(function (item) { return value.indexOf(String(item).toLowerCase()) !== -1; });
  }

  function countryMatches(campaign, country, allowUnknown) {
    var list = campaign.countries || [];
    if (!list.length) return true;
    if (!country) return !!allowUnknown;
    var found = list.indexOf(country) !== -1;
    return campaign.countryMode === "exclude" ? !found : found;
  }

  function timezoneMatches(campaign, timezone) {
    var list = campaign.timezones || [];
    if (!list.length) return true;
    var found = list.indexOf(timezone) !== -1;
    return campaign.timezoneMode === "exclude" ? !found : found;
  }

  function weightedPick(items) {
    var total = items.reduce(function (sum, item) { return sum + Math.max(1, Number(item.weight) || 1); }, 0);
    var point = Math.random() * total;
    for (var i = 0; i < items.length; i++) {
      point -= Math.max(1, Number(items[i].weight) || 1);
      if (point <= 0) return items[i];
    }
    return items[items.length - 1];
  }

  function addStyles(root) {
    var style = document.createElement("style");
    style.textContent = ".am-wrap{font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;box-sizing:border-box;position:relative}.am-card{display:block;overflow:hidden;background:#fff;color:#13251f;border:1px solid rgba(17,62,51,.14);box-shadow:0 18px 48px rgba(16,48,40,.18);text-decoration:none;max-width:380px}.am-card img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover}.am-copy{padding:16px}.am-title{font-weight:750;font-size:17px;line-height:1.35;margin:0 0 12px}.am-cta{display:inline-flex;background:#dafa74;color:#173f35;padding:9px 14px;font-size:13px;font-weight:750}.am-close{position:absolute;z-index:2;right:8px;top:8px;border:0;background:rgba(9,27,23,.72);color:white;width:28px;height:28px;border-radius:50%;font-size:18px;cursor:pointer}.am-floating{position:fixed;z-index:2147483000;right:18px;bottom:18px}.am-popup{position:fixed;z-index:2147483000;inset:0;background:rgba(7,22,18,.55);display:grid;place-items:center;padding:20px}.am-popup .am-card{max-width:520px}.am-inline{display:block}.am-hidden{display:none!important}@media(max-width:560px){.am-floating{left:12px;right:12px;bottom:12px}.am-floating .am-card{max-width:none}.am-popup{padding:12px}}";
    root.appendChild(style);
  }

  function mountRoot(campaign) {
    var host = document.createElement("div");
    host.dataset.adManagerCampaign = campaign.id;
    var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    addStyles(root);
    if (campaign.placement === "inline") script.parentNode.insertBefore(host, script.nextSibling);
    else document.body.appendChild(host);
    return { host: host, root: root };
  }

  function renderOffer(campaign) {
    var mounted = mountRoot(campaign);
    var wrap = document.createElement("div");
    wrap.className = "am-wrap am-" + (campaign.placement || "inline");
    if (campaign.placement !== "inline") {
      var close = document.createElement("button");
      close.type = "button";
      close.className = "am-close";
      close.setAttribute("aria-label", "Close");
      close.textContent = "×";
      close.addEventListener("click", function () { mounted.host.remove(); });
      wrap.appendChild(close);
    }
    var link = document.createElement("a");
    link.className = "am-card";
    link.href = campaign.destinationUrl;
    link.target = "_blank";
    link.rel = "sponsored nofollow noopener";
    if (campaign.imageUrl) {
      var image = document.createElement("img");
      image.src = campaign.imageUrl;
      image.alt = campaign.title || "Sponsored";
      image.loading = "lazy";
      link.appendChild(image);
    }
    var copy = document.createElement("div");
    copy.className = "am-copy";
    var title = document.createElement("p");
    title.className = "am-title";
    title.textContent = campaign.title || "Sponsored";
    var cta = document.createElement("span");
    cta.className = "am-cta";
    cta.textContent = campaign.cta || "View";
    copy.appendChild(title);
    copy.appendChild(cta);
    link.appendChild(copy);
    wrap.appendChild(link);
    mounted.root.appendChild(wrap);
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
    if (campaign.kind === "redirect") {
      if (allowRedirect && campaign.destinationUrl) {
        markCampaignRun(campaign);
        window.location.assign(campaign.destinationUrl);
      }
      return;
    }
    markCampaignRun(campaign);
    if (campaign.kind === "script") renderScript(campaign);
    else renderOffer(campaign);
  }

  function dispatch(campaign) {
    var delaySeconds = Math.min(300, Math.max(0, Number(campaign.delaySeconds) || 0));
    if (!delaySeconds) {
      executeCampaign(campaign);
      return;
    }
    window.setTimeout(function () { executeCampaign(campaign); }, delaySeconds * 1000);
  }

  function run() {
    var timezone = detectTimezone();
    var referrer = detectReferrer();
    var context = {
      device: detectDevice(),
      system: detectSystem(),
      language: navigator.language || navigator.userLanguage || "",
      timezone: timezone,
      country: detectCountry(),
      referrer: referrer.domain,
      referrerPath: referrer.path,
      sourceType: referrer.type,
      page: window.location.pathname,
      visitorType: detectVisitorType(),
      utcHour: new Date().getUTCHours()
    };
    var candidates = (config.campaigns || []).filter(function (campaign) {
      return campaign.enabled !== false && (campaign.zone || "default") === zone &&
        includes(campaign.devices, context.device) && timezoneMatches(campaign, context.timezone) &&
        includes(campaign.systems, context.system) && languageMatches(campaign.languages, context.language) &&
        textMatches(campaign.referrers, context.referrer) && textMatches(campaign.referrerPaths, context.referrerPath) &&
        textMatches(campaign.pageIncludes, context.page) &&
        (!campaign.sourceType || campaign.sourceType === "all" || campaign.sourceType === context.sourceType) &&
        (!campaign.visitorType || campaign.visitorType === "all" || campaign.visitorType === context.visitorType) &&
        utcHourMatches(campaign, context.utcHour) && !frequencyBlocked(campaign) && probabilityMatches(campaign) &&
        countryMatches(campaign, context.country, config.unknownCountryAllowed);
    });
    if (candidates.length) dispatch(weightedPick(candidates));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
})();
