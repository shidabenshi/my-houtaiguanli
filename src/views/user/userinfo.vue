<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="good"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" align="center" label="序号" width="100"></el-table-column>
      <el-table-column label="名字" prop="userName" align="center"></el-table-column>
      <el-table-column label="昵称" prop="nickName"  align="center"></el-table-column>
      <el-table-column label="图片" width="320" align="center">
        <template slot-scope="scope">
          <img
            style="width:50px;height:50px;"
            :src="'https://api.cat-shop.penkuoer.com'+scope.row.avatar"
            :alt="scope.row.name"
          >
        </template>
      </el-table-column>
      <!-- 按钮修改前的 -->
      <!-- <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="delHandle(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
      <el-table-column  align="center" width="200">
      <template slot-scope="scope" slot="header">
        <el-input
          size="mini"
          placeholder="输入关键字搜索"
          v-model="search"
          />
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="editorClick(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="delHandle(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-row type="flex" justify="center">
        <el-pagination
        @current-change="fetchData"
        layout="prev, pager, next"
        :total="totalCount">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getAllUser,delUser } from '@/api/allUser';

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      totalCount: 0,
      search:''
    };
  },

  computed:{
    good:function(){
      if(this.search){
        return this.list.filter(res =>{
        return res.userName.indexOf(this.search)>-1 ||
         res.nickName.indexOf(this.search)>-1
      })
      }else{
        return this.list
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(page = 1) {
      // console.log(page);
      this.listLoading = true;
      getAllUser( page ).then(response => {
        this.list = response.users;
        this.totalCount = response.totalCount;
        this.listLoading = false;
      });
    },
    editorClick(row){
      console.log(row)
      this.$router.push({
        path:'/user/editorUser',
        query:{
          "id":row._id,
        }
      })
    },
    delHandle(row) {
      console.log(row);
      this.$confirm('是否删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          const res = await delUser(row._id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetchData();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
</script>

