<template>
  <p>Price list</p>
  <Input v-model:data="serviceName" type="text" label="Наименоване на услугата" name="desc" id="Desc"/>
  <Input v-model:data="servicePrice" type="text" label="Цена на услугата" name="desc" id="Desc"/>
  <Button title="Добави" color="green" type="reverse" @button-click="handleService"/>
  <div class="prices">
    <div class="price"  v-for="(service,index) in allServices" :key="index" >
        <p>{{index+1}} . {{service.name}} -- {{service.price}} лв. <span @click="removeService(service.id)">X</span> </p>
    </div>
    {{allServicesList}}
  </div>

</template>
<style scoped>
  span{
    color: red
  }
</style>
<script>
  import  Input from '../components/UI/Input'
  import  Button from '../components/UI/Button'  
  import {reactive, toRefs} from  'vue'
  import usePrice from '../composition/usePrices' 
  export default {
  components:{
    Input,
    Button
  },
  setup(){

    const {createService,allServices,removeService,allServicesList}=usePrice()
    let data= reactive({
        serviceName:'',
        servicePrice:''
    })  

    const handleService = ()=>{
      createService({name:data.serviceName,price:data.servicePrice})
      data.serviceName =  ''
      data.servicePrice = '' 
    }




    // watch(
    //   ()=>loginData.errors,
    //   (errors)=>{
    //     loginData.buttonStatus = !fieldValidation(errors)
    //   },
    //   {deep:true}
    // )

    

    return{
      ...toRefs(data),
      handleService,
      allServices,
      removeService,
      allServicesList
     
    }
  }

}
</script>
<style>
  .demo-card-wide.mdl-card {
    width: 512px;
  }
  .demo-card-wide > .mdl-card__title {
    color: #fff;
    height: 176px;
    background: red;
  }
  .demo-card-wide > .mdl-card__menu {
    color: #fff;
  }
</style>
