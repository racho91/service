<template>
  <p>Активни задачи</p>
  <div class="controll-">
    <AutoCompliteInput v-model:data="pageSize" label="Задачи на старница"  name="ps" id="ps" :options="pageSizeOptions"    />
  </div>
  <div class="page" v-for="page in pagination.pagesArray" :key="page"  >
      <div class="active-page"  v-if="page===activePage">
        <div class="row" v-for="(item,index) in pagination.itemsPerPageArray" :key="index">
        
        <Task v-if="activeTasks.[(page-1)*(pagination.pageSize) + index  ] " :task="activeTasks.[(page-1)*(pagination.pageSize) + index  ]" />
      </div>
      </div>   
  </div>
  <div class="control-bottom" v-if="pagination.pagesArray.length>1">
    <Button @button-click="handleActivePage(1)" title="Начало" color="#D35400" type="reverse" />  
    <Button @button-click="handleActivePage(page)" v-for="page in pagination.pagesArray" :key="page" :title="''+page+''" color="#D35400" type="reverse" />  
    <Button @button-click="handleActivePage(pagination.pageCount)" title="Край" color="#D35400" type="reverse" />  
  </div>
    
    <!-- <p @click="handleActivePage(1)">Pyrva stranica</p>
    <p @click="handleActivePage(page)" v-for="page in pagination.pagesArray" :key="page">{{page}}</p>
    <p @click="handleActivePage(pagination.pageCount)">Posledna starnica</p> -->
</template>

<script>
import Task from '../components/Task'
import Button from '../components/UI/Button'
import AutoCompliteInput from '../components/UI/AutoComliteInput'

import useTask from '../composition/useTasks'
import useHelpers from '../composition/useHelpers'
import { computed , reactive, toRefs} from 'vue'

export default { 
  components:{
    Task,
    Button,
    AutoCompliteInput
  },
  setup(){
    
    const {activeTasks,aweitingTasks,tasks}=useTask()
    const {paginateArray}=useHelpers()

    const state = reactive({
      pageSize:"10",
      pageSizeOptions:[
          {name:'',value:'5'},
          {name:'',value:"10"}
        ],
      pagination:computed(()=>{return paginateArray(activeTasks.value.length,parseInt(state.pageSize))}),
      activePage:1
    });

    const handleActivePage = (number)=>{
      state.activePage = number
    }

    return {
      ...toRefs(state),
      activeTasks,
      aweitingTasks,
      tasks,
      handleActivePage
    }
  }
} 
</script>

<style>

</style>