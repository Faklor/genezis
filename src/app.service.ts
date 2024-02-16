import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { writeFile, readFileSync } from 'fs'
import {join} from 'path'


@Injectable()
export class AppService {
  //------------readFile---------------------
  file_data():object {
    return JSON.parse(readFileSync(join(__dirname, '../src/res/data.json'),'utf8'))
  }
  //------------refreshToken-----------------
  async refreshToken():Promise<string> {
    const file = this.file_data()
    return await axios.post('https://faklor.amocrm.ru/oauth2/access_token',{
      client_id:file['client_id'],
      client_secret:file['client_secret'],
      grant_type:file['grant_type'],
      refresh_token:file['refresh_token'],
      redirect_url:file['redirect_uri']
    }).then(res=>{
      //------------uploadFike with new  data--------------
      file['access_token'] = res.data.access_token
      file['refresh_token'] = res.data.refresh_token
      writeFile(join(__dirname,'../src/res/data.json'), JSON.stringify(file), (err)=> {
        return err?err:"token updated"
      })
    }).catch(e=>{
      return e
    })
  }
  //------------get(leads,contacts...)-------
  async getPath(namePath:string):Promise<object> {
    const access_token:string = this.file_data()['access_token'] 
    const headers = { Authorization: `Bearer ${access_token}` }

    return await axios.get(`https://faklor.amocrm.ru/api/v4/${namePath}`,{headers}).then(res=>{
      return res.data._embedded[`${namePath}`]
    })
  }
  //-------------postAddData------------------
  async postData(type:string, data:Array<object>):Promise<object>{
    const access_token:string = this.file_data()['access_token'] 
    const headers = { Authorization: `Bearer ${access_token}`,'Content-Type': 'application/json' } 
    await axios.post(`https://faklor.amocrm.ru/api/v4/${type}`,data ,{ headers })
    
    return
}
  
}
