<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.descriptions" type="textarea"/>
      </el-form-item>
      <el-form-item label="商品图片" prop="price">
        <!-- <el-input type="file" style="width:100px;" value="上传图片"></el-input> -->
        <el-upload
          class="avatar-uploader"
          action="http://api.cat-shop.penkuoer.com/api/v1/common/file_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.coverImg " :src="form.coverImg | resetImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { comListPost, comListGetOne, comListPut } from '../../api/comlist';

export default {
  data() {
    return {
      form: {
        name: '',
        descriptions: '',
        coverImg: '',
        delivery: false,
        type: [],
        resource: ''
      }
    };
  },
  created() {
    console.log(this.$route.query.id);
    if (this.$route.query.id) {
      comListGetOne(this.$route.query.id).then(res => {
        console.log(res.coverImg);
        this.form.name = res.name;
        this.form.descriptions = res.descriptions;
        this.form.coverImg = res.coverImg;
      });
    }
  },
  filters: {
    resetImg(val) {
      return 'http://api.cat-shop.penkuoer.com' + val;
    }
  },
  methods: {
    onSubmit() {
      if (this.$route.query.id) {
        comListPut(this.$route.query.id, {
          name: this.form.name,
          descriptions: this.form.descriptions,
          coverImg: this.form.coverImg
        }).then(res => {
          console.log(res);
          this.$router.push({
            path: '/commodities/comlist'
          });
        });
      } else {
        comListPost({
          name: this.form.name,
          descriptions: this.form.descriptions,
          coverImg: this.form.coverImg
        }).then(res => {
          console.log(res);
          this.$router.push({
            path: '/commodities/comlist'
          });
        });
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.coverImg = URL.createObjectURL(file.raw);
      this.form.coverImg = res.info;
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
  }
};
</script>

<style scoped>
.line {
  text-align: center;
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

