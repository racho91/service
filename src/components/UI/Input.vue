<template>
<div class="form-input">    
    <label :for="name">
        {{label}}
        <input v-if="type!= 'textarea'" @blur="handleError()" :name="name" :type="type" :value="data" :alt="name" @input="$emit('update:data', $event.target.value)">
        <textarea  v-else :name="name"  @blur="handleError()" :id="id" :cols="cols" :rows="rows" :value="data" :alt="name" @input="$emit('update:data', $event.target.value)"></textarea>
        <span class="sp">{{error}}</span>
    </label>
</div>
  
</template>

<script>
import { toRefs,reactive, watch} from 'vue';
export default {
    props:{
        data:String,
        label:String,
        id:{
            type:String,
        },
        name:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:'text'
        },
        cols:{
            default:30
        },
        rows:{
            default:10
        },
        simbols:{
            default:3
        },
        inputError:{
            type:Boolean,
            default:false
        },
        chekForError:{
            type:Boolean,
            default:false
        }
    },
    emits:['update:data','update:inputError'],
    setup(props,{emit}){
        const state = reactive({
            error:''
        })
        const handleError = ()=>{
            // console.log(props.data.length)
            // console.log(parseInt(props.simbols))

           if ( props.data.length > parseInt(props.simbols)  ){
               state.error=''
               emit('update:inputError',false)
           }else{
               state.error= 'Недостатично символи !'
               emit('update:inputError',true)
           }
        //    console.log(state.error)
        //    console.log(props.inputError,'prop')
        } 
        watch(
            ()=>props.chekForError,
            (newvalue)=>{
                if(newvalue){
                    handleError()
                }
               
            }

        )
        return {
            ...toRefs(state),
           handleError,
        }
    }
}
</script>

<style scoped>

input,textarea{
    position: relative;
    margin: auto;
    /* margin-bottom: 20px; */
    width: 100%;
    overflow: hidden;
    height: 20px;
    outline: none;
    border:none;
    border-bottom: 2px solid darkgray;
    background: #f3f3f3;
    padding: 3px;
    transition: 
        border-color 0.4s linear,
        background 0.4s linear;
}
textarea{
    height: 100px;
}

input:focus,textarea:focus{
    border-color: #0B4A00;
    background: rgba(11, 74, 0, 0.15);
}

label{
    height: 45px;
    transition: font-size .4s ease-in-out;
}
label:focus-within {
   font-size: 15px;
   text-shadow: 0 0 1px   rgba(11, 74, 0, 0.15);
}
.form-input{
    position: relative;
    width: 80%;
    margin: auto;
}
.suggestions{
    position: absolute;
    top: 45px;
    left: 0px;
    width: 100%;
    border: 1px solid black;
    padding: 1px;
    background: black;
    color: white;
}
.suggestion{
    width: 100%;
    border-bottom: 1px solid white;
}

.bold{
    font-weight: 700;
}
.sp{
    display: block;
    margin: auto;
    text-align: center;
    color:maroon;
    margin-bottom: 18px;
}
p{
    margin: 0;
    padding: 0;
    display: inline;
}
</style>