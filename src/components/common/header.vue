<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn"  >
            <!--<i class="el-icon-menu"></i>@click="collapseChage"-->
            <div class="img_logo_title"><p>海通安恒数字化管理平台</p></div>
            <!--<div class="img-logo"></div>-->
            <!--<img src="../assets/images/top_1.png" width="250" height="70"/>-->
        </div>

        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <!--<div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>-->
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <div v-show="toolShow" >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </div>
                    <div  v-show="toolHide">
                        <router-link to="/tabs">
                            <i class="el-icon-bell bell_red"></i>
                        </router-link>
                    </div>
                    <!--<el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>-->
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <!--<div class="user-avator"><img src="../../assets/images/avatar4.png"></div>-->
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    import axios from 'axios'
  import config from '@/api/config'
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: '',
                message: '',
                toolShow:true,
                toolHide:false
            }
        },
        computed:{
            username(){
                let username = sessionStorage.getItem('ms_username');
                return username ? username : this.name;
                
            }
        },
        created() {
          this.getData();
        },
        methods:{
            getData(){
              
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
              if(command == 'loginout'){
               
              }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style scoped>
	.collapse-btn:hover{
		background: #3895FF;cursor: auto!important;
	}
	.el-submenu__title *{color: #909399;}
	.wrapper{background: #f8f9f8;}
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        font-size: 22px;
        color: #fff;background: #3895FF;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 80px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 80px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 80px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: red;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .collapse-btn{padding: 0;}
    .img-logo{background: url(../../assets/images/logo.png) no-repeat;width: 130px;height:68px;background-size: 100% 100%;}
    .img_logo_title{margin-left: 20px;}
</style>
