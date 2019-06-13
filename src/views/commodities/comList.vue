<template>
  <div class="comList">
    <div style="margin-bottom: 15px; overflow:hidden">
      <el-input placeholder="请根据商品名字搜索" class="search" v-model="search">
        <el-button slot="append" icon="el-icon-search" @click="searchPro"></el-button>
      </el-input>
    </div>
    <el-table
      v-loading="listLoading"
      :data="lists"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" align="center" label="序号" width="95"></el-table-column>
      <el-table-column label="名字" prop="name" align="center"></el-table-column>
      <el-table-column label="图片" width="150" align="center">
        <template slot-scope="scope">
          <img
            style="width:50px;height:50px;"
            :src="'https://api.cat-shop.penkuoer.com'+scope.row.coverImg"
            :alt="scope.row.name"
          >
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="descriptions" width="220" align="center"></el-table-column>
      <!-- <el-table-column align="center" width="200" fixed="right">

        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>-->

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-row type="flex" justify="center">
        <el-pagination @current-change="fetchData" layout="prev, pager, next" :total="totalCount"></el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  comListGetAll,
  comListDel,
  comListPut,
  searchListGetAll
} from '@/api/comlist';
export default {
  name: 'comList',
  data() {
    return {
      lists: null,
      listLoading: true,
      totalCount: 0,
      search: ''
    };
  },
  created() {
    this.fetchData();
  },
  // computed: {
  //   filterNum: function() {
  //     if (this.search) {
  //       return this.lists.filter(list => {
  //         return (
  //           list.descriptions.indexOf(this.search) > -1 ||
  //           list.name.indexOf(this.search) > -1
  //         );
  //       });
  //     } else {
  //       return this.lists;
  //     }
  //   }
  // },
  methods: {
    searchPro() {
      if (this.search) {
        searchListGetAll(this.search).then(res => {
          console.log(res.categories);
          this.lists = res.categories;
        });
      } else {
        this.fetchData((page = 1));
      }
    },
    fetchData(page = 1) {
      console.log(page);
      this.listLoading = true;
      comListGetAll(page).then(res => {
        console.log(res);
        this.lists = res.categories;
        this.listLoading = false;
        this.totalCount = res.totalCount;
      });
    },

    //修改
    handleEdit(row) {
      console.log(row._id);
      // comListPut(row._id).then(res =>{
      //   console.log(res)
      // })
      this.$router.push({
        path: '/commodities/index',
        query: {
          id: row._id
        }
      });
    },
    //删除
    handleDelete(row) {
      // console.log(row);
      // comListDel(row._id).then(res =>{
      //   console.log(res)
      // })
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const result = await comListDel(row._id);
          //result.then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetchData();
          // });
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

<style>
.search {
  width: 400px;
  float: right;
}
</style>


