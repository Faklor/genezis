import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//--------------------intarface---------------
interface contact{
  first_name:string,
  last_name:string,
}
interface lead{
  name:string,
  price:number
}
interface company{
  name:string
}
//--------------------------------------------

export const useCounterStore = defineStore('data', () => {
  //=============defaul=====================
  const apiName:string = ''
  const data = ref<Array<object>>([{}])
  const setLoader = ref<boolean>(false)
  //=============data=======================
  const contacts = ref<contact>({
    first_name:'',
    last_name:''
  })
  const leads = ref<lead>({
    name:'',
    price:0
  })
  const companies = ref<company>({
    name:''
  })
  //========================================
 
 
  return { apiName, contacts, leads, companies,data,setLoader }
})

