const fs = require('fs');
const path = require('path');

const files = [
  'san-pham.html',
  'chi-tiet-san-pham.html',
  'gioi-thieu.html',
  'bai-viet.html',
  'chi-tiet-bai-viet.html',
  'lien-he.html'
];

const gsapScripts = `
    <!-- GSAP Animations -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="./assets/js/animations.js"></script>
  </body>`;

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add GSAP scripts before </body>
  if (!content.includes('animations.js')) {
    content = content.replace(/<\/body>/, gsapScripts);
  }
  
  // Add classes to common elements
  content = content.replace(/class="page-hero__title"/g, 'class="page-hero__title gsap-fade-up"');
  content = content.replace(/class="products-hero__content"/g, 'class="products-hero__content gsap-fade-up"');
  content = content.replace(/class="section-title"/g, 'class="section-title gsap-fade-up"');
  content = content.replace(/class="products-grid"/g, 'class="products-grid gsap-stagger-container"');
  content = content.replace(/class="articles-grid"/g, 'class="articles-grid gsap-stagger-container"');
  content = content.replace(/class="contact__cards"/g, 'class="contact__cards gsap-stagger-container"');
  content = content.replace(/class="product-card"/g, 'class="product-card gsap-stagger-item"');
  content = content.replace(/class="article-card"/g, 'class="article-card gsap-stagger-item"');
  content = content.replace(/class="contact-card"/g, 'class="contact-card gsap-stagger-item"');
  content = content.replace(/class="about-story__figure"/g, 'class="about-story__figure gsap-scale"');
  content = content.replace(/class="about-story__content"/g, 'class="about-story__content gsap-slide-right"');
  content = content.replace(/class="about-values__grid"/g, 'class="about-values__grid gsap-stagger-container"');
  content = content.replace(/class="value-card"/g, 'class="value-card gsap-stagger-item"');
  content = content.replace(/class="contact-form"/g, 'class="contact-form gsap-slide-left"');
  content = content.replace(/class="map-card"/g, 'class="map-card gsap-scale"');
  
  // For san-pham.html JS rendering of product cards, we also need to update the JS string inside it
  if (file === 'san-pham.html') {
    content = content.replace(/article.className = 'product-card';/g, "article.className = 'product-card gsap-stagger-item';");
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
