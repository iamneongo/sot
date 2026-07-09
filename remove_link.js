const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  // Remove normal link
  c = c.replace(/<a class="nav__link" href="\.\/lien-he\.html">Liên hệ<\/a>[\r\n\s]*/g, '');
  // Remove active link (in lien-he.html)
  c = c.replace(/<a class="nav__link nav__link--active" href="\.\/lien-he\.html">Liên hệ<\/a>[\r\n\s]*/g, '');
  fs.writeFileSync(f, c);
  console.log('Updated ' + f);
});
