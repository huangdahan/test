<template>
  <div>
    <div class="container">
      <div id="timehandle">
      <div class="" id="timesheet">
        <el-tabs v-model="messageed" v-loading="loading" >
        <el-tab-pane :label="`日历`" name="first"> 
          <!--<el-form ref="form" :model="form" label-width="80px">
        <div class="load_read_chart">
          <el-form-item label="填报月份">
            <el-date-picker  v-model="start_signDate_first"  type="month"  value-format='yyyy-MM' placeholder="选择月份"></el-date-picker>
          </el-form-item>
        </div>
        <el-button type="primary" icon="el-icon-search" @click="search_first"  @keyup.enter.native="search">搜 索</el-button>
      </el-form>-->
      <div class="title_name">
      <p style="font-family: cursive;font-size: 16px;"><i style="font-style: normal;background: #0be00b;color:#000;margin-right: 10px;">绿色背景内容</i><em style="font-style: normal;">审批通过</em></p>
      <p style="font-family: cursive;font-size: 16px;"><i style="font-style: normal;background: #adb2ea;color:#000;margin-right: 10px;">蓝色背景内容</i><em style="font-style: normal;">审批中</em></p>
      <p style="font-family: cursive;font-size: 16px;"><i style="font-style: normal;background: yellow;color:#000;margin-right: 10px;">黄色背景内容</i><em style="font-style: normal;">当天为节假日</em></p>
      <p style="font-family: cursive;font-size: 16px;"><i style="font-style: normal;background: #FFDAB9;color:#000;margin-right: 10px;">粉色背景内容</i><em style="font-style: normal;">审批未通过</em></p>
      </div>
      <div class="charts_data">
        <table class="data_show" >
            <tr>
                <th scope="col"><span>星期</span>日</th>
                <th scope="col"><span>星期</span>一</th>
                <th scope="col"><span>星期</span>二</th>
                <th scope="col"><span>星期</span>三</th>
                <th scope="col"><span>星期</span>四</th>
                <th scope="col"><span>星期</span>五</th>
                <th scope="col"><span>星期</span>六</th> 
            </tr>
            <tr  v-for="item in items">
                <td :class="map.dayType !== '1'?'name_class_color':'name_no_color'" v-for="map in item">
                  <div  style="background: #e9e9e9;font-size: 14px;height: 24px;line-height: 24px;"> {{map.time}}</div>
                  <div :class="map.amType == '2'?'name_green_color':map.amType == '3'?'name_red_color':map.amType == '1'?'name_blue_color':''" style="height: 40px;width: 100%;    line-height: 20px;border-bottom: 1px solid #999;">{{map.amItem}}{{map.amSubsidy}}</span></div>
                  <div :class="map.pmType == '2'?'name_green_color':map.pmType == '3'?'name_red_color':map.pmType == '1'?'name_blue_color':''"  style="height: 40px;width: 100%;  line-height: 20px;border-bottom: 1px solid #999;"><span>{{map.pmItem}}</span>{{map.pmSubsidy}}</div>
                </td>
             </tr>
            
        </table>

      </div>
        
        </el-tab-pane>
        <el-tab-pane :label="`详情`" name="second"  >
        <div class="border_line">
          <dl v-for="itemse in tagsList" v-show="itemNameData">
            <dd><p>{{itemse.itemName}}</p></dd>
            <dd><b>项目补贴</b><em>{{itemse.subsidyMoney}}</em></dd>
            <dd><b>管理补贴</b><em>{{itemse.mangerMoney}}</em></dd>
            <div class="key_name" v-for="(key,item) in itemse.salaryType">
              <dd><b>{{item}}天数</b><em>{{key}}天</em></dd>
            </div>
          </dl>
        </div>
        <el-table :data="datastable" stripe tooltip-effect="dark" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="index" label="序号" width="40"></el-table-column>
          <el-table-column prop="itemName" label="项目名称" width="190" show-overflow-tooltip></el-table-column>
          <el-table-column prop="salaryTime" label="考勤日期" width="150"></el-table-column>
          <el-table-column prop="salaryTypeName" label="考勤类型" width="150"></el-table-column>
          <el-table-column prop="itemInterval" label="项目补贴" width="150"></el-table-column>
          <el-table-column prop="manageInterval" label="管理补贴"></el-table-column>
          <el-table-column prop="approvalTypeStr" label="审批状态"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage4" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>  
        </el-tabs>
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
        messageed:'first',
        start_signDate_first:'',
        dataproposerId:'',
        items:[],
        loading: false,
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
      this.getData1();
      this.getData2();
      this.getData3();
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
        if (this.start_signDate == '') {
          this.$message('请先选择月份');
          return
        }
        this.time = this.start_signDate;
        this.pageIndex = 1;
        this.getData2();
      },
      search_first(){
        var start_first = this.start_signDate_first
        if (start_first == '') {
          this.$message('请先选择月份');
          return
        }
        this.getData3();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getData1() {
        var tabitemedter = []
        var tokenshow = sessionStorage.getItem("token");
        var controlidtre = sessionStorage.getItem("controlidtre");
        tabitemedter.push(JSON.parse(controlidtre))
        var yearMonth = tabitemedter[0].yearMonth;
        var proposerId = tabitemedter[0].proposerId;  
        this.$axios({
          method: 'post',
          url: '/timesheet/statisticalMessage?authorization='+tokenshow+'&yearMonth='+yearMonth+'&proposerId='+proposerId,
        }).then((response) => {
            if(response.data.code == '10011'){
              this.$router.push('/login');
            }
            if(response.data.success == false){
              this.$message(response.data.message);
            }
            this.tagsList = response.data.obj
          })
          .catch(function(error) {
            console.log("errorfdsadad500",error);
          });
      },
      getData2() {
        var tabitemedbar = []
        var tokenshow = sessionStorage.getItem("token");
        var controlidtre = sessionStorage.getItem("controlidtre");
        tabitemedbar.push(JSON.parse(controlidtre))
        var yearMonth = tabitemedbar[0].yearMonth;
        var proposerId = tabitemedbar[0].proposerId;    
        this.$axios({
          method: 'post',
          url: '/timesheet/monthlyStatisticalSummaryMessage?authorization='+tokenshow+'&yearMonth='+yearMonth+'&proposerId='+proposerId,
          params: {
            page: this.pageIndex,
            pageSize: this.pageSize,
          }
        }).then((response) => {
            if(response.data.code == '10011'){
              this.$router.push('/login');
            }
            if(response.data.success == false){
              this.$message(response.data.message);
            }
            this.datastable = response.data.obj.list
            this.total = response.data.obj.total
        })
      },
      getData3(value, row) {
        var tabitemed = []
        var tokenshow = sessionStorage.getItem("token");
        var controlidtre = sessionStorage.getItem("controlidtre");
        tabitemed.push(JSON.parse(controlidtre))
        var yearMonth = tabitemed[0].yearMonth;
        var proposerId = tabitemed[0].proposerId;  
        this.$axios({
          method: 'post',
          url: '/timesheet/calendarReport?authorization='+tokenshow+'&yearMonth='+yearMonth+"&proposerId="+proposerId,
          params: {
          }
        }).then((response) => {
          console.log("nfgcg",response)
            if(response.data.code == '10011'){
              this.$router.push('/login');
            }
            this.items = response.data.obj;
            var proposerId =''
          })
          .catch(function(error) {
            console.log("errorfdsadad500",error);
          });
      },
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      $route( to , from ){     
        this.getData1()
        this.getData2()
        this.getData3()
      }
    }
  }
</script>

<style scoped>
  .charts_data table{border: 1px solid #000;    width: 100%;
    text-align: center;}
  .charts_data table .name_class{text-align: center;font-size: 12px;}
  
  .charts_data table .name_class_color{text-align: center;font-size: 12px;background: yellow;color: #000;}
  .charts_data table .name_no_color{text-align: center;font-size: 12px;color: #000;}
  .charts_data table .name_green_color{text-align: center;font-size: 12px;background: #0be00b;color: #000;}
  .charts_data table .name_red_color{text-align: center;font-size: 12px;background: #FFDAB9;color: #000;}
  .charts_data table .name_blue_color{text-align: center;font-size: 12px;background: #adb2ea;color: #000;}
  .title_name {    margin-bottom: 20px;float: left;width: 100%; text-align: left; line-height: 30px;}
  .data_show {
    border-collapse: collapse;
    table-layout:fixed;
    width:780;
  }
  .data_show caption {
      text-align: left;
       font-size:12px;
      font-weight:normal;
      padding-bottom: 6px;
  }
  
  .data_show caption .date{
      font-size:150%;
      font-weight:bold;
  }
  
  .data_show th {
      border: 1px solid #999;
      border-bottom: none;
      padding: 3px 2px 2px;
      margin:0;
      background-color: #ADD;
      color: #333;height: 30px;
    line-height: 30px;
  }
  .data_show td {
      border: 1px solid #AAA;
     line-height:16px;
      margin:0;
      vertical-align: top;
      }
  .data_show td.previous, .data_show td.next {
      background-color: #eee;
      color: #A6A6A6;
  }
  .data_show td.active {
      background-color: #B1CBE1;
      border: 2px solid #4682B4;
  }
  
  .data_show ul {
      list-style-type: none;
      margin: 3px;
      padding:0;
  }
  
  .data_show li {
      color:#fff;
     padding:2px;
      margin-bottom: 6px;
      height:34px;
      overflow:hidden;
      width:100px;
  }
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
    color: #000;
    padding: 2px 0;
    color: #00AB34;
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
  #timesheet dl {float: left;width: 100%;border-bottom: 1px solid #ccc;}
  #timesheet dl dd{float: left;width: 15%;height: 50px;line-height: 50px;border-right: 1px solid #ccc;margin-left: 5px;}
  #timesheet dl dd b{float: left;width: 70px;}
  #timesheet dl dd em{font-style: inherit;}
  #timesheet dl dd i{color: red;}
  #timesheet dl dd .open{width:50px;color: red;}
  #timesheet dl dd p{font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
  
  #timesheet dl .key_name:last-child dd{border-right: 0;}
  
  #timehandle{    margin: 20px 0 30px;
    color: #80848f;
    width: 100%!important;
    font-size: 14px;}
  #timehandle .el-table__body-wrapper td{padding: 4px!important;}
  .border_line{border: 1px solid #ccc;float: left;width: 100%;margin-bottom: 20px;border-bottom:0}
</style>