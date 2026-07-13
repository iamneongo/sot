const fs = require('fs');
const file = 'C:/Users/Asus/Documents/antigravity/busy-rutherford/sot/index.html';
let lines = fs.readFileSync(file, 'utf8').split('\n');

const newLines = `
        .toonhub-carousel {
            position: absolute;
            inset: 0;
            z-index: 3;
        }

        .toonhub-carousel-item {
            position: absolute;
            aspect-ratio: 0.6 / 1;
            transition: transform 650ms cubic-bezier(0.4, 0, 0.2, 1), 
                        filter 650ms cubic-bezier(0.4, 0, 0.2, 1), 
                        opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), 
                        left 650ms cubic-bezier(0.4, 0, 0.2, 1),
                        height 650ms cubic-bezier(0.4, 0, 0.2, 1),
                        bottom 650ms cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform, filter, opacity;
        }

        .toonhub-carousel-item img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: bottom center;
            pointer-events: none;
        }

        .toonhub-nav-container {
            position: absolute;
            bottom: 24px;
            left: 16px;
            z-index: 60;
            max-width: 320px;
        }

        .toonhub-nav-title {
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            margin-bottom: 12px;
            font-size: 24px;
            color: #ffffff;
            font-family: 'Geomanist', sans-serif;
            text-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.4);
        }

        .toonhub-nav-desc {
            display: none;
            font-size: 14px;
            color: #ffffff;
            opacity: 0.95;
            line-height: 1.6;
            margin-bottom: 16px;
            font-family: 'Geomanist', sans-serif;
            text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }

        .toonhub-nav-buttons {
            display: flex;
            gap: 12px;
        }

        @keyframes toonhubFloat1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(4deg); }
        }
        @keyframes toonhubFloat2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(12px) rotate(-4deg); }
        }
        .toonhub-anim-float-1 {
            animation: toonhubFloat1 4s ease-in-out infinite;
        }
        .toonhub-anim-float-2 {
            animation: toonhubFloat2 5s ease-in-out infinite;
        }

        .toonhub-nav-btn {
            width: 48px;
            height: 48px;
            background: transparent;
            border: 2px solid #ffffff;`.split('\n').slice(1);

// line 90 is empty line after toonhub-brand
// line 91 is border-radius: 50%; which belongs to toonhub-nav-btn
// we insert from line 90.
lines.splice(90, 0, ...newLines);
fs.writeFileSync(file, lines.join('\n'));
console.log('Fixed CSS');
