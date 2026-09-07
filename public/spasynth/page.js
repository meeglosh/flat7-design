(() => {
  ScrollCraft.mount(document.body);
  const teardown = document.getElementById('teardown');
  const stage = document.getElementById('synth-stage');
  const label = document.getElementById('module-label');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let ticking = false;
  function update() {
    ticking = false;
    const rect = teardown.getBoundingClientRect();
    const readingLine = innerHeight * (innerWidth <= 650 ? .58 : .5);
    const positions = [0, ...['chaos-note','matrix-note','native-note','reassembly-note'].map(id => {
      const note = document.querySelector('#'+id+' .note-content');
      return note.getBoundingClientRect().top - rect.top - readingLine;
    }), rect.height - innerHeight];
    const stops = [0, .26, .51, .72, .82, 1];
    const distance = -rect.top;
    let progress = 0;
    for (let i=0; i<positions.length-1; i++) {
      if (distance >= positions[i]) {
        const t = Math.max(0,Math.min(1,(distance-positions[i])/Math.max(1,positions[i+1]-positions[i])));
        progress = stops[i] + (stops[i+1]-stops[i])*t;
      }
    }
    progress = Math.max(0,Math.min(1,progress));
    const activeModule = reduced.matches ? 'whole' : progress < .25 ? 'sample' : progress < .5 ? 'chaos' : progress < .72 ? 'matrix' : 'whole';
    const names = {sample:'Sample engine',chaos:'Organic Chaos',matrix:'Modulation matrix',whole:reduced.matches || progress < .84 ? 'The whole instrument' : progress < .995 ? 'Reassembly' : 'Reassembled'};
    label.textContent = names[activeModule];
    stage.dataset.activeModule = activeModule;
    teardown.style.setProperty('--teardown-progress', progress.toFixed(4));
    window.dispatchEvent(new CustomEvent('spasynth:progress', {detail:{progress,reducedMotion:reduced.matches,activeModule}}));
  }
  function queue() { if (!ticking) { ticking=true;requestAnimationFrame(update); } }
  addEventListener('scroll', queue, {passive:true});
  addEventListener('resize', queue, {passive:true});
  addEventListener('load', queue);
  reduced.addEventListener('change', queue);
  window.addEventListener('spasynth:ready', queue);
  document.querySelectorAll('audio').forEach(audio => audio.addEventListener('play', () => {
    document.querySelectorAll('audio').forEach(other => {if (other !== audio) other.pause();});
  }));
  update();
})();
