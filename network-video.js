/* Play once per page load after the map enters view during scrolling. */
(() => {
    const video = document.getElementById('network-video');
    const playButton = document.getElementById('network-video-play');
    if (!video) return;
    let started = false;
    let inView = false;
    let scrolled = window.scrollY > 0;
    let pending = false;
    video.muted = true;
    async function start() {
        if (started || pending || !inView || !scrolled) return;
        pending = true;
        try {
            await video.play();
            started = true;
            playButton.hidden = true;
            observer.disconnect();
            window.removeEventListener('scroll', onScroll);
        } catch {
            // Some mobile browsers require a gesture even for muted video.
            playButton.hidden = false;
        } finally { pending = false; }
    }
    function onScroll() { scrolled = true; start(); }
    const observer = new IntersectionObserver(entries => {
        inView = entries[0].isIntersecting;
        start();
    }, { threshold: 0.25 });
    observer.observe(video);
    window.addEventListener('scroll', onScroll, { passive: true });
    playButton.addEventListener('click', () => { scrolled = true; start(); });
    // No loop or currentTime reset: the browser holds the final decoded frame.
    video.addEventListener('ended', () => { playButton.hidden = true; });
})();
