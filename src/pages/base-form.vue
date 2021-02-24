<template>
  <div>
    <div class="container">
      <el-tabs v-model="message" v-loading="loading" >
        <el-tab-pane :label="`我提交`" name="first">
          <el-table :data="myReport_tableData" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="proposerName" label="员工姓名" width="150"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="deptName" label="部门名称" width="150"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="startTime" label="填报开始时间"  width="150"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="endTime" label="填报结束时间" width="150"  show-overflow-tooltip></el-table-column>

            <el-table-column label="操作"  width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="small" type="text" class="dataManage_form_view" @click="handleLookmyReport(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination background @size-change="handleSizeChangemyReport" @current-change="handleCurrentChangemyReport" :current-page.sync="myReport_currentPage" :page-size="myReport_pageSize" layout="total, prev, pager, next, jumper" :total="myReport_total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="number" name="second">
          <div class="form-box-title">
            <div class="handle_top">
              <em>员工姓名</em>
              <el-input v-model="select_name" placeholder="请输入员工姓名" class="handle_number1 mr10"></el-input>
              <el-button type="primary" class="search_data" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button @click="toggleSelection(tableData)" size="small" class="action-reset">批量通过</el-button>
            </div>
          </div>
          <el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40" show-overflow-tooltip></el-table-column>
            <el-table-column type="index" label="序号" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="proposerName" label="员工姓名" width="85" show-overflow-tooltip></el-table-column>
            <el-table-column prop="itemAddress" label="项目地址" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="itemName" label="项目名称" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="startTime" label="填报开始时间" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="endTime" label="填报结束时间" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createDateStr" label="提交日期" width="150" show-overflow-tooltip></el-table-column>
            
            
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text" class="dataManage_form_view" @click="handleGoLook(scope.$index, scope.row)">查看</el-button>
                <el-button type="text" class="supply-load dataManage_form_add_contract_info" @click="handleSupply(scope.$index, scope.row)">提交</el-button>
                <el-button size="small" type="text" class="dataManage_form_edit" @click="handleEdit(scope.$index, scope.row)">退回</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage4" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`我已审批`" name="three">
          <div class="form-box-title">
            <div class="handle_top1">
                            员工姓名
            <el-input v-model="purchase_name" placeholder="请输入员工姓名" class="handle_number1 mr10"></el-input>
            <el-button type="primary" class="search_data" icon="el-icon-search" @click="searchPurchase">搜索</el-button>
            </div>
          </div>
          <el-table :data="purchase_tableData" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="proposerName" label="员工姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="itemAddress" label="项目地址"></el-table-column>
            <el-table-column prop="itemName" label="项目名称"></el-table-column>
            <el-table-column prop="startTime" label="填报开始时间" ></el-table-column>
            <el-table-column prop="endTime" label="填报结束时间"></el-table-column>
            <el-table-column prop="createDateStr" label="提交日期" ></el-table-column>
            <el-table-column prop="approvalTypeStr" label="审批结果" ></el-table-column>
            
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text" class="dataManage_form_view" @click="handleLook(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination background @size-change="handleSizeChangePurchase" @current-change="handleCurrentChangePurchase" :current-page.sync="purchase_currentPage" :page-size="purchase_pageSize" layout="total, prev, pager, next, jumper" :total="purchase_total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
      
      <el-dialog title="退回提示" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="退回原因">
            <el-input v-model="input" placeholder="请输入退回原因"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onClose()">取 消</el-button>
          <el-button type="primary" @click="onSubmit(rowData)">确 定</el-button>
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
    data() {
      return {
        cities: [],
        select_phone: '',
        select_idCard: '',
        select_name: '',
        select_memberLevel: '',
        select_status: '',
        start_signDate: '',
        end_signDate: '',
        codes: [], //当前用户所有拥有的code集合
        select_serviceIntention: '',
        dataManage_form_add: false,
        dataManage_form_edit: false,
        dataManage_form_view: false,
        dataManage_form_add_contract_info: false,
        dataManage_form_export: false,
        dataManage_form_import: false,
        dataManage_form_errdata: false,
        dataManage_form_loadtemper: false,
        loading: false,
        total: 0,
        pageSize: 10,
        pageIndex: 1,
        fileList: [],
        
        purchase_total: 0,
        purchase_pageSize: 10,
        purchase_pageIndex: 1,
        purchase_currentPage: 0,
        purchase_project: '',
        purchase_name: '',
        purchase_checkMode: '',
        purchase_status: '',
        
        myReport_total: 0,
        myReport_pageSize: 10,
        myReport_pageIndex: 1,
        myReport_currentPage: 0,

        tableData: [],
        purchase_tableData: [],
        myReport_tableData:[],
        
        dialogFormVisible:false,
        input:'',
        rowData:[],
        
        multipleSelection: [],
        tableData1: [],
        items: {},
        page: 1,
        currentPage4: 1,
        currentPage5: 1,
        multipleSelection: [],
        select_cate: '',
        select_cate2: '',
        select_word: '',

        select_cate5: '',
        select_cate8: '',
        select_word: {},
        select_cate: {},
        del_list: [],
        is_search: false,
        editVisible: false,
        delVisible: false,
        message: 'first',
        showHeader: false,
        form: {
          name: '',
          date: '',
          address: ''
        },
        idx: -1,

        total_1: 0,
        goodsList: '',
        inputtext: {},
        optionsd: [],
        startTime_endTime: '',
        value1: false,
        value2: true,
        value7: '',
        userdetailShow: false,
        sels: [], //选中的值显示 
        tableList: [],
        start: 0,
        size: 10,
        isShowEditBut: false,
        number:"待我审批 (0)"
      }
    },

    created() {
      this.getData20();
      this.getData100();
      this.getData30();
    },
    methods: {
      // 分页导航
      handleSizeChange(val) {
        this.pageIndex = val;
        this.getData20();
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getData20();
      },
      handleSizeChangePurchase(pageIndex) {
        this.purchase_pageIndex = pageIndex;
        this.getData100();
      },
     
      handleCurrentChangePurchase(pageIndex) {
        this.purchase_pageIndex = pageIndex;
        this.getData100();
      },
      handleSizeChangemyReport(pageIndex) {
        this.myReport_pageIndex = pageIndex;
        this.getData30();
      },
     
      handleCurrentChangemyReport(pageIndex) {
        this.myReport_pageIndex = pageIndex;
        this.getData30();
      },
      getData20() {
        this.loading = true
        var tokenshow = sessionStorage.getItem("token");
        this.$axios({
            method: 'post',
            url: '/backlog/queryPage?authorization=' +tokenshow,
            params: {
              page: this.pageIndex,
              pageSize: this.pageSize,
              proposerName:this.select_name
            }
        }).then((response) => {
            if(response.data.code == '10011'){
              this.$router.push('/login');
            }
            console.log("total_dsadas",response.data.obj)
            this.loading = false
            this.tableData = response.data.obj.list;
            this.total = response.data.obj.total
            if(response.data.obj.list.length>0){
              this.number = this.number.split(" ")[0]+" ("+response.data.obj.total+")"
            }
            
          })
          .catch(function(error) {
          });
      },
      getData100() {
        var tokenshow = sessionStorage.getItem("token");
        this.$axios({
          method: 'post',
          url: '/backlog/queryApprovaledPage?authorization=' +tokenshow,
          params: {
            page: this.purchase_pageIndex,
            pageSize: this.purchase_pageSize,
            proposerName:this.purchase_name
          }
        }).then((response) => {
          console.log("fdsaf",response)
          this.loading = false
          this.purchase_tableData = response.data.obj.list;
          this.purchase_total = response.data.obj.total
        })
        .catch(function(error) {
        });
      },
      getData30() {
        var tokenshow = sessionStorage.getItem("token");
        this.$axios({
            method: 'post',
            url: '/timesheet/myReport?authorization=' +tokenshow,
            params: {
              page: this.myReport_pageIndex,
              pageSize: this.myReport_pageSize,
            }
        }).then((response) => {
            console.log("lkkghjg",response)
            this.myReport_tableData = response.data.obj.list;
            this.myReport_total = response.data.obj.total
          })
          .catch(function(error) {
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
        if (this.select_name == '') {
        	this.$message('搜索条件不能为空');
        	return
        }
        this.pageIndex = 1
        this.getData20()
        // this.$emit('on-search-change',);
      },
      searchPurchase() {
        if (this.purchase_name == '') {
          this.$message('搜索条件不能为空');
          return
        }
        this.purchase_pageIndex = 1
        this.$emit('on-search-change', this.getData100());
      },
      keyupSubmit() {
        document.onkeydown = e => {
          let _key = window.event.keyCode;
          if(_key === 13) {
            this.$emit('on-search-change', this.getData1());
          }
        }
      },
      handleClick(tab, event) {
        this.getData20();
        this.getData100();
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.rowData = row
      },
      onClose(){
        this.dialogFormVisible = false
        this.input = ''
      },
      onSubmit(row){
        var reason = this.input;
        var type2 = 3;
        var tokenshow = sessionStorage.getItem("token");
        var ids = row.id;
        var arr2 = [];
        arr2.push(ids)
        this.$axios({
          method: 'post',
          url: '/backlog/approval?authorization=' +tokenshow+"&type=" + type2+"&reason=" + reason,
          data:JSON.stringify(arr2),
          headers:{
            'Content-Type':'application/json'
          },
        }, config)
        .then(response => {
          this.dialogFormVisible = false
          this.input = ''
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.getData20()
          this.getData100()
        })
      },

      handleSupply(index, row) {
        console.log("rowdsdas",row)
        sessionStorage.setItem("controlid", JSON.stringify(row.userId));
        this.$confirm('是否通过此申请？', '通过提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.load_back(index, row);
        }).catch(() => {});
      },
      load_back(index, row){
        var type = 2;
        var tokenshow = sessionStorage.getItem("token");
        var ids = row.id;
        var arr = [];
        arr.push(ids)
        this.$axios({
          method: 'post',
          url: '/backlog/approval?authorization=' +tokenshow+"&type=" + type,
          data:JSON.stringify(arr),
          headers:{
            'Content-Type':'application/json'
          },
        }, config)
        .then(response => {
          this.getData20()
          this.getData100()
        })
      },
      handleLook(index, row) {
        sessionStorage.setItem("controlid", JSON.stringify(row));
        this.$router.push({
          path: '/From-supply',
          name: 'From-supply',
          params: {
            controlid: row,
          }
        });
      },
      handleGoLook(index, row) {
        sessionStorage.setItem("controlid", JSON.stringify(row));
        this.$router.push({
          path: '/editor',
          name: 'editor',
          params: {
            controlid: row,
          }
        });
      },
      
      handleLookmyReport (index, row) {
        console.log("fdsfddsf",row.id)
        localStorage.setItem("controlid", row.id);
        this.$router.push({
          path: '/From-myReport',
          name: 'From-myReport',
          params: {
            controlid: row.id,
          }
        });
      },
      handleLookTwo(index, row) {
        sessionStorage.setItem("purchaseId", JSON.stringify(row.id));
      },
      eltabsform(index, row) {
        this.$router.push({
          path: '/From-new',
        });
      },
      new_resetting() {
        this.select_phone = '',
          this.select_idCard = '',
          this.select_name = '',
          this.select_memberLevel = '',
          this.start_signDate = '',
          this.end_signDate = '',
          this.select_serviceIntention = ''
      },
      //批量通过
      toggleSelection(row) {
        if (this.multipleSelection.length > 0) {
          this.$confirm('确认批量审批通过？', '批量审批通过', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then((response) => {
            this.loading = true
            this.onBatch(row)
          }).catch(() => {});
        } else{
          this.$message('请先勾选一条审批数据');
        }
      },
      onBatch (row) {
        var type = 2;
        var tokenshow = sessionStorage.getItem("token");
        var arred=[];
        var obj = {};
        this.multipleSelection.forEach((item) => {
          arred.push(item.id);
        });
        this.$axios({
          method: 'post',
          url: '/backlog/approval?authorization=' +tokenshow+"&type=" + type,
          data:JSON.stringify(arred),
          headers:{
            'Content-Type':'application/json'
          },
        }, config)
        .then(response => {
          this.message = 'three'
          this.getData20();
          this.getData100();
          
        })
      },
      
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
      },

    },
    destroyed () {//离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', this.handleScroll)
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      $route( to , from ){
        this.getData20()
        this.getData100()
        this.getData30()
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
</style>