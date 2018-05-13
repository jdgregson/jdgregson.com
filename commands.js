function about() {
    return strings.about;
}

function motd() {
    return strings.about;
}

function whoami() {
    return strings.whoami;
}

function pwd(args) {
  return cwd;
}

function ls(args) {
  let path = args;
  switch(path) {
    case '':
    case undefined:
    case 'undefined':
    case '.':
      return 'index.php db-config.php mysql-passwords.txt';
    case '/':
      return 'bin boot dev etc home initrd lib lost+found mnt opt proc root ' +
          'sbin tmp usr var';
    default:
      return `ls: ${path}: ${strings.no_such_file}`;
  }
}

function cat(args) {
    switch(args) {
        case '/etc/passwd':
            return strings.etc_passwd;
        default:
            return `cat: ${args}: ${strings.no_such_file}`;
    }
}

function history(args) {
  let h = historyList.reverse();
  let len = (h.length).toString().length;
  let output = '<pre>';
  for(let i=0; i<h.length-1; i++) {
    output += `${((i+1).toString()).padStart(len, ' ')}  ${h[i]}\n`;
  }
  output += '</pre>';
  echo(output);
  historyList.reverse();
}

let denied_commands = ('vi vim emacs nano cd cat dog sl service systemctl apt '+
    'apt-get yum make install ./configure su sudo chmod chown del rm nc '+
    'netcat').split(' ');