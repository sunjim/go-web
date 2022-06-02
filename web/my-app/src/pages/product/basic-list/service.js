import { request } from 'umi';
export async function fakeSubmitForm(params) {
  return request('http://127.0.0.1/api/products', {
    method: 'POST',
    data: params,
  });
}
