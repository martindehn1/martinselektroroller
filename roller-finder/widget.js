(() => {
  'use strict';
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'rk-launcher';
  launcher.setAttribute('aria-haspopup','dialog');
  launcher.setAttribute('aria-controls','rk-finder-dialog');
  launcher.innerHTML = '<span class="rk-launcher-mark" aria-hidden="true">✦</span><span class="rk-launcher-copy"><strong>Welcher Roller passt zu mir?</strong><small>5 Fragen · direkt zur Vorauswahl</small></span><span class="rk-launcher-arrow" aria-hidden="true">↗</span>';

  const dialog = document.createElement('dialog');
  dialog.className = 'rk-dialog';
  dialog.id = 'rk-finder-dialog';
  dialog.setAttribute('aria-labelledby','rk-dialog-title');
  dialog.innerHTML = '<div class="rk-dialog-head"><div><span class="rk-dialog-kicker">Rollerkompass</span><h2 id="rk-dialog-title">Finde deinen Roller</h2></div><button class="rk-dialog-close" type="button" aria-label="Beratung schließen">×</button></div><div class="rk-dialog-body"><div id="finder"></div></div>';
  document.body.append(launcher,dialog);

  let returnFocus = launcher;
  function open(event) {
    if(event) {
      if(event.type==='click' && (event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
      event.preventDefault();
    }
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : launcher;
    dialog.showModal();
    dialog.querySelector('.rk-dialog-close').focus();
  }
  launcher.addEventListener('click',open);
  document.querySelectorAll('a[data-open-finder]').forEach(link => link.addEventListener('click',open));
  dialog.querySelector('.rk-dialog-close').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',event => {if(event.target===dialog) dialog.close();});
  dialog.addEventListener('close',() => returnFocus?.focus());
  if (window.location.hash === '#roller-finder') open();
  window.addEventListener('hashchange',() => {if(window.location.hash === '#roller-finder' && !dialog.open) open();});
})();

