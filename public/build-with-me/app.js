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
setupTabs('[data-editor]', 'data-editor', value => {
  document.querySelectorAll('.edit-form').forEach(form => { form.hidden = form.id !== ({copy:'copy-form',projects:'project-form',testimonials:'testimonial-form'}[value]); });
});
const status = document.getElementById('editor-status');
document.getElementById('copy-form').addEventListener('submit', event => {
  event.preventDefault();
  const headline = document.getElementById('headline').value.trim();
  if (!headline) { status.textContent = 'Add a headline before applying your changes.'; return; }
  document.getElementById('preview-headline').textContent = headline;
  document.getElementById('preview-description').textContent = document.getElementById('description').value;
  status.textContent = 'Copy updated in the example preview.';
});
let photoUrl;
document.getElementById('photo').addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) { status.textContent = 'Choose an image smaller than 10 MB.'; event.target.value = ''; return; }
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = URL.createObjectURL(file);
  const art = document.getElementById('project-art');
  art.style.backgroundImage = 'url("' + photoUrl + '")'; art.classList.add('has-photo');
  status.textContent = 'Image updated. The file stays in this browser.';
});
let projectCount = 0;
document.getElementById('project-form').addEventListener('submit', event => {
  event.preventDefault();
  if (projectCount >= 3) { status.textContent = 'This example holds three projects. Refresh the page to start again.'; return; }
  const title = document.getElementById('project-title'); const detail = document.getElementById('project-detail');
  if (!title.value.trim() || !detail.value.trim()) { status.textContent = 'Add a project title and description.'; return; }
  const article = document.createElement('article'); const heading = document.createElement('h4'); const p = document.createElement('p');
  heading.textContent = title.value.trim(); p.textContent = detail.value.trim(); article.append(heading,p); document.getElementById('preview-projects').append(article);
  projectCount++; event.target.reset(); status.textContent = 'Project added to the example preview.';
});
document.getElementById('testimonial-form').addEventListener('submit', event => {
  event.preventDefault();
  const quote = document.getElementById('quote').value.trim(); const attribution = document.getElementById('attribution').value.trim();
  if (!quote || !attribution) { status.textContent = 'Add a quote and attribution.'; return; }
  const block = document.getElementById('preview-quote'); block.querySelector('p').textContent = '“' + quote + '”'; block.querySelector('cite').textContent = attribution + ' · sample testimonial'; block.hidden = false;
  status.textContent = 'Sample testimonial updated in the preview.';
});
