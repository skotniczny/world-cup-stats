const {writeFile} = require('fs')
const {normalizeScores, scoresByFreq, byGoalsDiff} = require('./stats-functions')

const FRANCE = require('./json/France_1998.json')
const KOREA_JAPAN = require('./json/Korea-Japan_2002.json')
const GERMANY = require('./json/Germany_2006.json')
const SOUTH_AFRICA = require('./json/South_Africa_2010.json')
const BRAZIL = require('./json/Brazil_2014.json')
const RUSSIA = require('./json/Russia_2018.json')

const allResults = [...FRANCE, ...KOREA_JAPAN, ...GERMANY, ...SOUTH_AFRICA, ...BRAZIL]
const groupStageResults = [...FRANCE.slice(0, 48), ...KOREA_JAPAN.slice(0, 48), ...GERMANY.slice(0, 48), ...SOUTH_AFRICA.slice(0, 48), ...BRAZIL.slice(0, 48)]
const playOffStageResults = [...FRANCE.slice(48), ...KOREA_JAPAN.slice(48), ...GERMANY.slice(48), ...SOUTH_AFRICA.slice(48), ...BRAZIL.slice(48)]

const data = {
  russia: {
    mostFrequentScores: scoresByFreq(normalizeScores(RUSSIA)),
    mostFrequentScoresGroupStage: scoresByFreq(normalizeScores(RUSSIA), 'group'),
    mostFrequentScoresPlayOffStage: scoresByFreq(normalizeScores(RUSSIA), 'playoff'),
    goalsDiff: byGoalsDiff(normalizeScores(RUSSIA))
  },
  brazil: {
    mostFrequentScores: scoresByFreq(normalizeScores(BRAZIL)),
    mostFrequentScoresGroupStage: scoresByFreq(normalizeScores(BRAZIL), 'group'),
    mostFrequentScoresPlayOffStage: scoresByFreq(normalizeScores(BRAZIL), 'playoff'),
    goalsDiff: byGoalsDiff(normalizeScores(BRAZIL))
  },
  south_africa: {
    mostFrequentScores: scoresByFreq(normalizeScores(SOUTH_AFRICA)),
    mostFrequentScoresGroupStage: scoresByFreq(normalizeScores(SOUTH_AFRICA), 'group'),
    mostFrequentScoresPlayOffStage: scoresByFreq(normalizeScores(SOUTH_AFRICA), 'playoff'),
    goalsDiff: byGoalsDiff(normalizeScores(SOUTH_AFRICA))
  },
  germany: {
    mostFrequentScores: scoresByFreq(normalizeScores(GERMANY)),
    mostFrequentScoresGroupStage: scoresByFreq(normalizeScores(GERMANY), 'group'),
    mostFrequentScoresPlayOffStage: scoresByFreq(normalizeScores(GERMANY), 'playoff'),
    goalsDiff: byGoalsDiff(normalizeScores(GERMANY))
  },
  korea_japan: {
    mostFrequentScores: scoresByFreq(normalizeScores(KOREA_JAPAN)),
    mostFrequentScoresGroupStage: scoresByFreq(normalizeScores(KOREA_JAPAN), 'group'),
    mostFrequentScoresPlayOffStage: scoresByFreq(normalizeScores(KOREA_JAPAN), 'playoff'),
    goalsDiff: byGoalsDiff(normalizeScores(KOREA_JAPAN))
  },
  france: {
    mostFrequentScores: scoresByFreq(normalizeScores(FRANCE)),
    mostFrequentScoresGroupStage: scoresByFreq(normalizeScores(FRANCE), 'group'),
    mostFrequentScoresPlayOffStage: scoresByFreq(normalizeScores(FRANCE), 'playoff'),
    goalsDiff: byGoalsDiff(normalizeScores(FRANCE))
  },
  last_5_world_cups: {
    mostFrequentScores: scoresByFreq(normalizeScores(allResults)),
    mostFrequentScoresGroupStage: scoresByFreq(normalizeScores(groupStageResults)),
    mostFrequentScoresPlayOffStage: scoresByFreq(normalizeScores(playOffStageResults)),
    goalsDiff: byGoalsDiff(normalizeScores(allResults))
  }
}

writeFile('./json/data.json', JSON.stringify(data), err => {
  if (err) {
    console.log(`Failed to write file: ${err}`)
  } else {
    console.log(`File ./json/data.json written`)
  }
})
