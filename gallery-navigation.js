/* Shared full-screen photo navigation for News and Activities. */
window.createPhotoNavigation = function (modal, image, close) {
    let photos = [], index = 0, start = null, trigger = null, suppressClick = false;
    const previous = document.createElement('button');
    const next = document.createElement('button');
    const counter = document.createElement('span');
    previous.type = next.type = 'button';
    previous.className = 'photo-nav photo-nav-prev'; next.className = 'photo-nav photo-nav-next';
    previous.textContent = '‹'; next.textContent = '›';
    previous.setAttribute('aria-label', 'Previous photo'); next.setAttribute('aria-label', 'Next photo');
    counter.className = 'photo-nav-counter'; counter.setAttribute('aria-live', 'polite');
    modal.append(previous, next, counter);
    modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Photo gallery');
    function render() {
        image.src = photos[index];
        counter.textContent = `${index + 1} / ${photos.length}`;
        previous.hidden = next.hidden = counter.hidden = photos.length < 2;
    }
    function step(direction) {
        if (photos.length < 2) return;
        index = (index + direction + photos.length) % photos.length;
        render();
    }
    previous.onclick = e => { e.stopPropagation(); step(-1); };
    next.onclick = e => { e.stopPropagation(); step(1); };
    modal.addEventListener('touchstart', e => {
        start = e.touches.length === 1 ? {x:e.touches[0].clientX, y:e.touches[0].clientY} : null;
    }, {passive:true});
    modal.addEventListener('touchend', e => {
        if (!start || !e.changedTouches.length) return;
        const dx=e.changedTouches[0].clientX-start.x, dy=e.changedTouches[0].clientY-start.y;
        start=null;
        if (Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.3) {
            step(dx<0?1:-1); suppressClick=true; setTimeout(()=>suppressClick=false,350);
        }
    }, {passive:true});
    modal.addEventListener('touchcancel', ()=>start=null,{passive:true});
    modal.addEventListener('click', e=>{if(suppressClick){e.preventDefault();e.stopImmediatePropagation();}},true);
    document.addEventListener('keydown', e => {
        if (modal.classList.contains('hidden')) return;
        if (e.key==='ArrowLeft'||e.key==='ArrowRight') {e.preventDefault();step(e.key==='ArrowLeft'?-1:1);}
        if (e.key==='Escape') {e.preventDefault();close();}
        if (e.key==='Tab') {
            const buttons=[...modal.querySelectorAll('button')].filter(b=>!b.hidden&&b.getClientRects().length);
            const i=buttons.indexOf(document.activeElement);
            e.preventDefault();buttons[(i+(e.shiftKey?-1:1)+buttons.length)%buttons.length]?.focus();
        }
    });
    return {open(list, selected) {trigger=document.activeElement;photos=[...new Set(list.filter(Boolean))];if(!photos.length)photos=[selected];index=Math.max(0,photos.indexOf(selected));render();}, restoreFocus(){trigger?.focus();}};
};
