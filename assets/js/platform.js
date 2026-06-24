/* SKAZINE — platform data & homepage rendering */
(function () {
  'use strict';

  function initials(name) {
    return name.split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
  }

  function fetchJSON(path) {
    return fetch(path).then(function (r) {
      if (!r.ok) throw new Error('Failed to load ' + path);
      return r.json();
    });
  }

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function bandProfileUrl(band) {
    if (band.url) return band.url;
    if (band.id) return '/bands/profile-template.html?id=' + encodeURIComponent(band.id);
    return '/bands/';
  }

  function renderBandCard(band) {
    var href = bandProfileUrl(band);
    var tags = band.genreTags ? band.genreTags.join(' · ') : (band.genre || '');
    var bio = band.shortBio || band.summary || '';
    return (
      '<article class="platform-card platform-card--band">' +
        '<a href="' + href + '" class="platform-card__media">' +
          '<span class="platform-avatar" aria-hidden="true">' + initials(band.name) + '</span>' +
        '</a>' +
        '<div class="platform-card__body">' +
          '<h3><a href="' + href + '">' + band.name + '</a></h3>' +
          '<p class="platform-card__meta">' + band.city + ', ' + band.region + ' · ' + tags + '</p>' +
          '<p class="platform-card__text">' + bio + '</p>' +
        '</div>' +
      '</article>'
    );
  }

  function renderShowRow(show) {
    return (
      '<li class="platform-show-row">' +
        '<div class="platform-date"><span>' + show.month + '</span><strong>' + show.day + '</strong></div>' +
        '<div class="platform-show-info">' +
          '<strong>' + show.name + '</strong>' +
          '<span>' + show.city + ', ' + show.region + ' · ' + show.time + ' · ' + show.venue + '</span>' +
        '</div>' +
        '<a href="/shows/" class="btn btn-primary btn-sm">Tickets</a>' +
      '</li>'
    );
  }

  function renderFestCard(fest) {
    return (
      '<article class="platform-card platform-card--fest">' +
        '<div class="platform-card__body">' +
          '<span class="tag tag-gold">' + fest.type + '</span>' +
          '<h3>' + fest.name + '</h3>' +
          '<p class="platform-card__meta">' + fest.dates + ' · ' + fest.city + ', ' + fest.country + '</p>' +
          '<a href="/festivals/" class="platform-link">View festival →</a>' +
        '</div>' +
      '</article>'
    );
  }

  function renderRadioRow(station) {
    return (
      '<li class="platform-list-row">' +
        '<span class="platform-avatar platform-avatar--sm" aria-hidden="true">' + initials(station.name) + '</span>' +
        '<div>' +
          '<strong>' + station.name + '</strong>' +
          '<span>' + station.city + ' · ' + station.format + '</span>' +
        '</div>' +
      '</li>'
    );
  }

  function renderWriterRow(writer) {
    return (
      '<li class="platform-list-row">' +
        '<span class="platform-avatar platform-avatar--sm" aria-hidden="true">' + writer.initials + '</span>' +
        '<div>' +
          '<strong>' + writer.name + '</strong>' +
          '<span>' + writer.role + ' · ' + writer.beat + '</span>' +
        '</div>' +
      '</li>'
    );
  }

  function renderCityCard(city) {
    var href = city.slug === 'denver' || city.slug === 'los-angeles'
      ? '/cities/' + city.slug + '/'
      : '/cities/';
    return (
      '<a href="' + href + '" class="platform-city-card">' +
        '<span class="platform-city-card__name">' + city.name + '</span>' +
        '<span class="platform-city-card__meta">' + city.bands + ' bands · ' + city.venues + ' venues</span>' +
      '</a>'
    );
  }

  function renderHomepage() {
    var root = document.getElementById('platform-home');
    if (!root) return;

    Promise.all([
      fetchJSON('/data/bands.json'),
      fetchJSON('/data/shows.json'),
      fetchJSON('/data/festivals.json'),
      fetchJSON('/data/radio.json'),
      fetchJSON('/data/writers.json'),
      fetchJSON('/data/cities.json')
    ]).then(function (results) {
      var bands = results[0].filter(function (b) { return b.featured; });
      var shows = results[1].filter(function (s) { return s.featured; });
      var fests = results[2].filter(function (f) { return f.featured; });
      var radio = results[3].filter(function (r) { return r.featured; });
      var writers = results[4].filter(function (w) { return w.featured; });
      var cities = results[5].filter(function (c) { return c.featured; });

      var bandsEl = document.getElementById('home-bands');
      var showsEl = document.getElementById('home-shows');
      var festsEl = document.getElementById('home-fests');
      var radioEl = document.getElementById('home-radio');
      var writersEl = document.getElementById('home-writers');
      var citiesEl = document.getElementById('home-cities');

      if (bandsEl) bandsEl.innerHTML = bands.map(renderBandCard).join('');
      if (showsEl) showsEl.innerHTML = shows.map(renderShowRow).join('');
      if (festsEl) festsEl.innerHTML = fests.map(renderFestCard).join('');
      if (radioEl) radioEl.innerHTML = radio.map(renderRadioRow).join('');
      if (writersEl) writersEl.innerHTML = writers.map(renderWriterRow).join('');
      if (citiesEl) citiesEl.innerHTML = cities.map(renderCityCard).join('');
    }).catch(function (err) {
      console.error(err);
    });
  }

  function renderDirectory(config) {
    var target = document.getElementById(config.targetId);
    if (!target) return;

    fetchJSON(config.dataPath).then(function (items) {
      if (config.filter) items = items.filter(config.filter);
      target.innerHTML = items.map(config.render).join('');
    });
  }

  window.SKAZINE = {
    renderHomepage: renderHomepage,
    renderDirectory: renderDirectory,
    renderBandCard: renderBandCard,
    renderShowRow: renderShowRow,
    renderFestCard: renderFestCard,
    renderRadioRow: renderRadioRow,
    renderWriterRow: renderWriterRow,
    renderCityCard: renderCityCard,
    fetchJSON: fetchJSON
  };

  if (document.getElementById('platform-home')) {
    document.addEventListener('DOMContentLoaded', renderHomepage);
  }
})();
