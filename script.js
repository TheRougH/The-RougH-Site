(() => {
  const cfg = window.THE_ROUGH_CONFIG || {};
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const platforms = [
    ['Spotify', cfg.spotify],
    ['Deezer', cfg.deezer],
    ['Apple Music', cfg.appleMusic],
    ['YouTube Music', cfg.youtubeMusic],
    ['Bandcamp', cfg.bandcamp]
  ].filter(([,url]) => typeof url === 'string' && url.trim());

  const socials = [
    ['YouTube', cfg.youtube],
    ['Instagram', cfg.instagram],
    ['Facebook', cfg.facebook],
    ['Bluesky', cfg.bluesky]
  ].filter(([,url]) => typeof url === 'string' && url.trim());

  function linksHTML(items, cls='platform-link') {
    return items.map(([name,url]) => `<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`).join('');
  }

  const streamingMain = document.getElementById('streaming-buttons');
  const streamingSecondary = document.getElementById('streaming-secondary');
  if (platforms.length) {
    streamingMain.innerHTML = linksHTML(platforms.slice(0,4));
    streamingSecondary.innerHTML = linksHTML(platforms, '');
  } else {
    streamingMain.innerHTML = '<span class="empty-hint">Liens streaming à ajouter dans site-config.js</span>';
    streamingSecondary.innerHTML = '<span class="empty-hint">Liens à configurer</span>';
  }

  const socialButtons = document.getElementById('social-buttons');
  const contactSocial = document.getElementById('contact-social');
  const videoSocial = document.getElementById('video-social');
  if (socials.length) {
    const html = linksHTML(socials, '');
    socialButtons.innerHTML = html;
    contactSocial.innerHTML = html;
    const yt = socials.find(([n]) => n === 'YouTube');
    videoSocial.innerHTML = yt ? `<a href="${yt[1]}" target="_blank" rel="noopener noreferrer">Voir la chaîne YouTube</a>` : html;
  } else {
    socialButtons.innerHTML = '<span class="empty-hint">Réseaux à configurer</span>';
    contactSocial.innerHTML = '';
    videoSocial.innerHTML = '<span class="empty-hint">Chaîne YouTube à configurer</span>';
  }

  const contact = document.getElementById('contact-action');
  if (cfg.contactEmail && cfg.contactEmail.includes('@')) {
    contact.innerHTML = `<a class="button" href="mailto:${cfg.contactEmail}?subject=Contact%20The%20RougH">${cfg.contactEmail}</a>`;
  } else {
    contact.innerHTML = '<span class="empty-hint">Adresse e-mail officielle à ajouter dans site-config.js</span>';
  }
})();
