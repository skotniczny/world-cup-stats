/* global DATA, Chart */
Chart.defaults.global.legend.display = false
Chart.defaults.global.maintainAspectRatio = true
Chart.defaults.global.layout.padding.top = 20
Chart.defaults.global.tooltips.callbacks.label = (tooltipItem, data) => {
  // get the concerned dataset
  const dataset = data.datasets[tooltipItem.datasetIndex]
  // calculate the total of this data set
  const total = dataset.data.reduce((sum, currentValue) => {
    return sum + currentValue
  })
  // get the current items value
  const currentValue = dataset.data[tooltipItem.index]
  // calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
  const precentage = ((currentValue / total) * 100).toFixed(1) + '%'

  return precentage
}

Chart.plugins.register({
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i)
      if (!meta.hidden) {
        meta.data.forEach((element, index) => {
          // Draw the text in black, with the specified font
          ctx.fillStyle = 'rgb(0, 0, 0)'
          const fontSize = 16
          const fontStyle = 'normal'
          const fontFamily = 'Segoe UI, Helvetica Neue, Arial, sans-serif'
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily)
          // Just naively convert to string for now
          const dataString = dataset.data[index].toString()
          // Make sure alignment settings are correct
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          const padding = 5
          const position = element.tooltipPosition()
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding)
        })
      }
    })
  }
})

const ctxBrazil = document.getElementById('brazil').getContext('2d')
// eslint-disable-next-line no-unused-vars
const brazilChart = new Chart(ctxBrazil, {
  type: 'bar',
  data: makeData(DATA.brazil.mostFrequentScores),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores'
    }
  }
})

const ctxSouthAfrica = document.getElementById('south_africa').getContext('2d')
// eslint-disable-next-line no-unused-vars
const southAfricaChart = new Chart(ctxSouthAfrica, {
  type: 'bar',
  data: makeData(DATA.south_africa.mostFrequentScores),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores'
    }
  }
})

const ctxGermany = document.getElementById('germany').getContext('2d')
// eslint-disable-next-line no-unused-vars
const germanyChart = new Chart(ctxGermany, {
  type: 'bar',
  data: makeData(DATA.germany.mostFrequentScores),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores'
    }
  }
})

const ctxKoreaJapan = document.getElementById('korea_japan').getContext('2d')
// eslint-disable-next-line no-unused-vars
const koreaJapanChart = new Chart(ctxKoreaJapan, {
  type: 'bar',
  data: makeData(DATA.korea_japan.mostFrequentScores),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores'
    }
  }
})

const ctxFrance = document.getElementById('france').getContext('2d')
// eslint-disable-next-line no-unused-vars
const franceChart = new Chart(ctxFrance, {
  type: 'bar',
  data: makeData(DATA.france.mostFrequentScores),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores'
    }
  }
})

const ctxLast5 = document.getElementById('last_5').getContext('2d')
// eslint-disable-next-line no-unused-vars
const last5Chart = new Chart(ctxLast5, {
  type: 'bar',
  data: makeData(DATA.last_5_world_cups.mostFrequentScores),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores'
    }
  }
})

const ctxLast5Group = document.getElementById('last_5_group').getContext('2d')
// eslint-disable-next-line no-unused-vars
const last5GroupChart = new Chart(ctxLast5Group, {
  type: 'bar',
  data: makeData(DATA.last_5_world_cups.mostFrequentScoresGroupStage),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores in Group Stage'
    }
  }
})

const ctxLast5PlayOff = document.getElementById('last_5_playoff').getContext('2d')
// eslint-disable-next-line no-unused-vars
const last5PlayOffChart = new Chart(ctxLast5PlayOff, {
  type: 'bar',
  data: makeData(DATA.last_5_world_cups.mostFrequentScoresPlayOffStage),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores in PlayOff Stage'
    }
  }
})

const ctxDiff = document.getElementById('diff').getContext('2d')
// eslint-disable-next-line no-unused-vars
const diffChart = new Chart(ctxDiff, {
  type: 'bar',
  data: makeData(DATA.last_5_world_cups.goalsDiff),
  options: {
    title: {
      display: true,
      text: 'Goals Difference'
    }
  }
})

const scoresHeadings = ['Scoreline', 'Number Of Games', 'Percent']

makeTable(document.querySelector('#scores-brazil'), scoresHeadings, DATA.brazil.mostFrequentScores)
makeTable(document.querySelector('#scores-brazil-group'), scoresHeadings, DATA.brazil.mostFrequentScoresGroupStage)
makeTable(document.querySelector('#scores-brazil-playoff'), scoresHeadings, DATA.brazil.mostFrequentScoresPlayOffStage)

makeTable(document.querySelector('#scores-south_africa'), scoresHeadings, DATA.south_africa.mostFrequentScores)
makeTable(document.querySelector('#scores-south_africa-group'), scoresHeadings, DATA.south_africa.mostFrequentScoresGroupStage)
makeTable(document.querySelector('#scores-south_africa-playoff'), scoresHeadings, DATA.south_africa.mostFrequentScoresPlayOffStage)

makeTable(document.querySelector('#scores-germany'), scoresHeadings, DATA.germany.mostFrequentScores)
makeTable(document.querySelector('#scores-germany-group'), scoresHeadings, DATA.germany.mostFrequentScoresGroupStage)
makeTable(document.querySelector('#scores-germany-playoff'), scoresHeadings, DATA.germany.mostFrequentScoresPlayOffStage)

makeTable(document.querySelector('#scores-korea_japan'), scoresHeadings, DATA.korea_japan.mostFrequentScores)
makeTable(document.querySelector('#scores-korea_japan-group'), scoresHeadings, DATA.korea_japan.mostFrequentScoresGroupStage)
makeTable(document.querySelector('#scores-korea_japan-playoff'), scoresHeadings, DATA.korea_japan.mostFrequentScoresPlayOffStage)

makeTable(document.querySelector('#scores-france'), scoresHeadings, DATA.france.mostFrequentScores)
makeTable(document.querySelector('#scores-france-group'), scoresHeadings, DATA.france.mostFrequentScoresGroupStage)
makeTable(document.querySelector('#scores-france-playoff'), scoresHeadings, DATA.france.mostFrequentScoresPlayOffStage)

const diffHeadings = ['Goals Difference', 'Number', 'Percent']
makeTable(document.querySelector('#diff-brazil'), diffHeadings, DATA.brazil.goalsDiff)
makeTable(document.querySelector('#diff-south_africa'), diffHeadings, DATA.south_africa.goalsDiff)
makeTable(document.querySelector('#diff-germany'), diffHeadings, DATA.germany.goalsDiff)
makeTable(document.querySelector('#diff-korea_japan'), diffHeadings, DATA.korea_japan.goalsDiff)
makeTable(document.querySelector('#diff-france'), diffHeadings, DATA.france.goalsDiff)

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
  for (let item of arr) {
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
  console.log(tbody, thead)
  const table = elt('table', {class: 'table'}, thead, tbody)
  node.appendChild(table)
}

function makeTabs (nodeList) {
  for (let node of nodeList) {
    let tabs = Array.from(node.children).map(node => {
      let button = elt('button', {class: 'nav-item'})
      button.textContent = node.getAttribute('data-tabname')
      let tab = {node, button}
      button.addEventListener('click', () => selectTab(tab, tabs))
      return tab
    })

    let tabList = elt('div', {class: 'nav'})
    for (let {button} of tabs) tabList.appendChild(button)
    node.insertBefore(tabList, node.firstChild)
    selectTab(tabs[0], tabs)
  }

  function selectTab (selectedTab, tabs) {
    console.log(tabs)
    for (let tab of tabs) {
      let selected = tab === selectedTab
      tab.node.style.display = selected ? '' : 'none'
      if (selected) {
        tab.button.classList.add('active')
      } else {
        tab.button.classList.remove('active')
      }
    }
  }
}

makeTabs(document.querySelectorAll('.tab-panel'))

function elt (name, attrs, ...children) {
  let dom = document.createElement(name)
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr])
  }
  for (let child of children) {
    dom.appendChild(child)
  }
  return dom
}
