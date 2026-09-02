const fs = require('fs');
const path = require('path');

const targetDir = 'd:\\\\Website\\\\Client\\\\AGGC Company Portfolio\\\\AGGC Website';

const pineSvg = `        <!-- Subtle Starry Night & Grid Watermark -->
        <div class="absolute inset-0 opacity-[0.05]"
            style="background-image: radial-gradient(#ffffff 1.5px, transparent 1.5px); background-size: 24px 24px;"></div>
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/3 -left-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Pine Forest & Mountain Horizon Silhouette Background Decoration -->
        <div class="absolute bottom-[35px] sm:bottom-[45px] left-0 right-0 w-full overflow-hidden pointer-events-none z-0 opacity-45">
            <svg viewBox="0 0 1440 220" preserveAspectRatio="none" class="w-full h-[120px] sm:h-[180px] md:h-[220px]">
                <defs>
                    <linearGradient id="pineHorizonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#18235c" stop-opacity="0.2" />
                        <stop offset="50%" stop-color="#0d143a" stop-opacity="0.7" />
                        <stop offset="100%" stop-color="#070a21" stop-opacity="0.95" />
                    </linearGradient>
                </defs>
                <path fill="#162056" fill-opacity="0.35"
                    d="M0,140 Q180,90 360,130 T720,100 T1080,125 T1440,95 L1440,220 L0,220 Z" />
                <path fill="#0f1742" fill-opacity="0.55"
                    d="M0,165 C240,125 450,175 700,140 C950,105 1200,165 1440,135 L1440,220 L0,220 Z" />
                <path fill="url(#pineHorizonGrad)"
                    d="M0,220 L0,185 L12,170 L18,178 L28,155 L38,175 L50,145 L62,172 L75,138 L88,168 L102,142 L115,165 L130,130 L145,162 L160,128 L175,160 L190,135 L205,162 L220,125 L235,158 L250,132 L265,160 L280,122 L295,155 L310,130 L325,158 L340,120 L355,152 L370,126 L385,154 L400,118 L415,150 L430,125 L445,155 L460,115 L475,148 L490,122 L505,152 L520,112 L535,145 L550,120 L565,150 L580,110 L595,142 L610,118 L625,148 L640,108 L655,140 L670,115 L685,145 L700,105 L715,138 L730,112 L745,142 L760,102 L775,135 L790,110 L805,140 L820,100 L835,132 L850,108 L865,138 L880,98 L895,130 L910,105 L925,135 L940,95 L955,128 L970,102 L985,132 L1000,92 L1015,125 L1030,100 L1045,130 L1060,90 L1075,122 L1090,98 L1105,128 L1120,88 L1135,120 L1150,95 L1165,125 L1180,85 L1195,118 L1210,92 L1225,122 L1240,82 L1255,115 L1270,90 L1285,120 L1300,80 L1315,112 L1330,88 L1345,118 L1360,78 L1375,110 L1390,85 L1405,115 L1420,80 L1435,110 L1440,105 L1440,220 Z" />
            </svg>
        </div>\n`;

const waveSvg = `\n        <!-- Ultra-Smooth Pro Multi-Layer Wave Divider -->
        <div class="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
            <svg viewBox="0 0 1440 110" preserveAspectRatio="none" class="relative block w-full h-[45px] sm:h-[70px] md:h-[85px]">
                <path fill="#ffffff" fill-opacity="0.25" d="M0,36 C240,82 480,12 720,44 C960,76 1200,28 1440,54 L1440,110 L0,110 Z"></path>
                <path fill="#ffffff" fill-opacity="0.55" d="M0,58 C320,18 640,88 960,48 C1120,28 1280,62 1440,42 L1440,110 L0,110 Z"></path>
                <path fill="#ffffff" d="M0,68 C280,112 580,25 880,65 C1120,95 1300,45 1440,62 L1440,110 L0,110 Z"></path>
            </svg>
        </div>`;

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            processDir(filePath);
        } else if (file.endsWith('.html')) {
            processFile(filePath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 1. Remove text
    if (content.includes('Designed with modern web technologies.')) {
        content = content.replace(/<p[^>]*>[\s\n]*<span[^>]*>[\s\n]*<\/span>[\s\n]*Designed with modern web technologies\.[\s\n]*<\/p>/gi, '');
        content = content.replace(/<span[^>]*>[\s\n]*<\/span>[\s\n]*Designed with modern web technologies\./gi, '');
        content = content.replace(/Designed with modern web technologies\./g, '');
        modified = true;
    }

    // 2. Inject SVGs
    if (!content.includes('pineHorizonGrad')) {
        const sectionMatch = content.match(/<section[^>]*text-center[^>]*>/);
        if (sectionMatch) {
            let sectionTag = sectionMatch[0];
            let newSectionTag = sectionTag;
            if (sectionTag.includes('bg-brand-navy')) {
                newSectionTag = sectionTag.replace('bg-brand-navy', 'bg-gradient-to-b from-[#061226] via-[#0d143a] to-[#131d52]');
            } else if (sectionTag.includes('bg-slate-50')) {
                newSectionTag = sectionTag.replace('bg-slate-50', 'bg-gradient-to-b from-[#061226] via-[#0d143a] to-[#131d52]');
            }
            content = content.replace(sectionTag, newSectionTag + '\\n' + pineSvg);
            modified = true;
        }
    }

    if (!content.includes('Ultra-Smooth Pro Multi-Layer Wave Divider')) {
        const closingSectionMatch = content.match(/(\n?[ \t]*<\/section>)/);
        if (closingSectionMatch) {
            content = content.replace(closingSectionMatch[1], waveSvg + closingSectionMatch[1]);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Updated ' + filePath);
    }
}

processDir(targetDir);
