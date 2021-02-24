<template>
  <div>
    <div class="container">
      <el-tabs v-model="message" v-loading="loading" >
        <el-tab-pane :label="`员工搜索`" name="first"> 
          <div class="form-box-title">
            <div class="handle_top">
              <em>员工姓名</em>
              <el-input v-model="select_name" placeholder="请输入员工姓名" class="handle_number1 mr10"></el-input>
              <em>选择月份</em>
              <el-date-picker v-model="start_signDate" type="month" placeholder="选择月份" value-format='yyyy-MM'></el-date-picker>
              <el-button type="primary" class="search_data" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
          </div>
          <el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark" ref="multipleTable" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="40" show-overflow-tooltip></el-table-column>-->
            <el-table-column type="index" label="序号" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="proposerName" label="员工姓名" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="deptName" label="部门名称" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="postName" label="岗位名称" width="150" show-overflow-tooltip></el-table-column>
            
            <el-table-column label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="small" type="text" v-show="closeTab" class="dataManage_form_view" @click="handleClose(scope.$index, scope.row)" >撤销</el-button>
                <el-button size="small" type="text" class="dataManage_form_view" @click="handleGoLook(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage4" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div> 
        </el-tab-pane>
        <el-tab-pane :label="`项目搜索`" name="second"  >
          <div class="form-box-title">
            <div class="handle_top">
              <em>项目名称</em>
              <el-input v-model="select_name_tab" placeholder="请输入项目名称" class="handle_number1 mr10"></el-input>
              <em>选择月份</em>
              <el-date-picker v-model="start_signDate_tab" type="month" placeholder="选择月份" value-format='yyyy-MM'></el-date-picker>
              <el-button type="primary" class="search_data" icon="el-icon-search" @click="search_tab">搜索</el-button>
            </div>
          </div>
          <el-table :data="tableDatadet" stripe style="width: 100%" tooltip-effect="dark" ref="multipleTable" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="40" show-overflow-tooltip></el-table-column>-->
            <el-table-column type="index" label="序号" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="proposerName" label="员工姓名"show-overflow-tooltip></el-table-column>
            <el-table-column prop="itemName" label="项目名称"show-overflow-tooltip></el-table-column>
            <el-table-column prop="attendanceDays" label="本月出勤天数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="businessTripDays" label="出差天数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="noWorkDays" label="空载天数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="remoteDays" label="远程天数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="absenteeismDays" label="旷工天数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workOvertimeDays" label="加班天数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="leaveDays" label="请假天数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workingDaysSubsidy" label="工作日项目补贴总计" show-overflow-tooltip></el-table-column>
            <el-table-column prop="publicHolidaysSubsidy" label="公休日项目补贴总计" show-overflow-tooltip></el-table-column>
            <el-table-column prop="holidaySeasonSubsidy" label="法定节假日项目补贴总计"show-overflow-tooltip></el-table-column>
            <el-table-column prop="totalMoney" label="月项目项目补贴总计" show-overflow-tooltip></el-table-column>
            <!--<el-table-column label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="small" type="text" v-show="closeTab" class="dataManage_form_view" @click="handleClose(scope.$index, scope.row)" >撤销</el-button>
                <el-button size="small" type="text" class="dataManage_form_view" @click="handleGoLook(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>-->
          </el-table>
          <div class="pagination">
            <el-pagination background @size-change="handleSizeChangett" @current-change="handleCurrentChangett" :current-page.sync="currentPage5" :page-size="pageSize_tt" layout="total, prev, pager, next, jumper" :total="total_tt">
            </el-pagination>
          </div> 
        </el-tab-pane>  
      </el-tabs>
 
      <el-dialog title="撤销提示" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="撤销日期">
            <el-checkbox-group v-model="checkedCities">
              <el-checkbox v-for="item in termSize" :label="item.id" :key="item.id">{{item.startTime}}至{{item.endTime}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit(checkedCities)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import bus from '../components/common/bus';
  import axios from 'axios';
  import baseUrl from '@/api/proxy';
  import config from '@/api/config';
  import moment from 'moment' //导入文件
  export default {
    name: 'basetable',
    name: 'tabs',
    name: 'calendar',
    data() {
      return {
        loading: false,
        total: 0,
        pageSize: 10,
        pageIndex: 1,
        
        total_tt: 0,
        pageSize_tt: 10,
        pageIndex_tt: 1,
        currentPage5: 1,
        fileList: [],
        start_signDate: '',
        page: 1,
        currentPage4: 1,
        multipleSelection: [],
        
        dialogFormVisible: false,
        form: {
          type: [],
        },
        select_name:'',
        select_name_tab:'',
        start_signDate_tab:'',
        message:'first',
        termSize:[],
        checkedCities: [],
        tableData:[],
        tableDatadet:[],
        dataproposerId:'',
        closeTab:false
      }
    },

    created() {
      this.getData();
    },
    methods: {
      // 分页导航
      handleSizeChange(val) {
        this.pageIndex = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getData();
      },
      handleSizeChangett(pageIndex) {
        this.pageIndex_tt = pageIndex;
        this.getData2();
      },
     
      handleCurrentChangett(pageIndex) {
        this.pageIndex_tt = pageIndex;
        this.getData2();
      },
      getData() {
        this.loading = true
        var tokenshow = sessionStorage.getItem("token");
        var username = sessionStorage.getItem('ms_username');
        if (username == 'admin') {
        	this.closeTab = true
        }
        this.$axios({
            method: 'post',
            url: '/timesheet/monthlyStatisticalSummary?authorization=' +tokenshow,
            params: {
              page: this.pageIndex,
              pageSize: this.pageSize,
              proposerName:this.select_name,
              yearMonth:this.start_signDate,
            }
        }).then((response) => {
            if(response.data.code == '10011'){
              this.$router.push('/login');
            }
            console.log("response",response)
            this.loading = false
            this.tableData = response.data.obj.list;
            this.total = response.data.obj.total
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      
      getData2() {
        this.loading = true
        var tokenshow = sessionStorage.getItem("token");
        var username = sessionStorage.getItem('ms_username');
        if (username == 'admin') {
          this.closeTab = true
        }
        this.$axios({
            method: 'post',
            url: '/timesheet/statisticalByItem?authorization=' +tokenshow,
            params: {
              page: this.pageIndex_tt,
              pageSize: this.pageSize_tt,
              itemName:this.select_name_tab,
              yearMonth:this.start_signDate_tab,
            }
        }).then((response) => {
            if(response.data.code == '10011'){
              this.$router.push('/login');
            }
            console.log("response",response)
            this.loading = false
            this.tableDatadet = response.data.obj.list;
            this.total_tt = response.data.obj.total
          })
          .catch(function(error) {
            console.log(error);
          });
      },
    
      formatter(row, column) {
        return row.address;
      },
      handleLoad() {
        location.reload();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      search() {
        this.pageIndex = 1
        this.getData()
      },
      search_tab(){
        this.pageIndex_2 = 1
        this.getData2()
      },
      searchPurchase() {
        if (this.purchase_name == '') {
          this.$message('搜索条件不能为空');
          return
        }
        this.purchase_pageIndex = 1
        this.$emit('on-search-change', this.getData10());
      },
      keyupSubmit() {
        document.onkeydown = e => {
          let _key = window.event.keyCode;
          if(_key === 13) {
            this.$emit('on-search-change', this.getData1());
          }
        }
      },
      
      handleGoLook(index, rowed) {
        sessionStorage.setItem("controlidtre", JSON.stringify(rowed));
        console.log("hhhh",rowed)
        this.$router.push({
          path: '/check',
          name: 'check',
          params: {
            controlidtre: rowed,
          }
        });
      },
      handleClose(index, row) {
        sessionStorage.setItem("controlid", JSON.stringify(row));
        this.$router.push({
          path: '/timeData',
          name: 'timeData',
          params: {
            controlid: row,
          }
        });
      },
      onSubmit(formName) {
        this.dialogFormVisible = false
        console.log(JSON.stringify(formName));
        var tokenshow = sessionStorage.getItem("token");
        var dataproposerId = this.dataproposerId
        this.$axios({
            method: 'post',
            url: '/timesheet/revocation?authorization=' +tokenshow + "&proposerId=" +dataproposerId,
            data:JSON.stringify(formName), 
            headers:{
              'Content-Type':'application/json'
            },
        }).then((response) => {
            if(response.data.code == '10011'){
              this.$router.push('/login');
            }
            console.log("ffdsdgddfds",response)
            this.loading = false
            if(response.data.success == true){
              this.dialogFormVisible = false
              this.$message({
                showClose: true,
                message: '撤销成功',
                type: 'success'
              });
            } else{
              this.$message(response.data.message);
              this.dialogFormVisible = false
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }



    },
    destroyed () {//离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', this.handleScroll)
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
  
  .handle-select2 {
    width: 304px;
  }
  
  .handle-input {
    width: 180px;
    display: inline-block;
    margin-right: 20px;
  }
  
  .handle_number {
    width: 300px;
  }
  
  .handle_number1 {
    width: 329px;
    margin-right: 20px;
    margin-left: 5px;
    margin-bottom: 0px;
  }
  
  .el-button--primary {
    background-color: #3895FF!important;
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
  
  .load_read {
    border: 1px solid #E1E2E4;
    text-align: center;
    margin-bottom: 30px;
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
  
  .form-box-title .el-input--small .el-input__inner {
    height: 30px!important;
    line-height: 30px!important;
    font-size: 12px;
  }
  
  .el-button img {
    margin-right: 6px;
  }
  
  .cell .el-button {
    border: 0;
    color: #000;
    width: auto;
    padding: 2px 0;
    color: #3895FF;
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
  
  .handle-box6 {
    margin: 20px 0px 40px 0;
    color: #80848F;
    height: 110px;
    width: 1300px;
  }
  /*.el-table th.is-leaf:first-child{border-right: 0!important;}
.el-table__row td:first-child{border-right: 0!important;}*/
  
  .el-table_1_column_1 .cell {
    padding-right: 0!important;
  }
  
  .el-picker-panel {
    right: 10%!important;
  }
  
  .el-range-editor--small .el-range-separator {
    line-height: 25px;
  }
  
  .el-range-editor--small.el-input__inner {
    line-height: 40px;
    height: 40px;
  }
  
  .name-title-t {
    width: 160px!important;
    margin-right: 30px;
    float: left;
    margin-bottom: 20px;
  }
  
  .name-title-time {
    width: 220px!important;
    margin-right: 10px;
    height: 30px!important;
    line-height: 30px!important;
  }
  
  .handle_top em {
    text-align: left;
    width:100px;
    line-height: 30px;
    /*float: left;*/
    font-style: normal;
    font-size: 14px;
  }
  
  .handle_top1 em {
    text-align: left;
    width: 70px;
    line-height: 30px;
    float: left;
    font-style: normal;
    font-size: 14px;
  }
  
  .handle_title {
    margin: 20px 0 30px 0;
  }
  
  .el-tabs__new-tab1:hover {
    background: #fff;
  }
  
  .el-tabs__load-tab {
    padding: 10px 20px;
    width: 100px;
    float: left;
    border: 0;
  }
  
  .el-tabs__load-tab:hover {
    background: #fff;
  }
  
  .bu_title-name {
    width: 150px!important;
  }
  
  .name-title-to {
    width: 160px!important;
    margin-right: 30px!important;
  }
  
  .form-box-title {
    width: auto;
    margin: 10px 0 20px 0;
    font-size: 14px;
  }
  
  .form-load-read {
    /*border: 1px solid #E1E2E4;*/
    text-align: center;
    float: left;
    cursor: pointer;
    width: 102px;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 20px;
    padding: 1px 0;
    border-radius: 2px;
  }
  
  .title-code-supplement {
    width: 110px!important;
  }
  
  .supply-load {
    width: auto!important;
  }
  
  .handle-select30 {
    margin-right: 20px;
    margin-left: 5px;
  }
  
  .form_start {
    width: 160px;margin-right: 39px;
  }
  
  .form_end {
    width: 160px;margin-left: 40px;
  }
  
  .upload-demo .el-tabs__load-tab {
    background: #fff!important;
    border: 1px solid #E1E2E4;
    color: #606266;
  }
  .el-tabs__new-tab1:hover{border-color: #3895FF!important;}
  .el-button:focus, .el-button:hover{border-color: #3895FF!important;}
  .load-title-data{font-size: 12px;color: #606266;line-height: 34px;height: 34px;margin-right: 20px;cursor: pointer;border-bottom: 1px solid #ccc;}
  .tags {position: fixed;bottom: 100px;top: 300px;/*开始处于距离顶部300px的位置，之后随着滚动条滚动top值改变，然后在top==100时停止*/left: 218px;box-sizing: border-box;z-index: 2;}
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 160px!important
  }
  .search_data{margin-left: 20px;}
  
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
</style>