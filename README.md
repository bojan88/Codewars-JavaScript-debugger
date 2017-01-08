# Codewars JavaScript debugger

Debug your [codewars.com]() JavaScript code in browser.

## What is this?

This Chrome extension runs your JS code in your browser outputting the result to console. By opening Chrome Developer Tools you are able to debug the code.
Codewars is sending the code to their servers, which are executed in a sandboxed environment, not giving you debug ability.

By running your code in a web worker, the extension cannot block your UI. Your code with infinite loops can be terminated by just pressing a "stop" button.

## How to use

Just go to a Codewars Kata (e.g. [this one](https://www.codewars.com/kata/52aebd2423b44356b8000578/train/javascript)), start solving it, and insert `debugger;` line anywhere in solution or tests. Press F12 to open Chrome Developer Tools, and the "run examples" button will change to "run in browser". By pressing it, your code will run in a new web worker, and break on the line with debugger keyword.

## How to install

Clone or download zip and unpack, go to Settings -> More Tools -> Extensions, enable Developer mode, and click on Load unpacked extension...
