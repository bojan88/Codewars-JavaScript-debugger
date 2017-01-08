/* jshint esversion: 6, browser: true */
/* globals chrome */
(function(){
  'use strict';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.runtime.getURL('/src/inject/scripts/worker.js'));
  xhr.onreadystatechange = function(){
    if(xhr.DONE !== xhr.readyState) return;

    var workerScript = document.createElement('script');
    workerScript.innerHTML = 'window.workerSrc = `var extId = "' + chrome.runtime.id + '";\n' + xhr.response + '`';

    var executorScript = document.createElement('script');
    executorScript.src = chrome.runtime.getURL('/src/inject/scripts/executor.js');

    document.body.appendChild(workerScript);
    document.body.appendChild(executorScript);
  };
  xhr.send();

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.source !== 'cw-dev-tools-msg') return;
    window.postMessage(message, window.location.origin);
  });
})();
