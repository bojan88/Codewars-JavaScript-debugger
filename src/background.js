var tabId;

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name !== "cw-devtools-page" || port.sender.id !== chrome.runtime.id) {
    return;
  }

  chrome.tabs.query({active: true}, function(tabs) {
    if(tabs && tabs.length > 0 && tabs[0].url.match(/https?:\/\/(www.)?codewars.com\/kata\/.+\/javascript/)) {
      tabId = tabs[0].id;

      chrome.tabs.sendMessage(tabId, {
        action: 'init',
        source: 'cw-dev-tools-msg'
      });

      port.onDisconnect.addListener(function(port) {
        chrome.tabs.sendMessage(tabId, {
          action: 'clean',
          source: 'cw-dev-tools-msg'
        });
      });
    }
  });
});
