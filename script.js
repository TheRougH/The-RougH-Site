(() => {
  const cfg = window.THE_ROUGH_CONFIG || {};
  const isEN = document.documentElement.lang.toLowerCase().startsWith('en');
  const t = {
    streamAdd: isEN ? 'Streaming links to add in site-config.js' : 'Liens streaming à ajouter dans site-config.js',
    linksConfig: isEN ? 'Links to configure' : 'Liens à configurer',
    socialsConfig: isEN ? 'Social accounts to configure' : 'Réseaux à configurer',
    youtubeConfig: isEN ? 'YouTube channel to configure' : 'Chaîne YouTube à configurer',
    youtubeSee: isEN ? 'Visit the YouTube channel' : 'Voir la chaîne YouTube',
    emailAdd: isEN ? 'Official email address to add in site-config.js' : 'Adresse e-mail officielle à ajouter dans site-config.js'
  };


  // Nettoyage défensif : certaines versions mobiles peuvent conserver
  // un ancien HTML en cache contenant l'ancien bouton Instagram statique.
  document.querySelectorAll('.static-social-fallback').forEach(el => el.remove());

  function dedupeLinks(container) {
    if (!container) return;
    const seen = new Set();
    container.querySelectorAll('a').forEach(a => {
      const href = (a.getAttribute('href') || '').replace(/[?#].*$/, '').replace(/\/$/, '');
      const label = (a.textContent || '').trim().toLowerCase();
      const key = href || label;
      if (seen.has(key)) {
        a.remove();
      } else {
        seen.add(key);
      }
    });
  }

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
    ['Tidal', cfg.tidal],
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
    streamingMain.innerHTML = linksHTML(platforms);
    streamingSecondary.innerHTML = linksHTML(platforms, '');
  } else {
    streamingMain.innerHTML = `<span class="empty-hint">${t.streamAdd}</span>`;
    streamingSecondary.innerHTML = `<span class="empty-hint">${t.linksConfig}</span>`;
  }

  const socialButtons = document.getElementById('social-buttons');
  const contactSocial = document.getElementById('contact-social');
  const videoSocial = document.getElementById('video-social');
  if (socials.length) {
    const html = linksHTML(socials, '');
    socialButtons.innerHTML = html;
    contactSocial.innerHTML = html;
    dedupeLinks(socialButtons);
    dedupeLinks(contactSocial);
    const yt = socials.find(([n]) => n === 'YouTube');
    videoSocial.innerHTML = yt ? `<a href="${yt[1]}" target="_blank" rel="noopener noreferrer">${t.youtubeSee}</a>` : html;
  } else {
    socialButtons.innerHTML = `<span class="empty-hint">${t.socialsConfig}</span>`;
    contactSocial.innerHTML = '';
    videoSocial.innerHTML = `<span class="empty-hint">${t.youtubeConfig}</span>`;
  }

  const contact = document.getElementById('contact-action');
  if (cfg.contactEmail && cfg.contactEmail.includes('@')) {
    contact.innerHTML = `<a class="button" href="mailto:${cfg.contactEmail}?subject=Contact%20The%20RougH">${cfg.contactEmail}</a>`;
  } else {
    contact.innerHTML = `<span class="empty-hint">${t.emailAdd}</span>`;
  }
})();
