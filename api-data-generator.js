const { writeFile } = require('fs')

fetch('https://api.fifa.com/api/v3/calendar/matches?language=en&count=100&idSeason=255711')
  .then((response) => response.json())
  .then((data) => {
    const resultsData = data.Results
    const results = []
    resultsData.forEach(element => {
      if (element.HomeTeamScore !== null && element.AwayTeamScore !== null) {
        results.push({
          home: element.Home.ShortClubName,
          away: element.Away.ShortClubName,
          score: `${element.HomeTeamScore}-${element.AwayTeamScore}`,
          stage: element.StageName[0].Description,
          location: element.Stadium.CityName[0].Description,
          stadium: element.Stadium.Name[0].Description,
          date: element.Date
        })
      }
    })

    const filename = 'Quatar_2022'
    writeFile('./json/' + filename + '.json', JSON.stringify(results), err => {
      if (err) {
        console.log(`Failed to write file: ${err}`)
      } else {
        console.log(`File ${filename}.json written`)
      }
    })
  })
