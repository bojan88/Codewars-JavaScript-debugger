var tabId;

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "devtools-page" &&
      port.sender.tab &&
      port.sender.tab.title.match(/Developer Tools.*https?:\/\/(www.)?codewars.com\/kata\/.+\/javascript/)) {

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
