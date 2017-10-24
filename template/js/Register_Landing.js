let slideCount = 0;

$(document).ready(() => {
  const favDesc1 = document.getElementById('favDesc1');
  favDesc1.innerHTML = '<h3>favDesc1</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
  const favDesc2 = document.getElementById('favDesc2');
  favDesc2.innerHTML = '<h3>favDesc2</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
  const favDesc3 = document.getElementById('favDesc3');
  favDesc3.innerHTML = '<h3>favDesc3</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';

  const favPic1 = '../images/background.png';
  document.getElementById('favPic1').setAttribute('src', favPic1);
  const favPic2 = '../images/pounded_yam.jpg';
  document.getElementById('favPic2').setAttribute('src', favPic2);
  const favPic3 = '../images/wings-bbq.jpg';
  document.getElementById('favPic3').setAttribute('src', favPic3);

  const favRev1 = document.getElementById('favRev1');
  favRev1.innerHTML = '<h3>fav1Rev1</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
  const favRev2 = document.getElementById('favRev2');
  favRev2.innerHTML = '<h3>fav1Rev2</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
  const favRev3 = document.getElementById('favRev3');
  favRev3.innerHTML = '<h3>fav1Rev3</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';

  const changeRevSet = function () {
    const rem = slideCount % 3;
    switch (rem) {
      case 0:
        favRev1.innerHTML = '<h3>fav1Rev1</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
        favRev2.innerHTML = '<h3>fav1Rev2</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
        favRev3.innerHTML = '<h3>fav1Rev3</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
        break;
      case 1:
        favRev1.innerHTML = '<h3>fav2Rev1</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
        favRev2.innerHTML = '<h3>fav2Rev2</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
        favRev3.innerHTML = '<h3>fav2Rev3</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
        break;
      case 2:
        favRev1.innerHTML = '<h3>fav3Rev1</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
        favRev2.innerHTML = '<h3>fav3Rev2</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
        favRev3.innerHTML = '<h3>fav3Rev3</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
        break;
    }
  };

  const carousel1prev = document.getElementById('carousel1').getElementsByClassName('carousel-control-prev')[0];
  const carousel2prev = document.getElementById('carousel2').getElementsByClassName('carousel-control-prev')[0];
  carousel1prev.onclick = function () {
    // do something…
    $('#carousel1').carousel('prev');
    $('#carousel2').carousel('prev');
  };
  carousel2prev.onclick = function () {
    // do something…
    $('#carousel1').carousel('prev');
    $('#carousel2').carousel('prev');
  };

  const carousel1next = document.getElementById('carousel1').getElementsByClassName('carousel-control-next')[0];
  const carousel2next = document.getElementById('carousel2').getElementsByClassName('carousel-control-next')[0];
  carousel1next.onclick = function () {
    // do something…
    $('#carousel1').carousel('next');
    $('#carousel2').carousel('next');
  };
  carousel2next.onclick = function () {
    // do something…
    $('#carousel1').carousel('next');
    $('#carousel2').carousel('next');
  };
  $('#carousel1').on('slide.bs.carousel', () => {
    // do something…
    slideCount += 1;
    changeRevSet();
  });
  $('#carousel2').on('slide.bs.carousel', () => {
    // do something…
    changeRevSet();
  });
});

function scrollToAnchor(aid) {
  // future technology : working draft
  // document.getElementById(aid).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });

  const body = $('html, body');
  const Tag = $(aid);
  const navbar = $('#navbar');
  body.animate({ scrollTop: Tag.offset().top - navbar.innerHeight() }, { duration: 500 });
}

function onScrollStopped(domElement, callback) {
  domElement.addEventListener('scroll', debounce(callback, 250));
}

window.onscroll = function () { scrollFunction(); };
document.getElementById('favView').onmouseover = function () {
  $('#carousel1').carousel('pause');
  $('#carousel2').carousel('pause');
  $('#carousel3').carousel('pause');
};
document.getElementById('favView').onmouseleave = function () {
  $('#carousel1').carousel('cycle');
  $('#carousel2').carousel('cycle');
  $('#carousel3').carousel('cycle');
};

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    // $('#navbar')[0].classList.add('navbarColor');
    if (screen.width > 500) document.getElementById('navbar').setAttribute('style', 'visibility: visible');
    document.getElementById('navbar').classList.add('navbarColor');
  } else {
    if (screen.width > 500) document.getElementById('navbar').setAttribute('style', 'visibility: visible');
    document.getElementById('navbar').classList.remove('navbarColor');
  }
}

onScrollStopped(window, () => {
  if (screen.width > 500) {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
      document.getElementById('navbar').setAttribute('style', 'visibility: hidden');
    } else {
      document.getElementById('navbar').setAttribute('style', 'visibility: visible');
    }
  }
});

function searchRecipes() {
  const x = document.getElementById('Home');
  const href = document.createAttribute('href');
  href.value = '../views/Register_login.html';
  x.attributes.setNamedItem(href);
  x.click();
}

function addOne() {
  const e = event.srcElement;
  e.innerHTML = parseInt(event.srcElement.innerHTML, 10) + 1;
  e.removeAttribute('onclick');
  const inner = document.createElement('i');
  inner.setAttribute('class', 'fa fa-undo');
  inner.setAttribute('onclick', 'minusOne()');
  inner.innerHTML = '';
  e.appendChild(inner);
}

function minusOne() {
  const e = event.srcElement.parentElement;
  e.innerHTML = parseInt(e.innerHTML, 10) - 1;
  e.setAttribute('onclick', 'addOne()');
}

document.body.addEventListener('mousemove', (event) => {
  if (screen.width > 500) {
    // Check if we are in the top area of the page.
    if (event.screenY > 400) {
      document.getElementById('navbar').setAttribute('style', 'visibility: hidden');
    } else {
      document.getElementById('navbar').setAttribute('style', 'visibility: visible');
    }
  }
});

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this, args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
