import { get, deleted, post, put } from '../utils/request';

//新增商品信息
export function comListPost(params) {
  return post('/api/v1/admin/product_categories', params);
}

//获取商品分类列表
export function comListGetAll(params) {
  return get('/api/v1/admin/product_categories', {
    params: {
      page: params
    }
  });
}

//获取商品分类列表
export function searchListGetAll(params) {
  return get('/api/v1/admin/product_categories', {
    params: {
      name: params
    }
  });
}

//根据ID获取商品分类信息
export function comListGetOne(id) {
  return get('/api/v1/admin/product_categories/' + id);
}

//删除商品分类信息
export function comListDel(id) {
  return deleted('/api/v1/admin/product_categories/' + id);
}

//修改商品信息
export function comListPut(id, params) {
  return put('/api/v1/admin/product_categories/' + id, params);
}
