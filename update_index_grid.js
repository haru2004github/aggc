const fs = require('fs');

const productsHtml = fs.readFileSync('products.html', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- Product Grid -->';

const startIndex = productsHtml.indexOf(startMarker);
const endIndex = productsHtml.indexOf('</section>', startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find product grid in products.html");
    process.exit(1);
}

// Extract up to </section> but without including it, so we can replace cleanly
const gridContent = productsHtml.substring(startIndex, endIndex);

const indexStartIndex = indexHtml.indexOf(startMarker);
const indexEndIndex = indexHtml.indexOf('</section>', indexStartIndex);

if (indexStartIndex === -1 || indexEndIndex === -1) {
    console.error("Could not find product grid in index.html");
} else {
    const newIndexHtml = indexHtml.substring(0, indexStartIndex) + gridContent + indexHtml.substring(indexEndIndex);
    fs.writeFileSync('index.html', newIndexHtml, 'utf8');
    console.log("Updated index.html");
}
