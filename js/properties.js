document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('propertiesGrid');
  const empty = document.getElementById('propertiesEmpty');
  if (!grid) return;

  fetch('properties.json')
    .then(res => res.json())
    .then(data => {
      const properties = data.properties || [];
      if (properties.length === 0) return;

      empty.style.display = 'none';

      properties.forEach(p => {
        const card = document.createElement('div');
        card.className = 'work-card';
        card.innerHTML = `
          <div class="work-img">
            <img src="images/properties/${p.image}" alt="${p.title}">
          </div>
          <div class="work-body">
            <span class="work-tag">${p.status}</span>
            <h3>${p.title}</h3>
            <p>${p.location} / ${p.area_sqm}㎡（${p.area_tsubo}坪）</p>
            <p>${p.price}</p>
          </div>
        `;
        grid.appendChild(card);
      });
    })
    .catch(() => {});
});
