<template>
  <div class="container">
    <h3><b>相关性代码</b></h3>

    <div class="list_show">
      <b>关系类型</b>
      <em><el-select v-model="select_style" placeholder="全部" class="handle-select load-select mr10">
        <el-option v-for="item in optionsd" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select></em>
    
    </div>
    
    <el-table :data="tableData" stripe tooltip-effect="dark" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column  type="selection"  width="55"></el-table-column>
      <el-table-column type="index" label="id" width="40"></el-table-column>
      <el-table-column label="组织" width="120">
        <template slot-scope="scope">
          <div>
            <div v-show="createShow">{{ scope.row.code}}</div>
            <div v-show="createAdd"><el-input v-model="scope.row.code"></el-input> </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column  label="单据类型" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
          <div>
            <div v-show="createShow"><el-checkbox v-model="scope.row.checked" disabled="disabled"></el-checkbox></div>
            <div v-show="createAdd"><el-checkbox v-model="scope.row.checked"></el-checkbox> </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="首件原因" width="190" show-overflow-tooltip>
          <template slot-scope="scope">
          <div>
            <div v-show="createShow"><el-input  v-model="scope.row.name" disabled="disabled"></el-input></div>
            <div v-show="createAdd" @click="nameData(scope.$index, scope.row)">
                <el-input prefix-icon="el-icon-search" v-model="scope.row.name" readonly></el-input>
                <input type="hidden" v-model="scope.row.firstid" >
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="业务状态" width="150"></el-table-column>
      <el-table-column prop="updatedDtae" label="PI号" width="160"></el-table-column>
      <el-table-column prop="updatedBy" label="PO号" width="100"></el-table-column>
      <el-table-column prop="type" label="客户编码" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="客户名称" width="190" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="要求生产交期" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="标准生产交期" width="190" show-overflow-tooltip></el-table-column>
      
      <el-table-column prop="type" label="部件生产交期" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="计划回复交期" width="190" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="客户要求船期" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="标准交期(船期)" width="190" show-overflow-tooltip></el-table-column>
      
      <el-table-column prop="type" label="币种" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="汇率" width="190" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="业务员编码" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="业务员名称" width="190" show-overflow-tooltip></el-table-column>
      
      <el-table-column prop="type" label="部门编码" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="部门名称" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="销售类型" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="柜型" width="100" show-overflow-tooltip></el-table-column>
      
      <el-table-column prop="type" label="柜数" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="创建人" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="防火说明" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="商标" width="100" show-overflow-tooltip></el-table-column>
      
      <el-table-column prop="type" label="商标说明" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="是否熏蒸" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="熏蒸说明" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="是否验货" width="100" show-overflow-tooltip></el-table-column>
      
      <el-table-column prop="type" label="监单以及验货" width="100" show-overflow-tooltip></el-table-column>
    
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="danger"  class="table_edit"  @click="handleEdit(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  
  
  <el-dialog title="首件原因" :visible.sync="dialogVisible" width="30%">
    <!-- <el-button plain icon="el-icon-plus" >选择</el-button> -->
    <div class="disalog_name">
      <b>名称:</b>
      <em><el-input v-model="dialogName" placeholder="请输入名称" clearable /> </em>
      <el-button plain @click="searchDialog">查询</el-button>
    </div>
    <el-table id="dialogTable"  ref="multipleTable"   :data="firstData" border style="width: 100%" @selection-change="dialogSelectionChange">
      <el-table-column label="" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope)">&nbsp;</el-radio>
            </template>
          </el-table-column>
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="address" label="订单类型" />
      <el-table-column prop="status" label="是否生效" />
    </el-table>
    <!-- <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="loadTable" /> -->
  
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="checkDialog">确 定</el-button>
    </span>
  </el-dialog>
 </div> 
  
</template>

<script>
  import axios from 'axios';
import { Loading } from "element-ui";
 
  export default {
    data() {
      return {
        message: 'first',
        firstid:false,
        tableData: [{
            index: '222',
            checked:true,
            code: '333',
            status: '444',
            type: '55',
            name: '666',
            updatedDtae: '',
            customerName: ''
        }],
        select_number: '',
        createShow:true,
        createAdd:false,
        select_style:'',
        optionsd:[{
            name:'前提条件',id:'1'
            },{
            name:'选择条件',id:'2'
            },
            {
            name:'程序',id:'3'
        }],
        statusData:[],
        select_status:'',
        checked:false,
        dialogVisible: false,
        dialogName:'',
        multipleTable:[],
        firstData: [{
          id:'01',name: '测试1', address: '发的发的是', status: '否'
        }, {
          id:'02',name: '测试2', address: '发的发的是', status: '否'
        }, {
          id:'03',name: '测试3', address: '发的发的是', status: '否'
        }],
        selectedList: [],
        rowObj:[],
        radio: '',
        indexShow:''
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addData() {
        this.createAdd = true
        this.createShow = false
        var list = {
          index: '',
          code: '',
          status: '',
          type: '',
          name: '',
          updatedDtae: '',
          customerName: ''
        };
        this.tableData.push(list);
      },
      //删除新增的某行数据
      handleDelete(index, row) {},
      searchData(){
          
      },
      //点击展示弹框
      nameData(index, row){
        this.dialogVisible = true
        this.indexShow = index
        
        this.rowObj = []
        this.radio = ''
      },
      //点击弹框选择赋值到table数组里
      checkDialog() {
        if(this.rowObj.length == 0){
          this.$message('请先勾选一行数据');
          return
        }else{
            var nameShow = this.rowObj.name
            var id = this.rowObj.id
            var d = this.indexShow
            this.tableData[d].name = this.rowObj.name
            
            this.tableData[d].firstid = this.rowObj.id
            this.dialogVisible = false
        }    
      },
      //判断弹框点击的数组
      dialogSelectionChange(val) {
        this.selectedList = val
        
      },
      //点击弹框的单选值获取数组
      getCurrentRow(scope) {
          this.rowObj = scope.row
          console.log("dddd",this.rowObj)
      },
      searchDialog() {
      
      },
      checkDialog2() {
      
      },
      searchDialog2() {
      
      },
      handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
        }
    }
  }
</script>

<style scoped>
.container h3{height: 40px;line-height: 40px;}
.el-table .el-checkbox__inner{display: none!important;}
  #dialogTable .el-table__header-wrapper .el-checkbox__original{display: none!important;}
.mycell.el-checkbox__input {
  display: none
}
/* 样式排版 */
  .list_show{float: left;width: 900px;margin: 20px 0;}
  .list_show em{float: left;font-style: normal;}
  .list_show b{    width: 120px;text-align: right;font-weight: 400; float: left; height: 30px;line-height: 30px;margin-right: 10px;}
  .list_show b i{    color: red;height: 28px;line-height: 36px; float: left;width: 10px;}
  
  .disalog_name {margin-top: 20px;margin-bottom: 20px;}
  .disalog_name b{float: left;width: 50px;text-align: left;height: 37px;line-height: 37px;}
  .disalog_name em{float: left;width: 150px;margin-right: 20px;}
  
  .el-form-item__label{width: 135px;}
  #pane-second .el-form-item__label{width: 115px;}
  .el-date-editor.el-input, .el-date-editor.el-input__inner{width: 150px!important;}
  
</style>