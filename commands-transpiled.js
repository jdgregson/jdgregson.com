'use strict';

function about() {
    return strings.about;
}

function whoami() {
    return strings.whoami;
}

function cat(args) {
    switch (args) {
        case '/etc/passwd':
            return strings.etc_passwd;
        default:
            return 'cat: ' + args + ': ' + strings.no_such_file;
    }
}

function wget(args) {
    var _this = this;

    var command = document.getElementById('input').value;
    xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', function () {
        var output = document.createElement('div');
        output.setAttribute('class', 'output');
        output.innerHTML = _this.responseText;
        var input = document.getElementById('input-wrap');
        document.body.insertBefore(output, input);
        document.getElementById('input').value = prompt;
    });
    xhttp.open('GET', BACKEND_URL + encodeURIComponent(command));
    xhttp.send();
}