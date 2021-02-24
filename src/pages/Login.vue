<template>
  <div class="login-wrap">
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <div class="ms-title">用户登录</div>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" class="use-name" placeholder="输入账号" clearable="">
          </el-input>
          <div class="use-pic"></div>
          <br />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="输入密码" class="pass-name" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" clearable="">
          </el-input>
          <div class="pass-pic"></div>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/api/config'
  export default {
    data: function() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        key: '',
        responsete:{}
      }
    },
    async created() {
      await this.getData();
    },
    
    methods: {
      async getData() {
        let sysadmin = this.$route.query.sysadmin
        let passwordem = this.$route.query.password
        if (sysadmin !== null && sysadmin !==undefined) {
          var usename = sysadmin;
          var password = passwordem;
          this.ruleForm.username = sysadmin;
          this.ruleForm.password = passwordem;
          this.$router.push('/');
        }
      },
      submitForm(formName) {
        var usename = this.ruleForm.username;
        var password = this.ruleForm.password;
        this.$router.push('/');
      },
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/images/login.jpg) no-repeat;
    background-size: 100%;
  }
  
  .ms-title {
    text-align: left;
    font-size: 20px;
    color: #000;
    margin-bottom: 40px;
  }
  
  .use-name {
    margin-bottom: 10px!important;
    position: relative;
  }
  
  .use-pic {
    position: absolute;
    top: 13px;
    left: 10px;
    background: url(../assets/images/username.svg) no-repeat;
    width: 14px;
    height: 15px;
  }
  
  .pass-pic {
    position: absolute;
    top: 13px;
    left: 10px;
    background: url(../assets/images/password.svg) no-repeat;
    width: 14px;
    height: 15px;
  }
  
  .login-wrap .el-form-item__content {
    width: 300px!important;
  }
  
  .ms-login {
    position: absolute;
    left: 1130px;
    top: 45%;
    width: 300px;
    height: 300px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }
  
  .ms-login span {
    position: absolute;
    top: 480px;
    color: #999;
  }
  
  .login-btn {
    text-align: center;
    margin-top: 50px;
  }
  
  .login-btn button {
    width: 100%;
    height: 40px;
    background: #3895FF;
  }
  
  .el-input-group__prepend {
    background-color: #fff!important;
    padding: 0 10px;
  }
  
  .use-name .el-input--small .el-input__inner {
    height: 40px!important;
    line-height: 40px!important;
  }
  
  .header_t {
    height: 50px;
    border-bottom: 1px solid #fff;
  }
  
  .header_pic {
    width: 100px;
    height: 50px;
    line-height: 50px;
  }
  
  .el-input-group__prepend {
    background-color: #fff!important;
    padding: 0 10px!important;
  }
  
  .login-wrap .el-form-item__content {
    height: 44px;
    line-height: 44px;
  }
  .login-wrap .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{margin-bottom: 20px!important;}
</style>