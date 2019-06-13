import {
  get,
  deleted,
  post,
  put
} from "../utils/request";
// 获取全部
export function getAllUser(params) {
  return get("/api/v1/admin/users", {
    params: {
      page: params
    }
  })
}
// 删除
export function delUser(id) {
  return deleted(`/api/v1/admin/users/${id}`)
}
// 添加
export function addUser(params) {
  console.log(params)
  return post(`/api/v1/admin/users/${params}`)
}
// 获取指定用户的信息
export function getOneUser(id) {
  return get(`/api/v1/admin/users/${id}`)
}
// 修改用户
export function editorUser(id, params) {
  return put(`/api/v1/admin/users/${id}`, params)
}
// 修改用户密码
export function editorPassWord(id, params) {
  return put("/api/v1/admin/users/reset_pwd/" + id, params)
}
