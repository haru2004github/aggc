const fs = require('fs');

let content = fs.readFileSync('product_page/Liugong.html', 'utf8');

// Replacements
content = content.replace('<title>LiuGong Machinery Catalog - AGGC</title>', '<title>Sigma Catalog - AGGC</title>');
content = content.replace('<span class="text-slate-600 font-semibold">LiuGong Machinery</span>', '<span class="text-slate-600 font-semibold">Sigma</span>');
content = content.replace("const CURRENT_BRAND = 'liugong';", "const CURRENT_BRAND = 'sigma';");

fs.writeFileSync('product_page/sigma.html', content, 'utf8');
console.log('Created product_page/sigma.html');
