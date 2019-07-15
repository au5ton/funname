#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const tar = require('tar');

const here = path.dirname(__filename);

(async function(){
    try {
        fs.mkdirSync(path.join(here, 'dict'), { recursive: true })

        
        const tarfile = 'wn3.1.dict.tar.gz';
        console.time(`Extracted ${tarfile}`)
        console.log(`Downloading http://wordnetcode.princeton.edu/${tarfile} ...`)
        const response = await fetch(`http://wordnetcode.princeton.edu/${tarfile}`)
        let stream = response.body.pipe(
            tar.x({
                strip: 1,
                C: path.join(here, 'dict') // alias for cwd:'some-dir', also ok
            })
        );
        stream.on('close', _ => {
            console.timeEnd(`Extracted ${tarfile}`)
        })
    }
    catch(err) {
        console.log(err)
    }
})();