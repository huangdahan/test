<template>
  <div class="container container2" >
    <div class="">
      <el-table :data="tableData" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="40"></el-table-column>
        <el-table-column prop="itemName" label="项目名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createDateStr" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="approvalPersonName" label="审批节点" ></el-table-column>
        <el-table-column prop="approvalTypeStr" label="审批状态" show-overflow-tooltip></el-table-column>
        
        
        <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" class="supply-load dataManage_form_add_contract_info" @click="handleLook(scope.$index, scope.row)">查看</el-button>
              <el-button type="text" class="supply-load dataManage_form_add_contract_info" @click="handleEdit(scope.$index, scope.row)">撤回</el-button>
            </template>
          </el-table-column> 
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
        ],
        tabitems:[],
        handleShow:true,
        
        tagsList: [],
        docName:[],
        fileList: [],
        docName:'',
        updata:[],
        uploadData:{},
        array:[],
        ids:''
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
//      var tabitem = []
        var controlid = localStorage.getItem("controlid");
        var tokenshow = sessionStorage.getItem("token");
        this.$axios({
          method: 'post',
          url: '/timesheet/myReportMessage/'+controlid+'?authorization=' +tokenshow,
        }, config)
        .then(response => {
         this.tableData = response.data.obj
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //撤回申请点击
      handleEdit(index, row) {
        sessionStorage.setItem("controlid", JSON.stringify(row.userId));
        this.$confirm('是否撤回此申请？', '撤回提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.no_back(index, row);
        }).catch(() => {});
      },
      no_back(index, row){
        var tokenshow = sessionStorage.getItem("token");
        var reportId = row.reportId;
        var itemId = row.itemId;
        this.$axios({
          method: 'post',
          url: '/timesheet/revocation?authorization=' +tokenshow+"&reportId="+reportId+"&itemId="+itemId,
        }, config)
        .then(response => {
          console.log("fdsfdsfs",response)
          this.getData()
          this.$message(response.data.message);
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
          }).catch(() => {});
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
      handleLook(index, row){
        sessionStorage.setItem("controlid", JSON.stringify(row));
        this.$router.push({
          path: '/myLook',
          name: 'myLook',
        });
      }
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

  #time_show h5{font-weight: 100;color: red;}
  #time_show ul{width: 100%;float: left;height: 30px;line-height: 30px;margin-bottom: 20px;}
  #time_show li{list-style: none;float: left;width: 25%;    margin-bottom: 20px;}
  #time_show li em{font-style: inherit;}
  .anniu_text{margin-top: 40px;}
  .anniu_text .el-button:first-child{margin: 0 0 0 30%;width: 100px;}
  .anniu_text .el-button:last-child{margin: 0 0 0 10%;width: 100px;}
  .upload-demo{float: left;width: 100%;margin: 10px 0;}
  
  .cell .el-button {
    border: 0;
    padding: 2px 0;
    background: none;
  }
  .handle-box2 .el-table__body-wrapper td{padding: 8px 0!important;}
</style>