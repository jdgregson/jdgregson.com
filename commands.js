function about() {
    return strings.about;
}


function whoami() {
    return strings.whoami;
}


function cat(args) {
    switch(args) {
        case '/etc/passwd':
            return strings.etc_passwd;
        default:
            return `cat: ${args}: ${strings.no_such_file}`;
    }
}


function wget(args) {
  let command = document.getElementById('input').value;
  xhttp = new XMLHttpRequest();
  xhttp.addEventListener('load', () => {
    let output = document.createElement('div');
    output.setAttribute('class', 'output');
    output.innerHTML = this.responseText;
    let input = document.getElementById('input-wrap');
    document.body.insertBefore(output, input);
    document.getElementById('input').value = prompt;
  });
  xhttp.open('GET', BACKEND_URL + encodeURIComponent(command));
  xhttp.send();
}let denied_commands = ('vi vim emacs nano cd cat dog sl service systemctl apt '+
let denied_commands = ('vi vim emacs nano cd cat dog sl service systemctl apt '+
    'apt-get yum make install ./configure su sudo chmod chown del rm nc '+
    'netcat').split(' ');