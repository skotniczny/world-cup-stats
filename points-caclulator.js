const {normalizeScores, calculatePoints} = require('./stats-functions')

const FRANCE = require('./json/France_1998.json')
const KOREA_JAPAN = require('./json/Korea-Japan_2002.json')
const GERMANY = require('./json/Germany_2006.json')
const SOUTH_AFRICA = require('./json/South_Africa_2010.json')
const BRAZIL = require('./json/Brazil_2014.json')

const allResults = [...FRANCE, ...KOREA_JAPAN, ...GERMANY, ...SOUTH_AFRICA, ...BRAZIL]

const filter = (result) => {
  const bool = (result === '2-1' || result === '1-0')
  return !bool
}

console.log('Brazylia 2016')
console.log('Typ 1:0:', calculatePoints('1-0', normalizeScores(BRAZIL).filter(filter)))
console.log('Typ 2:1:', calculatePoints('2-1', normalizeScores(BRAZIL).filter(filter)))
console.log()

console.log('RPA 2010')
console.log('Typ 1:0:', calculatePoints('1-0', normalizeScores(SOUTH_AFRICA).filter(filter)))
console.log('Typ 2:1:', calculatePoints('2-1', normalizeScores(SOUTH_AFRICA).filter(filter)))
console.log()

console.log('Niemcy 2006')
console.log('Typ 1:0:', calculatePoints('1-0', normalizeScores(GERMANY).filter(filter)))
console.log('Typ 2:1:', calculatePoints('2-1', normalizeScores(GERMANY).filter(filter)))
console.log()

console.log('Korea/Japonia 2002')
console.log('Typ 1:0:', calculatePoints('1-0', normalizeScores(KOREA_JAPAN).filter(filter)))
console.log('Typ 2:1:', calculatePoints('2-1', normalizeScores(KOREA_JAPAN).filter(filter)))
console.log()

console.log('Francja 1988')
console.log('Typ 1:0:', calculatePoints('1-0', normalizeScores(FRANCE).filter(filter)))
console.log('Typ 2:1:', calculatePoints('2-1', normalizeScores(FRANCE).filter(filter)))
console.log()

console.log('Pięć ostatnich mistrzostw')
console.log('Typ 1:0:', calculatePoints('1-0', normalizeScores(allResults).filter(filter)))
console.log('Typ 2:1', calculatePoints('2-1', normalizeScores(allResults).filter(filter)))
