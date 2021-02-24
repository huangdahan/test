<template>
  <div class="container container1">
    <h3><span class="img_con_info"></span>基本信息</h3>
    <div class="con_container_edit">
      <el-button type="primary" @click="VisibleRow">保 存</el-button>
      <el-button @click="cancelNew()">关  闭</el-button>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :data="tableData" label-width="105px" class="demo-ruleForm">
      <div class="name_title_form">
        <div class="handle-box1">
          <div class="handle_form-name">
            <el-form-item label="会员姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入会员姓名" class="form-new-name mr10"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="ruleForm.mobile" maxlength='11' placeholder="请输入手机号码" class="form-new-name mr10"></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model="ruleForm.idCard" maxlength='18' placeholder="请输入身份证" class="form-new-name mr10"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" placeholder="请输入邮箱" class="form-new-name mr10"></el-input>
            </el-form-item>
            <br />
            <div class="de-fff-d">
              <em style="width: 105px;"><b>*</b>联系地址</em>
              <el-select v-model="ruleForm.provinces" @change="provincesChange" placeholder="请选择省">
                <el-option v-for="item in provincesArray" :key="item.provincesName" :label="item.provincesName" :value="item.provincesName">
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.city" @change="cityChange" collapse-tags placeholder="请选择市">
                <el-option v-for="item in cityArray" :key="item.cityName" :label="item.cityName" :value="item.cityName">
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.area" placeholder="请选择区">
                <el-option v-for="item in areaArray" :key="item.area" :label="item.area" :value="item.area">
                </el-option>
              </el-select>
              <el-input v-model="ruleForm.contactAddress" placeholder="请输入详细地址" class="name-title-address mr10"></el-input>
            </div>
            <div class="radios_name">
              <em><b>*</b>服务意向</em>
              <el-radio-group v-model="ruleForm.serviceIntention" class="radios_dag">
                <el-radio label="租房" value="租房"></el-radio>
                <el-radio label="购房" value="购房"></el-radio>
                <el-radio label="旅居" value="旅居"></el-radio>
                <el-radio label="医养服务" value="医养服务"></el-radio>
              </el-radio-group>
            </div>
            <div class="radios_name">
              <em><b>*</b>意向签约项目</em>
              <el-checkbox-group v-model="ruleForm.signIntention" class="radios_dag">
                <el-checkbox v-for="item in cities" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="pic_img_user"></div>
      </div>
      <br />
      <h3><span class="img_con_apply"></span>紧急联系人</h3>
      <br />
      <div class="handle-box3">
        <div class="handle_form-name">
          <el-form-item label="紧急联系人" prop="urgentPerson">
            <el-input v-model="ruleForm.urgentPerson" placeholder="请输入紧急联系人" class="form-new-name mr10"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop="urgentPhone">
            <el-input v-model="ruleForm.urgentPhone" maxlength='11' placeholder="请输入联系人电话" class="form-new-name mr10"></el-input>
          </el-form-item>
          <el-form-item label="推荐人信息" prop="recommenderInfo">
            <el-input v-model="ruleForm.recommenderInfo" placeholder="请输入推荐人信息" class="form-new-name mr10"></el-input>
          </el-form-item>

          <el-form-item label="监护人" prop="guardian">
            <el-input v-model="ruleForm.guardian" placeholder="请输入监护人" class="form-new-name mr10"></el-input>
          </el-form-item>
          <el-form-item label="监护人电话" prop="guardianPhone">
            <el-input v-model="ruleForm.guardianPhone" maxlength='11' placeholder="请输入监护人电话" class="form-new-name mr10"></el-input>
          </el-form-item>
          <br />
        </div>
      </div>
      <br />
      <h3><span class="img_con_apply"></span>健康状况</h3>
      <br />
      <div class="handle-box4">
        <div class="handle_form-name">
          <div class="radios_name">
            <em>健康状态自评</em>
            <!--<el-form-item label="健康状态自评" prop="healthStatus">-->
            <el-radio-group v-model="ruleForm.healthStatus" class="radios_dag">
              <el-radio label="良好无慢性病"></el-radio>
              <el-radio label="自理无慢性病"></el-radio>
              <el-radio label="自理有慢性病"></el-radio>
              <el-radio label="有慢性病/生活需要人少量协助"></el-radio>
              <el-radio label="需要护理"></el-radio>
              <el-radio label="其他"></el-radio>
            </el-radio-group>
            <!--</el-form-item>-->
          </div>
          <div class="radios_name">
            <em>过往病史</em>
            <el-input type="textarea" v-model="ruleForm.medicalHistory" placeholder="请输入过往病史"></el-input>
          </div>
        </div>
      </div>
      <!--<h3><span class="img_con_apply"></span>签约信息</h3>
    <div class="handle-box1">
      <div class="handle_form-name">
              <el-form-item label="申请签约项目" prop="projectName" id="sign_item" class="form-title">
          <el-select v-model="ruleForm.projectName" placeholder="请选择申请签约项目">
            <el-option
              v-for="item in cities"
              :key="item.project"
              :label="item.project"
              :value="item.project">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签约项目" prop="project"  class="form-title">
           <el-select v-model="ruleForm.project" @change="projectChange" placeholder="请选择签约项目">
            <el-option
              v-for="item in cities"
              :key="item.project"
              :label="item.project"
              :value="item.project">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协议条款" prop="tremName">
            <el-input  v-model="ruleForm.tremName" :disabled="true" placeholder="请输入监护人" class="form-new-name mr10"></el-input>
        </el-form-item>
        <el-form-item label="合同编号" prop="contractCode">
            <el-input  v-model="ruleForm.contractCode" placeholder="请输入合同编号" class="form-new-name mr10"></el-input>
        </el-form-item>
        <el-form-item label="会籍顾问" prop="advisor">
            <el-input  v-model="ruleForm.advisor" placeholder="请输入会籍顾问" class="form-new-name mr10"></el-input>
        </el-form-item>
        <el-form-item label="票据编号" prop="billld">
            <el-input  v-model="ruleForm.billld" placeholder="请输入票据编号" class="form-new-name mr10"></el-input>
        </el-form-item> 
        <el-form-item label="签约日期" prop="completeTime">
          <el-date-picker v-model="ruleForm.completeTime" type="date" placeholder="选择签约日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd'>
            </el-date-picker>
        </el-form-item>   
        <el-form-item label="申请审批人" prop="auditorName">
            <el-input  v-model="ruleForm.auditorName" placeholder="请输入申请审批人" class="form-new-name mr10"></el-input>
        </el-form-item> 
        <el-form-item label="款项审批人" prop="auditor">
            <el-input  v-model="ruleForm.auditor" placeholder="请输入监护人电话" class="form-new-name mr10"></el-input>
        </el-form-item> 
        <el-form-item label="盖章审核人" prop="checkInfo">
            <el-input  v-model="ruleForm.checkInfo" placeholder="请输入盖章审核人" class="form-new-name mr10"></el-input>
        </el-form-item> 
        <br />  
      </div>  
    </div>-->
    </el-form>

    <!-- 提示框 -->
    <el-dialog title="保存提示" :visible.sync="goVisible" width="300px" center>
      <div class="del-dialog-cnt">确认是否保存?</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="popupClose">取  消</el-button>
                <el-button type="primary"  @click="submitForm('ruleForm')">确  定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  // const cityOptions = ['西安养生谷', '郑州养生谷', '扬中养生谷'];
  import axios from 'axios';
  import store from '@/components/common/store';
  export default {
    name: 'apply',
    data() {
      return {
        healthStatusArray: ['良好无慢性性病', '自理无慢性病', '自理有慢性病', '有慢性病/生活需要人少量协助', '需要护理', '其他'],
        //      paths:'https://hdhm.evergrande.com/adminApi',
        // paths:'http://127.0.0.1:8090',
        checkedCities1: [],
        cities: [],
        id: '',
        tableData: [],
        tableData1: [],
        optionsd: [],
        provincesArray: [],
        cityArray: [],
        areaArray: [],
        provincesObj: null,
        cityObj: null,
        name: '',
        idCard: '',
        gender: '',
        belongAddress: '',
        contactAddress: '',
        urgentPerson: '',
        urgentPhone: '',
        serviceIntention: '',
        recommender: '',
        guardian: '',
        guardianPhone: '',
        healthStatus: '',
        medicalHistory: '',
        goVisible: false,
        mobile: '',
        source: '',
        radio2: '',
        projectName: '',
        createdTime: '',
        checkStatus: '',
        userId: '',

        ruleForm: {
          name: '',
          mobile: '',
          userId: '',
          idCard: '',
          email: '',
          provinces: '',
          city: '',
          area: '',
          contactAddress: '',
          signIntention: [],
          serviceIntention: '',
          urgentPhone: '',
          urgentPerson: '',
          recommenderInfo: '',
          guardian: '',
          guardianPhone: '',
          healthStatus: '',
          medicalHistory: '',

          projectName: '', //申请签约项目
          project: '',
          tremName: "",
          contractCode: '',
          advisor: '',
          billld: '',
          completeTime: '',
          auditorName: "",
          auditor: "",
          checkInfo: ""

        },
        rules: {
          name: [{
            required: true,
            message: '请输入会员姓名',
            trigger: 'blur'
          }],
          mobile: [{
              required: true,
              message: '请输入手机号码',
              trigger: 'blur'
            },
            {
              pattern: /^1[0-9]{10}$/,
              message: '请输入正确的手机号'
            }
          ],
          idCard: [{
            required: true,
            message: '请输入身份证',
            trigger: 'blur'
          }, ],
          email: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ],
          serviceIntention: [{
            type: 'array',
            message: '请选择服务意向',
            required: true,
            trigger: 'change'
          }],
          contactAddress: [{
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }],
          signIntention: [{
            type: 'array',
            message: '请输入意向签约项目',
            required: true,
            trigger: 'change'
          }],
          urgentPerson: [{
            required: true,
            message: '请输入紧急联系人',
            trigger: 'blur'
          }],
          urgentPhone: [{
              required: true,
              message: '请输入紧急联系电话',
              trigger: 'blur'
            },
            {
              min: 11,
              max: 11,
              message: '长度为11个字符',
              trigger: 'blur'
            }
          ],
          recommenderInfo: [{
            required: true,
            message: '请输入推荐人信息',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      let that = this
      //获取意向签约项目
      this.$axios({
        method: 'get',
        url: '/project/queryProjectName',
        params: {

        }
      }).then(function(response) {
        that.cities = response.data.data.data
      })

      this.$axios({
        method: 'post',
        url: '/userInfo/selectProvineslist',
        params: {

        }
      }).then(function(response) {
        that.provincesArray = response.data.data.data
        //      that.provincesObj = that.provincesArray[0]
        //      that.cityArray = that.provincesArray[0].cityList
        //      that.areaArray = that.cityArray[0].areaList
      })
    },
    methods: {
      cancelNew(){
      var tagsList=store.tagsList 
      var flag = true;
      var newlist=[]
      for(var i= 0;i<tagsList.length; i++){
        if(tagsList[i].title!== '新添加会员'){
          newlist.push(tagsList[i])
        }
        if (tagsList[i].title === "会员列表"){
          flag = false;
        }
      }
      if(flag){
        var a = {
          name:"form",
          path:"/form",
          title:"会员列表"
        }
        newlist.push(a);
      }
      store.tagsList=newlist
      this.$router.push('/form?timestamp='+new Date().getTime());
      },
      cancel(){
      var tagsList=store.tagsList 
      var flag = true;
      var newlist=[]
      for(var i= 0;i<tagsList.length; i++){
        if(tagsList[i].title!== '新添加会员'){
          newlist.push(tagsList[i])
        }
        if (tagsList[i].title === "查看会员"){
          flag = false;
        }
      }
      if(flag){
        var b = {
          name:"check-form",
          path:"/check-form",
          title:"查看会员"
        }
        newlist.push(b)
      }
      store.tagsList=newlist
      },
      provincesChange(value) {
        console.log(value)
        for(var i = 0; i < this.provincesArray.length; i++) {
          let item = this.provincesArray[i]
          if(item.provincesName === value) {
            //          this.provincesObj = item
            this.cityArray = item.cityList
            //          this.areaArray = this.cityArray[0].areaList
            this.ruleForm.city = ''
            this.ruleForm.area = ''
          }
        }
        return value
      },
      cityChange(value) {
        console.log(value)
        for(var i = 0; i < this.cityArray.length; i++) {
          let item = this.cityArray[i]
          if(item.cityName === value) {
            //          this.cityObj = item
            this.areaArray = item.areaList
            this.ruleForm.area = ''
          }
        }
        return value
      },
      projectChange(value) {
        //签约项目修改
        console.log(value)
        for(var i = 0; i < this.cities.length; i++) {
          let item = this.cities[i]
          console.log(item)
          console.log(item.project, value)
          if(item.project === value) {
            this.ruleForm.tremName = item.message
          }
        }
        return value
      },
      submitForm(formName) {
        if(this.ruleForm.provinces === '') {
          this.$message('请选择联系地址')
          return false
        }
        if(this.ruleForm.city === '') {
          this.$message('请选择联系地址')
          return false
        }
        if(this.ruleForm.area === '') {
          this.$message('请选择联系地址')
          return false
        }
        if(this.ruleForm.signIntention.length === 0) {
          this.$message('请选择意向签约项目')
          return false
        }
        if(this.ruleForm.contactAddress === '') {
          this.$message('请输入详细地址')
          return false
        }
        
        this.$refs[formName].validate((valid) => {
          if(valid) {
            var name = this.ruleForm.name
            var urgentPhone = this.ruleForm.urgentPhone
            this.$axios({
              method: 'post',
              url: '/userInfo/addUserInfo',
              params: {
                "name": this.ruleForm.name,
                "idCard": this.ruleForm.idCard,
                "Phone": this.ruleForm.mobile,
                "email": this.ruleForm.email,
                "provinces": this.ruleForm.provinces,
                "city": this.ruleForm.city,
                "area": this.ruleForm.area,
                "contactAddress": this.ruleForm.contactAddress,
                "urgentPerson": this.ruleForm.urgentPerson,
                "urgentPhone": this.ruleForm.urgentPhone,
                "serviceIntention": this.ruleForm.serviceIntention,
                "recommender": this.ruleForm.recommenderInfo,
                "guardian": this.ruleForm.guardian,
                "guardianPhone": this.ruleForm.guardianPhone,
                "healthStatus": this.ruleForm.healthStatus,
                "medicalHistory": this.ruleForm.medicalHistory,
                "signIntention": this.ruleForm.signIntention.join(","),
                "projectName": this.ruleForm.projectName,
                "project": this.ruleForm.project,
                "contractCode": this.ruleForm.contractCode,
                "tremName": this.ruleForm.tremName,
                "advisor": this.ruleForm.advisor,
                "billld": this.ruleForm.billld,
                "completeTime": this.ruleForm.completeTime,
                "auditorName": this.ruleForm.auditorName,
                "auditor": this.ruleForm.auditor,
                "checkInfo": this.ruleForm.checkInfo
              }
            }).then((response) => {
              if(response.data.success == false) {
                this.$message(response.data.message)
              }
              if(response.data.success == true) {
                this.goVisible = false
                this.userId = response.data.data.userId
                this.ruleForm = {}
                this.cancel();
                this.$router.push({
                  name: 'check-form',
                  params: {
                    userId: this.userId,
                    templateType: this.orderTemplateType
                  }
                });
              }
              console.log("新增会员信息", response)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      VisibleRow() {
        this.goVisible = true
//      this.$router.push({
//        path: '/check-form',
//        name: 'check-form',
//        params: {
//          userId: this.userId,
//          templateType: this.orderTemplateType
//        }
//      });
      },
      popupClose() {
        this.goVisible = false
//      this.$router.push({
//        path: '/form',
//      });
      }

    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
  }
</script>

<style scoped>
  .name_title_top {
    margin-top: 30px;
    position: relative;
  }
  
  .name_title_form .el-form-item__label {
    width: 110px!important;
    text-align: left!important;
  }
  
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 13px;
    margin-right: 36px;
  }
  
  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    font-size: 16px;
    line-height: 24px;
    word-wrap: break-word;
    color: #4F5051;
    text-align: left!important;
  }
  
  .img_con_info {
    background: url(../assets/images/pic_5.png) no-repeat;
    background-size: 100% 100%;
    width: 28px;
    height: 28px;
    float: left;
    margin-right: 10px;
  }
  
  .img_con_apply {
    background: url(../assets/images/pic_6.png) no-repeat;
    background-size: 100% 100%;
    width: 28px;
    height: 28px;
    float: left;
    margin-right: 10px;
  }
  
  .pic_img_user {
    background: #EDF1F2;
    width: 190px;
    height: 260px;
    position: absolute;
    right: 20px;
    top: 90px;
    display: none;
  }
  
  .el-form {
    width: 100%;
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
    line-height: 70px;
    height: 70px;
  }
  
  .grid-content {
    border-radius: 4px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  
  .color_red {
    color: red;
    font-weight: bold;
    text-align: center;
  }
  
  .color_green {
    color: #00AB34;
    font-weight: bold;
    text-align: center;
  }
  
  .name_color {
    color: #CCCCCC;
    font-weight: bold;
    text-align: center;
  }
  
  .container1 .el-form-item__content {
    width: 200px;
    text-align: left;
  }
  
  .class1 {
    color: red;
    font-weight: bold;
    text-align: center;
  }
  
  .class2 {
    color: #00AB34;
    font-weight: bold;
    text-align: center;
  }
  
  .con_container_edit {
    position: absolute;
    top: 20px;
    right: 10px;
  }
  
  .container1 {
    position: relative;
    height: auto;
  }
  
  .handle-box1 {
    margin: 20px 0px 0 0;
    color: #80848F;
    height: 220px;
    width: 1200px;
  }
  .handle-box4{
    margin: 0 0px 0 0;
    color: #80848F;
    height: 220px;
    width: 1200px;
  }
  
  .handle-box3 {
    margin: 20px 0px 0 0;
    color: #80848F;
    height: 100px;
    width: 1100px;
  }
  
  .handle-box3 em {
    width: 100px!important;
  }
  
  .handle_top em {
    text-align: left;
    width: 79px;
    line-height: 30px;
    float: left;
    font-style: normal;
  }
  
  .name-title-d {
    width: 240px;
    margin-right: 20px;
    float: left;
  }
  
  .handle_top b {
    color: red;
    line-height: 24px;
    top: 4px;
    left: -3px;
    position: relative;
    font-style: normal;
  }
  
  .handle-select1 {
    line-height: 50px;
  }
  
  .de-fff-d {
    width: 1030px;
    float: left;
  }
  
  .el-input__suffix {
    right: 0;
    top: 0;
  }
  
  .name-title-address {
    width: 270px;
  }
  
  .radios_name {
    float: left;
    height: 40px;
    line-height: 40px;
    width: 100%;
  }
  
  .radios_dag {
    line-height: 30px;
    margin: 20px 0;
  }
  
  .radios_name em {
    margin-top: 15px;
    width: 120px;
  }
  
  .el-textarea {
    margin-top: 25px;
    width: 80%;
  }
  
  .el-textarea__inner {
    height: 100px!important;
  }
  
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 18px;
  }
  
  .el-form-item__label {
    padding-right: 0;
    text-align: left!important;
  }
  
  .form-new-name {
    width: 200px;
  }
  
  .handle_form-name .is-required {
    float: left;
  }
  
  .handle_form-name em {
    text-align: left;
    width: 110px;
    line-height: 30px;
    float: left;
    font-style: normal;
    font-size: 14px;
    color: #606266;
  }
  
  .handle_form-name b {
    color: red;
    line-height: 24px;
    top: 4px;
    left: -3px;
    position: relative;
    font-style: normal;
  }
  
  .handle_form-name .el-form-item {
    width: 312px;
    float: left;
  }
  
  .name_title_form .el-form-item__content {
    margin-left: 0!important;
  }
  
  .name_title_form .el-input--small .el-input__inner {
    line-height: 30px!important;
    height: 30px!important;
  }
  
  .del-dialog-cnt {
    text-align: center;
  }
  .name_title_form .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{margin-bottom: 20px!important;}
</style>