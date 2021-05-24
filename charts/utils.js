function makeData (arr) {
  const out = {
    labels: [],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(71, 69, 153, 0.2)',
        'rgba(140, 198, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(71, 69, 153, 1)',
        'rgba(140, 198, 255, 1)'
      ],
      borderWidth: 1
    }
    ]
  }
  for (const item of arr) {
    const [label, data] = item
    out.labels.push(label)
    out.datasets[0].data.push(data)
  }
  return out
}

function makeTable (node, headings, data) {
  const thead = elt('thead', {})
  const tr = elt('tr', {})
  for (let i = 0; i < headings.length; i++) {
    const th = elt('th', {})
    th.textContent = headings[i]
    tr.appendChild(th)
  }
  thead.appendChild(tr)
  const tbody = elt('tbody', {})
  for (let i = 0; i < data.length; i++) {
    const tr = elt('tr', {})
    const row = data[i]
    for (let j = 0; j < row.length; j++) {
      const td = elt('td', {})
      td.textContent = row[j]
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }
  const table = elt('table', { class: 'table' }, thead, tbody)
  node.appendChild(table)
}

function makeTabs (nodeList) {
  for (const node of nodeList) {
    const tabs = Array.from(node.children).map(node => {
      const button = elt('button', { class: 'nav-item' })
      button.textContent = node.getAttribute('data-tabname')
      const tab = { node, button }
      button.addEventListener('click', () => selectTab(tab, tabs))
      return tab
    })

    const tabList = elt('div', { class: 'nav' })
    for (const { button } of tabs) tabList.appendChild(button)
    node.insertBefore(tabList, node.firstChild)
    selectTab(tabs[0], tabs)
  }

  function selectTab (selectedTab, tabs) {
    for (const tab of tabs) {
      const selected = tab === selectedTab
      tab.node.style.display = selected ? '' : 'none'
      if (selected) {
        tab.button.classList.add('active')
      } else {
        tab.button.classList.remove('active')
      }
    }
  }
}

function elt (name, attrs, ...children) {
  const dom = document.createElement(name)
  for (const attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr])
  }
  for (const child of children) {
    dom.appendChild(child)
  }
  return dom
}

export { makeData, makeTable, makeTabs }
