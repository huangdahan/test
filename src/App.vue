<template>
    <div id="app">
        <router-view  v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return  {
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
</style>