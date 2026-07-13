const fs = require('fs');
const file = 'C:/Users/Asus/Documents/antigravity/busy-rutherford/sot/index.html';
let text = fs.readFileSync(file, 'utf8');

const target = `            if (currentProduct.decors) {
                currentProduct.decors.forEach(decor => {
                    const img = document.createElement('img');
                    img.src = decor.src;
                    img.style.cssText = decor.style + ' position: absolute; z-index: 5;';
                    decorsContainer.appendChild(img);
                    setTimeout(() => {
                        img.style.opacity = '0.9'; 
                        img.style.transform = img.style.transform.replace('scale(0.8)', 'scale(1)');
                    }, 50);
                });
            }`;

const replacement = `            if (currentProduct.decors) {
                currentProduct.decors.forEach((decor, index) => {
                    const wrapper = document.createElement('div');
                    wrapper.style.cssText = decor.style + ' position: absolute; z-index: 5;';
                    
                    const img = document.createElement('img');
                    img.src = decor.src;
                    img.style.cssText = 'width: 100%; height: auto;';
                    img.classList.add(index % 2 === 0 ? 'toonhub-anim-float-1' : 'toonhub-anim-float-2');
                    
                    wrapper.appendChild(img);
                    decorsContainer.appendChild(wrapper);
                    
                    setTimeout(() => {
                        wrapper.style.opacity = '0.9'; 
                        wrapper.style.transform = wrapper.style.transform.replace('scale(0.8)', 'scale(1)');
                    }, 50);
                });
            }`;

text = text.replace(target, replacement);
fs.writeFileSync(file, text);
console.log('Fixed decors animation');
