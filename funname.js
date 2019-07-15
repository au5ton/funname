
const seedrandom = require('seedrandom')
const readline = require('readline')
const pEvent = require('p-event')
const path = require('path')
const fs = require('fs')

const self = module.exports;
const WORDNET = path.join(path.dirname(__filename), 'dict')

/**
 * @async
 * @param {string} seed - Used to generate the fun name randomly, but reproducible
 */
module.exports.generate = async function(seed) {
    
    let nouns = await self.excfile('noun.exc')
    let adjectives = await self.excfile('adj.exc')

    let rng = seedrandom(seed);
    return `${adjectives[Math.floor(rng()*adjectives.length)]} ${nouns[Math.floor(rng()*nouns.length)]}`
}

/**
 * @async
 * @param {string} filename - Which dictionary file to use
 */
module.exports.excfile = async function(filename) {
    // Open line reader
    const rl = readline.createInterface({
        input: fs.createReadStream(path.join(WORDNET, filename))
    })

    // Promisify event listeners
    const asyncIterator = pEvent.iterator(rl, 'line', {
		resolutionEvents: ['close']
    });
    
    let words = []

    // Iterate over each event emitted
	for await (const event of asyncIterator) {
		words.push(event.split(' ')[1])
	}

    // De-dupe words and return a copy
    return Array.from(new Set(words))
}
