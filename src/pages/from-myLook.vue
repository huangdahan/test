<template>
  <div class="container container2" >
    <ul id="time_show" >
      <li><b>员工姓名:</b><em>{{tabitems.proposerName}}</em></li>
      <li><b>开始日期:</b><em>{{tabitems.startTime}}</em></li>
      <li><b>结束日期:</b><em>{{tabitems.endTime}}</em></li>
      <li><b>填报日期:</b><em>{{tabitems.createDateStr}}</em></li>
      <el-upload class="upload-demo" ref="upload" v-model="docName" :on-preview="handlePreview" :on-remove="handleRemove" action=""  :file-list="fileList" :auto-upload="false">
      </el-upload>
    </ul>
    
    <div class="">
      <el-table :data="tableData" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="40"></el-table-column>
        <el-table-column prop="itemName" label="项目名称" width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="itemRoleName" label="项目角色" width="80"></el-table-column>
        <el-table-column prop="itemAddress" label="项目地点" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="salaryTime" label="考勤日期" width="100"></el-table-column>
        <el-table-column prop="salaryTimeIntervalName" label="考勤时段" width="80"></el-table-column>
        <el-table-column prop="salaryTypeName" label="考勤类型" width="100"></el-table-column>
        <el-table-column prop="dayTypeName" label="日期类型" width="100"></el-table-column>
        <el-table-column prop="itemInterval" label="项目补贴" width="80"></el-table-column>
        <el-table-column prop="manageInterval" label="管理补贴" width="80"></el-table-column>
        <el-table-column prop="moveClockTime" label="移动打卡时间" width="130"></el-table-column>
        <el-table-column prop="moveClockAddress" label="移动打卡地址" width="100"></el-table-column>
        <el-table-column prop="bz" label="备注说明" width="200"></el-table-column>
      
      </el-table>
      
      <!--<div class="anniu_text" v-show="handleShow">
          <el-button type="primary"  @click="handleSupply(tabitems)">通过</el-button>
          <el-button type="primary"  @click="handleEdit(tabitems)">未通过</el-button>
        </div>-->
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import store from '@/components/common/store';
  import baseUrl from '@/api/proxy';
  import config from '@/api/config';
  import moment from 'moment' //导入文件
  export default {
    name: 'apply',
    data() {
      return {
        tableData: [
//      {
//        name: '海通安恒',
//        code:'客户经理2',
//        type:'测试',
//        status:'2019-12-12',
//        updatedDtae:'晚上',
//        updatedBy:'出勤',
//        updated_con:'测试数据',
//        updated_teck:'客户经理',
//        updated_eyr:'2019-10-12 20:00:00',
//        updated_address:'客户经理',
//        updated_date:'2019-10-12',
//        updated_text:'',
//        timeshow:'上午',
//        name100:'海通安恒科技有限公司',
//        sleack:'出勤'
//      }
        ],
        tabitems:[],
        handleShow:true,
        
        tagsList: [],
        docName:[],
        fileList: [],
        docName:'',
        updata:[],
        uploadData:{},
        array:[]
      }
    },
    created() {
      this.getData();
    },
    filters: {
      formatDate:function (date) {
      var d = new Date(date);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      return year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
      }
    },
    methods: {
      getData(){
        var tabitem = []
        var controlid = sessionStorage.getItem("controlid");
        var tokenshow = sessionStorage.getItem("token");
        tabitem.push(JSON.parse(controlid)) 
        console.log("fsffda",tabitem)
        this.tabitems = tabitem[0]
        var reportId =tabitem[0].reportId
        var itemId = tabitem[0].itemId
        this.$axios({
          method: 'post',
          url: '/timesheet/itemMessage?authorization=' +tokenshow+"&reportId="+reportId+"&itemId="+itemId,
        }, config)
        .then(response => {
         console.log("32432",response)
         this.tableData = response.data.obj
        })
        
      },
      handleSupply(row) {
        this.$confirm('是否通过此申请？', '通过提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.load_back(row);
        })
      },
      load_back(row){
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
          this.handleShow = false
          this.$message({
            message: '通过成功',
            type: 'success'
          });
          this.$router.push({
            path: '/form',
          });
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //未通过点击
      handleEdit(row) {
        sessionStorage.setItem("controlid", JSON.stringify(row.userId));
        this.$confirm('是否不通过此申请？', '不通过提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.no_back(row);
        })
      },
      no_back(row){
        var type2 = 3;
        var tokenshow = sessionStorage.getItem("token");
        var ids = row.id;
        var arr2 = [];
        arr2.push(ids)
        this.$axios({
          method: 'post',
          url: '/backlog/approval?authorization=' +tokenshow+"&type=" + type2,
          data:JSON.stringify(arr2),
          headers:{
            'Content-Type':'application/json'
          },
        }, config)
        .then(response => {
          this.handleShow = false
          this.$router.push({
            path: '/form',
          });
        })
      },
      handleRemove(file, fileList) {
        var tokenshow = sessionStorage.getItem("token");
        this.$axios({
            method: 'get',
            url: '/delFile/'+file.id+'?authorization=' +tokenshow,
          })
          .then(response => {
           this.updata.splice(this.updata.indexOf(file.id),1);
          })
      },
      handlePreview(file) {
        var upId=file.id;
        var tokenshow = sessionStorage.getItem("token");
        console.log(file)
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        xhr.open('get',baseUrl.baseUrl +'/downloadFile/'+file.id+'?authorization='+tokenshow);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
                var blob = this.response;
                console.log(this.response);
            var fileName = file.name;
  
            var  link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
        };
        xhr.send(formData);
      },
      handleNew(index, row) {
        this.idx = index;
        this.editVisible = true;
      },
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getData'
    }
  }
</script>

<style scoped>

  #time_show h5{font-weight: 100;color: red;}
  #time_show ul{width: 100%;float: left;height: 30px;line-height: 30px;margin-bottom: 20px;}
  #time_show li{list-style: none;float: left;width: 25%;    margin-bottom: 20px;}
  #time_show li em{font-style: inherit;}
  .anniu_text{margin-top: 40px;}
  .anniu_text .el-button:first-child{margin: 0 0 0 30%;width: 100px;}
  .anniu_text .el-button:last-child{margin: 0 0 0 10%;width: 100px;}
  .upload-demo{float: left;width: 100%;margin: 10px 0;}
  
  
</style>