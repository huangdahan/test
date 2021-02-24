<template>
  <div class="container"  v-loading="loading">
    <div class="" id="timesheet" >
        
        <dl>
          <dd><b>申请人:</b><em>{{tagsList.proposerName}}</em></dd>
          <dd><b>填报时间区间:</b><em>{{tagsList.startTime}}至{{tagsList.endTime}}</em></dd>
          <dd><b>申请日期:</b><em>{{tagsList.createDateStr}}</em></dd>
          <dd><b>所属部门:</b><em>{{tagsList.deptName}}</em></dd>
          <dd><b>所属岗位:</b><em>{{tagsList.postName}}</em></dd>
          <!--<dd><b>提醒:</b><i style="font-style: normal;color: red;"></i></dd>-->
        </dl>
        <div style="position: relative;">
          <el-upload class="upload-demo" ref="upload" v-model="docName" :on-preview="handlePreview" :on-remove="handleRemove" action=""  multiple :on-change="getFile" :file-list="fileList" :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">上传附件</el-button>
          </el-upload>
        </div>
        <ul>
          <em style="font-style: normal;color: red;font-size: 15px;font-family: cursive;">提醒:1.项目补贴以本流程填报带出的汇总金额作为统计核发依据，无需再单独提报报销申请流程。2.请假请务必先在OA中提交请假申请流程，并提醒审批人审批。3.空载优先使用年休假冲抵。</em>
        </ul>
  
        <el-table :data="datas" v-show="datashow"  tooltip-effect="dark" :row-class-name="tableRowClassName" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="index" label="序号" width="40"></el-table-column>
          <el-table-column label="项目名称" width="190" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select  v-model="scope.row.itemName"  @change="selectGet(scope.row)">
                <el-option v-for="itemte in itemsdata" :key="itemte.itemId" :label="itemte.itemName" :value="itemte.itemName"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="itemRoleName" label="项目角色" width="80"></el-table-column>
          <el-table-column prop="itemAddress" label="项目地点" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="salaryTime" label="考勤日期" width="100"></el-table-column>
          <el-table-column prop="salaryTimeIntervalName" label="考勤时段" width="80">
          </el-table-column>
          <el-table-column  label="考勤类型" width="100">
            <template slot-scope="scope">
              <el-select  v-model="scope.row.salaryTypeName" @focus="selectTypeFocus(scope.row)" @change="selectType(scope.row)">
                <el-option v-for="itemde in salaryType" :key="itemde.code" :label="itemde.name" :value="itemde.name"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="dayTypeName" label="日期类型" width="100"></el-table-column>
          <el-table-column prop="itemInterval" label="项目补贴" width="80"></el-table-column>
          <el-table-column prop="manageInterval" label="管理补贴" width="80"></el-table-column>
          <el-table-column prop="moveClockTime" label="移动打卡时间" width="130"></el-table-column>
          <el-table-column prop="moveClockAddress" label="移动打卡地址" width="100"></el-table-column>
          <el-table-column prop="bz" label="备注说明" width="200">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.bz" placeholder="请输入备注说明"></el-input>
            </template>
          </el-table-column>
  
        </el-table>
        
        <el-table :data="datasshow" v-show="datahide"  tooltip-effect="dark" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
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
      
        <div class="anniu_text" v-show="sucessTake">
          <el-button type="primary"  @click="toggleSelection(tagsList)">保存</el-button>
          <el-button type="primary"  @click="resultRow(tagsList)">提交</el-button>
        </div>
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
        datatrue:[],
        datasshow:[],
        message: 'first',
        delVisible: false,
        loading: false,
        datashow:true,
        datahide:false,
        datas: [],
        tagsList: [],
        table7:'',
        dayTypeShow:'',
        itemName:'',
        startTime:'',
        endTime:'',
        dateShow:true,
        dateHide:false,
        sucessTake:true,
        secondshow:false,
        hideData:false,
        fileList: [],
        docName:'',
        updata:[],
        uploadData:{},
        array:[],
        salaryType:[]
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
        var controlided = sessionStorage.getItem("controlided");
        tabitem.push(JSON.parse(controlided)) 
        this.datashow = true
        this.datahide = false
        this.sucessTake = true
        this.loading=true;
        this.tabitems = tabitem[0]
        var startTimeder = tabitem[0].startTime
        var endTimeder = tabitem[0].endTime
        var tokenshow = sessionStorage.getItem("token");
        var username = sessionStorage.getItem('ms_username');
        this.$axios({
            method: 'post',
            url: '/timesheet/fillInReport?authorization=' +tokenshow,
            params: {
              username: username,
              startTime: startTimeder,
              endTime: endTimeder,
            },
          }, config)
          .then(response => {
            console.log("dfsffsdfds",response)
            if(response.data.code == '10011'){
              this.$router.push('/login');
            }
            this.loading = false
            if(response.data.success == false){
              this.loading = false
              this.$message(response.data.message);
            }
            this.tagsList = response.data.obj;
            this.datas = response.data.obj.timeSheetPersonReportList;

            this.datasshow = response.data.obj.timeSheetPersonReportList;
            this.fileList = response.data.obj.fileList;
            this.array = response.data.obj.fileList;
            

            this.itemsdata = response.data.obj.items;
//          this.salaryType = response.data.obj.maps;
            
          })
      },
      toggleSelection(datas) {//删除改行
        this.$confirm('确认是否保存数据？', '保存数据', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then((response) => {
//        this.datashow = false
//        this.datahide = true
          this.onBatch(datas);
        }).catch(() => {});
      },
      resultRow(data) {
        this.$confirm('确认是否提交数据？', '提交数据', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then((response) => {
          this.resultBatch(data);
        }).catch(() => {});
      },
 
      getData1() {
        var tokenshow = sessionStorage.getItem("token");
        this.$axios({
            method: 'post',
            url: '/timesheet/fillInBacklog?authorization=' +tokenshow,
          }, config)
          .then(response => {
            if(response.data.code == '10011'){
              this.$router.push('/login');
            }
            this.datatrue = response.data.obj;
          })
          .catch(function(error) {
            console.log(error);
          });
      },

      onBatch(datas) {
        console.log("fdsfada",datas)
        var tokenshow = sessionStorage.getItem("token");
        var updataid = this.updata
        var str = '';
        for (var i=0;i<updataid.length; i++) {
          str += updataid[i]+','
        }
        this.$axios({
            method: 'post',
            url: '/timesheet/saveReport?authorization=' +tokenshow+ "&ids="+str,
            data:JSON.stringify(datas), 
            headers:{
              'Content-Type':'application/json'
            },
          })
          .then(response => {
//          this.datashow = false
//          this.datahide = true
            this.getData()
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      selectGet(item){
        this.itemsdata.forEach((i) => {
          if(i.itemName == item.itemName) {
            item.itemId  = i.itemId
            console.log("item.salaryTypeCode",item.salaryTypeCode)
            var tokenshow = sessionStorage.getItem("token");
            this.$axios({
              method: 'post',
              url: '/timesheet/getPersonMessageByItemIdAndSal?authorization=' +tokenshow,
              params: {
                itemId: i.itemId,
                code:item.salaryTypeCode,
                dayType:item.dayType,
                time:item.salaryTime
              },
            }, config)
            .then(response => {
              console.log("responseitemId",response)
              var dataShow =response.data.obj;
              i.itemAddress = dataShow.itemAddress
              i.itemInterval = dataShow.itemInterval
              i.itemRoleId = dataShow.itemRoleId
              i.itemRoleName = dataShow.itemRoleName
              i.managerInterval = dataShow.managerInterval
              
              i.executiveManagerCode = dataShow.executiveManagerCode
              i.executiveManagerName = dataShow.executiveManagerName
              i.itemDirectorCode = dataShow.itemDirectorCode
              i.itemDirectorName = dataShow.itemDirectorName
              i.itemManagerCode = dataShow.itemManagerCode
              i.itemManagerName = dataShow.itemManagerName
              i.manageInterval = dataShow.managerInterval
              i.itemType = dataShow.itemType
              i.saleManagerCode = dataShow.saleManagerCode
              i.saleManagerName = dataShow.saleManagerName
              
              i.salaryTypeCode = dataShow.salaryTypeCode
              i.salaryTypeName = dataShow.salaryTypeName
              item.salaryTypeCode = i.salaryTypeCode
              item.salaryTypeName = i.salaryTypeName

              item.itemRoleName = i.itemRoleName
              item.itemRoleId = i.itemRoleId
              item.itemAddress = i.itemAddress
              item.itemInterval = i.itemInterval
              item.managerInterval = i.managerInterval
              item.executiveManagerCode = i.executiveManagerCode
              item.executiveManagerName = i.executiveManagerName
              item.itemDirectorCode = i.itemDirectorCode
              item.itemDirectorName = i.itemDirectorName
              item.itemManagerCode = i.itemManagerCode
              item.itemManagerName = i.itemManagerName
              item.manageInterval = i.manageInterval
              item.itemType = i.itemType
              item.saleManagerCode = i.saleManagerCode
              item.saleManagerName = i.saleManagerName
            })
          }
          
        })
      },
      selectType(item){
        this.salaryType.forEach((i) => {
            if(i.name == item.salaryTypeName) {
              item.salaryTypeCode  = i.code
              console.log("fdsfsdfname",item.salaryTypeCode)
              var tokenshow = sessionStorage.getItem("token");
              this.$axios({
                method: 'post',
                url: '/timesheet/getPersonMessageByItemIdAndSal?authorization=' +tokenshow,
                params: {
                  itemId: item.itemId,
                  code:i.code,
                  dayType:item.dayType,
                  time:item.salaryTime
                },
              }, config)
              .then(response => {
                var dataShow =response.data.obj;
                console.log("fgfdgsgdsgdsf",response)
                if (response.data.obj !== null) {
                	i.itemInterval = dataShow.itemInterval
                  i.manageInterval = dataShow.managerInterval
  
                  item.itemInterval = i.itemInterval
                  item.manageInterval = i.manageInterval
                }
                
              })
            }
        })
      },
      selectTypeFocus(row){
        console.log(row)
        var tokenshow = sessionStorage.getItem("token");
        this.$axios({
          method: 'post',
          url: '/timesheet/passNull?authorization=' +tokenshow,
          params: {
            dayType:row.dayType,
            itemName: row.itemName
          },
        }, config)
        .then(response => {
          console.log("cxzdsdfsfdafad",response)
          this.salaryType = response.data.obj;
        })
      },
      
      resultBatch(data){
        this.loading=true;
        var tokenshow = sessionStorage.getItem("token");
        var updataid = this.updata
        var annualLeave=this.tagsList.annualLeave
        var str = '';
        for (var i=0;i<updataid.length; i++) {
          str += updataid[i]+','
        }
        this.$axios({
            method: 'post',
            url: '/timesheet/submitForApproval?authorization=' +tokenshow+ "&ids="+str+"&annualLeave="+annualLeave,
            data:JSON.stringify(data), 
            headers:{
              'Content-Type':'application/json'
            },
          })
          .then(response => {
            this.loading=false;
            if(response.data.code == 10000){
              this.datashow = false
              this.datahide = true
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.getData1()
              this.sucessTake = false
            } else{
              this.$message(response.data.message);
            }
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
        const item = this.tableData[index];
        this.editVisible = true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 上传附件
      getFile(e) {
        this.loading=true;
        var tokenshow = sessionStorage.getItem("token");
        let file = e.raw
        let fileData = new FormData()
        fileData.append('fileList', file)
        this.$axios.post('/uploadToServer?authorization=' +tokenshow,
            fileData, {}
          )
          .then((response) => {
            this.loading=false;
            if(response.data.success) {
              this.docName = response.data.obj.id;
              this.updata.push(this.docName)
              this.loading=false;
              if(response!=null){
                  var obj = {id:response.data.obj.id,name :response.data.obj.name,url:response.data.obj.filePath};
                  this.array.push(obj);
              }
              this.fileList = this.array;
              this.$message({
                message: '上传成功',
                type: 'success'
              });
            } else {
              this.$message('上传文件失败');
              this.loading=false;
              this.file = []
            }
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
        console.log(file);
      },
      handleNew(index, row) {
        this.idx = index;
        this.editVisible = true;
      },
      handleClick(tab, event) {
        console.log("tab", event);
      },
      tableRowClassName({row, rowIndex}) {
        console.log("fdsvd",row)
        if (rowIndex === 3) {
          return 'warning-row';
        } else if (rowIndex === 1) {
          return 'success-row';
        }
        return '';
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
  
  .el-table .warning-row {
    background: red;
  }

  .el-table .success-row {
    background: yellow;
  }
  
  #timesheet h5{font-weight: 100;color: red;}
  #timesheet ul{width: 100%;float: left;line-height: 30px;}
  #timesheet li{list-style: none;float: left;width: 48%;}
  #timesheet li b{float: left;width: 80px;}
  #timesheet li em{font-style: inherit;}
  #timesheet dl {float: left;width: 100%;}
  #timesheet dl dd{float: left;width: 48%;height: 36px;line-height: 36px;}
  #timesheet dl dd b{float: left;width: 110px;}
  #timesheet dl dd em{font-style: inherit;}
  #timesheet dl dd i{color: red;}
  #timesheet dl dd .open{width:50px;color: red;}
  .anniu_text{margin-top: 40px;}
  .anniu_text .el-button:first-child{margin: 0 0 0 30%;width: 100px;}
  .anniu_text .el-button:last-child{margin: 0 0 0 10%;width: 100px;}
  .el-date-editor.el-input, .el-date-editor.el-input__inner{width: 150px!important;}
  .el-input--small{width: 180px;}
  .timeshow {width: 100px;}
  /*.upload-demo .el-upload-list__item{float: left; width: 30%;}*/
  .el-upload-list__item{float: left!important;width: 30%!important;}
  .el-upload-list{    bottom: 10px;margin-left: 7%;}
  #timesheet .el-upload-list{top:146px!important}
  
</style>