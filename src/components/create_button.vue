<template>
  <button class="active" v-if="store.apiName !== ''" ref="button" @click="post_to_back(store.apiName,store[store.apiName])">
    <p v-if="!store.setLoader">Создать</p>
    <Loader v-if="store.setLoader"/> 
  </button>
  <button v-else  disabled>Создать</button>
  

</template>

<script setup lang="ts">
  import axios from 'axios'
  import {useCounterStore } from '../stores/counter'
  import Loader from './res/loader.vue'

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
    background-color: #5771AD;
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