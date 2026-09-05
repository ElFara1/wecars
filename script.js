(() => {
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  if (menuToggle && navigation) {
    document.documentElement.classList.add('js');
    const closeMenu = () => {
      navigation.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
      navigation.classList.toggle('is-open', expanded);
      menuToggle.setAttribute('aria-expanded', String(expanded));
    });
    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
    window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
  }

  // Content is present in HTML, even with scripts disabled.
  const projects = Array.from(document.querySelectorAll('.project-card'));
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectMore = document.querySelector('#more-projects');
  const projectCount = document.querySelector('#project-count');
  let activeFilter = 'all';
  let projectsExpanded = false;

  function updateProjects() {
    const matching = projects.filter(card => activeFilter === 'all' || card.dataset.category === activeFilter);
    projects.forEach(card => {
      const index = matching.indexOf(card);
      card.hidden = index === -1 || (!projectsExpanded && index >= 3);
    });
    if (projectCount) projectCount.textContent = `${projectsExpanded ? matching.length : Math.min(3, matching.length)} di ${matching.length} lavori`;
    if (projectMore) {
      projectMore.hidden = matching.length <= 3;
      projectMore.textContent = projectsExpanded ? 'Mostra meno lavori −' : `Mostra tutti i ${matching.length} lavori +`;
      projectMore.setAttribute('aria-expanded', String(projectsExpanded));
    }
  }
  if (projects.length) {
    document.querySelector('.filter-row').hidden = false;
    filterButtons.forEach(button => button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      projectsExpanded = false;
      filterButtons.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
      updateProjects();
    }));
    projectMore.addEventListener('click', () => {
      projectsExpanded = !projectsExpanded;
      updateProjects();
      if (!projectsExpanded) document.querySelector('#lavori').scrollIntoView();
    });
    updateProjects();
  }

  const cars = Array.from(document.querySelectorAll('.car-card'));
  const carMore = document.querySelector('#more-cars');
  if (carMore && cars.length > 3) {
    let expanded = false;
    const updateCars = () => {
      cars.forEach((card, index) => { card.hidden = !expanded && index >= 3; });
      carMore.textContent = expanded ? 'Mostra meno vetture −' : `Esplora tutte le ${cars.length} vetture +`;
      carMore.setAttribute('aria-expanded', String(expanded));
    };
    carMore.hidden = false;
    carMore.addEventListener('click', () => {
      expanded = !expanded;
      updateCars();
      if (!expanded) document.querySelector('#vetture').scrollIntoView();
    });
    updateCars();
  }

  const dialog = document.querySelector('#media-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const mediaContainer = dialog.querySelector('.dialog-media');
  const title = dialog.querySelector('#dialog-title');
  const originalLink = dialog.querySelector('#media-original');
  const counter = dialog.querySelector('.dialog-counter');
  const controls = dialog.querySelector('.dialog-navigation');
  const status = dialog.querySelector('.dialog-status');
  let mediaItems = [];
  let mediaIndex = 0;

  function clearMedia() {
    const video = mediaContainer.querySelector('video');
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    mediaContainer.replaceChildren();
  }
  function showMedia() {
    clearMedia();
    status.textContent = '';
    const item = mediaItems[mediaIndex];
    const isVideo = /\.mp4(?:\?|$)/i.test(item.src);
    const media = document.createElement(isVideo ? 'video' : 'img');
    title.textContent = item.title;
    if (isVideo) {
      media.controls = true;
      media.playsInline = true;
      media.preload = 'metadata';
      media.setAttribute('aria-label', item.title);
    } else media.alt = item.title;
    media.addEventListener('error', () => {
      status.textContent = 'Non è stato possibile caricare il contenuto. Puoi provare ad aprire il file originale.';
    });
    media.src = item.src;
    mediaContainer.append(media);
    originalLink.href = item.src;
    counter.textContent = `${mediaIndex + 1} / ${mediaItems.length}`;
    controls.hidden = mediaItems.length < 2;
  }
  document.querySelectorAll('[data-media]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const gallery = link.closest('[data-gallery]');
      const links = gallery ? Array.from(gallery.querySelectorAll('[data-media]')) : [link];
      mediaItems = links.map(entry => ({ src: entry.getAttribute('href'), title: entry.dataset.title || entry.textContent.trim() }));
      mediaIndex = links.indexOf(link);
      showMedia();
      dialog.showModal();
      document.body.classList.add('dialog-open');
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    clearMedia();
    document.body.classList.remove('dialog-open');
  });
  function advance(direction) {
    mediaIndex = (mediaIndex + direction + mediaItems.length) % mediaItems.length;
    showMedia();
  }
  dialog.querySelector('[data-direction="-1"]').addEventListener('click', () => advance(-1));
  dialog.querySelector('[data-direction="1"]').addEventListener('click', () => advance(1));
  dialog.addEventListener('keydown', event => {
    if (event.target.tagName === 'VIDEO' || mediaItems.length < 2) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      advance(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
})();
