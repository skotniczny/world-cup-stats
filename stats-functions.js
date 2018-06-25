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
        let percent = scoresFreq[element] / scoresArray.length * 100
        percent = Number(percent.toFixed(1))
        result.push([element, scoresFreq[element], percent])
      })
    return result
  },
  byGoals: function (flag, uniq, results) {
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
      out.push([score, sum])
    }
    return out
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
      let percent = goalsDiff[key] / resultsArr.length * 100
      percent = Number(percent.toFixed(1))
      out.push([key, goalsDiff[key], percent])
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
  calculatePoints: function (type, results) {
    let sum = 0
    const [typeHome, typeAway] = type.split('-')
    for (let result of results) {
      const [resultHome, resultAway] = result.split('-')
      if ((typeHome > typeAway && resultHome > resultAway) || (typeHome === typeAway && resultHome === resultAway) || (typeHome < typeAway && resultHome < resultAway)) {
        sum += 1
      }
      if (typeHome - typeAway === resultHome - resultAway) {
        sum += 1
      }
      if (typeHome === resultHome) {
        sum += 1
      }
      if (typeAway === resultAway) {
        sum += 1
      }
      if (typeHome === resultHome && typeAway === resultAway) {
        sum += 1
      }
    }
    return sum
  }
}
