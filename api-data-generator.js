const { writeFile } = require('fs')

const urls = [
  {
    name: 'Qatar 2022',
    url: 'https://api.fifa.com/api/v3/calendar/matches?idSeason=255711&count=100&language=en'
  },
  {
    name: 'Russia 2018',
    url: 'https://api.fifa.com/api/v3/calendar/matches?idSeason=254645&count=100&language=en'
  },
  {
    name: 'Brazil 2014',
    url: 'https://api.fifa.com/api/v3/calendar/matches?idSeason=251164&count=100&language=en'
  },
  {
    name: 'South Africa 2010',
    url: 'https://api.fifa.com/api/v3/calendar/matches?idSeason=249715&count=100&language=en'
  },
  {
    name: 'Germany 2006',
    url: 'https://api.fifa.com/api/v3/calendar/matches?idSeason=9741&count=100&language=en'
  },
  {
    name: 'Korea-Japan 2002',
    url: 'https://api.fifa.com/api/v3/calendar/matches?idSeason=4395&count=100&language=en'
  },
  {
    name: 'France 1998',
    url: 'https://api.fifa.com/api/v3/calendar/matches?idSeason=1013&count=100&language=en'
  }
]

function makeData (tournament) {
  fetch(tournament.url)
    .then((response) => response.json())
    .then((data) => {
      const resultsData = data.Results
      const results = []

      resultsData.forEach(element => {
        if (element.HomeTeamScore !== null && element.AwayTeamScore !== null) {
          const result = {
            home: element.Home.TeamName[0].Description,
            away: element.Away.TeamName[0].Description,
            score: `${element.HomeTeamScore}-${element.AwayTeamScore}`,
            stage: element.StageName[0].Description,
            location: element.Stadium.CityName[0].Description,
            stadium: element.Stadium.Name[0].Description,
            date: element.Date
          }
          if (result.stage === 'First stage' || result.stage === 'Group Stage' || result.stage === 'Group Matches') {
            result.stage = element.GroupName[0].Description
          }
          if (element.ResultType === 2 || element.ResultType === 3 || element.ResultType === 8) {
            const team = (element.Winner === element.Home.IdTeam) ? result.home : result.away
            if (element.ResultType === 2) {
              const score = `${element.HomeTeamPenaltyScore}-${element.AwayTeamPenaltyScore}`
              result.reasononwin = `${team} win ${score} on penalties`
            }
            if (element.ResultType === 3) {
              result.reasononwin = `${team} win after extra time`
            }
            if (element.ResultType === 8) {
              result.reasononwin = 'Win on Golden Goal'
            }
          }
          results.push(result)
        }
      })

      const filename = tournament.name.replace(/ /g, '_')
      writeFile('./json/' + filename + '.json', JSON.stringify(results), err => {
        if (err) {
          console.log(`Failed to write file: ${err}`)
        } else {
          console.log(`File ${filename}.json written`)
        }
      })
    })
}

urls.forEach((item) => {
  makeData(item)
})
