<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags v-on:listenToChildEvent="showData"></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './header.vue';
    import vSidebar from './sidebar.vue';
    import vTags from './tags.vue';
    import config from '@/api/config';
    import axios from 'axios';
    import bus from './bus';
    export default {
        data(){
            return {
                collapse: false,
                
            }
        },

        components:{
            vHead, vSidebar, vTags
        },
        async created() {
          bus.$on('collapse', msg => {
              this.collapse = msg;
          })

          // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
          bus.$on('tags', msg => {
              let arr = [];
              for(let i = 0, len = msg.length; i < len; i ++){
                  msg[i].name && arr.push(msg[i].name);
              }
              
              this.tagsList = arr;
          })
        },
        methods: {
//        getData2() {
//          var token = sessionStorage.getItem("token");
//          axios.defaults.headers.get['Authorization'] = token;
//          this.$axios.post('/auth/loadLeftMenuTree', {})
//            .then((response) => {
//              if(response.data.message == '未登录的访问') {
//                var token = sessionStorage.getItem("token");
//                if (token !== null && token.substring(0, 3) === 'sso') {
//                  window.location.href = "http://access.evergrande.com/siam/login"
//                } else{
//                  this.$router.push('/login');
//                }
//              }
//              console.log("ceshi",response);
//              this.items = response.data.data;
//            })
//            .catch(function(error) {
//              console.log(error);
//            });
//        },
          winReload(index, title) {
            var tagsList=store.tagsList 
            console.log("store.tagsList",store.tagsList)
            var newlist=[]
            this.$router.push('/'+ index +'?timestamp='+new Date().getTime());
          },
          showData(path){
            if(path === null || path === undefined || path === ""){
              return false
            }
            var id = path.substring(1, path.length);
            this.defaultActive = id;
          },
//        async getData() {
//          let uuid2 = this.$route.query.uuid;
//          if (uuid2 === undefined || uuid2 === null || uuid2 === "") {
//            this.showFlag = true;
//            return;
//          }
//          var res = await this.$http.get('/login/getAecKey', {}, config)
//          this.key = res.data
//          let ffdd = this.$route.query.loginName;
//          let idde = this.$route.query.id;
//          var uuid = this.$utils.encrypt(uuid2, this.key);
//          var loginName = this.$utils.encrypt(ffdd, this.key);
//          var id = this.$utils.encrypt(idde, this.key);
//          res = await this.$http.get('/login/ssoLogin', {
//            params : { //请求参数
//            uuid : uuid,
//            loginName: loginName,
//            id: id
//            }
//          }, config).then((response) =>{
//            console.log('355',response)
//             if(response.success){
//               sessionStorage.setItem('ms_username', response.data.employee.name);
//                sessionStorage.setItem("mobile", response.data.mobile);
//                sessionStorage.setItem("token", response.data.token);
//                sessionStorage.setItem("uid", response.data.uid);
//                var token = response.data.token;
//                axios.defaults.headers.post['Authorization'] = token;
//                axios.defaults.headers.get['Authorization'] = token;
//                this.showFlag = true;
//                this.$router.push('/');
//             }else{
//                this.$message(response.message);
//                window.location.href = 'http://access.evergrande.com/siam/login'    
//             }
//          })
//        }
        },
        watch: {
          // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
          $route( to , from ){
            if(to.path === null || to.path === undefined || to.path === ""){
              return false
            }
            console.log("to",to.path)
            var path = to.path.substring(1);
            if (path === "home"){
              this.defaultActive = ""
              return false;
            }

            if (to.path === "/table"){
              this.defaultActive = "timesheet填报"
              return false;
            }
            var items = document.getElementsByClassName("title-ti");
            
            for (var i =0; i< items.length; i++ ){
              if(items[i].getAttribute("id") === path){
                this.defaultActive = path;
              }
            }
          }
        }
    }
</script>

<style>
	.wrapper{background: #f8f9f8;}
	.content{padding:0;width: auto;}
	.container{border: 0;border-radius:inherit}
	 .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 80px;
        bottom:0;
        overflow-y: scroll;background:#f0f0f0;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 160px;
      margin: 15px 20px 0 20px;
    }
    .sidebar > ul {
        height:95%;
    }
    .sidebar-el-menu li.is-active{color: #00AB34!important;}
    .sidebar-el-menu li{color: #909399!important}
    .sidebar .sidebar-el-menu{background: #fff!important;}
    .sidebar .el-submenu .el-submenu__title{background: #fff!important;}
    .sidebar .el-submenu .el-submenu__title span{color: #909399}
    .el-menu--inline .el-menu-item{padding-left: 63px!important;}
    .el-menu--vertical .el-menu-item{color: #909399!important}
    .el-menu--vertical .el-menu-item.is-active{background: #fff!important;color: #00AB34!important;}
   .sidebar ul .title-ti{height: 35px!important;line-height: 35px!important;}
   .title-name .el-submenu__title{height: 40px!important;line-height: 40px!important;}
   .el-icon-apply{background: url(../../assets/images/pia_t.svg) no-repeat;background-size: auto auto;width: 24px;height: 20px;}
   .el-icon-data{background: url(../../assets/images/pia_b.svg) no-repeat;background-size: auto auto;width: 24px;height: 20px;}
   .el-icon-chit{background: url(../../assets/images/pia_c.svg) no-repeat;background-size: auto auto;width: 24px;height: 20px;}
   .el-icon-contract{background: url(../../assets/images/pia_d.svg) no-repeat;background-size: auto auto;width: 24px;height: 20px;}
   .el-icon-account{background: url(../../assets/images/pia_g.svg) no-repeat;background-size: auto auto;width: 24px;height: 20px;}
   .el-icon-base{background: url(../../assets/images/pia_f.svg) no-repeat;background-size: auto auto;width: 24px;height: 20px;}
   .title-ti{letter-spacing: 1px;font-size: 14px;}
   .title-side{letter-spacing: 1px;font-size: 14px;}
</style>
