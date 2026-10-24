function setupTabs(selector, attribute, onSelect) {
  const tabs = [...document.querySelectorAll(selector)];
  function activate(tab, moveFocus = false) {
    tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    onSelect(tab.getAttribute(attribute));
    if (moveFocus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
    });
  });
}
setupTabs('[data-output]', 'data-output', value => {
  document.querySelectorAll('.output-panel').forEach(panel => { panel.hidden = panel.id !== 'panel-' + value; });
});
