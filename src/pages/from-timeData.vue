<template>
  <div>
    <div class="container">
      <div id="timehandle">
      <div class="" id="timesheet">
        <el-table :data="datastable" stripe tooltip-effect="dark" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="index" label="序号" width="40"></el-table-column>
          <el-table-column prop="proposerName" label="员工姓名" width="190" show-overflow-tooltip></el-table-column>
          <el-table-column prop="deptName" label="部门名称" width="150"></el-table-column>
          <el-table-column prop="postName" label="岗位名称" width="150"></el-table-column>
          <el-table-column prop="startTime" label="填报开始日期" width="150"></el-table-column>
          <el-table-column prop="endTime" label="填报结束日期"></el-table-column>
          
          <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text" class="dataManage_form_view" @click="handleGoLook(scope.$index, scope.row)">撤销</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
import { Loading } from "element-ui";
 
  export default {
    name: 'basetable',
    name: 'tabs',
    name: 'calendar',
    data() {
      return {
        time: '',
        dayTimeDate: {},
        day: '',
        datastable:[],
        start_signDate: '',
        tagsList:[],
        itemNameData:true,

        codes: [], //当前用户所有拥有的code集合
        total: 0,
        pageSize: 10,
        pageIndex: 1,
        currentPage4: 1,
        userdetailShow: false,
        form: {
          name: '',
          date: '',
          address: ''
        },
        isShowEditBut: false,
        permissionManage_permissionManage_grant: false,
        permissionManage_permissionManage_gt: false,
        
        cleanerTime:[]
      }
    },
    created() {
      this.getData2();
    },
    methods: {
      // 分页导航
      handleSizeChange(val) {
        this.pageIndex = val;
        this.getData1();
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getData2();
      },
      search() {
        this.time = this.start_signDate;
        this.pageIndex = 1;
        this.getData2();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleGoLook(index, rowtun) {
        sessionStorage.setItem("controlidret", JSON.stringify(rowtun));
        this.$router.push({
          path: '/backlook',
          name: 'backlook',
          params: {
            controlidret: rowtun,
          }
        });
      },
      getData2() {
        var tokenshow = sessionStorage.getItem("token");
        var controlid = sessionStorage.getItem("controlid");
        console.log("34ara",JSON.parse(controlid))
        var yearMonth = JSON.parse(controlid).yearMonth;
        var proposerId = JSON.parse(controlid).proposerId;  
        this.$axios({
          method: 'post',
          url: '/timesheet/getReportByMonth?authorization='+tokenshow+'&yearMonth='+yearMonth+'&proposerId='+proposerId,
        }).then((response) => {
            console.log("4324432dssfdsa",response)
            if(response.data.code == '10011'){
              this.$router.push('/login');
            }
            if(response.data.success == false){
              this.$message(response.data.message);
            }
            this.datastable = response.data.obj
        })
      },
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      $route( to , from ){     
        this.getData2()
      }
    }
  }
</script>

<style scoped>
  .message-title {
    cursor: pointer;
  }
  
  .handle-row {
    margin-top: 30px;
  }
  
  .el-tabs__item.is-active {
    color: #00AB34;
  }
  
  .el-tabs__active-bar {
    background: #00AB34;
  }
  
  .el-tabs__item:hover {
    color: #00AB34;
  }
  
  .handle-box {
    margin: 20px 0;
    color: #80848F;
    height: 50px;
  }
  
  .handle-select {
    width: 180px;
  }
  
  .handle-select1 {
    width: 180px;
    margin-right: 50px;
  }
  /*.ti_d{margin-right: 500px;}*/
  
  .handle-input {
    width: 180px;
    display: inline-block;
    margin-right: 20px;
  }
  
  .handle_number {
    width: 300px;
  }
  
  .handle_number1 {
    width: 400px;
    margin-right: 20px;
  }
  
  .el-button--primary {
    background-color: #3895FF;
    border-color: #3895FF;
  }
  
  .el-button--primary:hover {
    background-color: #3895FF!important;
    border-color: #3895FF;
  }
  
  .del-dialog-cnt {
    font-size: 16px;
    text-align: center
  }
  
  .load_read_right {
    float: right;
  }
  
  .read_new {
    width: 150px;
    line-height: 43px;
    text-align: center;
    float: left;
    position: relative;
  }
  
  .read_new img {
    position: absolute;
    top: 13px;
    left: 35px;
  }
  
  .el-button--mini,
  .el-button--small {
    font-size: 12px;
  }
  
  .el-input--small .el-input__inner {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
  }
  
  .el-button img {
    margin-right: 6px;
  }
  
  .cell .el-button {
    border: 0;
    padding: 2px 0;
    color: #409EFF;
    background: none;
  }
  
  .el-switch__core {
    background-color: #000;
  }
  
  .handle-box1 {
    margin: 20px 0px 40px 0;
    color: #80848F;
    height: 110px;
    width: 1200px;
  }
  
  .el-table th.is-leaf:first-child {
    border-right: 0!important;
  }
  
  .el-table__row td:first-child {
    border-right: 0!important;
  }
  
  .el-table_1_column_1 .cell {
    padding-right: 0!important;
  }
  /*.el-picker-panel{left: 10%!important;}*/
  
  .el-range-editor--small .el-range-separator {
    line-height: 34px;
  }
  
  .el-range-editor--small.el-input__inner {
    line-height: 40px;
    height: 40px;
  }
  
  .handle_chart-search {
    width: 300px;
  }
  
  .load_read_chart {
    margin-bottom: 20px;
    margin-right: 20px;
    float: left;
    width: 300px;
  }
  
  .load_read_chart .el-input--small .el-input__inner {
    height: 38px;
    line-height: 38px;
  }
  .el-table .cell{padding-left: 30px!important;}
  .handle-box2{    margin: 20px 0 30px;
    color: #80848f;
    width: 100%!important;
    font-size: 14px;}
    
  .el-calendar .el-calendar-day em{float: left;width: 100%;font-size: 16px;text-align: center;font-weight: normal;font-style: normal;}
  .el-calendar .el-calendar-day b{float: left;width: 100%;font-size: 16px;text-align: center;color: #2495ff;font-weight: normal;white-space: nowrap;
  overflow: hidden;text-overflow: ellipsis;}
  
  #timesheet{margin-top: 15px;}
  #timesheet h5{font-weight: 100;color: red;}
  #timesheet ul{width: 100%;float: left;height: 30px;line-height: 30px;margin-bottom: 20px;}
  #timesheet li{list-style: none;float: left;width: 30%;}
  #timesheet li em{font-style: inherit;}
  #timesheet dl {float: left;width: 100%;margin-bottom: 20px;}
  #timesheet dl dd{float: left;width: 25%;height: 36px;line-height: 36px;}
  #timesheet dl dd b{float: left;width: 70px;}
  #timesheet dl dd em{font-style: inherit;}
  #timesheet dl dd i{color: red;}
  #timesheet dl dd .open{width:50px;color: red;}
  #timesheet dl dd p{font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
  
  #timehandle{    margin: 20px 0 30px;
    color: #80848f;
    width: 100%!important;
    font-size: 14px;}
  #timehandle .el-table__body-wrapper td{padding: 4px!important;}
</style>