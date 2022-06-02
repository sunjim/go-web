import { stringify } from 'qs';
import request from '../../utils/request';
import {
  apiProductList,
} from '../../common/api';
//获取产品列表
export async function queryRepairOrdersReportFilters() {
  return request(`${apiProductList}`);
}

export async function queryRepairOrdersReport(params) {
  return request(`${apiRepairOrderReport}?${stringify(params)}`);
}
