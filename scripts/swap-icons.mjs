import { promises as fs } from 'node:fs';

const files = ['index.html', 'san-pham.html', 'gioi-thieu.html', 'chi-tiet-san-pham.html', 'lien-he.html'];
const map = {
  'egg': 'egg', 'leaf': 'leaf', 'shield-halved': 'shield', 'bottle-droplet': 'bottle-droplet',
  'truck-fast': 'truck-fast', 'rotate-left': 'rotate-left', 'wallet': 'wallet', 'headset': 'headset',
  'bowl-food': 'bowl-food', 'jar': 'jar', 'weight-hanging': 'weight-hanging',
  'temperature-half': 'temperature-half', 'clock': 'clock', 'thumbs-up': 'thumbs-up'
};
const tokens = Object.keys(map).join('|');
const re = new RegExp(`<i\\s+class="[^"]*\\bfa-(${tokens})\\b[^"]*"\\s*></i>`, 'g');

let total = 0;
for (const f of files) {
  let s = await fs.readFile(f, 'utf8');
  let n = 0;
  s = s.replace(re, (_m, tok) => {
    n++;
    return `<img class="icon-3d" src="./assets/images/icons/${map[tok]}.png" alt="" loading="lazy" />`;
  });
  if (n) await fs.writeFile(f, s);
  total += n;
  console.log(f, n);
}
console.log('total replaced:', total);
