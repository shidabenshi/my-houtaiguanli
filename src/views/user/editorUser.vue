<template>
  <div class="editer">
    <div style="margin: 20px;"></div>
    <el-form label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="formLabelAlign.userName"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formLabelAlign.nickName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input  v-model="formLabelAlign.passWord"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="http://api.cat-shop.penkuoer.com/api/v1/common/file_upload
"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formLabelAlign.imgUrl" :src="formLabelAlign.imgUrl | img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formLabelAlign')">保存</el-button>
        <el-button @click="resetForm('formLabelAlign')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addUser,getOneUser,editorUser,editorPassWord} from '@/api/allUser';

export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        userName: '',
        nickName: '',
        passWord: '',
        imgUrl: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.formLabelAlign.imgUrl = res.info;
      console.log(this.formLabelAlign.imgUrl);
      // console.log(res);
    },

    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {

          // console.log(addUser);
          if (!this.id) {
            //如果不等于id就是添加，id相等就是修改
            addUser({
              "userName": this.formLabelAlign.userName,
              "password": this.formLabelAlign.passWord,
              "nickName": this.formLabelAlign.nickName,
              "avatar": this.formLabelAlign.imgUrl
            }).then(res => {
              // console.log(res);
              //添加成功后跳转到信息展示页
              that.$router.push({ path: '/user/userinfo' });
            });
            alert('添加成功');
          } else {
            editorUser(this.id,{
               "userName": this.formLabelAlign.userName,
              "password": this.formLabelAlign.passWord,
              "nickName": this.formLabelAlign.nickName,
              "avatar": this.formLabelAlign.imgUrl

            }).then(res=>{
               that.$router.push({ path: '/user/userinfo' })
            })
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //重置
     resetForm(formName) {
      this.$refs[formName].resetFields();
     this.formLabelAlign.imgUrl= ''
      this.formLabelAlign.nickName= ''

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
    async created(){
      // console.log(this.$route.query)
      this.id = this.$route.query.id
       if(this.id){
          const result = await getOneUser(this.id)
          console.log(result.userName)
          this.formLabelAlign.userName=result.userName
          this.formLabelAlign.password=result.password
          this.formLabelAlign.nickName=result.nickName
          this.formLabelAlign.imgUrl=result.avatar
        }
    },
  filters: {
    img(val) {
      return 'http://api.cat-shop.penkuoer.com' + val;
    }
  }
};
</script>
<style>
.editer {
  padding-right: 30px;
}
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

