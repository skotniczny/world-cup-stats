const FRANCE = require('./json/France_1998.json')
const KOREA_JAPAN = require('./json/Korea-Japan_2002.json')
const GERMANY = require('./json/Germany_2006.json')
const SOUTH_AFRICA = require('./json/South_Africa_2010.json')
const BRAZIL = require('./json/Brazil_2014.json')

const allResults = [...FRANCE, ...KOREA_JAPAN, ...GERMANY, ...SOUTH_AFRICA, ...BRAZIL]
const groupStageResults = [...FRANCE.slice(0, 48), ...KOREA_JAPAN.slice(0, 48), ...GERMANY.slice(0, 48), ...SOUTH_AFRICA.slice(0, 48), ...BRAZIL.slice(0, 48)]
const playOffStageResults = [...FRANCE.slice(48), ...KOREA_JAPAN.slice(48), ...GERMANY.slice(48), ...SOUTH_AFRICA.slice(48), ...BRAZIL.slice(48)]

function normalizeScores (results) {
  return results.map((match) => {
    const [home, away] = match.score.split('-')
    if (home < away) {
      return [away, home].join('-')
    }
    return match.score
  })
}

function scoresByFreq (scoresArray, opt) {
  if (opt === 'group') {
    scoresArray = scoresArray.slice(0, 48)
  }
  if (opt === 'playoff') {
    scoresArray = scoresArray.slice(48)
  }
  const scoresFreq = scoresArray.reduce((sums, score) => {
    sums[score] = (sums[score] || 0) + 1
    return sums
  }, {})
  const result = []
  Object.keys(scoresFreq)
    .sort((a, b) => { return scoresFreq[b] - scoresFreq[a] })
    .forEach(element => {
      const percent = scoresFreq[element] / scoresArray.length * 100
      result.push([element, scoresFreq[element], percent.toFixed(1)])
    })
  return result
}

console.log('Brazil 2014')
console.log(scoresByFreq(normalizeScores(BRAZIL)))
console.log('South Africa 2010')
console.log(scoresByFreq(normalizeScores(SOUTH_AFRICA)))
console.log('Germany 2006')
console.log(scoresByFreq(normalizeScores(GERMANY)))
console.log('Korea/Japan 2002')
console.log(scoresByFreq(normalizeScores(KOREA_JAPAN)))
console.log('France 1998')
console.log(scoresByFreq(normalizeScores(FRANCE)))
console.log('Last 5 World Cups')
console.log(scoresByFreq(normalizeScores(allResults)))

console.log('\n')
console.log('ONLY GROUP STAGE')
console.log('Brazil 2014')
console.log(scoresByFreq(normalizeScores(BRAZIL), 'group'))
console.log('South Africa 2010')
console.log(scoresByFreq(normalizeScores(SOUTH_AFRICA), 'group'))
console.log('Germany 2006')
console.log(scoresByFreq(normalizeScores(GERMANY), 'group'))
console.log('Korea/Japan 2002')
console.log(scoresByFreq(normalizeScores(KOREA_JAPAN), 'group'))
console.log('France 1998')
console.log(scoresByFreq(normalizeScores(FRANCE), 'group'))
console.log('Last 5 World Cups')
console.log(scoresByFreq(normalizeScores(groupStageResults)))

console.log('\n')
console.log('ONLY PLAY OFF STAGE')
console.log('Brazil 2014')
console.log(scoresByFreq(normalizeScores(BRAZIL), 'playoff'))
console.log('South Africa 2010')
console.log(scoresByFreq(normalizeScores(SOUTH_AFRICA), 'playoff'))
console.log('Germany 2006')
console.log(scoresByFreq(normalizeScores(GERMANY), 'playoff'))
console.log('Korea/Japan 2002')
console.log(scoresByFreq(normalizeScores(KOREA_JAPAN), 'playoff'))
console.log('France 1998')
console.log(scoresByFreq(normalizeScores(FRANCE), 'playoff'))
console.log('Last 5 World Cups')
console.log(scoresByFreq(normalizeScores(playOffStageResults)))

console.log('\n')
console.log('GOALS SCORED')

const notDraws = scoresByFreq(normalizeScores(allResults)).filter(result => {
  const [home, away] = result[0].split('-')
  return home !== away[1]
})

// eslint-disable-next-line no-unused-vars
const draws = scoresByFreq(normalizeScores(allResults)).filter(result => {
  const [home, away] = result[0].split('-')
  return home === away
})

const winnerGoals = [...new Set(notDraws.map(([score, no, precent]) => {
  return score.split('-')[0]
}))]

const loosersGoals = [...new Set(notDraws.map(([score, no, precent]) => {
  return score.split('-')[1]
}))]

function byGoals (flag, uniq, results) {
  const out = []
  for (let score of uniq) {
    const sum = results.filter(result => {
      const [winner, looser] = result[0].split('-')
      if (flag === 'winners') {
        return winner === score
      }
      if (flag === 'loosers') {
        return looser === score
      }
    }).reduce((sum, arr) => {
      sum += arr[1]
      return sum
    }, 0)
    out.push({[score]: sum})
  }
  return out
}

console.log('WINNERS GOALS')
console.log(byGoals('winners', winnerGoals, notDraws))

console.log('LOOSERS GOALS')
console.log(byGoals('loosers', loosersGoals, notDraws))

function byGoalsDiff (resultsArr) {
  const diffArr = resultsArr.map(result => {
    const [home, away] = result.split('-')
    return home - away
  }).sort((a, b) => Number(a) - Number(b))

  const goalsDiff = diffArr.reduce((sums, diff) => {
    sums[diff] = (sums[diff] || 0) + 1
    return sums
  }, {})

  const out = []
  Object.keys(goalsDiff).forEach((key) => {
    const percent = goalsDiff[key] / resultsArr.length * 100
    out.push([key, goalsDiff[key], percent.toFixed(1)])
  })
  return out
}

console.log('\n')
console.log('GOALS DIFF')
console.log('Brazil 2014')
console.log(byGoalsDiff(normalizeScores(BRAZIL)))
console.log('South Africa 2010')
console.log(byGoalsDiff(normalizeScores(SOUTH_AFRICA)))
console.log('Germany 2006')
console.log(byGoalsDiff(normalizeScores(GERMANY)))
console.log('Korea/Japan 2002')
console.log(byGoalsDiff(normalizeScores(KOREA_JAPAN)))
console.log('France 1998')
console.log(byGoalsDiff(normalizeScores(FRANCE)))
console.log('Last 5 World Cups')
console.log(byGoalsDiff(normalizeScores(allResults)))
