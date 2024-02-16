<template>
<div class="blocks">
  <div class="block_created" v-for="item in store.data" :key="item.id">
      <p>{{ 'Название: '+item.name }}</p>
      <p>{{ 'id: '+item.id }}</p>
  </div>
</div>
</template>

<script setup lang="ts">
  import {  watchEffect} from 'vue'
  import {useCounterStore } from '../stores/counter'
  import axios from 'axios'

  const store:{[index: string]:any} = useCounterStore()
  
  
  const a = async()=> await axios.get(`http://localhost:5000/${store.apiName}`)
  .then(res=>{
    
    store.data = res.data  
  })
  .catch(e=>{})
 


  watchEffect(()=>{
    if(store.apiName === ''){
      store.data = {}
    }
    a()
    
    })
</script>

<style lang="scss" scoped>
  .blocks{
    margin-top: 5em;
    height: 20em;
    overflow: hidden;
    overflow-y: auto;
    opacity: 0;
    animation: opaci 1s 1s forwards;

    .block_created{
      padding: 1em 2em;
      margin: 1em;
      box-shadow: 0 0 4px 1px rgba(255,255,255,0.30);
    }

  }

  @keyframes opaci{
    100%{
      opacity: 1;
    }
  }
</style>
