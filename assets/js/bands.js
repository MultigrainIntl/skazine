/* SKAZINE — Band Directory MVP */
(function () {
  'use strict';

  function initials(name) {
    return name.split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
  }

  function bandProfileUrl(band) {
    return '/bands/profile-template.html?id=' + encodeURIComponent(band.id);
  }

  function genreTagsHtml(tags) {
    return tags.map(function (t) {
      return '<span class="tag tag-ska">' + t + '</span>';
    }).join(' ');
  }

  function statusLabel(status) {
    if (status === 'claimed') return '<span class="band-status band-status--claimed">Claimed</span>';
    if (status === 'unverified') return '<span class="band-status band-status--unverified">Unverified</span>';
    return '<span class="band-status band-status--active">Active</span>';
  }

  function renderDirectoryCard(band) {
    var href = bandProfileUrl(band);
    var location = band.city + ', ' + band.region + ' · ' + band.country;
    return (
      '<article class="band-dir-card" data-genres="' + band.genreTags.join(',').toLowerCase() + '" data-status="' + band.status + '" data-name="' + band.name.toLowerCase() + '">' +
        '<a href="' + href + '" class="band-dir-card__avatar" aria-hidden="true">' + initials(band.name) + '</a>' +
        '<div class="band-dir-card__body">' +
          '<div class="band-dir-card__head">' +
            '<h2><a href="' + href + '">' + band.name + '</a></h2>' +
            statusLabel(band.status) +
          '</div>' +
          '<p class="band-dir-card__meta">' + location + '</p>' +
          '<div class="band-dir-card__tags">' + genreTagsHtml(band.genreTags) + '</div>' +
          '<p class="band-dir-card__bio">' + band.shortBio + '</p>' +
          '<a href="' + href + '" class="platform-link">View profile →</a>' +
        '</div>' +
      '</article>'
    );
  }

  function renderCompactCard(band) {
    var href = bandProfileUrl(band);
    var tags = band.genreTags ? band.genreTags.join(' · ') : '';
    return (
      '<article class="platform-card platform-card--band">' +
        '<a href="' + href + '" class="platform-card__media">' +
          '<span class="platform-avatar" aria-hidden="true">' + initials(band.name) + '</span>' +
        '</a>' +
        '<div class="platform-card__body">' +
          '<h3><a href="' + href + '">' + band.name + '</a></h3>' +
          '<p class="platform-card__meta">' + band.city + ', ' + band.region + ' · ' + tags + '</p>' +
          '<p class="platform-card__text">' + band.shortBio + '</p>' +
        '</div>' +
      '</article>'
    );
  }

  function initBandDirectory() {
    var grid = document.getElementById('band-directory-grid');
    var search = document.getElementById('band-search');
    var genreFilter = document.getElementById('band-genre-filter');
    var statusFilter = document.getElementById('band-status-filter');
    var countEl = document.getElementById('band-result-count');
    if (!grid) return;

    window.SKAZINE.fetchJSON('/data/bands.json').then(function (bands) {
      grid.innerHTML = bands.map(renderDirectoryCard).join('');
      var cards = Array.prototype.slice.call(grid.querySelectorAll('.band-dir-card'));

      function applyFilters() {
        var q = (search && search.value || '').toLowerCase().trim();
        var genre = genreFilter && genreFilter.value || '';
        var status = statusFilter && statusFilter.value || '';
        var visible = 0;

        cards.forEach(function (card) {
          var name = card.getAttribute('data-name') || '';
          var genres = card.getAttribute('data-genres') || '';
          var st = card.getAttribute('data-status') || '';
          var matchQ = !q || name.indexOf(q) !== -1 || genres.indexOf(q) !== -1;
          var matchGenre = !genre || genres.indexOf(genre.toLowerCase()) !== -1;
          var matchStatus = !status || st === status;
          var show = matchQ && matchGenre && matchStatus;
          card.style.display = show ? '' : 'none';
          if (show) visible++;
        });

        if (countEl) countEl.textContent = visible + ' band' + (visible === 1 ? '' : 's');
      }

      if (search) search.addEventListener('input', applyFilters);
      if (genreFilter) genreFilter.addEventListener('change', applyFilters);
      if (statusFilter) statusFilter.addEventListener('change', applyFilters);
      applyFilters();
    });
  }

  function initBandProfile() {
    var root = document.getElementById('band-profile');
    if (!root) return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || 'aggrolites';

    window.SKAZINE.fetchJSON('/data/bands.json').then(function (bands) {
      var band = bands.find(function (b) { return b.id === id; }) || bands[0];
      if (!band) return;

      document.title = band.name + ' — SKAZINE Band Directory';

      var booking = band.bookingUrl
        ? '<a href="' + band.bookingUrl + '" class="btn btn-primary" target="_blank" rel="noopener">Book / Contact</a>'
        : (band.bookingEmail
          ? '<a href="mailto:' + band.bookingEmail + '" class="btn btn-primary">Book / Contact</a>'
          : '<span class="muted body-sm">Booking contact coming soon</span>');

      var links = [];
      if (band.links.website) links.push('<a href="' + band.links.website + '" target="_blank" rel="noopener">Website</a>');
      if (band.links.spotify) links.push('<a href="' + band.links.spotify + '" target="_blank" rel="noopener">Spotify</a>');
      if (band.links.bandcamp) links.push('<a href="' + band.links.bandcamp + '" target="_blank" rel="noopener">Bandcamp</a>');
      if (band.links.youtube) links.push('<a href="' + band.links.youtube + '" target="_blank" rel="noopener">YouTube</a>');
      if (band.links.instagram) links.push('<a href="' + band.links.instagram + '" target="_blank" rel="noopener">Instagram</a>');

      var bestFor = band.bestFor || {};
      var bestForHtml = Object.keys(bestFor).map(function (key) {
        return '<li><strong>' + key.charAt(0).toUpperCase() + key.slice(1) + ':</strong> ' + bestFor[key] + '</li>';
      }).join('');

      root.innerHTML =
        '<header class="band-profile__hero">' +
          '<span class="platform-avatar platform-avatar--lg" aria-hidden="true">' + initials(band.name) + '</span>' +
          '<div>' +
            '<div class="band-profile__head">' +
              '<h1 class="display-md">' + band.name + '</h1>' +
              statusLabel(band.status) +
            '</div>' +
            '<p class="band-profile__location">' + band.city + ', ' + band.region + ' · ' + band.country + '</p>' +
            '<div class="band-profile__tags mt-16">' + genreTagsHtml(band.genreTags) + '</div>' +
          '</div>' +
        '</header>' +
        '<div class="band-profile__grid">' +
          '<div class="band-profile__main">' +
            '<section class="band-profile__section">' +
              '<h2>About</h2>' +
              '<p>' + band.shortBio + '</p>' +
            '</section>' +
            '<section class="band-profile__section">' +
              '<h2>Music Links</h2>' +
              '<div class="band-profile__links">' + (links.join(' · ') || '<span class="muted">Links coming soon</span>') + '</div>' +
            '</section>' +
            '<section class="band-profile__section">' +
              '<h2>Upcoming Shows</h2>' +
              '<p class="muted body-sm">Show listings coming soon. <a href="/shows/">Browse all shows →</a></p>' +
            '</section>' +
          '</div>' +
          '<aside class="band-profile__aside">' +
            '<section class="sidebar-block">' +
              '<h4>Booking</h4>' +
              booking +
            '</section>' +
            '<section class="sidebar-block">' +
              '<h4>Best For</h4>' +
              '<ul class="band-profile__bestfor">' + bestForHtml + '</ul>' +
            '</section>' +
            '<section class="sidebar-block">' +
              '<h4>Press / Radio / Writers</h4>' +
              '<p class="body-sm muted">Interested in coverage or spins? Contact via SKAZINE submit flow.</p>' +
              '<a href="/submit/#submit-band" class="btn btn-outline btn-sm" style="width:100%;justify-content:center;margin-top:12px;">Request Info</a>' +
            '</section>' +
            '<section class="sidebar-block">' +
              '<h4>Is this your band?</h4>' +
              '<a href="/submit/#submit-band" class="btn btn-primary" style="width:100%;justify-content:center;">Claim or Update Profile</a>' +
            '</section>' +
          '</aside>' +
        '</div>';
    });
  }

  window.SKAZINE = window.SKAZINE || {};
  window.SKAZINE.renderBandCard = renderCompactCard;
  window.SKAZINE.renderDirectoryCard = renderDirectoryCard;
  window.SKAZINE.initBandDirectory = initBandDirectory;
  window.SKAZINE.initBandProfile = initBandProfile;
  window.SKAZINE.bandProfileUrl = bandProfileUrl;

  document.addEventListener('DOMContentLoaded', function () {
    initBandDirectory();
    initBandProfile();
  });
})();
