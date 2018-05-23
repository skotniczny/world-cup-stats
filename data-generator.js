const cheerio = require('cheerio')
const request = require('request')
const {writeFile} = require('fs')

const urls = [
  {
    name: 'Brazil 2014',
    url: 'http://www.fifa.com/worldcup/archive/brazil2014/matches/index.html'
  },
  {
    name: 'South Africa 2010',
    url: 'http://www.fifa.com/worldcup/archive/southafrica2010/matches/index.html'
  },
  {
    name: 'Germany 2006',
    url: 'http://www.fifa.com/worldcup/archive/germany2006/matches/index.html'
  },
  {
    name: 'Korea-Japan 2002',
    url: 'http://www.fifa.com/worldcup/archive/koreajapan2002/matches/index.html'
  },
  {
    name: 'France 1998',
    url: 'http://www.fifa.com/worldcup/archive/france1998/matches/index.html '
  }
]

function makeData (obj) {
  const filename = obj.name.replace(/ /g, '_')
  const url = obj.url
  request(url, (err, response, body) => {
    if (err) {
      console.log(err)
    }
    const $ = cheerio.load(body)
    const results = []
    $('.matches > .match-list-date .result').each((i, el) => {
      const home = $(el).find('.home .t-nText').text()
      const away = $(el).find('.away .t-nText').text()
      const score = $(el).find('.s-scoreText').text()
      results.push({'home': home, 'away': away, 'score': score})
    })
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

const russia = [
  {
    name: 'Russia 2014',
    url: 'http://www.fifa.com/worldcup/matches/'
  }
]

function makeDataRussia (obj) {
  const filename = obj.name.replace(/ /g, '_')
  const url = obj.url
  request(url, (err, response, body) => {
    if (err) {
      console.log(err)
    }
    const $ = cheerio.load(body)
    const results = []
    $('[data-tab=groupphase] .fixture').each((i, el) => {
      console.log($(el).text())
      const group = $(el).find('.fi__info__group').text()
      const datetime = $(el).find('.fi-mu__info__datetime').data('utcdate')
      const location = $(el).find('.fi__info__location .fi__info__venue').text()
      const home = $(el).find('.home .fi-t__nText').text()
      const away = $(el).find('.away .fi-t__nText').text()
      results.push({
        'home': home,
        'away': away,
        'group': group,
        'date': datetime,
        'location:': location
      })
    })
    writeFile('./json/' + filename + '.json', JSON.stringify(results), err => {
      if (err) {
        console.log(`Failed to write file: ${err}`)
      } else {
        console.log(`File ${filename}.json written`)
      }
    })
  })
}

makeDataRussia(russia[0])
