var backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page"
});

backgroundPageConnection.postMessage({
  action: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});
