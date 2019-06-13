<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="receiver"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="no"
        label="订单号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="user"
        label="用户信息" width="300">
      </el-table-column>
    </el-table>
  </template>


<script>
    import { getroducts } from '@/api/dingdan';
    export default {
      data() {
        return {
          tableData:[]


        }
      },
      created(){
        console.log(this.$route.query.id);
        if(this.$route.query.id){
        getroducts(this.$route.query.id).then(res =>{
          console.log(res)
          this.tableData.push({
            receiver:res.receiver,
            no:res.no,
            user:res.user
          })
            console.log(this.tableData)
        })
      }else{
        getroducts('5cfe6c3cb91b9569e466d5b0').then(res =>{
          console.log(res)
          this.tableData.push({
            receiver:res.receiver,
            no:res.no,
            user:res.user
          })
            console.log(this.tableData)
        })
      }
      }
    }
  </script>
