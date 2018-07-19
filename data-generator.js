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
    url: 'http://www.fifa.com/worldcup/archive/france1998/matches/index.html'
  }
]

function formatDateTime (str) {
  const [date, timeAndZone] = str.split(' - ')
  const [day, month, year] = date.split(' ')
  const [time] = timeAndZone.split(' ')
  const [hours, minutes] = time.split(':')
  const dateTimeString = `${month}, ${day} ${year} ${hours}:${minutes}:00`
  const eventTime = new Date(dateTimeString)
  return eventTime.toISOString()
}

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
      const $el = $(el)
      const home = $el.find('.home .t-nText').text()
      const away = $el.find('.away .t-nText').text()
      const score = $el.find('.s-scoreText').text()
      const stage = $el.find('.mu-i-group').text()
      const location = $el.find('.mu-i-location .mu-i-venue').text().trim()
      const stadium = $el.find('.mu-i-stadium').text()
      const date = formatDateTime($el.find('.mu-i-datetime').text())
      const reasonwin = $el.find('.mu-reasonwin .text-reasonwin').text().trim()
      const isReasononwin = !!reasonwin
      results.push(
        {
          'home': home,
          'away': away,
          'score': score,
          ...(isReasononwin) && { 'reasononwin': reasonwin },
          'stage': stage,
          'location': location,
          'stadium': stadium,
          'date': date
        }
      )
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

const russia = {
  name: 'Russia 2018',
  url: 'http://www.fifa.com/worldcup/matches/'
}

function makeDataRussia (obj) {
  const filename = obj.name.replace(/ /g, '_')
  const url = obj.url
  request(url, (err, response, body) => {
    if (err) {
      console.log(err)
    }
    const $ = cheerio.load(body)
    const results = []
    $('.fi-matchlist .result').each((i, el) => {
      const $el = $(el)
      const stage = $el.find('.fi__info__group').text()
      const datetime = $el.find('.fi-mu__info__datetime').data('utcdate')
      const location = $el.find('.fi__info__location .fi__info__venue').text()
      const stadium = $el.find('.fi__info__stadium').text()
      const home = $el.find('.home .fi-t__nText').text()
      const away = $el.find('.away .fi-t__nText').text()
      const score = $el.find('.fi-s__scoreText').text().trim()
      const reasonwin = $el.find('.fi-mu__reasonwin-wrap > .fi-mu__reasonwin > .fi-mu__reasonwin-text').text().trim()
      const isReasononwin = !!reasonwin
      results.push({
        'home': home,
        'away': away,
        'score': score,
        ...(isReasononwin) && { 'reasononwin': reasonwin },
        'stage': stage,
        'date': datetime,
        'location': location,
        'stadium': stadium
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

makeDataRussia(russia)
