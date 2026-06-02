(function() {
  const lang = localStorage.getItem('lang') || 'fr';
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-fr][data-en]').forEach((el) => {
    el.textContent = lang === 'fr' ? el.dataset.fr : el.dataset.en;
  });

  window.toggleLang = function() {
    const current = localStorage.getItem('lang') || 'fr';
    const next = current === 'fr' ? 'en' : 'fr';
    localStorage.setItem('lang', next);
    document.documentElement.lang = next;

    document.querySelectorAll('[data-fr][data-en]').forEach((el) => {
      el.textContent = next === 'fr' ? el.dataset.fr : el.dataset.en;
    });
  };
})();
