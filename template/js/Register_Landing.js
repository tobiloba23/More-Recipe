let slideCount = 0;
let chkSlideCount = 0;

$(document).ready(() => {
  const favDesc1 = document.getElementById('favDesc1');
  favDesc1.innerHTML = '<h3>Pasta</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
  const favDesc2 = document.getElementById('favDesc2');
  favDesc2.innerHTML = '<h3>Pounded Yam</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';
  const favDesc3 = document.getElementById('favDesc3');
  favDesc3.innerHTML = '<h3>BBQ Wings</h3> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus.</p>';

  const favPic1 = '../images/background.png';
  document.getElementById('favPic1').setAttribute('src', favPic1);
  const favPic2 = '../images/pounded_yam.jpg';
  document.getElementById('favPic2').setAttribute('src', favPic2);
  const favPic3 = '../images/wings-bbq.jpg';
  document.getElementById('favPic3').setAttribute('src', favPic3);

  const favRev1 = document.getElementById('favRev1');
  favRev1.innerHTML = '<i>"The pasta Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- Michaelangelo</h3>';
  const favRev2 = document.getElementById('favRev2');
  favRev2.innerHTML = '<i>"The pasta Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- Dominiq</h3>';
  const favRev3 = document.getElementById('favRev3');
  favRev3.innerHTML = '<i>"The pasta Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- Juwon</h3>';

  const changeRevSet = () => {
    let rem = slideCount % 3;
    if (rem < 0) rem = 3 + rem;
    switch (rem) {
      case 0:
        favRev1.innerHTML = '<i>"The pasta Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- Michaelangelo</h3>';
        favRev2.innerHTML = '<i>"The pasta Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- Dominiq</h3>';
        favRev3.innerHTML = '<i>"The pasta Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- Juwon</h3>';
        break;
      case 1:
        favRev1.innerHTML = '<i>"The pounded yam Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- Anuoluwa</h3>';
        favRev2.innerHTML = '<i>"The pounded yam Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- Adams49</h3>';
        favRev3.innerHTML = '<i>"The pounded yam Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- BabaCash</h3>';
        break;
      case 2:
        favRev1.innerHTML = '<i>"The chicken wings Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- Rickie</h3>';
        favRev2.innerHTML = '<i>"The chicken wings Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- papikay</h3>';
        favRev3.innerHTML = '<i>"The chicken wings Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."</p> <h3>- GraciousJane</h3>';
        break;
      default:
        break;
    }
  };

  const carousel1prev = document.getElementById('carousel1').getElementsByClassName('carousel-control-prev')[0];
  const carousel2prev = document.getElementById('carousel2').getElementsByClassName('carousel-control-prev')[0];
  carousel1prev.onclick = () => {
    // do something…
    if (slideCount === chkSlideCount) {
      slideCount -= 1;
    }
    if (slideCount !== chkSlideCount) {
      $('#carousel1').carousel('prev');
      $('#carousel2').carousel('prev');
      changeRevSet();
      chkSlideCount = slideCount;
    }
  };
  carousel2prev.onclick = () => {
    // do something…
    if (slideCount === chkSlideCount) {
      slideCount -= 1;
    }
    if (slideCount !== chkSlideCount) {
      $('#carousel1').carousel('prev');
      $('#carousel2').carousel('prev');
      changeRevSet();
      chkSlideCount = slideCount;
    }
  };

  const carousel1next = document.getElementById('carousel1').getElementsByClassName('carousel-control-next')[0];
  const carousel2next = document.getElementById('carousel2').getElementsByClassName('carousel-control-next')[0];
  carousel1next.onclick = () => {
    // do something…
    if (slideCount === chkSlideCount) {
      slideCount += 1;
    }
    if (slideCount !== chkSlideCount) {
      $('#carousel1').carousel('next');
      $('#carousel2').carousel('next');
      changeRevSet();
      chkSlideCount = slideCount;
    }
  };
  carousel2next.onclick = () => {
    // do something…
    if (slideCount === chkSlideCount) {
      slideCount += 1;
    }
    if (slideCount !== chkSlideCount) {
      $('#carousel1').carousel('next');
      $('#carousel2').carousel('next');
      changeRevSet();
      chkSlideCount = slideCount;
    }
  };
  $('#carousel1').on('slide.bs.carousel', () => {
    // do something…
    if (slideCount === chkSlideCount) {
      slideCount += 1;
      changeRevSet();
      chkSlideCount = slideCount;
    }
  });
});

window.onscroll = () => { scrollFunction(); };
document.getElementById('favView').onmouseover = () => {
  $('#carousel1').carousel('pause');
  $('#carousel2').carousel('pause');
  $('#carousel3').carousel('pause');
};
document.getElementById('favView').onmouseleave = () => {
  $('#carousel1').carousel('cycle');
  $('#carousel2').carousel('cycle');
  $('#carousel3').carousel('cycle');
};

onScrollStopped(window, () => {
  if (screen.width > 500) {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
      document.getElementById('navbar').setAttribute('style', 'visibility: hidden');
    } else {
      document.getElementById('navbar').setAttribute('style', 'visibility: visible');
    }
  }
});

function seeMore() {
  const pageTwo = document.getElementById('pageTwo');
  pageTwo.style.display = 'block';
  const seeMore1 = document.getElementById('seeMore1');
  seeMore1.style.display = 'none';
}

function scrollToAnchor(aid) {
// future technology : working draft
//   document.getElementById(aid).scrollIntoView({
//     behavior: 'smooth', block: 'center', inline: 'start'
//   });

  const body = $('html, body');
  const Tag = $(aid);
  const navbar = $('#navbar');
  body.animate({ scrollTop: Tag.offset().top - navbar.innerHeight() }, { duration: 500 });
}

function onScrollStopped(domElement, callback) {
  domElement.addEventListener('scroll', debounce(callback, 250));
}

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    // $('#navbar')[0].classList.add('navbarColor');
    if (screen.width > 500) document.getElementById('navbar').setAttribute('style', 'visibility: visible');
    document.getElementById('navbar').classList.add('navbarColor');
  } else {
    if (screen.width > 500) document.getElementById('navbar').setAttribute('style', 'visibility: visible');
    document.getElementById('navbar').classList.remove('navbarColor');
  }
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById('toTopButton').style.display = 'block';
  } else {
      document.getElementById('toTopButton').style.display = 'none';
  }
}

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
  e.setAttribute('onclick', 'minusOne()');
  e.classList.add('highlightIcon');
  const p = event.srcElement.parentElement;
  if (p.childNodes[7] !== e && p.childNodes[7].classList.contains('highlightIcon')) {
    p.childNodes[7].click();
  } else if (p.childNodes[5] !== e && p.childNodes[5].classList.contains('highlightIcon')) {
    p.childNodes[5].click();
  }
}

function minusOne() {
  const e = event.srcElement;
  e.innerHTML = parseInt(e.innerHTML, 10) - 1;
  e.setAttribute('onclick', 'addOne()');
  e.classList.remove('highlightIcon');
  const p = event.srcElement.parentElement;
  if (p.childNodes[7] !== e && p.childNodes[7].classList.contains('highlightIcon')) {
    p.childNodes[7].click();
  } else if (p.childNodes[5] !== e && p.childNodes[5].classList.contains('highlightIcon')) {
    p.childNodes[5].click();
  }
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
  return () => {
    let context = this, args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
