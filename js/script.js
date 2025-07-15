/* ---------- 共通 ----------*/
// 初回アクセス時のみローディングを表示
const loader = document.getElementById('loading-screen');

if (loader) {
  if (!sessionStorage.getItem('visited')) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
        sessionStorage.setItem('visited', 'true');
      }, 6000);
    });
  } else {
    loader.style.display = 'none';
  }
}

// ハンバーガーメニュー
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// スクロールでヘッダー表示切り替え
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.remove('visible');
  } else {
    header.classList.add('visible');
  }

  lastScroll = currentScroll;
});

// 初期表示でふわっと出す
window.addEventListener('DOMContentLoaded', () => {
  header.classList.add('visible');
});

// 先頭に戻るボタン
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* ---------- トップページ ---------- */ 
if (document.body.classList.contains('top-page')) {
  // スライドショー
  const images = document.querySelectorAll('.image-container img');
  const totalImages = images.length;
  let imageIndex = 0;
  let interval;

  const navContainer = document.querySelector('.nav-container');

  if (navContainer && images.length > 0) {
    for (let i = 0; i < totalImages; i++) {
      const button = document.createElement('button');
      button.classList.add('nav-btn');
      navContainer.appendChild(button);
    }

    const buttons = document.querySelectorAll('.nav-btn');

    function updateSlider() {
      images.forEach(image => image.classList.remove('image-active'));
      buttons.forEach(button => button.classList.remove('btn-active'));
      images[imageIndex].classList.add('image-active');
      buttons[imageIndex].classList.add('btn-active');
    }

    function nextImage() {
      imageIndex = (imageIndex + 1) % totalImages;
      updateSlider();
    }

    function autoPlay() {
      interval = setInterval(nextImage, 3000);
    }

    function resetInterval() {
      clearInterval(interval);
      autoPlay();
    }

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        imageIndex = index;
        updateSlider();
        resetInterval();
      });
    });

    updateSlider();
    autoPlay();
  }

  // 今日のひとこと
  const quotes = [
    '今日もたっぷりお昼寝するワン！',
    '今日はお散歩日和だワン！',
    'ごはんの時間はまだかワン？',
    '追いかけっこしたい気分！',
    '寒い日はこたつで丸くなるワン...',
    '暑くて溶けそうだワン...',
    '今日もハッピーな一日になりそうだワン！',
    'チーズケーキが食べたいワン！',
    '今日のオイラ、イケてるかも！',
    '焦りは禁物だワン！'
  ];

  const quoteElement = document.getElementById('sasuke-quote');
  if (quoteElement) {
    quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  }
}

/* ---------- プロフィールページ ----------*/
if (document.body.classList.contains('profile-page')) {
  const profileItems = [
    { img: 'images/profile/name-thumb.jpg', fullImg: 'images/profile/name-thumb.jpg', desc: 'オイラの名前はサスケだワン！' },
    { img: 'images/profile/birthday-thumb.jpg', fullImg: 'images/profile/birthday-thumb.jpg', desc: '誕生日は2007年9月5日だワン！' },
    { img: 'images/profile/food-thumb.jpg', fullImg: 'images/profile/food-thumb.jpg', desc: '好きな食べ物はチーズとお芋と鶏肉だワン！' },
    { img: 'images/profile/like-thumb.jpg', fullImg: 'images/profile/like-thumb.jpg', desc: 'お昼寝とお散歩が大好きだワン！' },
    { img: 'images/profile/dislike-thumb.jpg', fullImg: 'images/profile/dislike-thumb.jpg', desc: 'お風呂は苦手だワン…' },
    { img: 'images/profile/feature-thumb.jpg', fullImg: 'images/profile/feature-thumb.jpg', desc: '胸の十文字模様がチャームポイントだワン！' }
  ];

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;

  document.querySelectorAll('.thumb-img img').forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showModal();
    });
  });

  function showModal() {
    modal.classList.add('show');
    modalImg.src = profileItems[currentIndex].fullImg;
    modalDesc.textContent = profileItems[currentIndex].desc;
  }

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + profileItems.length) % profileItems.length;
    showModal();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % profileItems.length;
    showModal();
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show'); 
    }
  });
}

/* ---------- 成長記録 ----------*/
if (document.body.classList.contains('growth-page')) {
  const growthItems = [
    { img: 'images/growth/0year.jpg', fullImg: 'images/growth/0year.jpg', desc: 'まだちょっと緊張するワン・・・' },
    { img: 'images/growth/1year.jpg', fullImg: 'images/growth/1year.jpg', desc: 'いつもごはんありがとうだワン！' },
    { img: 'images/growth/2year.jpg', fullImg: 'images/growth/2year.jpg', desc: '中庭で日向ぼっこするワン！' },
    { img: 'images/growth/3year.jpg', fullImg: 'images/growth/3year.jpg', desc: '上目遣いで甘えるのは得意だワン！' },
    { img: 'images/growth/4year.jpg', fullImg: 'images/growth/4year.jpg', desc: '寂しがり屋だからひとりぼっちは悲しいワン・・・' },
    { img: 'images/growth/5year.jpg', fullImg: 'images/growth/5year.jpg', desc: 'お兄ちゃんのお布団を温めるのはオイラの仕事だワン！' },
    { img: 'images/growth/6year.jpg', fullImg: 'images/growth/6year.jpg', desc: '今日のわんこを見るのが朝のルーティーンだワン！' },
    { img: 'images/growth/7year.jpg', fullImg: 'images/growth/7year.jpg', desc: '初めての雪でドキドキだワン！' },
    { img: 'images/growth/8year.jpg', fullImg: 'images/growth/8year.jpg', desc: '散歩はまだだワン？' },
    { img: 'images/growth/9year.jpg', fullImg: 'images/growth/9year.jpg', desc: '冬はこたつで丸くなるのが一番だワン！' },
    { img: 'images/growth/10year.jpg', fullImg: 'images/growth/10year.jpg', desc: '指がふやけるまでペロペロするワン！' },
    { img: 'images/growth/11year.jpg', fullImg: 'images/growth/11year.jpg', desc: '日本犬には座布団が一番だワン！' },
    { img: 'images/growth/12year.jpg', fullImg: 'images/growth/12year.jpg', desc: '写真？それなら決め顔するワン（どや顔）' },
    { img: 'images/growth/13year.jpg', fullImg: 'images/growth/13year.jpg', desc: 'オイラももうおじいちゃんだワン・・・' },
    { img: 'images/growth/14year.jpg', fullImg: 'images/growth/14year.jpg', desc: '誕生日にチーズケーキ嬉しいワン！' }
  ];

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;

  document.querySelectorAll('.thumb-img img').forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showModal();
    });
  });

  function showModal() {
    modal.classList.add('show');
    modalImg.src = growthItems[currentIndex].fullImg;
    modalDesc.textContent = growthItems[currentIndex].desc;
  }

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + growthItems.length) % growthItems.length;
    showModal();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % growthItems.length;
    showModal();
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show'); 
    }
  });
}

/* ---------- アルバムページ ---------- */
if (document.body.classList.contains('album-page')) {
  const albums = {
    smile: [
      { img: 'images/albums/smile1.jpg' },
      { img: 'images/albums/smile2.jpg' },
      { img: 'images/albums/smile3.jpg' },
      { img: 'images/albums/smile4.jpg' },
      { img: 'images/albums/smile5.jpg' },
      { img: 'images/albums/smile6.jpg' },
      { img: 'images/albums/smile7.jpg' },
      { img: 'images/albums/smile8.jpg' },
      { img: 'images/albums/smile9.jpg' },
      { img: 'images/albums/smile10.jpg' }
    ],
    stroll: [
      { img: 'images/albums/stroll1.jpg' },
      { img: 'images/albums/stroll2.jpg' },
      { img: 'images/albums/stroll3.jpg' },
      { img: 'images/albums/stroll4.jpg' },
      { img: 'images/albums/stroll5.jpg' },
      { img: 'images/albums/stroll6.jpg' },
      { img: 'images/albums/stroll7.jpg' },
      { img: 'images/albums/stroll8.jpg' },
      { img: 'images/albums/stroll9.jpg' },
      { img: 'images/albums/stroll10.jpg' }
    ],
    funny: [
      { img: 'images/albums/funny1.jpg' },
      { img: 'images/albums/funny2.jpg' },
      { img: 'images/albums/funny3.jpg' },
      { img: 'images/albums/funny4.jpg' },
      { img: 'images/albums/funny5.jpg' },
      { img: 'images/albums/funny6.jpg' },
      { img: 'images/albums/funny7.jpg' },
      { img: 'images/albums/funny8.jpg' },
      { img: 'images/albums/funny9.jpg' },
      { img: 'images/albums/funny10.jpg' }
    ],
    house: [
      { img: 'images/albums/house1.jpg' },
      { img: 'images/albums/house2.jpg' },
      { img: 'images/albums/house3.jpg' },
      { img: 'images/albums/house4.jpg' },
      { img: 'images/albums/house5.jpg' },
      { img: 'images/albums/house6.jpg' },
      { img: 'images/albums/house7.jpg' },
      { img: 'images/albums/house8.jpg' },
      { img: 'images/albums/house9.jpg' },
      { img: 'images/albums/house10.jpg' }
    ]
  };

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentAlbum = [];
  let currentIndex = 0;

  document.querySelectorAll('.album-cover').forEach(cover => {
    cover.addEventListener('click', () => {
      const albumKey = cover.dataset.album;
      currentAlbum = albums[albumKey];
      currentIndex = 0;
      showModal();
    });
  });

  function showModal() {
    const item = currentAlbum[currentIndex];
    modalImg.src = item.img;
    modal.classList.add('show');
  }

  function updateModal(step) {
    currentIndex = (currentIndex + step + currentAlbum.length) % currentAlbum.length;
    showModal();
  }

  prevBtn.addEventListener('click', () => updateModal(-1));
  nextBtn.addEventListener('click', () => updateModal(1));

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      modal.classList.remove('show');
    }
  });

  function updateModal(step) {
    modalImg.classList.remove('modal-img-animate-left', 'modal-img-animate-right');

    const animClass = step === -1 ? 'modal-img-animate-left' : 'modal-img-animate-right';

    void modalImg.offsetWidth;
    modalImg.classList.add(animClass);

    currentIndex = (currentIndex + step + currentAlbum.length) % currentAlbum.length;
    setTimeout(() => {
      modalImg.src = currentAlbum[currentIndex].img;
    }, 150);
  }
}