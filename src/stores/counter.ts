import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

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

export const useCounterStore = defineStore('data', () => {
  const apiName:string = ''
  const contact = ref<contact>({
    first_name:'',
    last_name:''
  })
  const lead = ref<lead>({
    name:'',
    price:0
  })
  const company = ref<company>({
    name:''
  })
  const data = ref<Array<object>>([{}])
  const setLoader = ref<boolean>(false)
 
 
  return { apiName, contact, lead, company,data,setLoader }
})

