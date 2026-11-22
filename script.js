'use strict';

// Tetapkan nombor sebenar dalam format antarabangsa tanpa + atau ruang.
// Contoh format Malaysia: kod negara 60 diikuti nombor tanpa sifar awal.
// Biarkan kosong untuk mengekalkan pratonton demo tanpa menghantar mesej.
const WHATSAPP_NUMBER = '60189016696';

const books = Object.freeze({
  nota: 'Nota Mudah Makhraj & Sifat Huruf berserta Gambar',
  latihan: 'Kesimpulan Makhraj & Sifat Huruf berserta Latihan',
  tajwid: 'Terjemahan Tajwid al-Nasyr Ibn al-Jazari',
  akhlak: 'Akhlak Pendukung al-Quran'
});

const themeToggle = document.getElementById('theme-toggle');
function updateThemeControl() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Aktifkan mod terang' : 'Aktifkan mod gelap');
  document.getElementById('theme-icon').setAttribute('href', isDark ? '#i-sun' : '#i-moon');
}
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('uthmani-theme', theme); } catch { /* Mod masih berfungsi tanpa storan. */ }
  updateThemeControl();
});
updateThemeControl();

function buildMessage(selection) {
  if (selection === 'promosi') {
    const bookTitle = books[document.body.dataset.book];
    return `Assalamualaikum. Saya ingin bertanya tentang promosi semasa ${bookTitle ? `untuk buku ${bookTitle}` : 'bagi koleksi buku Uthmani'}. Boleh maklumkan tawaran, syarat dan tempoh promosi yang tersedia? Terima kasih.`;
  }
  if (selection === 'pakej') {
    return `Assalamualaikum. Saya berminat dengan pakej koleksi empat buku Uthmani:\n\n${Object.values(books).map((title, i) => `${i + 1}. ${title}`).join('\n')}\n\nBoleh maklumkan harga pakej, status stok dan pilihan penghantaran? Terima kasih.`;
  }
  if (books[selection]) {
    return `Assalamualaikum. Saya berminat untuk bertanya dan menempah buku:\n\n${books[selection]}\n\nBoleh maklumkan status stok dan pilihan penghantaran? Terima kasih.`;
  }
  return 'Assalamualaikum. Saya ingin bertanya tentang koleksi buku Uthmani. Boleh bantu saya dengan maklumat buku, harga dan cara tempahan? Terima kasih.';
}

const dialog = document.getElementById('order-dialog');
const messagePreview = document.getElementById('message-preview');
const copyStatus = document.getElementById('copy-status');
let lastOrderButton;

document.addEventListener('click', event => {
  const button = event.target.closest('[data-order]');
  if (!button) return;
  const campaign = getActivePromotions().find(item => item.id === button.dataset.promotion);
  const message = button.dataset.promotion
    ? (campaign ? `Assalamualaikum. Saya berminat dengan promosi “${campaign.title}”.\n\nTawaran: ${campaign.offer}\n\n${buildMessage(campaign.order).replace('Assalamualaikum. ', '')}` : 'Assalamualaikum. Saya ingin menyemak tawaran terkini kerana kempen yang saya lihat telah tamat. Boleh maklumkan promosi yang masih tersedia? Terima kasih.')
    : buildMessage(button.dataset.order);
  if (/^[1-9]\d{7,14}$/.test(WHATSAPP_NUMBER)) {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    return;
  }
  lastOrderButton = button;
  messagePreview.value = message;
  copyStatus.textContent = '';
  dialog.showModal();
});

function getActivePromotions(now = new Date()) {
  const campaigns = typeof PROMOTIONS === 'undefined' ? [] : PROMOTIONS;
  return campaigns.filter(campaign => {
    if (campaign.enabled !== true || !campaign.id || !campaign.title || !campaign.offer) return false;
    const start = campaign.startsAt == null ? -Infinity : Date.parse(campaign.startsAt);
    const end = campaign.endsAt == null ? Infinity : Date.parse(campaign.endsAt);
    return !Number.isNaN(start) && !Number.isNaN(end) && start < end && now.getTime() >= start && now.getTime() < end;
  });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]));
}

function promotionPeriod(campaign) {
  const format = value => new Intl.DateTimeFormat('ms-MY', {
    timeZone: 'Asia/Kuala_Lumpur', day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(value));
  if (campaign.endsAt) return `Tamat ${format(campaign.endsAt)} (waktu Malaysia)`;
  if (campaign.startsAt) return `Bermula ${format(campaign.startsAt)} · sehingga dimaklumkan`;
  return 'Tempoh: sehingga dimaklumkan oleh penerbit';
}

function renderPromotions() {
  document.querySelectorAll('[data-promotions]').forEach(container => {
    const bookId = document.body.dataset.book;
    const campaigns = getActivePromotions().filter(campaign => !bookId || !campaign.bookIds?.length || campaign.bookIds.includes(bookId));
    const markup = campaigns.length ? campaigns.map(campaign => `
      <article class="promotion-card">
        <span class="promotion-label">PROMOSI SEMASA</span>
        <h3>${escapeHtml(campaign.title)}</h3>
        <p>${escapeHtml(campaign.description)}</p>
        <p class="promotion-offer">${escapeHtml(campaign.offer)}</p>
        <p class="promotion-period">${escapeHtml(promotionPeriod(campaign))}</p>
        ${campaign.terms ? `<p class="promotion-terms">${escapeHtml(campaign.terms)}</p>` : ''}
        <button class="button" data-order="${escapeHtml(campaign.order || 'pertanyaan')}" data-promotion="${escapeHtml(campaign.id)}">Tanya promosi ini</button>
      </article>`).join('') : `<div class="promotion-empty"><div><span class="promotion-label">MAKLUMAT PROMOSI</span><h3>${bookId ? 'Belum ada promosi untuk judul ini.' : 'Belum ada promosi diumumkan.'}</h3><p>Anda masih boleh bertanya tentang harga buku dan pakej koleksi terus kepada penerbit.</p></div><button class="button button-outline" data-order="promosi">Tanya promosi semasa</button></div>`;
    if (container.dataset.rendered !== markup) {
      container.innerHTML = markup;
      container.dataset.rendered = markup;
    }
  });
}
renderPromotions();
setInterval(renderPromotions, 60000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) renderPromotions();
});

document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => lastOrderButton?.focus());

document.getElementById('copy-message').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(messagePreview.value);
    copyStatus.textContent = 'Mesej telah disalin.';
  } catch {
    messagePreview.focus();
    messagePreview.select();
    copyStatus.textContent = 'Pilih Salin pada peranti anda atau tekan Ctrl+C / ⌘C.';
  }
});

let lightboxDialog;
let lightboxImg;
let lightboxCaption;
let lastLightboxTrigger;

function ensureLightbox() {
  if (lightboxDialog) return;
  lightboxDialog = document.createElement('dialog');
  lightboxDialog.id = 'image-dialog';
  lightboxDialog.className = 'lightbox-dialog';
  lightboxDialog.setAttribute('aria-label', 'Pratonton imej');
  lightboxDialog.innerHTML = '<div class="lightbox-content"><button type="button" class="close-dialog" aria-label="Tutup pratonton"><svg class="icon"><use href="#i-close"/></svg></button><img alt=""><p class="lightbox-caption"></p></div>';
  document.body.appendChild(lightboxDialog);
  lightboxImg = lightboxDialog.querySelector('img');
  lightboxCaption = lightboxDialog.querySelector('.lightbox-caption');
  lightboxDialog.querySelector('.close-dialog').addEventListener('click', () => lightboxDialog.close());
  lightboxDialog.addEventListener('click', event => {
    const rect = lightboxDialog.getBoundingClientRect();
    if (event.target === lightboxDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) lightboxDialog.close();
  });
  lightboxDialog.addEventListener('close', () => lastLightboxTrigger?.focus());
}

document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-lightbox]');
  if (!trigger) return;
  ensureLightbox();
  lastLightboxTrigger = trigger;
  lightboxImg.src = trigger.dataset.lightbox;
  lightboxImg.alt = trigger.dataset.caption || '';
  lightboxCaption.textContent = trigger.dataset.caption || '';
  lightboxDialog.showModal();
});

document.getElementById('year').textContent = String(new Date().getFullYear());
