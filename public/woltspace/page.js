(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const peak = document.querySelector('#zanier');
  const toggle = document.querySelector('#zany-toggle');
  const status = document.querySelector('#zany-status');
  let manual = false;
  let wild = false;
  function setWild(next) {
    if (wild === next) return;
    wild = next;
    peak.classList.toggle('is-zany', wild);
    toggle.setAttribute('aria-pressed', String(wild));
    toggle.innerHTML = wild ? 'A little less zany <span aria-hidden="true">✳</span>' : 'Make it zanier <span aria-hidden="true">✳</span>';
    document.querySelector('.wild-shot').setAttribute('aria-hidden', String(!wild));
    document.querySelector('.quiet-shot').setAttribute('aria-hidden', String(wild));
    status.textContent = wild ? 'Beavers, raccoons, fish, rivers, clouds. Still the same clear place to work.' : 'Just the structure. No personality yet.';
  }
  toggle.addEventListener('click', () => { manual = true; setWild(!wild); });
  let queued = false;
  function update() {
    queued = false;
    const rect = peak.getBoundingClientRect();
    const travel = Math.max(1, peak.offsetHeight - innerHeight);
    const p = Math.max(0, Math.min(1, -rect.top / travel));
    peak.style.setProperty('--arrival', String(p));
    if (rect.top < innerHeight && rect.bottom > 0) {
      // Expose rendered transforms, not a synthetic progress counter, to the visual harness.
      peak.dataset.scVerifyState = JSON.stringify([wild, ...[...peak.querySelectorAll('.escaped')].map(el => [getComputedStyle(el).opacity, getComputedStyle(el).transform])]);
      peak.dataset.scVerifyHold = String(reduced.matches || innerWidth <= 600 || manual || p < .3);
    } else {
      peak.removeAttribute('data-sc-verify-state');
      peak.removeAttribute('data-sc-verify-hold');
    }
    // Let the visitor's explicit choice win over scroll for the remainder of the visit.
    if (!manual && !reduced.matches && innerWidth > 600) setWild(p > .3);
  }
  function requestUpdate() { if (!queued) { queued=true; requestAnimationFrame(update); } }
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
  const imageRequests = new WeakMap();
  async function crossfadeImage(img, src, alt) {
    const request = {};
    imageRequests.set(img, request);
    if (img.getAttribute('src') === src) { img.alt = alt; return; }
    const preload = new Image(); preload.src = src;
    try { await preload.decode(); } catch { return; }
    if (imageRequests.get(img) !== request) return;
    const parent = img.parentElement;
    parent.querySelectorAll('.image-outgoing').forEach(el => el.remove());
    const old = img.cloneNode(); old.removeAttribute('id'); old.alt = ''; old.setAttribute('aria-hidden','true');
    const box = img.getBoundingClientRect(), host = parent.getBoundingClientRect();
    old.classList.add('image-outgoing');
    old.style.cssText = `position:absolute;left:${box.left-host.left}px;top:${box.top-host.top}px;width:${box.width}px;height:${box.height}px;margin:0;max-height:none;z-index:2;pointer-events:none;`;
    img.src = src; img.alt = alt;
    if (reduced.matches) return;
    parent.appendChild(old);
    const fade = old.animate([{opacity:1},{opacity:0}], {duration:450,easing:'ease-in-out'});
    fade.finished.then(() => old.remove()).catch(() => old.remove());
  }
  const steps = [
    ['A prerequisite needs an explanation.', 'Docker comes before the fun part. My job was to explain how to install it and get it running in language that did not assume someone had done this before.'],
    ['Translate the action, not just the label.', 'Cloning a repository means making a local copy of the project. I wanted the onboarding to connect the technical instruction with what the person was actually doing.'],
    ['Give each instruction a destination.', 'The terminal is a means to get into the workspace. I focused the instructions on setting things up and getting to that first usable screen, rather than assuming comfort with command-line tools.']
  ];
  function selectStep(button) {
    document.querySelectorAll('[data-step]').forEach(b => { b.setAttribute('aria-pressed', String(b===button)); b.classList.toggle('selected',b===button); });
    const index = Number(button.dataset.step);
    const visuals = [
      ['setup-docker.svg', 'Docker Desktop running on a laptop: preparing your machine for Woltspace.', 'Explain the prerequisite before asking someone to install it. Concept illustration.'],
      ['setup-repo.svg', 'The Woltspace repository on GitHub becomes a local copy on your machine.', 'Connect the technical instruction with a familiar action: bring the project onto your computer. Concept illustration.'],
      ['onboarding.png', 'Meet your first wolt: give your collaborator a name, type, and skills.', 'The destination: create your first collaborator. Original design prototype.']
    ];
    const [file, alt, caption] = visuals[index];
    crossfadeImage(document.querySelector('#setup-image'), `assets/${file}`, alt);
    document.querySelector('#setup-image-link').href = `assets/${file}`;
    document.querySelector('#setup-caption').textContent = caption;
    const [title,copy] = steps[index];
    document.querySelector('#step-title').textContent=title;
    document.querySelector('#step-copy').textContent=copy;
  }
  document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => selectStep(button)));
  const views = {
    workspace: ['Projects with status labels, assigned wolts, and direct actions.', 'The project is the unit of work. Status, keeper, and actions stay together.', 'A home for the work, not just the chat.', 'Project cards show what is running and who is responsible. The team sidebar keeps agents reachable without making people switch mental models to find their projects.'],
    workflow: ['The agent conversation beside a preview of the project being worked on.', 'Conversation and output share a workspace, with ways to focus on either.', 'Keep the conversation close to the result.', 'The split view puts the agent conversation beside the project itself. People can discuss the work while looking at it, then give either view more room when they need to focus.'],
    terminal: ['The integrated terminal below the project workspace, with external connectors in the sidebar.', 'Advanced tools stay within reach without becoming the default experience.', 'An easier entry point. Room to go deeper.', 'Chat is an approachable way in. Integrated terminal views and external connectors keep the technical capabilities accessible to people who want more direct control.']
  };
  function selectView(button) {
    document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    const key=button.dataset.view, [alt,caption,heading,copy]=views[key];
    crossfadeImage(document.querySelector('#view-image'), `assets/${key}.png`, alt);
    document.querySelector('#view-link').href=`assets/${key}.png`;
    document.querySelector('#view-caption').textContent=caption;
    document.querySelector('#view-heading').textContent=heading;
    document.querySelector('#view-copy').textContent=copy;
  }
  const viewButtons = [...document.querySelectorAll('[data-view]')];
  const viewTrack = document.querySelector('.workspace-scroll');
  let lastViewIndex = -1;
  viewButtons.forEach(button => button.addEventListener('click', () => selectView(button)));
  function syncWorkspaceView() {
    if (reduced.matches) return;
    const rect = viewTrack.getBoundingClientRect();
    const travel = viewTrack.offsetHeight - innerHeight;
    if (travel <= 0) return;
    const index = Math.min(2, Math.max(0, Math.floor((-rect.top / travel) * 3)));
    if (index !== lastViewIndex) { lastViewIndex = index; selectView(viewButtons[index]); }
  }
  const setupTrack = document.querySelector('.setup-scroll');
  const stepButtons = [...document.querySelectorAll('[data-step]')];
  let lastStepIndex = -1;
  function syncSetupStep() {
    if (reduced.matches) return;
    const travel = setupTrack.offsetHeight - innerHeight;
    if (travel <= 0) return;
    const index = Math.min(2, Math.max(0, Math.floor(-setupTrack.getBoundingClientRect().top / travel * 3)));
    if (index !== lastStepIndex) { lastStepIndex = index; selectStep(stepButtons[index]); }
  }
  let viewQueued = false;
  addEventListener('scroll', () => { if (!viewQueued) { viewQueued = true; requestAnimationFrame(() => { viewQueued = false; syncWorkspaceView(); syncSetupStep(); }); } }, {passive:true});
  addEventListener('resize', syncWorkspaceView);
  addEventListener('resize', syncSetupStep);
  syncWorkspaceView(); syncSetupStep();
  const startPrototype = document.querySelector('#prototype-start');
  const resetPrototype = document.querySelector('#prototype-reset');
  const prototypeStage = document.querySelector('#prototype-stage');
  const prototypeCover = document.querySelector('#prototype-cover');
  const prototypeHelp = document.querySelector('#prototype-help');
  const prototypeDemo = document.querySelector('#prototype-demo');
  const prototypeToolbar = prototypeDemo.querySelector('.prototype-toolbar');
  const prototypeActions = prototypeDemo.querySelector('.prototype-actions');
  const prototypeControls = document.querySelector('#prototype-controls');
  startPrototype.hidden = false;
  let prototypeFrame;
  startPrototype.addEventListener('click', () => {
    prototypeFrame = document.createElement('iframe');
    prototypeFrame.title = 'Woltspace interactive design prototype';
    prototypeFrame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-modals');
    prototypeFrame.src = 'prototype/index.html';
    prototypeFrame.addEventListener('load', () => {
      // Preserve the supplied file, adapting its fixed onboarding to the embed's height.
      const embeddedStyle = prototypeFrame.contentDocument.createElement('style');
      embeddedStyle.textContent = `
        #onboarding{overflow-y:auto;align-items:flex-start}.ob-inner{margin-block:auto}
        @media(max-width:600px){
          #waking-view .pd-back-bar{overflow-x:auto;flex-shrink:0}
          #wk-drag-handle{display:none!important}
          #waking-view:not(:has(#wk-btn-project.active)) #wk-preview-panel{display:none!important}
          #waking-view:not(:has(#wk-btn-project.active)) #wk-chat-panel{display:flex!important;width:100%!important;flex:1;min-width:0}
          #waking-view:has(#wk-btn-project.active) #wk-chat-panel{display:none!important}
          #waking-view:has(#wk-btn-project.active) #wk-preview-panel{width:100%!important;min-width:0}
        }`;
      prototypeFrame.contentDocument.head.append(embeddedStyle);
      prototypeHelp.textContent = 'Give your wolt a name to begin. Use Lodge to return to the workspace, then choose Projects.';
    });
    prototypeCover.hidden = true;
    prototypeToolbar.hidden = true;
    prototypeControls.hidden = false;
    prototypeControls.append(prototypeActions);
    prototypeDemo.classList.add('prototype-active');
    prototypeStage.append(prototypeFrame);
    resetPrototype.hidden = false;
    prototypeHelp.textContent = 'Loading the interactive workspace…';
    document.querySelector('#prototype-demo').scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
    prototypeFrame.focus({ preventScroll: true });
  });
  resetPrototype.addEventListener('click', () => {
    prototypeFrame?.remove();
    prototypeFrame = undefined;
    prototypeCover.hidden = false;
    prototypeToolbar.hidden = false;
    prototypeControls.hidden = true;
    prototypeToolbar.append(prototypeActions);
    prototypeDemo.classList.remove('prototype-active');
    resetPrototype.hidden = true;
    prototypeHelp.textContent = 'Prototype reset. Start again with a new wolt.';
    startPrototype.focus({ preventScroll: true });
  });
  if (window.ScrollCraft) ScrollCraft.mount(document.body);
  // Scroll-craft and webfonts change the document height after native hash navigation.
  // Restore the return destination once that initial layout has settled.
  function restorePrototypeAnchor() {
    if (location.hash !== '#prototype-demo') return;
    document.fonts.ready.then(() => requestAnimationFrame(() => {
      prototypeDemo.scrollIntoView({ behavior: 'instant', block: 'start' });
    }));
  }
  if (document.readyState === 'complete') restorePrototypeAnchor();
  else addEventListener('load', restorePrototypeAnchor, { once: true });
  update();
})();
