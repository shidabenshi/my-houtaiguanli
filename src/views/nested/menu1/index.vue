<template>
  <div style="padding:30px;">
    <h4>订单详情</h4>
    <el-alert :closable="false" title="订单详情" type="success">
      <router-view />
    </el-alert>
  </div>
</template>
