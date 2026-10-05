/* Project enquiry: prepare one explicit WhatsApp link, without duplicate popups. */
(() => {
  const form = document.getElementById('quoteForm');
  if (!form) return;
  const status = document.getElementById('quote-status');
  const params = new URLSearchParams(location.search);
  const service = params.get('service');
  if ([...form.elements.service.options].some(option => option.value === service)) {
    form.elements.service.value = service;
  }
  const projects = {last: 'LAST', klett: 'KLETT', boho: 'BOHO Bayraklı'};
  const project = projects[params.get('project')];
  if (project) form.elements.message.value = `${project} projenizdeki uygulamalara benzer bir ihtiyacımız var.\n`;
  const invalidate = () => status.replaceChildren();
  form.addEventListener('input', invalidate);
  form.addEventListener('change', invalidate);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = key => String(data.get(key) || '').trim() || '-';
    const message = `Merhaba Işıklar Grup, projem için görüşmek istiyorum.\n\nAd Soyad: ${value('name')}\nTelefon: ${value('phone')}\nFirma / İşletme: ${value('company')}\nKonum: ${value('location')}\nHizmet: ${value('service')}\nHedef tarih: ${value('timeline')}\nProje / Mesaj: ${value('message')}`;
    const heading = document.createElement('strong');
    heading.textContent = 'Mesajınız hazır. Kontrol edip WhatsApp’a geçebilirsiniz.';
    const preview = document.createElement('span');
    preview.className = 'quote-preview'; preview.textContent = message;
    const link = document.createElement('a');
    link.className = 'solid-link'; link.textContent = 'WhatsApp’ta aç →';
    link.href = `https://wa.me/905078080224?text=${encodeURIComponent(message)}`;
    link.target = '_blank'; link.rel = 'noopener';
    status.replaceChildren(heading, preview, link);
    link.focus();
  });
})();
