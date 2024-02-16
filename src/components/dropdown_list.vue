<template>
  
     <select name="list" ref="list_select" @change="setForm">
        <option value="">Не выбрано</option>
        <option value="leads">Сделка</option>
        <option value="contacts">Контакт</option>
        <option value="companies">Компания</option>
     </select>
     
     <div ref="forms" class="forms">
      <div class=" "/>

      <div class="leads">
          <input type="text" v-model="lead.name"  placeholder="Название сделки">
          <input type="number" v-model="lead.price"  placeholder="Сумма сделки">
      </div>
      <div class="contacts">
          <input type="text" v-model="contact.first_name" placeholder="Имя контакта">
          <input type="text" v-model="contact.last_name" placeholder="Фамилия контакта">
      </div>
      <div class="companies">
          <input type="text" v-model="company.name"  placeholder="Название компании">
      </div>
    </div>
  
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import {useCounterStore } from '../stores/counter'

  const store = useCounterStore()
  //-----------storeData-------------
  const contact = store.contacts
  const lead = store.leads
  const company = store.companies
 

  //-----------useRef----------------
  const list_select = ref()
  const forms = ref()
  

  //-----------default---------------
  const array:string[] = []

  onMounted(()=>{
    
    Array.prototype.slice.call(list_select.value.children).map(option=>{
      array.push(option.value)
    })
    
  })
  
  function setForm(e: any){
    
    Array.prototype.slice.call(forms.value.children).map(div=>{
      if(e.target.value === div.className){
        store.apiName = div.className
        div.className = `${div.className} active`
      }
      else{
        
        div.className = div.className.split(' ')[0]
      }
    })

  }
</script>

<style lang="scss" scoped>
  select{
    padding: 0.5em 1em;
    font-size: 16px;
    cursor: pointer;
    transition: 0.5s;
    outline: 0;
    border:none; 
    border-radius: 5px;
    &:focus{
      background-color: black;
      color: #fff;
    }
  }
  .forms{
    div{
      display: none;
      input{
        outline: 0;
        margin:0.3em 0;
        border:none;
        border-bottom: 1px solid  #fff;
        background-color: transparent;
        padding: 1em;
        color:#fff;
        transition:0.5s;
        cursor: pointer;
        &:focus{
          background-color: black;
          border:none;

        }
      }
    }
    .active{
      display: grid;
    }
  }
</style>
