<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" align="center" label="序号" width="95"></el-table-column>
      <el-table-column label="用户名字" prop="receiver" width="300"></el-table-column>
      <el-table-column label="订单号" prop="no" width="400"></el-table-column>
      <el-table-column label="操作" width="500">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handlepart(scope.row)">查看详情</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
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
import { getProducts,delroducts } from '@/api/dingdan';


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
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(page = 1) {
      //console.log(page);
      this.listLoading = true;
      getProducts({page}).then(response => {
        console.log(response)
        this.list = response.orders;
        this.totalCount = response.totalCount;
        this.listLoading = false;
      });
    },
    //查看订单是否支付
    handleEdit(row){
      // console.log(row._id)
      this.$router.push({
        name:'Menu1-2',
        query:{
          id:row._id,
        }
      })
  },
  //删除订单
  handleDelete(row){
    this.$confirm('是否删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
          const res = await delroducts(row._id);
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


  },
  handlepart(row){
    // 查看订单详情
    this.$router.push({
        name:'Menu1-2-xiangqin',
        query:{
          id:row._id,
        }
      })
  }
  }
};
</script>
<style>
.cc{width: 300px;margin-left: 30%;margin-top: -50%;margin-bottom: 2%}
</style>
