<template>
    <button @click.prevent="$emit('button-click')" v-if="type === 'reverse' && !disabled" class="reverse" v-bind:style="{color:color,borderColor:color}">{{title}}</button>
    <button @click.prevent="$emit('button-click')" v-if="type === 'normal' && !disabled" class="reverse" v-bind:style="{backgroundColor:color,borderColor:color}">{{title}}</button>
    <button @click.prevent="" v-if="type === 'reverse' && disabled" class="reverse disabled" v-bind:style="{color:'gray',borderColor:'gray'}">{{title}}</button>
    <button @click.prevent="" v-if="type === 'normal' && disabled" class="reverse disabled" v-bind:style="{color:'white',backgroundColor:'gray',borderColor:'white'}">{{title}}</button>
</template>

<script>
export default {
    name:'Button',
    emits:['button-click'],
    props:{
        'title':String,
        'color':String,
        'type':String,
        'disabled':{
            type:Boolean,
            default:false
        }
    }
    
}
</script>

<style>
button{
    font-size: 1em;
    padding: 0.5em 1.5em;
    border-radius: 0.2em;
    margin:0.5em;
    color:white;
    border: 1px solid rgb(238, 238, 238);
    outline:none;

}
.disabled{
    color:gray
}
</style>