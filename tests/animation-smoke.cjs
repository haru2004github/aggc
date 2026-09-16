// Run against the local server. Set PLAYWRIGHT_MODULE and CHROME_PATH if needed.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.TEST_BASE_URL || 'http://localhost:8002/';
const root = path.resolve(__dirname, '..');
function htmlFiles(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
        e.isDirectory() && !['.git', 'node_modules'].includes(e.name) ? htmlFiles(path.join(dir, e.name)) :
        e.isFile() && e.name.endsWith('.html') ? [path.relative(root, path.join(dir, e.name))] : []);
}
(async () => {
    const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH,
        ignoreDefaultArgs: ['--disable-back-forward-cache'] });
    const issues = [];
    try {
        const context = await browser.newContext();
        // Do not submit any enquiry or application in this suite.
        await context.route('**/*', route => route.request().method() === 'POST' ? route.abort() : route.continue());
        const pages = htmlFiles(root);
        const queue = process.env.TEST_SKIP_PAGE_AUDIT ? [] : [...pages];
        await Promise.all(Array.from({ length: 3 }, async () => {
            const page = await context.newPage();
            let current;
            page.on('pageerror', e => issues.push(`${current}: ${e.message}`));
            while ((current = queue.shift())) {
                await page.emulateMedia({ reducedMotion: 'no-preference' });
                await page.setViewportSize({ width: 1440, height: 900 });
                await page.goto(new URL(current, base).href, { waitUntil: 'domcontentloaded' });
                await page.waitForFunction(() => document.querySelector('[data-unified-footer]'));
                await page.emulateMedia({ reducedMotion: 'no-preference' });
                await page.emulateMedia({ reducedMotion: 'reduce' });
                await page.waitForFunction(() => [...document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .reveal-scale-up, .brand-reveal-ready, .card-reveal-ready')].every(e => !e.getClientRects().length || getComputedStyle(e).opacity !== '0'));
                const hidden = await page.locator('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .reveal-scale-up, .brand-reveal-ready, .card-reveal-ready').evaluateAll(items =>
                    items.filter(e => e.getClientRects().length && getComputedStyle(e).opacity === '0').length);
                assert.equal(hidden, 0, `${current}: reduced-motion content hidden`);
                await page.setViewportSize({ width: 390, height: 844 });
                await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
                await page.waitForTimeout(70);
                assert.equal(await page.locator('html.motion-resetting').count(), 0);
                console.log(`PASS page desktop/mobile + reduced motion: ${current}`);
            }
            await page.close();
        }));
        const page = await context.newPage();
        page.on('pageerror', e => issues.push(`lifecycle: ${e.message}`));
        for (const [file, selector, visibleClass] of [
            ['index.html', '#about .scroll-reveal-left', 'scroll-reveal-visible'],
            ['about.html', 'section .scroll-reveal', 'scroll-reveal-visible'],
            ['products.html', '.brand-feature-row', 'is-revealed'],
            ['whatwedo.html', '.card-reveal-ready', 'card-reveal-visible']
        ]) {
            await page.emulateMedia({ reducedMotion: 'no-preference' });
            await page.goto(new URL(file, base).href, { waitUntil: 'domcontentloaded' });
            await page.emulateMedia({ reducedMotion: 'no-preference' });
            const item = page.locator(selector).first();
            await item.scrollIntoViewIfNeeded();
            await page.waitForFunction(([selector, cls]) => document.querySelector(selector)?.classList.contains(cls), [selector, visibleClass]);
            await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
            await page.waitForTimeout(150);
            assert(!(await item.evaluate((e, cls) => e.classList.contains(cls), visibleClass)), `${file}: did not reset on scroll exit`);
            for (let replay = 0; replay < 2; replay++) {
                await item.scrollIntoViewIfNeeded();
                await page.waitForFunction(([selector, cls]) => document.querySelector(selector)?.classList.contains(cls), [selector, visibleClass]);
                assert(await item.evaluate(e => [e, ...e.querySelectorAll('*')].some(node => getComputedStyle(node).transitionDuration.split(',').some(v => parseFloat(v) > 0))), `${file}: motion disabled`);
                await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
                await page.waitForTimeout(150);
                assert(!(await item.evaluate((e, cls) => e.classList.contains(cls), visibleClass)), `${file}: repeat exit did not reset`);
            }
            await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
            await page.waitForTimeout(100);
            assert(!(await item.evaluate((e, cls) => e.classList.contains(cls), visibleClass)), `${file}: did not reset`);
            await item.scrollIntoViewIfNeeded();
            await page.waitForFunction(([selector, cls]) => document.querySelector(selector)?.classList.contains(cls), [selector, visibleClass]);
            await page.emulateMedia({ reducedMotion: 'reduce' });
            await page.emulateMedia({ reducedMotion: 'no-preference' });
            await page.reload({ waitUntil: 'domcontentloaded' });
            console.log(`PASS repeated scroll motion, restore, refresh: ${file}`);
        }
        await page.goto(new URL('index.html', base).href, { waitUntil: 'domcontentloaded' });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.waitForTimeout(100);
        assert(await page.locator('.counter').evaluateAll(items => items.every(e => e.textContent === e.dataset.target)), 'Counters must finish with reduced motion');
        await page.evaluate(() => {
            const item = document.createElement('div'); item.id = 'dynamic-test'; item.className = 'scroll-reveal';
            item.textContent = 'Dynamic content'; document.body.append(item);
        });
        await page.waitForFunction(() => document.querySelector('#dynamic-test').classList.contains('revealed'));
        console.log('PASS dynamic content and reduced-motion counters');
        // Actual Back/Forward navigation (Chrome may reload instead of caching).
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await page.goto(new URL('index.html', base).href, { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => window.addEventListener('pageshow', event => window.actualPersisted = event.persisted));
        await page.goto(new URL('products.html', base).href, { waitUntil: 'domcontentloaded' });
        await page.goBack({ waitUntil: 'commit' });
        await page.waitForTimeout(150);
        console.log('PASS actual Back navigation; BFCache used:', await page.evaluate(() => window.actualPersisted === true));
        assert.equal(await page.locator('.carousel-img.active').count(), 1);
        await page.goto(new URL('product_page/Liugong.html', base).href, { waitUntil: 'domcontentloaded' });
        await page.locator('#brand-quote-button').click();
        await page.locator('#quote-continue').click();
        await page.waitForTimeout(600);
        await page.locator('.enquire-btn').first().click();
        const replay = await page.locator('#catalog-modal-content').evaluate(e => e.getAnimations().some(a => a.animationName === 'modalSpring' && a.currentTime < 250));
        assert(replay, 'Reused product dialog entrance did not restart');
        await page.keyboard.press('Escape');
        for (const file of ['about.html', 'news.html', 'careers.html', 'activites.html']) {
            await page.goto(new URL(file, base).href, { waitUntil: 'domcontentloaded' });
            await page.evaluate(() => {
                const open = window.openModal || window.openImageModal;
                const close = window.closeModal || window.closeImageModal;
                open('./img/logo.png'); close(); open('./img/logo.png');
            });
            await page.waitForTimeout(700);
            assert(!(await page.locator('#imageModal').evaluate(e => e.classList.contains('hidden'))), `${file}: stale close timer hid reopened lightbox`);
        }
        console.log('PASS dialog animation replay and four lightbox reopen races');
        // Fallback without IntersectionObserver must still expose content/counter values.
        const fallback = await browser.newContext();
        await fallback.addInitScript(() => { delete window.IntersectionObserver; });
        const fallbackPage = await fallback.newPage();
        await fallbackPage.goto(new URL('index.html', base).href, { waitUntil: 'domcontentloaded' });
        assert.equal(await fallbackPage.locator('.scroll-reveal:not(.revealed)').count(), 0);
        await fallback.close();
        assert.deepEqual(issues, [], 'Uncaught browser errors');
        console.log(`PASS ${process.env.TEST_SKIP_PAGE_AUDIT ? 'focused checks' : `${pages.length} pages`}; lifecycle, dynamic content, counters, missing-observer fallback; no uncaught JS errors.`);
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
