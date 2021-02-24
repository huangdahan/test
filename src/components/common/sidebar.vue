<template>
    <div class="sidebar"  >
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" v-show="adminHide"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>

        <el-menu class="sidebar-el-menu" :default-active="onRoutes"  v-show="adminShow"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in itemadmin">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                adminHide:true,
                adminShow:false,
                items: [{
                        icon: 'el-icon-time',
                        index: 'table',
                        title: 'timesheet填报'
                    },{
                        icon: 'el-icon-date',
                        index: 'charts',
                        title: 'timesheet报表'
                    },{
                        icon: 'el-icon-setting',
                        index: 'form',
                        title: '流程面板'
                    },{
                        icon: 'el-icon-tickets',
                        index: 'editordata',
                        title: '统计报表'
                    },
                ],
                itemadmin: [{
                        icon: 'el-icon-tickets',
                        index: 'editordata',
                        title: '统计报表'
                    },
                ],
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            this.getData()
        },
        methods:{
          getData(){
            var username = sessionStorage.getItem('ms_username');
            if (username == 'admin') {
              this.adminShow = true
              this.adminHide = false
            }
          },
        },  
    }
</script>

<style scoped>
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
    .sidebar-el-menu li.is-active{color: #3895FF!important;}
    .sidebar-el-menu li{color: #909399!important}
    .sidebar .sidebar-el-menu{background: #fff!important;}
    .sidebar .el-submenu .el-submenu__title{background: #fff!important;}
    .sidebar .el-submenu .el-submenu__title span{color: #909399}
    .el-menu--inline .el-menu-item{padding-left: 63px!important;}
    .el-menu--vertical .el-menu-item{color: #909399!important}
    .el-menu--vertical .el-menu-item.is-active{background: #fff!important;color: #3895FF!important;}
   .sidebar ul .title-ti{height: 35px!important;line-height: 35px!important;}
   .title-name .el-submenu__title{height: 40px!important;line-height: 40px!important;}
</style>
