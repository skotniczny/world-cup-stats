/* global DATA, Chart */
var options = {
  legend: {
    display: false
  },
  layout: {
    padding: {
      top: 20
    }
  },
  maintainAspectRatio: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: false
      }
    }]
  }
}

Chart.plugins.register({
  afterDatasetsDraw: function (chart) {
    var ctx = chart.ctx
    chart.data.datasets.forEach(function (dataset, i) {
      var meta = chart.getDatasetMeta(i)
      if (!meta.hidden) {
        meta.data.forEach((element, index) => {
          // Draw the text in black, with the specified font
          ctx.fillStyle = 'rgb(0, 0, 0)'
          var fontSize = 16
          var fontStyle = 'normal'
          var fontFamily = 'Segoe UI, Helvetica Neue, Arial, sans-serif'
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily)
          // Just naively convert to string for now
          var dataString = dataset.data[index].toString()
          // Make sure alignment settings are correct
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          var padding = 5
          var position = element.tooltipPosition()
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding)
        })
      }
    })
  }
})

var ctxBrazil = document.getElementById('brazil').getContext('2d')
// eslint-disable-next-line no-unused-vars
var brazilChart = new Chart(ctxBrazil, {
  type: 'bar',
  data: makeData(DATA.brazil.mostFrequentScores),
  options: options
})

var ctxSouthAfrica = document.getElementById('south_africa').getContext('2d')
// eslint-disable-next-line no-unused-vars
var southAfricaChart = new Chart(ctxSouthAfrica, {
  type: 'bar',
  data: makeData(DATA.south_africa.mostFrequentScores),
  options: options
})

var ctxGermany = document.getElementById('germany').getContext('2d')
// eslint-disable-next-line no-unused-vars
var germanyChart = new Chart(ctxGermany, {
  type: 'bar',
  data: makeData(DATA.germany.mostFrequentScores),
  options: options
})

var ctxKoreaJapan = document.getElementById('korea_japan').getContext('2d')
// eslint-disable-next-line no-unused-vars
var koreaJapanChart = new Chart(ctxKoreaJapan, {
  type: 'bar',
  data: makeData(DATA.korea_japan.mostFrequentScores),
  options: options
})

var ctxFrance = document.getElementById('france').getContext('2d')
// eslint-disable-next-line no-unused-vars
var franceChart = new Chart(ctxFrance, {
  type: 'bar',
  data: makeData(DATA.france.mostFrequentScores),
  options: options
})

var ctxLast5 = document.getElementById('last_5').getContext('2d')
// eslint-disable-next-line no-unused-vars
var last5Chart = new Chart(ctxLast5, {
  type: 'bar',
  data: makeData(DATA.last_5_world_cups),
  options: options
})

var ctxDiff = document.getElementById('diff').getContext('2d')
// eslint-disable-next-line no-unused-vars
var diffChart = new Chart(ctxDiff, {
  type: 'bar',
  data: {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
    datasets: [{
      label: 'goals difference',
      data: [79, 134, 59, 31, 10, 3, 2, 1, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: options
})

var scoresHeadings = ['Score', 'Number', 'Percent']
makeTable(document.querySelector('#scores-brazil'), scoresHeadings, DATA.brazil.mostFrequentScores)
makeTable(document.querySelector('#scores-south_africa'), scoresHeadings, DATA.south_africa.mostFrequentScores)
makeTable(document.querySelector('#scores-germany'), scoresHeadings, DATA.germany.mostFrequentScores)
makeTable(document.querySelector('#scores-korea_japan'), scoresHeadings, DATA.korea_japan.mostFrequentScores)
makeTable(document.querySelector('#scores-france'), scoresHeadings, DATA.france.mostFrequentScores)

var diffHeadings = ['Goals Difference', 'Number', 'Percent']
makeTable(document.querySelector('#diff-brazil'), diffHeadings, DATA.brazil.goalsDiff)
makeTable(document.querySelector('#diff-south_africa'), diffHeadings, DATA.south_africa.goalsDiff)
makeTable(document.querySelector('#diff-germany'), diffHeadings, DATA.germany.goalsDiff)
makeTable(document.querySelector('#diff-korea_japan'), diffHeadings, DATA.korea_japan.goalsDiff)
makeTable(document.querySelector('#diff-france'), diffHeadings, DATA.france.goalsDiff)

function makeData (arr) {
  var out = {
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
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
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
  let html = "<table class='table'><thead>"
  html += '<tr>'
  for (let i = 0; i < headings.length; i++) {
    html += '<th>' + headings[i] + '</th>'
  }
  html += '<tr></thead><tbody>'
  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    html += '<tr>'
    for (let j = 0; j < row.length; j++) {
      html += '<td>' + row[j] + '</td>'
    }
    html += '</tr>'
  }
  html += '</tbody></table>'
  node.innerHTML = html
}
