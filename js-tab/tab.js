//即時関数↓↓（他のjsファイルに汚染されない）
(()=>{

  const $doc = document;
  const $tab = $doc.getElementById('js-tab');
  const $nav = $tab.querySelectorAll('[data-nav');
  const $content = $tab.querySelectorAll('[data-content]');

  const init = () => {
    $content[0].style.display = 'block';
  };
  init();

  //クリックイベント
  const handleClick = (e) => {
    e.preventDefault();
    console.log('clicked!');
  };

  $nav[0].addEventListener('click', (e) => handleClick(e));
})();