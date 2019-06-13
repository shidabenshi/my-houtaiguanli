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
      <el-table-column label="名字" prop="name"></el-table-column>
      <el-table-column label="图片" width="110" align="center">
        <template slot-scope="scope">
          <img
            style="width:50px;height:50px;"
            :src="'https://api.cat-shop.penkuoer.com'+scope.row.coverImg"
            :alt="scope.row.name"
          >
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
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
import { getProducts } from '@/api/products';

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
      totalCount: 0
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(page = 1) {
      console.log(page);
      this.listLoading = true;
      getProducts({ page }).then(response => {
        this.list = response.products;
        this.totalCount = response.totalCount;
        this.listLoading = false;
      });
    }
  }
};
</script>
