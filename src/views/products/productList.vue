<template>
  <div class="app-container">
    <div style="margin-bottom: 15px; overflow:hidden">
      <el-input placeholder="请根据商品名字搜索" class="search" v-model="search">
        <el-button slot="append" icon="el-icon-search" @click="searchPro"></el-button>
      </el-input>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" align="center" label="序号" width="95"></el-table-column>
      <el-table-column label="名字" prop="name" align="center"></el-table-column>
      <el-table-column label="图片" width="110" align="center">
        <template slot-scope="scope">
          <img
            style="width:50px;height:50px;"
            :src="'https://api.cat-shop.penkuoer.com'+scope.row.coverImg"
            :alt="scope.row.name"
          >
        </template>
      </el-table-column>
      <el-table-column label="描述" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.descriptions }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="价格" width="110" align="center">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="库存">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"/> -->
          <span>{{ scope.row.quantity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editorClick(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delHandle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" width="200">
        <template slot-scope="scope" slot="header">
          <el-input size="mini" placeholder="输入关键字搜索" v-model="search"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="editorClick(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delHandle(scope.row)">删除</el-button>
        </template>
      </el-table-column>-->
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
import { getProducts, delProduct, searchProducts } from '@/api/products';

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
      dialogVisible: false,
      search: ''
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    searchPro() {
      console.log(this.search);
      searchProducts(this.search).then(res => {
        this.list = res.products;
      });
    },
    fetchData(page = 1) {
      // console.log(page + '我是页码');
      this.listLoading = true;
      getProducts(page).then(response => {
        this.list = response.products;
        console.log(this.list);
        this.totalCount = response.totalCount;
        this.listLoading = false;
      });
    },
    editorClick(row) {
      console.log(row);
      this.$router.push({
        path: '/products/editorProduct',
        query: {
          id: row._id
        }
      });
    },
    // delHandle(row) {
    //   //发起请求，删除接口
    //   console.log(row._id);
    // delProduct(row._id).then(res => {
    //   console.log(res);
    //   this.fetchData();
    // });
    // },
    delHandle(row) {
      console.log(row);
      this.$confirm('是否删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          const res = await delProduct(row._id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetchData();
        })
        // .then(() => {
        //   delProduct(row._id);
        //   this.fetchData();
        // })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
  // computed: {
  //   searchPro() {
  //     if (this.search) {
  //       return this.list.filter(r => {
  //         return r.name.indexOf(this.search) > -1;
  //       });
  //     } else {
  //       return this.list;
  //     }
  //   }
  // }
};
</script>
<style scoped>
.search {
  width: 400px;
  float: right;
}
</style>
