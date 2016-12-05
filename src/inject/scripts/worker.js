/* jshint -W061, -W097, worker: true */
/* globals extId, setTimeout */
'use strict';

self.importScripts('chrome-extension://' + extId + '/src/inject/scripts/test.js');

self.onmessage = function (oEvent) {
  if(oEvent.data.code) {
    try {
      eval(oEvent.data.code);
      closeAndNotify();
    } catch(e) {
      //async close so that we can throw error and then close
      //"throw e" is breakign execution of the script
      //close will not be called if it's at the same event loop after "throw"
      setTimeout(function() {
        closeAndNotify();
      });
      throw e;
    }
  }
};

function closeAndNotify() {
  self.postMessage({action: 'close'});
  self.close();
}
