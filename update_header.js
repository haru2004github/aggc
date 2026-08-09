const fs = require('fs');
const path = require('path');

function getRelativePath(filePath) {
    const dir = path.dirname(filePath);
    const root = path.resolve('.');
    let rel = path.relative(dir, root);
    if (rel === '') return '';
    return rel.replace(/\\/g, '/') + '/';
}

function updateHeaders(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !fullPath.includes('.git') && !fullPath.includes('img')) {
            updateHeaders(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            const rootPrefix = getRelativePath(fullPath);
            
            let prefixMatch = content.match(/href="([^"]*)Liugong\.html"/);
            let prefix = 'product_page/';
            if (prefixMatch) {
                prefix = prefixMatch[1];
            }

            const desktopLinks = `                                <a href="${prefix}Liugong.html"
                                    class="block px-5 py-2.5 text-[11px] font-heading font-bold text-slate-600 hover:text-brand-navy hover:bg-slate-50 uppercase tracking-wider border-b border-slate-50/50">Liugong</a>
                                <a href="${prefix}jac_moter.html"
                                    class="block px-5 py-2.5 text-[11px] font-heading font-bold text-slate-600 hover:text-brand-navy hover:bg-slate-50 uppercase tracking-wider border-b border-slate-50/50">Jac Motors</a>
                                <a href="${prefix}powermax.html"
                                    class="block px-5 py-2.5 text-[11px] font-heading font-bold text-slate-600 hover:text-brand-navy hover:bg-slate-50 uppercase tracking-wider border-b border-slate-50/50">Powermax</a>
                                <a href="${prefix}izumi.html"
                                    class="block px-5 py-2.5 text-[11px] font-heading font-bold text-slate-600 hover:text-brand-navy hover:bg-slate-50 uppercase tracking-wider border-b border-slate-50/50">Izumi</a>
                                <a href="${rootPrefix}products.html#brand-turboil"
                                    class="block px-5 py-2.5 text-[11px] font-heading font-bold text-slate-600 hover:text-brand-navy hover:bg-slate-50 uppercase tracking-wider border-b border-slate-50/50">Turboil</a>
                                <a href="${prefix}sigma.html"
                                    class="block px-5 py-2.5 text-[11px] font-heading font-bold text-slate-600 hover:text-brand-navy hover:bg-slate-50 uppercase tracking-wider">Sigma</a>
`;

            const mobileLinks = `                        <a href="${prefix}Liugong.html"
                            class="text-[12px] font-heading font-medium text-slate-500 hover:text-brand-navy">Liugong</a>
                        <a href="${prefix}jac_moter.html"
                            class="text-[12px] font-heading font-medium text-slate-500 hover:text-brand-navy">Jac Motors</a>
                        <a href="${prefix}powermax.html"
                            class="text-[12px] font-heading font-medium text-slate-500 hover:text-brand-navy">Powermax</a>
                        <a href="${prefix}izumi.html"
                            class="text-[12px] font-heading font-medium text-slate-500 hover:text-brand-navy">Izumi</a>
                        <a href="${rootPrefix}products.html#brand-turboil"
                            class="text-[12px] font-heading font-medium text-slate-500 hover:text-brand-navy">Turboil</a>
                        <a href="${prefix}sigma.html"
                            class="text-[12px] font-heading font-medium text-slate-500 hover:text-brand-navy">Sigma</a>
`;

            // Replace Desktop Dropdown
            const desktopRegex = /(<!-- Dropdown Menu -->\s*<div[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>)/i;
            content = content.replace(desktopRegex, (match, p1, p2, p3) => {
                if (p2.includes('Liugong')) {
                    return p1 + "\n" + desktopLinks + "                            " + p3;
                }
                return match;
            });

            // Replace Mobile Dropdown
            const mobileRegex = /(<div id="mob-products-drop"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>)/i;
            content = content.replace(mobileRegex, (match, p1, p2, p3) => {
                if (p2.includes('Liugong')) {
                    return p1 + "\n" + mobileLinks + "                    " + p3;
                }
                return match;
            });

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated', fullPath);
            } else {
                console.log('No changes needed or matched for', fullPath);
            }
        }
    }
}

updateHeaders('.');
