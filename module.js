const axios = require('axios')
const fs  = require('fs')
const path  = require('path')
const file = require('./config/token.json')

const refreshToken = async()=>{
    await axios.post('https://faklor.amocrm.ru/oauth2/access_token',{
        client_id:file.client_id,
        client_secret:file.client_secret,
        grant_type:file.grant_type,
        refresh_token:file.refresh_token,
        redirect_url:file.redirect_uri
    }).then(res=>{
        file.access_token = res.data.access_token
        file.refresh_token = res.data.refresh_token
        fs.writeFile(path.join(__dirname,'./config/token.json'), JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
            //console.log(JSON.stringify(file));
            console.log('writing to ' + path.join(__dirname,'../config/token.json'));
        })
    }).catch(e=>{})
}
const getData = async(type)=>{
    let data = {}
    const headers = { Authorization: `Bearer ${file.access_token}` } 
    await axios.get(`https://faklor.amocrm.ru/api/v4/${type}`,{headers}).then(res=>{
        data = res.data._embedded[`${type}`]
    })

    return data
    
}
const postData  = async(type, data)=>{
    const headers = { Authorization: `Bearer ${file.access_token}`,'Content-Type': 'application/json' } 
    await axios.post(`https://faklor.amocrm.ru/api/v4/${type}`,data ,{ headers })
}

module.exports = {
    refreshToken,
    getData,
    postData
}