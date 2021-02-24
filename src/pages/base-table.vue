<template>
  <div class="container">
    <div class="top_button" style="float: left;width: 100%;margin-bottom: 20px;    margin-top: 20px;">
      <b><el-button type="primary"  @click="addData">保存并关闭</el-button></b>
      <b><el-button plain @click="searchData">返回</el-button></b>
      <b><el-button type="primary" @click="searchData">保存</el-button></b>
    </div>
    <div class="contament">
        <h3>查选配</h3>
        <ul>
            <li><el-button  @click="addData">显示全部</el-button></li>
            <li><el-button @click="addData">显示已选</el-button></li>
            <li><el-button @click="addData">重置</el-button></li>
        </ul>
        <el-table ref="multipleTable" id="TableData" :data="firstData" border style="width: 100%" @row-click="rowClick" @selection-change="handleSelectionChange">
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="name" label="名称" align="center" />
          <el-table-column prop="address" label="答案" align="center" />
        </el-table>
    </div>
    
    <div class="centerData">
        <h3>公共配置信息</h3>
        <el-table ref="multipleTable" id="secondData" :data="secondData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="name" label="属性" align="center" />
          <el-table-column prop="address" label="属性答案" align="center"/>
          <el-table-column  label="查询" align="center" >  
          <template slot-scope="scope">
              <div>
                <div @click="nameData(scope.$index, scope.row)">
                    <el-input v-model="scope.row.status" prefix-icon="el-icon-search" placeholder="请选择" readonly />
                    <input type="hidden" v-model="scope.row.firstid" >
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="centerData">
        <h3>子件配置信息</h3>
        <el-table ref="multipleTable" id="secondData" :data="threeData" border style="width: 100%" >
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="name" label="属性" align="center" />
          <el-table-column prop="address" label="属性答案" align="center"/>
          <el-table-column  label="查询" align="center" >  
          <template slot-scope="scope">
              <div>
                <div @click="ThreeData(scope.$index, scope.row)">
                    <el-input v-model="scope.row.status" prefix-icon="el-icon-search" placeholder="请选择" readonly />
                    <input type="hidden" v-model="scope.row.firstid" >
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
    </div>

    <div class="imgShowData">
        <h3>料品档案图片</h3>
        <div class="imgShow">
            <img src="../assets/images/img_1.jpg" />
            <img src="../assets/images/img_2.jpg" />
        </div>
    </div>

  
  <!-- 公共配置信息的弹框 -->
  <el-dialog title="值集选择框" :visible.sync="dialogVisible" width="30%">
    <div class="disalog_name">
      <b>编号:</b>
      <em><el-input v-model="dialognumber" placeholder="请输入编号" clearable /> </em>
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
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="name" label="名称"  align="center"/>
      <el-table-column prop="address" label="编号"  align="center"/>
    </el-table>
    <!-- <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="loadTable" /> -->
  
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="checkDialog">确 定</el-button>
    </span>
  </el-dialog>
  
  <!-- 子件配置信息的弹框 -->
  <el-dialog title="值集选择框" :visible.sync="threeVisible" width="30%">
    <div class="disalog_name">
      <b>编号:</b>
      <em><el-input v-model="threeNumber" placeholder="请输入编号" clearable /> </em>
      <b>名称:</b>
      <em><el-input v-model="threeName" placeholder="请输入名称" clearable /> </em>
      <el-button plain @click="searchDialog">查询</el-button>
    </div>
    <el-table id="dialogTable"  ref="multipleTable"   :data="firstData" border style="width: 100%" @selection-change="threeSelectionChange">
      <el-table-column label="" width="50">
        <template slot-scope="scope">
          <el-radio :label="scope.$index" v-model="radioThree" @change.native="getThreeRow(scope)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="name" label="名称"  align="center"/>
      <el-table-column prop="address" label="编号"  align="center"/>
    </el-table>
    <!-- <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="loadTable" /> -->
  
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="checkThree">确 定</el-button>
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
       firstData: [{
         id:'01',name: '测试1', address: '发的发的是', status: '否'
       }, {
         id:'02',name: '测试2', address: '发的发的是', status: '否'
       }, {
         id:'03',name: '测试3', address: '发的发的是', status: '否'
       }, {
         id:'02',name: '测试2', address: '发的发的是', status: '否'
       }, {
         id:'03',name: '测试3', address: '发的发的是', status: '否'
       }],
       secondData: [{
         id:'01',name: '真皮位置1', address: 'T2NL5118', status: ''
       }, {
         id:'02',name: '测试2', address: '发的发的是', status: ''
       }, {
         id:'03',name: '测试3', address: '发的发的是', status: ''
       }, {
         id:'02',name: '测试2', address: '发的发的是', status: ''
       }, {
         id:'03',name: '测试3', address: '发的发的是', status: ''
       }, {
         id:'02',name: '测试2', address: '发的发的是', status: ''
       }, {
         id:'03',name: '测试3', address: '发的发的是', status: ''
       }],
       threeData: [{
         id:'01',name: '真皮位置1', address: 'T2NL5118', status: ''
       }, {
         id:'02',name: '测试2', address: '发的发的是', status: ''
       }, {
         id:'03',name: '测试3', address: '发的发的是', status: ''
       }, {
         id:'02',name: '测试2', address: '发的发的是', status: ''
       }, {
         id:'03',name: '测试3', address: '发的发的是', status: ''
       }, {
         id:'02',name: '测试2', address: '发的发的是', status: ''
       }, {
         id:'03',name: '测试3', address: '发的发的是', status: ''
       }],
       dialognumber:'',
       dialogName:'',
       dialogVisible:false,
       
       //弹框数组
       rowObj:[],
       radio: '',
       indexShow:'',
       selectedList:[],
       
       threeNumber:'',
       threeName:'',
       threeVisible:false,
       rowThree:[],
       radioThree: '',
       threeShow:'',
       selectedthree:[],
       
       multipleTable: [],
       
      }
    },
    methods: {
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
           this.secondData[d].status = this.rowObj.name
           this.secondData[d].firstid = this.rowObj.id
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
     },
     
     //点击展示弹框
     ThreeData(index, row){
       this.threeVisible = true
       this.threeShow = index
       
       this.rowThree = []
       this.radioThree = ''
     },
     //点击弹框选择赋值到table数组里
     checkThree() {
       if(this.rowThree.length == 0){
         this.$message('请先勾选一行数据');
         return
       }else{
           var nameShow = this.rowThree.name
           var id = this.rowThree.id
           var d = this.threeShow
           this.threeData[d].status = this.rowThree.name
           this.threeData[d].firstid = this.rowThree.id
           this.threeVisible = false
       }    
     },
     //判断弹框点击的数组
     threeSelectionChange(val) {
       this.selectedthree = val
       
     },
     //点击弹框的单选值获取数组
     getThreeRow(scope) {
         this.rowThree = scope.row
     },
     
     searchDialog(){
     },    
     
     addData(){
     },
     searchData(){
     },
     handleSelectionChange(val) {
       this.multipleTable = val;               //  this.multipleTable 选中的值
       console.log(val);
     },
     // 点击左侧table获取id联动右边的数据
     rowClick(val) {
       console.log(val)
       var id = val.id
     },
    }
  }
</script>

<style scoped>
 .container{float: left;}   
    .top_button b{margin-left: 20px;}
 .contament{border: 1px solid #ccc;float: left;width: 26%;border-radius: 4px;margin-right: 20px;}
 .contament h3{background: #81d3f8;color: #fff;text-align: center;height: 40px;line-height: 40px;margin-bottom: 20px;}
 .contament ul{    float: left; width: 100%; margin-bottom: 20px;border-bottom: 1px solid #ccc;padding-bottom: 4px;}
 .contament li{list-style: none;float: left;width: 33%;border-right: 1px solid #ccc;text-align: center;}
 .contament li:last-child{border-right: 0;}
 
 #TableData {width: 92%!important;margin: 20px;}
 #secondData{width: 92%!important;margin:0 20px 20px 20px;}
 .centerData {border: 1px solid #ccc;float: left;width: 34%;border-radius: 4px;margin-right: 20px;}
 .centerData h3{text-align: left;text-indent: 20px;height: 40px;line-height: 40px;}
 
 
 .disalog_name {margin-bottom: 20px;}
 .disalog_name b{float: left;width: 50px;text-align: left;height: 37px;line-height: 37px;}
 .disalog_name em{float: left;width: 150px;margin-right: 20px;}
 
 .imgShowData{width: 69.5%;float: left; margin-left: 450px;border-radius: 4px;border: 1px solid #ccc;    margin-top: 20px;}
 .imgShowData h3{text-align: left;text-indent: 20px;height: 40px;line-height: 40px;}
</style>