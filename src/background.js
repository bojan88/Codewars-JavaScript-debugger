var tabId;

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name !== "devtools-page" || port.sender.id !== chrome.runtime.id) {
    return;
  }

  chrome.tabs.query({active: true}, function(tabs) {
    if(tabs && tabs.length > 0 && tabs[0].url.match(/https?:\/\/(www.)?codewars.com\/kata\/.+\/javascript/)) {
      var messageHanler = function(message, sender) {
        if (message.action === "init") {
          tabId = message.tabId;
          chrome.tabs.sendMessage(tabId, {
            action: 'init',
            source: 'cw-dev-tools-msg'
          });
        }
      };

      port.onMessage.addListener(messageHanler);

      port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(messageHanler);
        chrome.tabs.sendMessage(tabId, {
          action: 'clean',
          source: 'cw-dev-tools-msg'
        });
      });
    }
  });
});
