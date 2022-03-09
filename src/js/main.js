require("@babel/polyfill");

const redirectOldSketches = require('./common/redirectOldSketches.js').default;

const page = document.querySelector('.l-page');
const pageId = page.dataset.id;

// running each init functions.
if (pageId == 'index') {
  require('./index/init.js').default();
} else {
  const canvas = document.getElementById('canvas-webgl');
  canvas.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });
  canvas.addEventListener('selectstart', function (event) {
    event.preventDefault();
  });

  switch (pageId) {
    case 'flow_field_5': require('./sketch/flow_field_5/init.js').default(); break;
    default:
  }
}

// redirect from old sketches url.
redirectOldSketches();
