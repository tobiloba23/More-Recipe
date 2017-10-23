function showPassword(id) {
  let x = document.getElementById(id);
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
}

function signUser() {
    let x = document.getElementById('signin');
    let y = document.getElementById('signup');
    if (x.style.display === 'block') {
      x.style.display = 'none';
      y.style.display = 'block';
    } else {
        x.style.display = 'block';
        y.style.display = 'none';
    }
  }