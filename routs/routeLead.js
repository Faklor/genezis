const {Router} = require('express')
const { getData, postData} = require('../module')

const router = Router()


router.get('/', async(req, res)=>{
    try{
      
        
        const data = getData('leads')
        data.then(data=>{
            res.json(data)
        })
        
       

    }
    catch(e){
        res.status(500).json({error:e.message}) 
    }
})

router.post('/add', async(req, res)=>{
    try{
        const lead = req.body

        let arr = []
        arr.push(lead)

        postData('leads', arr)
       
        res.json('create')
    }
    catch(e){
        res.status(500).json({error:e.message}) 
    }
})

module.exports = router


