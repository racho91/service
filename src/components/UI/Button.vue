<template>
    <button @click.prevent="$emit('button-click')" v-if="type === 'reverse'" class="reverse" v-bind:style="{color:color,borderColor:color}">{{title}}</button>
    <button @click.prevent="$emit('button-click')" v-if="type === 'normal'" class="reverse" v-bind:style="{backgroundColor:color,borderColor:color}">{{title}}</button>
</template>

<script>
export default {
    name:'Button',
    emits:['button-click'],
    props:{
        'title':String,
        'color':String,
        'type':String,
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
</style>