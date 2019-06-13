import { get, deleted, post, put } from '../utils/request';

export function getProducts(params) {
  return get('/api/v1/admin/products', {
    params: {
      page: params
    }
  });
}

export function searchProducts(params) {
  return get('/api/v1/admin/products', {
    params: {
      name: params
    }
  });
}

export function delProduct(id) {
  return deleted(`/api/v1/admin/products/${id}`);
}

export function addProduct(params) {
  return post('/api/v1/admin/products', params);
}

export function getOneProduct(id) {
  return get(`/api/v1/admin/products/${id}`);
}

export function editorProduct(id, params) {
  return put(`/api/v1/admin/products/${id}`, params);
}
