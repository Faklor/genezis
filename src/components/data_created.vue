<template>
<div class="blocks" v-if="store.apiName">
  <div class="block_created" v-for="item in store.data" :key="item.id">
      <p>{{ 'Название: '+item.name }}</p>
      <p>{{ 'id: '+item.id }}</p>
  </div>
</div>
</template>

<script setup lang="ts">
  import {  watchEffect } from 'vue'
  import { useCounterStore } from '../stores/counter'
  import axios from 'axios'
  import {
    blocks
  } from './animation'

  const store:{[index: string]:any} = useCounterStore()
  
  
  const dataBlocks = async()=> await axios.get(`http://localhost:5000/${store.apiName}`)
  .then(res=>{
    blocks()
    store.data = res.data  
  })
  .catch(e=>{})
 


  watchEffect(()=>{store.apiName === ''?store.data = {}:dataBlocks()})
</script>

<style lang="scss" scoped>
  .blocks{
    margin-top: 5em;
    height: 20em;
    overflow: hidden;
    overflow-y: auto;
    background-color: #fff;
    color: #000;
    opacity: 0;
    border-radius: 5px;

    .block_created{
      padding: 1em 2em;
      margin: 1em;
      box-shadow: 0 0 4px 1px rgba(0,0,0,0.10);
    }

  }

</style>
