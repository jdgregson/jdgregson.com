let promptText = 'www-data@jdgregson.com:~$ ';
let prompt = document.getElementById('prompt');
prompt.innerHTML = promptText;
let input = document.getElementById('input');
let cursor = document.getElementById('cursor');
let cursorPosition = 0;
let contentWrap = document.getElementById('content-wrap');
let historyList = [];
let selectedHistory = -1;
let cwd = '/home/jdgregson/htdocs/jdgregson.com/html';
let isTyping = false;


function moveCursor(distance) {
  cursorPosition += distance;
  cursor.style.marginLeft = (-1*(input.innerHTML.length+1-cursorPosition))+'ch';
  if(cursorPosition < 0) {
    cursorPosition = 0;
    cursor.style.marginLeft = (-1 * (input.innerHTML.length+1)) + 'ch';
  } else if(cursorPosition >= input.innerHTML.length) {
    cursorPosition = input.innerHTML.length;
    cursor.style.marginLeft = '-1ch';
  }
  let char = input.innerHTML[cursorPosition];
  cursor.innerHTML = char?char:'';
}


function clearInput() {
  input.innerHTML = '';
}


function clear() {
  contentWrap.innerHTML = '';
}


function appendKey(e) {
  let content = input.innerHTML.split('');
  let key = e.key;
  content.splice(cursorPosition, 0, key);
  input.innerHTML = content.join('');
  moveCursor(1);
}


function doBackspace() {
  let content = input.innerHTML.split('');
  content.splice(cursorPosition-1, 1);
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
  if(item) {
    historyList.splice(0, 0, item);
  }
  try {
    localStorage.setItem('history', JSON.stringify(historyList));
  } catch(e) {
  }
}


function loadHistory() {
  let h = localStorage.getItem('history');
  if(h) {
    historyList = JSON.parse(h);
  }
}


function getHistory(item) {
  let historyItem;
  selectedHistory += item;
  if(selectedHistory < 0 || historyList.length < 1) {
    historyItem = '';
    selectedHistory = -1;
  } else if(selectedHistory >= historyList.length) {
    historyItem = historyList[historyList.length-1];
    selectedHistory = historyList.length-1;
  } else {
    historyItem = historyList[selectedHistory];
  }
  input.innerHTML = historyItem;
  cursorPosition = input.innerHTML.length;
}


function echo(text) {
    let echo = document.createElement('div');
    echo.innerHTML = text;
    contentWrap.appendChild(echo);
}


function cursorOn() {
  let _class = cursor.getAttribute('class');
  cursor.setAttribute('class', _class.replace(/ blink/g, ''));
}


function cursorOff() {
  let _class = cursor.getAttribute('class');
  cursor.setAttribute('class', `${_class} blink`);
}


function cursorToggle() {
  let _class = cursor.getAttribute('class');
  if(_class.indexOf('blink') > -1) {
    cursorOn();
  } else {
    cursorOff();
  }
}


function executeCommand() {
  let c;
  let args;
  let command = input.innerHTML;
  echo(`${promptText}${command}`);
  saveHistory(command);
  resetLine();

  if(!command) {
    return;
  } else if(command.indexOf(' ') > -1) {
    c = command.substr(0, command.indexOf(' '));
    args = command.substr(command.indexOf(' ')+1);
  } else {
    c = command;
    args = undefined;
  }
  if(eval(`typeof ${c}`) === 'function') {
    let result = eval(`${c}('${args}')`);
    if(result) {
      echo(result);
    }
  } else if(denied_commands.indexOf(c) > -1) {
    echo(`${c}: ${strings.permission_denied}`);
  } else {
    echo(`${c}: ${strings.command_not_found}`);
  }
}


function parseKey(e) {
  let key = e.key.toLowerCase();
  if(key === 'enter') {
    executeCommand();
  } else if(key === 'backspace') {
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
    appendKey({key: ' '});
  } else if(key.length > 1) {
    // ignore for now...
  } else {
    appendKey(e);
  }

  scrollTo(0, parseInt(getComputedStyle(contentWrap).height));
}


window.addEventListener('keydown', (e) => {
  cursorOn();
  isTyping = true;
  self.setTimeout(() => {isTyping = false;}, 1000);
  parseKey(e);
});


let cursorTimer = self.setInterval(() => {
  if(!isTyping) {
    cursorToggle();
  }
}, 500);


window.addEventListener('load', () => {
  loadHistory();
  input.innerHTML = 'about';
  executeCommand();
});