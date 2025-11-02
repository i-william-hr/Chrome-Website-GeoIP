const API_BASE = "http://SERVER:5050";

function extractHostname(urlStr) {
  try { return new URL(urlStr).hostname; } catch { return null; }
}

async function fetchCountryForHost(hostname) {
  try {
    const resp = await fetch(`${API_BASE}/ipinfo?host=${encodeURIComponent(hostname)}`);
    if (!resp.ok) throw new Error("server not ok");
    return await resp.json();
  } catch (e) {
    console.warn("fetchCountryForHost error:", e);
    return null;
  }
}

async function updateBadge(tabId, url) {
  const hostname = extractHostname(url);
  if (!hostname) return;
  const data = await fetchCountryForHost(hostname);
  const code = (data?.country_code || "??").toUpperCase();
  chrome.action.setBadgeText({ text: code, tabId });
  chrome.action.setBadgeBackgroundColor({ color: "#333", tabId });
}

chrome.tabs.onActivated.addListener(async (info) => {
  const tab = await chrome.tabs.get(info.tabId);
  if (tab?.url) updateBadge(info.tabId, tab.url);
});
chrome.tabs.onUpdated.addListener((id, info, tab) => {
  if (info.status === "complete" && tab?.url) updateBadge(id, tab.url);
});
