const funname = require('.');

((async function(){
    console.time('generation')
    let name = await funname.generate('CougarGrades 1.0.0')
    console.timeEnd('generation')

    console.log(name)
})())
