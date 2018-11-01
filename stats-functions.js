module.exports = {
  normalizeScores: function (results) {
    return results
      .filter(match => match.hasOwnProperty('score'))
      .map((match) => {
        const [home, away] = match.score.split('-')
        if (home < away) {
          return [away, home].join('-')
        }
        return match.score
      })
  },
  scoresByFreq: function (scoresArray, opt) {
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
        result.push([element, scoresFreq[element], percentage(scoresFreq[element], scoresArray.length)])
      })
    return result
  },
  byGoalsDiff: function (resultsArr) {
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
      out.push([key, goalsDiff[key], percentage(goalsDiff[key], resultsArr.length)])
    })
    return out
  },
  goalsScored: function (resultsArr) {
    const sum = resultsArr.reduce((sum, result) => {
      const [home, away] = result.split('-')
      sum += Number(home) + Number(away)
      return sum
    }, 0)
    return sum
  },
  goalsAvg: function (resultsArr) {
    const sum = resultsArr.reduce((sum, result) => {
      const [home, away] = result.split('-')
      sum += Number(home) + Number(away)
      return sum
    }, 0)
    let avg = sum / resultsArr.length
    avg = Number(avg.toFixed(2))
    return avg
  },
  goalsScoredBy: function (type, resultsArr) {
    const out = []
    const gamesWithoutDraws = resultsArr.filter(result => {
      const [home, away] = result[0].split('-')
      return home !== away
    })
    const uniqScores = [...new Set(gamesWithoutDraws
      .map(([score]) => {
        const [winner, loser] = score.split('-')
        if (type === 'winners') {
          return winner
        }
        if (type === 'losers') {
          return loser
        }
      })
    )]
    for (let score of uniqScores) {
      const sum = gamesWithoutDraws.filter(result => {
        const [winner, loser] = result[0].split('-')
        if (type === 'winners') {
          return winner === score
        }
        if (type === 'losers') {
          return loser === score
        }
      }).reduce((sum, arr) => {
        sum += arr[1]
        return sum
      }, 0)
      out.push([score, sum])
    }
    out.sort(byColumn(1))
    const totalOccurences = out.reduce((sum, arr) => {
      sum += arr[1]
      return sum
    }, 0)
    return out.map(([score, occurences]) => {
      return [score, occurences, percentage(occurences, totalOccurences)]
    })
  }
}

function byColumn (colNo) {
  return function (a, b) {
    return b[colNo] - a[colNo]
  }
}

function percentage (part, whole) {
  let percent = part / whole * 100
  return Number(percent.toFixed(1))
}
