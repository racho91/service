<template>
  <div class="card">  
    <Input v-model:data="email" type="email" label="Email" name="email" id="email"/>
    <Input v-model:data="password" type="password" label="Парола" name="password" id="password"/>
  <Button @button-click="handleSignIn" title="Вход" color="green" type="normal" />  
  </div>
</template>

<script>
import Input from '../components/UI/Input.vue'
import Button from '../components/UI/Button.vue'
import { reactive, toRefs } from 'vue'

import useAuth from '../composition/useAuth'

export default {
  components:{
    Input,
    Button
  },
  setup(){

    const {singIn}=useAuth()

    let loginData= reactive({
      email:'',
      password:''
    })

    const handleSignIn = ()=>{
      singIn(loginData.email,loginData.password)
    }

    return{
      ...toRefs(loginData),
      handleSignIn
    }
  }

}
</script>

<style>
.card{
  width: 60%;
  max-width: 700px;
  min-width: 400px;
  
  margin: auto;
  padding: 2em;
  border-radius: 3px;
  box-shadow:  0px 12px 13px -12px black;
  background:  #f3f3f3;
  text-align: center;
}

</style>