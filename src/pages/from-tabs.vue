<template>
  <div class="container container2" >
    <ul id="time_show" v-for="item in tabitems">
      <li>{{item.startTime}}至{{item.endTime}}的填报被退回,原因：{{item.reason}}</li>
    </ul>
    
    
      
      <!--<div class="anniu_text" v-show="handleShow">
          <el-button type="primary"  @click="handleSupply(tabitems)">通过</el-button>
          <el-button type="primary"  @click="handleEdit(tabitems)">未通过</el-button>
        </div>-->
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import store from '@/components/common/store';
  import baseUrl from '@/api/proxy';
  import config from '@/api/config';
  import moment from 'moment' //导入文件
  export default {
    name: 'apply',
    data() {
      return {
        tabitems:[],

      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData(){
        var tokenshow = sessionStorage.getItem("token");
        this.$axios({
          method: 'get',
          url: '/timesheet/messageCenter?authorization=' +tokenshow,
        }, config)  
        .then((response) => {
          this.tabitems = response.data.obj
        })
      },
      
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getData'
    }
  }
</script>

<style scoped>

  #time_show h5{font-weight: 100;color: red;}
  #time_show ul{width: 100%;float: left;height: 30px;line-height: 30px;margin-bottom: 20px;}
  #time_show li{float: left;width: 100%;color: red; font-family: cursive;font-size: 18px;}
  #time_show li em{font-style: inherit;}
  .anniu_text{margin-top: 40px;}
  .anniu_text .el-button:first-child{margin: 0 0 0 30%;width: 100px;}
  .anniu_text .el-button:last-child{margin: 0 0 0 10%;width: 100px;}
  .upload-demo{float: left;width: 100%;margin: 10px 0;}
  
  
</style>