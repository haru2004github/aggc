const fs = require('fs');
const path = require('path');

const targetDir = 'd:\\\\Website\\\\Client\\\\AGGC Company Portfolio\\\\AGGC Website';

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            processDir(filePath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf-8');
            if (content.includes('class="relative bg-gradient-to-b from-[#06091e] via-[#0d143a] to-[#131d52]\\n        <!-- Subtle Starry Night')) {
                // Ah, the literal \\n is part of the class name string or between elements.
                // Wait, in my script I did `content = content.replace(sectionTag, newSectionTag + '\\n' + pineSvg);`
                // So it became `<section class="...">\\n        <!-- Subtle...`
                // Wait, if it's literal `\n` it means the text literally says `\n`.
                content = content.replace(/>\\\\n        <!-- Subtle/g, '>\\n        <!-- Subtle');
                fs.writeFileSync(filePath, content, 'utf-8');
            }
        }
    }
}

processDir(targetDir);
