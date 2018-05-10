'use strict';

var promptText = 'www-data@jdgregson.com:~$ ';
var prompt = document.getElementById('prompt');
prompt.innerHTML = promptText;
var input = document.getElementById('input');
var cursor = document.getElementById('cursor');
var cursorPosition = 0;
var contentWrap = document.getElementById('content-wrap');
var history = [];
var selectedHistory = -1;

function moveCursor(distance) {
  cursorPosition += distance;
  cursor.style.marginLeft = -1 * (input.innerHTML.length + 1 - cursorPosition) + 'ch';
  if (cursorPosition < 0) {
    cursorPosition = 0;
    cursor.style.marginLeft = -1 * (input.innerHTML.length + 1) + 'ch';
  } else if (cursorPosition >= input.innerHTML.length) {
    cursorPosition = input.innerHTML.length;
    cursor.style.marginLeft = '-1ch';
  }
  var char = input.innerHTML[cursorPosition];
  cursor.innerHTML = char ? char : '';
}

function clearInput() {
  input.innerHTML = '';
}

function clear() {
  contentWrap.innerHTML = '';
}

function appendKey(e) {
  var content = input.innerHTML.split('');
  var key = e.key;
  content.splice(cursorPosition, 0, key);
  input.innerHTML = content.join('');
  moveCursor(1);
}

function doBackspace() {
  var content = input.innerHTML.split('');
  content.splice(cursorPosition - 1, 1);
  input.innerHTML = content.join('');
  moveCursor(-1);
}

function resetLine() {
  clearInput();
  selectedHistory = -1;
  cursorPosition = 0;
  moveCursor(0);
}

function saveHistory(item) {
  if (item) {
    history.splice(0, 0, item);
  }
}

function getHistory(item) {
  var historyItem = void 0;
  selectedHistory += item;
  if (selectedHistory < 0 || history.length < 1) {
    historyItem = '';
    selectedHistory = -1;
  } else if (selectedHistory >= history.length) {
    historyItem = history[history.length - 1];
    selectedHistory = history.length - 1;
  } else {
    historyItem = history[selectedHistory];
  }
  input.innerHTML = historyItem;
  cursorPosition = input.innerHTML.length;
}

function echo(text) {
  var echo = document.createElement('div');
  echo.innerHTML = text;
  contentWrap.appendChild(echo);
}

function executeCommand() {
  var c = void 0;
  var args = void 0;
  var command = input.innerHTML;
  echo('' + promptText + command);
  saveHistory(command);
  resetLine();

  if (command.indexOf(' ') > -1) {
    c = command.substr(0, command.indexOf(' '));
    args = command.substr(command.indexOf(' ') + 1);
  } else {
    c = command;
    args = undefined;
  }
  if (eval('typeof ' + c) === 'function') {
    var result = eval(c + '(\'' + args + '\')');
    if (result) {
      echo(result);
    }
  } else {
    echo(c + ': ' + strings.command_not_found);
  }
}

function parseKey(e) {
  var key = e.key.toLowerCase();
  if (key === 'enter') {
    executeCommand();
  } else if (key === 'backspace') {
    doBackspace();
  } else if (key === 'arrowleft' || key === 'left') {
    moveCursor(-1);
  } else if (key === 'arrowright' || key === 'right') {
    moveCursor(1);
  } else if (key === 'arrowup' || key === 'up') {
    getHistory(1);
  } else if (key === 'arrowdown' || key === 'down') {
    getHistory(-1);
  } else if (key === 'spacebar') {
    appendKey({ key: ' ' });
  } else if (key.length > 1) {
    // ignore for now...
  } else {
    appendKey(e);
  }
}

window.addEventListener('keydown', function (e) {
  parseKey(e);
});