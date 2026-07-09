const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const indexHtml = fs.readFileSync('index.html', 'utf8');
const footerMatch = indexHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);
const newFooter = footerMatch ? footerMatch[0] : null;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace Lorem Issum
  content = content.replace(/Lorem Issum/g, 'Tanzy Foods');
  
  // Replace Footer
  if (newFooter && file !== 'index.html') {
    content = content.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, newFooter);
  }

  // Common CTA replacements
  content = content.replace(/<span class="section-kicker">Lorem ipsum<\/span>/g, '<span class="section-kicker">Khám phá</span>');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
