const showPassword = (id) => {
  const x = document.getElementById(id);
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
};

const signUser = () => {
  const x = document.getElementById('signin');
  const y = document.getElementById('signup');
  if (x.style.display === 'block') {
    x.style.display = 'none';
    y.style.display = 'block';
  } else {
    x.style.display = 'block';
    y.style.display = 'none';
  }
};

