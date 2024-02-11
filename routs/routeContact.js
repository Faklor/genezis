const {Router} = require('express')
const { getData, postData} = require('../module')

const router = Router()


router.get('/', async(req, res)=>{
    try{
      
       
       const data = getData('contacts')
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
        const contact = req.body
       
        let arr = []
        arr.push(contact)

        postData('contacts', arr)
       
        res.json('create')

    }
    catch(e){
        res.status(500).json({error:e.message}) 
    }
})

module.exports = router
