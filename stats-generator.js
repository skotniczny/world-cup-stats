const { writeFile } = require('fs')
const { normalizeScores, scoresByFreq, byGoalsDiff, goalsScored, goalsAvg, goalsScoredBy } = require('./stats-functions')

const FRANCE = require('./json/France_1998.json')
const KOREA_JAPAN = require('./json/Korea-Japan_2002.json')
const GERMANY = require('./json/Germany_2006.json')
const SOUTH_AFRICA = require('./json/South_Africa_2010.json')
const BRAZIL = require('./json/Brazil_2014.json')
const RUSSIA = require('./json/Russia_2018.json')

const allResults = [...FRANCE, ...KOREA_JAPAN, ...GERMANY, ...SOUTH_AFRICA, ...BRAZIL, ...RUSSIA]
const groupStageResults = [...FRANCE.slice(0, 48), ...KOREA_JAPAN.slice(0, 48), ...GERMANY.slice(0, 48), ...SOUTH_AFRICA.slice(0, 48), ...BRAZIL.slice(0, 48), ...RUSSIA.slice(0, 48)]
const playOffStageResults = [...FRANCE.slice(48), ...KOREA_JAPAN.slice(48), ...GERMANY.slice(48), ...SOUTH_AFRICA.slice(48), ...BRAZIL.slice(48), ...RUSSIA.slice(48)]

function statsGenerator (data) {
  return {
    mostFrequentScores: scoresByFreq(normalizeScores(data)),
    mostFrequentScoresGroupStage: scoresByFreq(normalizeScores(data), 'group'),
    mostFrequentScoresPlayOffStage: scoresByFreq(normalizeScores(data), 'playoff'),
    goalsDiff: byGoalsDiff(normalizeScores(data)),
    goalsScored: goalsScored(normalizeScores(data)),
    goalsAvg: goalsAvg(normalizeScores(data)),
    goalsScoredByWinners: goalsScoredBy('winners', scoresByFreq(normalizeScores(data))),
    goalsScoredByLosers: goalsScoredBy('losers', scoresByFreq(normalizeScores(data)))
  }
}

const data = {
  russia: statsGenerator(RUSSIA),
  brazil: statsGenerator(BRAZIL),
  south_africa: statsGenerator(SOUTH_AFRICA),
  germany: statsGenerator(GERMANY),
  korea_japan: statsGenerator(KOREA_JAPAN),
  france: statsGenerator(FRANCE),
  last_6_world_cups: {
    mostFrequentScores: scoresByFreq(normalizeScores(allResults)),
    mostFrequentScoresGroupStage: scoresByFreq(normalizeScores(groupStageResults)),
    mostFrequentScoresPlayOffStage: scoresByFreq(normalizeScores(playOffStageResults)),
    goalsDiff: byGoalsDiff(normalizeScores(allResults)),
    goalsScored: goalsScored(normalizeScores(allResults)),
    goalsAvg: goalsAvg(normalizeScores(allResults)),
    goalsScoredByWinners: goalsScoredBy('winners', scoresByFreq(normalizeScores(allResults))),
    goalsScoredByLosers: goalsScoredBy('losers', scoresByFreq(normalizeScores(allResults)))
  }
}

writeFile('./json/data.json', JSON.stringify(data), err => {
  if (err) {
    console.log(`Failed to write file: ${err}`)
  } else {
    console.log('File ./json/data.json written')
  }
})
