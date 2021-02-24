import Vue from 'vue';
import vTags from './tags.vue';
export default new Vue({
  data() {
    return {
      tagsList: [{title:"首页",path:"/home",name:"dashboard"}],
    }
  },
})
