<template>
  <div class="home-logo">
    <el-row :gutter="20">
      <img src="../assets/images/homelogo.png" width="308" height="185">
      <h4>欢迎进入数字化管理平台系统</h4>
      <!--<el-col :span="8">
                <el-row>
                    <el-col>
                    	
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/avatar4.png" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                    <div>{{role}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">登录时间：<span>{{time}}</span></div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>-->
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data() {
      return {
        name: sessionStorage.getItem('ms_username'),
        todoList: [],
        time: '',
      }
    },
    computed: {
      role() {
        return this.name === 'super_admin' ? '超级管理员' : '普通用户';
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData(date) {
        var time = '';
        var d = new Date();
        var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + ("0" + d.getHours()).slice(-2) + ':' + ("0" + d.getMinutes()).slice(-2) + ':' + ("0" + d.getSeconds()).slice(-2);
        this.time = datetime;
      },
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  
  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }
  
  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
  
  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }
  
  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }
  
  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }
  
  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }
  
  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }
  
  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }
  
  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }
  
  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }
  
  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }
  
  .user-avator {
    /*width: 120px;
        height: 120px;*/
    border-radius: 50%;
  }
  
  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }
  
  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }
  
  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }
  
  .user-info-list span {
    margin-left: 70px;
  }
  
  .mgb20 {
    margin-bottom: 20px;
  }
  
  .todo-item {
    font-size: 14px;
  }
  
  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }
  
  .home-logo {
    background: #FFF;
    height: 580px;
  }
  
  .home-logo .el-row {
    width: 50%;
    border: 0;
  }
  
  .home-logo img {
    position: relative;
    left: 80%;
    top: 120px;
  }
  
  .home-logo h4 {
    width: 100%;
    margin: 0 auto;
    position: relative;
    left: 350px;
    top: 180px;
    color: #909399;
    text-align: center;
  }
</style>