<template>
  <button class="active" v-if="store.apiName !== ''" ref="button" @click="post_to_back(store.apiName,store[store.apiName])">
    <p v-if="!store.setLoader">Создать</p>
    <svg v-if="store.setLoader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="2" r="15" stroke-dasharray="70.68583470577033 25.561944901923447">
     <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </circle>
    </svg> 
  </button>
  <button v-else  disabled>Создать</button>
  

</template>

<script setup lang="ts">
  import axios from 'axios'
  import {useCounterStore } from '../stores/counter'

  const store:{[index: string]:any} = useCounterStore()
  
  
  
  
  async function post_to_back(api:string, data:object){
    store.setLoader = true
    await axios.post(`http://localhost:5000/${api}/add`,data).then(()=>{
      

        axios.get(`http://localhost:5000/${store.apiName}`)
        .then(res=>{
          store.data = res.data
          store.setLoader = false
        })
        .catch(e=>{})
      
      
    })
  } 


</script>

<style lang="scss" scoped>
  .active{
    background-color: rgb(50, 60, 197);
    color: #fff;
    outline: 0;
    border: none;
    padding: 1em 2em;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(255,255,255,0.30);
    margin: 1em 0;
    cursor: pointer;
    transition: 0.5s;
    &:hover{
      background-color: #000;
      color: #fff;
    }

  }
  
</style>