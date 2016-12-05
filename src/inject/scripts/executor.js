(function() {
  'use strict';

  function init() {
    if(!window.location.pathname.startsWith('/kata') || !window.location.pathname.endsWith('/javascript')) {
      return;
    }

    var blob = new Blob([window.workerSrc], {type: 'application/javascript'});
    var worker;
    var running;

    var validateBtn = document.querySelector('#validate_btn');
    var browserExecBtn = document.createElement('a');
    browserExecBtn.className = validateBtn.className;
    browserExecBtn.id = 'run_in_browser';
    browserExecBtn.innerHTML = 'Run in browser';

    browserExecBtn.addEventListener('click', function(e) {
      if(running) {
        worker.terminate();
        browserExecBtn.innerHTML = 'Run in browser';
        running = false;
        return;
      }
      e.preventDefault();

      worker = new Worker(URL.createObjectURL(blob));
      worker.onmessage = function(e) {
        if(e.data.action === 'close') {
          browserExecBtn.innerHTML = 'Run in browser';
          running = false;
        }
      };
      worker.postMessage({code: App.controller.getCode() + ';\n\n\n' + App.controller.getFixture()});
      browserExecBtn.innerHTML = 'Stop';
      running = true;
    });

    validateBtn.parentNode.insertBefore(browserExecBtn, validateBtn);
    validateBtn.remove();
    browserExecBtn.style.width = Math.ceil(browserExecBtn.getBoundingClientRect().width) + 'px';
  }

  function isInited() {
    return !!document.querySelector('#run_in_browser');
  }

  window.addEventListener("load", function() {
    setInterval(function() {
      if(!isInited()) {
        init();
      }
    }, 300);
  });
})();
