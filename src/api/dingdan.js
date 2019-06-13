import { get, put, deleted } from '../utils/request';
// 获取订单详情路由
export function getProducts(params) {
  return get('/api/v1/admin/orders', params);
}

export function gteroducts(id) {
  return get(`/api/v1/admin/orders/${id}`)
}
// 修改订单路由
export function putroducts(id, params) {
  return put(`/api/v1/admin/orders/${id}`, params)
}
// 删除订单路由
export function delroducts(id) {
  return deleted(`/api/v1/admin/orders/${id}`)
}
// 查看订单详情路由
export function getroducts(id) {
  return get(`/api/v1/admin/orders/${id}`)
}
