import DATA from '../json/data.json'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'chart.js'
import { fontString } from 'chart.js/helpers'
import { makeData, makeTable, makeTabs } from './utils.js'

const BarChartLabels = {

  id: 'barChartLabels',
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
          ctx.font = fontString(fontSize, fontStyle, fontFamily)
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
}

Chart.register({
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  BarChartLabels
})

Chart.defaults.plugins.legend.display = false
Chart.defaults.maintainAspectRatio = true
Chart.defaults.layout.padding.top = 20
Chart.defaults.scale.ticks.beginAtZero = true
Chart.defaults.plugins.tooltip.callbacks.label = (tooltipItem) => {
  // get the concerned dataset
  const dataset = tooltipItem.dataset
  // calculate the total of this data set
  const total = dataset.data.reduce((sum, currentValue) => {
    return sum + currentValue
  })
  // get the current items value
  const currentValue = dataset.data[tooltipItem.dataIndex]
  // calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
  const precentage = ((currentValue / total) * 100).toFixed(1) + '%'
  return precentage
}

const ctxQuatar = document.getElementById('quatar').getContext('2d')
// eslint-disable-next-line no-unused-vars
const quatarChart = new Chart(ctxQuatar, {
  type: 'bar',
  data: makeData(DATA.quatar.mostFrequentScores),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores'
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          callback: (value) => { if (value % 1 === 0) { return value } }
        }
      }
    }
  }
})

const ctxRussia = document.getElementById('russia').getContext('2d')
// eslint-disable-next-line no-unused-vars
const russiaChart = new Chart(ctxRussia, {
  type: 'bar',
  data: makeData(DATA.russia.mostFrequentScores),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores'
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          callback: (value) => { if (value % 1 === 0) { return value } }
        }
      }
    }
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

const ctxLast6 = document.getElementById('last_6').getContext('2d')
// eslint-disable-next-line no-unused-vars
const last6Chart = new Chart(ctxLast6, {
  type: 'bar',
  data: makeData(DATA.last_6_world_cups.mostFrequentScores),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores'
    }
  }
})

const ctxLast6Group = document.getElementById('last_6_group').getContext('2d')
// eslint-disable-next-line no-unused-vars
const last6GroupChart = new Chart(ctxLast6Group, {
  type: 'bar',
  data: makeData(DATA.last_6_world_cups.mostFrequentScoresGroupStage),
  options: {
    title: {
      display: true,
      text: 'Most Common Scores in Group Stage'
    }
  }
})

const ctxLast6PlayOff = document.getElementById('last_6_playoff').getContext('2d')
// eslint-disable-next-line no-unused-vars
const last6PlayOffChart = new Chart(ctxLast6PlayOff, {
  type: 'bar',
  data: makeData(DATA.last_6_world_cups.mostFrequentScoresPlayOffStage),
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
  data: makeData(DATA.last_6_world_cups.goalsDiff),
  options: {
    title: {
      display: true,
      text: 'Goals Difference'
    }
  }
})

const scoresHeadings = ['Scoreline', 'Number Of Games', 'Percent']
makeTable(document.querySelector('#scores-quatar'), scoresHeadings, DATA.quatar.mostFrequentScores)
makeTable(document.querySelector('#scores-quatar-group'), scoresHeadings, DATA.quatar.mostFrequentScoresGroupStage)
makeTable(document.querySelector('#scores-quatar-playoff'), scoresHeadings, DATA.quatar.mostFrequentScoresPlayOffStage)

makeTable(document.querySelector('#scores-russia'), scoresHeadings, DATA.russia.mostFrequentScores)
makeTable(document.querySelector('#scores-russia-group'), scoresHeadings, DATA.russia.mostFrequentScoresGroupStage)
makeTable(document.querySelector('#scores-russia-playoff'), scoresHeadings, DATA.russia.mostFrequentScoresPlayOffStage)

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
makeTable(document.querySelector('#diff-quatar'), diffHeadings, DATA.quatar.goalsDiff)
makeTable(document.querySelector('#diff-russia'), diffHeadings, DATA.russia.goalsDiff)
makeTable(document.querySelector('#diff-brazil'), diffHeadings, DATA.brazil.goalsDiff)
makeTable(document.querySelector('#diff-south_africa'), diffHeadings, DATA.south_africa.goalsDiff)
makeTable(document.querySelector('#diff-germany'), diffHeadings, DATA.germany.goalsDiff)
makeTable(document.querySelector('#diff-korea_japan'), diffHeadings, DATA.korea_japan.goalsDiff)
makeTable(document.querySelector('#diff-france'), diffHeadings, DATA.france.goalsDiff)

const avgData = [
  ['Quatar 2022', DATA.quatar.goalsScored, DATA.quatar.goalsAvg],
  ['Russia 2018', DATA.russia.goalsScored, DATA.russia.goalsAvg],
  ['Brazil 2014', DATA.brazil.goalsScored, DATA.brazil.goalsAvg],
  ['South Africa 2010', DATA.south_africa.goalsScored, DATA.south_africa.goalsAvg],
  ['Germany 2006', DATA.germany.goalsScored, DATA.germany.goalsAvg],
  ['Korea/Japan 2002', DATA.korea_japan.goalsScored, DATA.korea_japan.goalsAvg],
  ['France 1998', DATA.france.goalsScored, DATA.france.goalsAvg],
  ['Last 7 World Cups', DATA.last_6_world_cups.goalsScored, DATA.last_6_world_cups.goalsAvg]
]
makeTable(document.querySelector('#scored-goals'), ['World Cup', 'Goals Scored', 'Goals Per Match'], avgData)

const goalsByHeadings = ['Goals Scored', 'Occurrences', 'Percent']
makeTable(document.querySelector('#goals-by-winner-quatar'), goalsByHeadings, DATA.quatar.goalsScoredByWinners)
makeTable(document.querySelector('#goals-by-winner-russia'), goalsByHeadings, DATA.russia.goalsScoredByWinners)
makeTable(document.querySelector('#goals-by-winner-brazil'), goalsByHeadings, DATA.brazil.goalsScoredByWinners)
makeTable(document.querySelector('#goals-by-winner-south_africa'), goalsByHeadings, DATA.south_africa.goalsScoredByWinners)
makeTable(document.querySelector('#goals-by-winner-germany'), goalsByHeadings, DATA.germany.goalsScoredByWinners)
makeTable(document.querySelector('#goals-by-winner-korea_japan'), goalsByHeadings, DATA.korea_japan.goalsScoredByWinners)
makeTable(document.querySelector('#goals-by-winner-france'), goalsByHeadings, DATA.france.goalsScoredByWinners)
makeTable(document.querySelector('#goals-by-winner-last_6'), goalsByHeadings, DATA.last_6_world_cups.goalsScoredByWinners)

makeTable(document.querySelector('#goals-by-losers-quatar'), goalsByHeadings, DATA.quatar.goalsScoredByLosers)
makeTable(document.querySelector('#goals-by-losers-russia'), goalsByHeadings, DATA.russia.goalsScoredByLosers)
makeTable(document.querySelector('#goals-by-losers-brazil'), goalsByHeadings, DATA.brazil.goalsScoredByLosers)
makeTable(document.querySelector('#goals-by-losers-south_africa'), goalsByHeadings, DATA.south_africa.goalsScoredByLosers)
makeTable(document.querySelector('#goals-by-losers-germany'), goalsByHeadings, DATA.germany.goalsScoredByLosers)
makeTable(document.querySelector('#goals-by-losers-korea_japan'), goalsByHeadings, DATA.korea_japan.goalsScoredByLosers)
makeTable(document.querySelector('#goals-by-losers-france'), goalsByHeadings, DATA.france.goalsScoredByLosers)
makeTable(document.querySelector('#goals-by-losers-last_6'), goalsByHeadings, DATA.last_6_world_cups.goalsScoredByLosers)

makeTabs(document.querySelectorAll('.tab-panel'))
