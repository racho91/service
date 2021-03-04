<template>
    <div class="form-input">
        <label :for="name">
            <h5>{{label}}</h5>
            
            <input :disabled="isDisabled"  :name="name" type="text" :value="data" :alt="name" @input="inputHandler($event.target.value)" @keyup="filterOptions" @focus="handleFokus(true)" @blur="handleFokus(false)" autocomplete="off">
            <div v-if="isSelectable&&filtredOptions.length >0&&!isDisabled&&fokus" class="suggestions">
                <div v-for="(option,index) in filtredOptions" :key="option.id" class="suggestion">
                    <div v-if="index<5"  @click="handleSelected(option.value)">
                        <p class="bold">{{option.name}} </p> 
                        <p>-- {{option.value}}</p> 
                    </div>  
                </div>
            </div>
            <span class="sp"> {{error}}</span>
        </label>
    </div>
</template>

<script>
import { toRefs,reactive,watch} from 'vue';
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
        options:Array,
        isDisabled:{
            default:false,
            type:Boolean
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
            filtredOptions:[],
            isSelectable:false,
            fokus:false,
            error:''
        })
        const handleSelected =(value)=>{
            emit('update:data', value)
            state.isSelectable=false
        }
        const inputHandler =(value)=>{
            emit('update:data',value),
            state.isSelectable=true
        }
        const filterOptions = ()=>{
            state.isSelectable=true
            state.filtredOptions = props.options.filter((option)=>{
                if (option.name.toLowerCase().includes(props.data.toLowerCase())||option.value.toLowerCase().includes(props.data.toLowerCase())) {
                    return {option}
                }  
            }) 
            // console.log(state.filtredOptions)   
        }
        const handleFokus = (value)=>{
            filterOptions(),
            setFokus(value)
            
            
        }

        
        const setFokus = (value)=>{
            setTimeout(()=>{
               state.fokus=value 
               handleError()
            }, 200);
            
        }

        const handleError = ()=>{
           if ( props.data.length > parseInt(props.simbols)  ){
               state.error=''
               emit('update:inputError',false)
           }else{
               state.error= 'Недостатично символи !'
               emit('update:inputError',true)
           }
        } 
        watch(
            ()=>props.chekForError,
            (newvalue)=>{
                if(newvalue){
                    handleError()
                }
               
            }

        )

        return{
            ...toRefs(state),
            handleSelected,
            inputHandler,
            handleFokus,
            setFokus,
            filterOptions,
            handleError
        }
    }
    
}
</script>

<style scoped>

input{
    position: relative;
    margin: auto;
    margin-bottom: 3px;
    width: 100%;
    overflow: hidden;
    height: 20px;
    outline: none;
    border:none;
    border-bottom: 2px solid darkgray;
    background: #f3f3f3;
    transition: 
        border-color 0.4s linear,
        background 0.4s linear;
}

input:focus{
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

h5{
    padding: 1px;
    margin: auto;
}
.form-input{
    position: relative;
    width: 80%;
    margin: auto;
}
.suggestions{
    position: absolute;
    top: 42px;
    left: 0px;
    width: 100%;
    border: 1px solid black;
    padding: 1px;
    /* padding-top: -5px; */
    background: black;
    color: white;
    z-index: 1;
}
.suggestion{
    cursor: pointer;
    width: 100%;
}
.suggestion > div {
    border-bottom: 1px solid white;
}
.suggestion:hover{
    color: black;
    background: white;
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
    /* height: 5px; */
    margin-bottom: 18px;
}
p{
    margin: 0;
    padding: 0;
    display: inline;
}

</style>