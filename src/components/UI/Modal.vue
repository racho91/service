<template>
    <Button v-if="modalType!= 'icon'" @button-click="$emit('open-modal')"  :title="openButtonName" :color="openButtonColor" type="reverse"></Button>
    <i  v-if="modalType ==='icon'" class="fas" :class="openButtonName" :style="{color:openButtonColor}" @click="$emit('open-modal')"></i>
    <teleport to="body">
        <form v-if="isActive === true" class="modal-wrap" action autocomplete="off">
            <div  class="modal">
                <div class="modal-header">
                    <slot name="modal-header" ></slot>
                </div>
                <div class="modal-content">
                    <slot name="modal-content" ></slot>
                </div>
                <div class="modal-actions">
                    <slot name="modal-actions" ></slot>
                    <Button @button-click="$emit('close-modal')" title="Затвори" color="#EE6352" type="normal"></Button>
                </div>
            </div>
        </form>
    </teleport>    
</template>

<script>
//component imports
import Button from './Button' 
//other inports
// import {ref, computed} from 'vue'
export default {
    props:{
        'isActive':Boolean,
        'openButtonName':String,
        'openButtonColor':String,
        'modalType':{
            default:'',
            type:String
        }
    },
    components:{
        Button
    },
    emits:['open-modal','close-modal']
    // setup(){
    //     const Open = ref(false)

    //     const handleModal = ()=>{
    //         Open.value = !Open.value
    //     }

    //     const isOpen = computed(()=>Open.value)
    //     return{
    //         isOpen,
    //         handleModal
    //     }
    // }
}
</script>

<style>
.modal-wrap{
    position: fixed;
    display: flex;
    width: 100%;
    height: 100vh;
    top:0;
    left:0;
    background: rgba(0, 0, 0, 0.8);
    align-items:center ;
    /* align-content: center; */
    text-align: center; 
    z-index:9;
}
.modal{
    margin: auto;
    min-width: 500px;
    max-width: 700px;
    width: 50%;
    background: #FDFFFC;
    padding: 1em;
    border-radius: .4em;
}
.modal-header{
    border-bottom: 1px solid black;
    margin-bottom: 1em;
}
.modal-actions{
    border-top: 1px solid black;
    margin-top: 1em;
}
i{
    margin-left: 10px;
}
</style>