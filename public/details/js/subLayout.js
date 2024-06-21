// subLayout.js
function createSubLayout() {
    const subLayoutContainer = document.getElementById('subLayout');
    const subLayoutHTML = generateSubLayoutHTML();
    subLayoutContainer.innerHTML = subLayoutHTML;
  }
  
  function generateSubLayoutHTML() {
    return `
      <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style="width: 380px;">
        <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
          <svg class="bi pe-none me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
          <span class="fs-5 fw-semibold">List group</span>
        </a>
        <div class="list-group list-group-flush border-bottom scrollarea">
          ${generateListItems()}
        </div>
      </div>
    `;
  }
  
  function generateListItems() {
    const listItems = [
      { heading: 'List group item heading 1', date: 'Wed', content: 'Some placeholder content 1' },
      { heading: 'List group item heading 2', date: 'Tues', content: 'Some placeholder content 2' },
      { heading: 'List group item heading 3', date: 'Mon', content: 'Some placeholder content 3' },
      // ... 추가적인 리스트 아이템
    ];
  
    return listItems.map(item => `
      <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">${item.heading}</strong>
          <small class="text-body-secondary">${item.date}</small>
        </div>
        <div class="col-10 mb-1 small">${item.content}</div>
      </a>
    `).join('');
  }
  
  export { createSubLayout };