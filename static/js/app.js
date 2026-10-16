(function () {
  document.addEventListener('click', function (e) {
    var eye = e.target.closest('[data-eye]');
    if (eye) {
      var inp = eye.parentElement.querySelector('input');
      var show = inp.type === 'password';
      inp.type = show ? 'text' : 'password';
      eye.classList.toggle('on', show);
      return;
    }
    var op = e.target.closest('[data-open]');
    if (op) { var d = document.getElementById(op.dataset.open); if (d) d.showModal(); return; }
    if (e.target.closest('[data-close]')) { e.target.closest('dialog').close(); return; }
    if (e.target.tagName === 'DIALOG') e.target.close();
    var lang = document.querySelector('details.lang[open]');
    if (lang && !e.target.closest('details.lang')) lang.removeAttribute('open');
  });

  document.querySelectorAll('[data-fname]').forEach(function (inp) {
    inp.addEventListener('change', function () {
      var box = inp.closest('.drop'), n = inp.files.length;
      box.querySelector('.fname').textContent = n > 1 ? n + ' файлов' : (n ? inp.files[0].name : box.querySelector('.fname').textContent);
      box.classList.toggle('has', n > 0);
    });
  });

  // выбор страны + телефонный код
  var list = document.getElementById('clist');
  if (list) {
    var hid = document.getElementById('country'), dlg = document.getElementById('cdlg');
    function pick(b) {
      hid.value = b.dataset.iso;
      document.getElementById('cflag').textContent = b.dataset.flag;
      document.getElementById('cname').textContent = b.dataset.name;
      document.getElementById('dial').textContent = b.dataset.dial;
    }
    list.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-iso]');
      if (b) { pick(b); dlg.close(); }
    });
    var cur = list.querySelector('button[data-iso="' + hid.value + '"]') || list.querySelector('button');
    if (cur) pick(cur);
    document.getElementById('csearch').addEventListener('input', function () {
      var q = this.value.toLowerCase().trim();
      list.querySelectorAll('li').forEach(function (li) {
        var b = li.firstElementChild;
        li.classList.toggle('hide', q && (b.dataset.name.toLowerCase().indexOf(q) < 0 && b.dataset.dial.indexOf(q) < 0));
      });
    });
  }

  // таймер 10 часов
  document.querySelectorAll('[data-countdown]').forEach(function (el) {
    var left = parseInt(el.dataset.countdown, 10);
    function tick() {
      if (left <= 0) { location.reload(); return; }
      var h = Math.floor(left / 3600), m = Math.floor(left % 3600 / 60), s = left % 60;
      el.textContent = [h, m, s].map(function (x) { return String(x).padStart(2, '0'); }).join(':');
      left--;
    }
    tick(); setInterval(tick, 1000);
  });
})();
