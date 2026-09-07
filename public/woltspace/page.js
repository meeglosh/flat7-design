(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const peak = document.querySelector('#crazier');
  const toggle = document.querySelector('#crazy-toggle');
  const status = document.querySelector('#crazy-status');
  let manual = false;
  let wild = false;
  function setWild(next) {
    if (wild === next) return;
    wild = next;
    peak.classList.toggle('is-crazy', wild);
    toggle.setAttribute('aria-pressed', String(wild));
    toggle.innerHTML = wild ? 'A little less crazy <span aria-hidden="true">✳</span>' : 'Make it crazier <span aria-hidden="true">✳</span>';
    document.querySelector('.wild-shot').setAttribute('aria-hidden', String(!wild));
    document.querySelector('.quiet-shot').setAttribute('aria-hidden', String(wild));
    status.textContent = wild ? 'Beavers, raccoons, fish, rivers, clouds. Still the same clear place to work.' : 'The quiet version. A clear place for projects and their keepers.';
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
  const steps = [
    ['A prerequisite needs an explanation.', 'Docker comes before the fun part. My job was to explain how to install it and get it running in language that did not assume someone had done this before.'],
    ['Translate the action, not just the label.', 'Cloning a repository means making a local copy of the project. I wanted the onboarding to connect the technical instruction with what the person was actually doing.'],
    ['Give each instruction a destination.', 'The terminal is a means to get into the workspace. I focused the instructions on setting things up and getting to that first usable screen, rather than assuming comfort with command-line tools.']
  ];
  document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-step]').forEach(b => { b.setAttribute('aria-pressed', String(b===button)); b.classList.toggle('selected',b===button); });
    const [title,copy] = steps[Number(button.dataset.step)];
    document.querySelector('#step-title').textContent=title;
    document.querySelector('#step-copy').textContent=copy;
  }));
  const views = {
    workspace: ['Projects with status labels, assigned wolts, and direct actions.', 'The project is the unit of work. Status, keeper, and actions stay together.', 'A home for the work, not just the chat.', 'Project cards show what is running and who is responsible. The team sidebar keeps agents reachable without making people switch mental models to find their projects.'],
    workflow: ['The agent conversation beside a preview of the project being worked on.', 'Conversation and output share a workspace, with ways to focus on either.', 'Keep the conversation close to the result.', 'The split view puts the agent conversation beside the project itself. People can discuss the work while looking at it, then give either view more room when they need to focus.'],
    terminal: ['The integrated terminal below the project workspace, with external connectors in the sidebar.', 'Advanced tools stay within reach without becoming the default experience.', 'An easier entry point. Room to go deeper.', 'Chat is an approachable way in. Integrated terminal views and external connectors keep the technical capabilities accessible to people who want more direct control.']
  };
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    const key=button.dataset.view, [alt,caption,heading,copy]=views[key];
    document.querySelector('#view-image').src=`assets/${key}.png`;
    document.querySelector('#view-image').alt=alt;
    document.querySelector('#view-link').href=`assets/${key}.png`;
    document.querySelector('#view-caption').textContent=caption;
    document.querySelector('#view-heading').textContent=heading;
    document.querySelector('#view-copy').textContent=copy;
  }));
  if (window.ScrollCraft) ScrollCraft.mount(document.body);
  update();
})();
