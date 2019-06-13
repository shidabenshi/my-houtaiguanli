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
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名字" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price" style="width:100px;"></el-input>
        <!-- <el-button>元</el-button> -->
      </el-form-item>
      <el-form-item label="库存" prop="count">
        <el-input v-model.number="ruleForm.count" style="width:100px;"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="price">
        <!-- <el-input type="file" style="width:100px;" value="上传图片"></el-input> -->
        <el-upload
          class="avatar-uploader"
          action="http://api.cat-shop.penkuoer.com/api/v1/common/file_upload
"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl | resetCoverImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addProduct, getOneProduct, editorProduct } from '@/api/products';
import qs from 'qs';
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        desc: '',
        price: '0',
        count: '0',
        imageUrl: ''
      },
      id: '',
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        count: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ],
        desc: [{ required: false, message: '请填写活动形式', trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(addProduct);
          // console.log(getProducts)
          //接口一直报500的错误
          if (!this.id) {
            addProduct({
              name: this.ruleForm.name,
              descriptions: this.ruleForm.desc,
              quantity: this.ruleForm.count,
              price: this.ruleForm.price,
              coverImg: this.ruleForm.imageUrl
              //不编辑商品列表所属不报错
              // "productCategory": '5c9ef3059c9ebd0561cc4c22'
            }).then(res => {
              console.log(res);
              that.$router.push({ path: '/products/table' });
            });
            alert('submit!');
          } else {
            editorProduct(this.id, {
              name: this.ruleForm.name,
              descriptions: this.ruleForm.desc,
              quantity: this.ruleForm.count,
              price: this.ruleForm.price,
              coverImg: this.ruleForm.imageUrl
            }).then(res => {
              that.$router.push({ path: '/products/table' });
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.imageUrl = '';
    },
    handleAvatarSuccess(res, file) {
      console.log(res.info);
      console.log(file);
      // this.imgUrl=res.info
      this.ruleForm.imageUrl = res.info;
      console.log(this.ruleForm.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  async created() {
    console.log(this.$route.query);
    this.id = this.$route.query.id;
    if (this.id) {
      const result = await getOneProduct(this.id);
      console.log(result);
      this.ruleForm.name = result.name;
      this.ruleForm.desc = result.descriptions;
      this.ruleForm.count = result.quantity;
      this.ruleForm.price = result.price;
      this.ruleForm.imageUrl = result.coverImg;
    }
    // const result = await getDetail(this.$route.query.id)
    // console.log(result)
    // this.movie=result.data.data.basic
  },
  filters: {
    resetCoverImg(imgurl) {
      return 'http://api.cat-shop.penkuoer.com' + imgurl;
    }
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
