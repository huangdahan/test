<template>
  <div class="table">
    <div class="container">
      <div class="opera-handle-box">
        员工姓名
        <el-input v-model="select_name" placeholder="请输入员工姓名" class="project-input10 mr10"></el-input>
        员工编号
        <el-input v-model="select_idmId" placeholder="请输入员工编号" class="project-input10 mr10"></el-input>
                操作
        <el-input v-model="action" placeholder="请输入操作" class="project-input10 mr10"></el-input>
        <br>操作时间
        <el-date-picker v-model="time_start" type="date" placeholder="选择日期" class="opera_start" value-format='yyyy-MM-dd'>
        </el-date-picker>
        至
        <el-date-picker v-model="time_end" type="date" placeholder="选择日期" class="opera_end" value-format='yyyy-MM-dd'>
        </el-date-picker>

        <el-button type="primary" icon="el-icon-search" @click="search">搜 索</el-button>
        <el-button @click="new_Purchase" size="small">重置</el-button>
        <br />
      </div>
      <el-table :data="tableData" stripe  style="width: 100%" ref="addForm" tooltip-effect="dark">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="访问人" width="140"></el-table-column>
        <el-table-column prop="idmId" label="EMS账号" width="160"></el-table-column>
        <el-table-column prop="action" label="操作" width="140"></el-table-column>
        <el-table-column prop="url" label="URL地址" width="280"></el-table-column>
        <el-table-column prop="ip" label="客户端ip" width="140"></el-table-column>
        <el-table-column prop="createDate" label="操作时间" ></el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'basetable',
    name: 'tabs',
    data() {
      return {
        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 0,
        select_name: '',
        select_createDate: [],
        select_idmId: '',
        action:'',

        time_start: '',
        time_end: '',
        cur_page: 1,
        message: 'first',
        showHeader: false,
        form: {
          name: '',
          date: '',
          address: ''
        },
        idx: -1,

        optionsd: [{
          value: '1',
          label: '项目填写有误'
        }, {
          value: '2',
          label: '项目填写正确'
        }, {
          value: '3',
          label: '项目不存在'
        }],
        value: '',
        value1: true,
        value2: true,
        //新增界面数据
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        }
      }
    },
    created() {
      this.getData();
    },
    computed: {

    },
    methods: {
      // 分页导航
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getData();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 获取 easy-mock 的模拟数据
      getData() {
        // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
        //              let startDate = ''
        //				let endDate = ''
        //				if( this.select_createDate.length === 2){
        //					startDate = this.select_createDate[0]
        //					endDate = this.select_createDate[1]
        //				}
        this.$axios({
          method: 'post',
          url: '/operateLog/selectPage',
          params: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            idmId: this.select_idmId,
            name: this.select_name,
            startTime: this.time_start,
            endTime: this.time_end,
            action:this.action
          }
        }).then((response) => {
          console.log("pageDate", response.data)
          this.tableData = response.data.data.items;
          this.pageTotal = response.data.data.total;
        })
      },
      search() {
        this.pageIndex = 1;
        this.getData();
      },
      new_Purchase() {
        this.select_name = '',
        this.select_idmId = '',
        this.action = '',
        this.time_start = '',
        this.time_end = ''
      },
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      $route( to , from ){     
        this.getData()
      }
    }
  }
</script>

<style scoped>
  .cell .el-button {
    border: 0;
    color: #000;
    float: left;
    width: 45px;
    padding: 2px 0;
    color: #00AB34;
    background: none;
  }
  
  .el-dialog__body .el-form-item__label {
    text-align: left;
  }
  
  .el-row {
    margin-bottom: 20px;
    border: 1px solid #DDDDDD;
    margin-left: 0px!important;
    width: 98%;
    border-bottom: 0;
    border-right: 0;
  }
  
  .el-row .el-col {
    border-right: 1px solid #DDDDDD;
    padding: 0!important;
    border-bottom: 1px solid #DDDDDD;
  }
  
  .el-row .el-col:last-child {
    line-height: 50px;
    height: 50px;
  }
  
  .grid-content {
    border-radius: 4px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  
  .el-form-item__label {
    text-align: left!important;
  }
  
  .project-load-read {
    margin: 30px 0;
  }
  
  .project-input10 {
    width: 200px;
    margin: 0 10px 20px 10px;
  }
  
  .opera-handle-box {
    margin-bottom: 30px;
    font-size: 14px;
    color: #80848F;margin-top: 20px;
  }
  
  .name-title-operate {
    margin: 0 5px;
  }
  
  .opera_start {
    width: 200px!important;
    margin: 0 31px 0 10px;
  }
  
  .opera_end {
    width: 200px!important;
    margin: 0 10px 0 31px;
  }
</style>