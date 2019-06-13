<template>
  <div class="app-container">
    <!-- <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
    </el-form>-->
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="收获人" prop="name">
        <el-input v-model="ruleForm.name" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="订单号" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price" style="width:100%" disabled="disabled"></el-input>
        <!-- <el-button>元</el-button> -->
      </el-form-item>
      <el-form-item label="用户身份" prop="count">
        <el-input v-model.number="ruleForm.count" style="width:200px;" disabled="disabled"></el-input>
      </el-form-item>
    <el-form-item label="是否支付" prop="count">

    <el-select v-model="value" placeholder="请选择" @change="submitForm">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select>
  </el-form-item>
  </el-form>
  </div>
</template>

<script>
import { gteroducts } from '@/api/dingdan';
import { putroducts } from '@/api/dingdan';

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        desc: '',
        price: '',
        count: '',
      },
      options:[{
        value:'true',
        label:'已支付'
      },
      {
        value:'false',
        label:'未支付'
      }
      ],
      value: ''
    };
  },
  created(){
    if(this.$route.query.id){
    gteroducts(this.$route.query.id).then(res=>{
    //  console.log(res)
      this.ruleForm.name = res.receiver;
      this.ruleForm.desc = res.no;
      this.ruleForm.price = res.price;
      this.ruleForm.count = res.user
      if(res.isPayed==true){
        this.value="已支付"
      }else{this.value='未支付'}
    })
  }else{
    gteroducts('5cfe6c3cb91b9569e466d5b0').then(res=>{
    //  console.log(res)
      this.ruleForm.name = res.receiver;
      this.ruleForm.desc = res.no;
      this.ruleForm.price = res.price;
      this.ruleForm.count = res.user
      if(res.isPayed==true){
        this.value="已支付"
      }else{this.value='未支付'}
    })
  }
  },
  methods: {
    submitForm() {
        console.log(this.value)
      putroducts(this.$route.query.id,{isPayed:this.value}).then(res=>{
        console.log(res)
        location.reload()
      })

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      console.log(res.info)
      this.imgUrl=res.info
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
    },
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 178px;
  display: block;
}
</style>

