import { stringify } from 'qs';
import request from '../../utils/request';
import {
  apiChangeCreditCardStatus,
  apiChangeUpgradeModel,
  apiEspRepairOrderReport,
  apiGetUpgradeOptionsForOrder,
  apiRepairOrderBasic,
  apiRepairOrderCancel,
  apiRepairOrderChangeLog,
  apiRepairOrderHistory,
  apiRepairOrderInfo,
  apiRepairOrderList,
  apiRepairOrderLogistics,
  apiRepairOrderProduct,
  apiRepairOrderRepair,
  apiRepairOrderReport,
  apiRepairOrderReportExport,
  apiRepairOrderReportFilters,
  apiLmstInfo,
  apiLmstUpdate,
  apiDownloadEspRepairOrder,
  apiPaymentInfo,
  // apiExternalSystemStatusPage,
  apiRetryCallIBaseRealTimeSwap,
  apiRetryCloseOrderSendEcc,
  apiRetrySaveEspRepairOrder,
  apiRetrySaveRepairBqReport,
  apiRepairOrderListDownload,
  apiSearchBillOnlyOrder,
  apiBillOnlyOrderDetail,
  apiBillOnlyOrderStatusLog,
  apiSystemCoderConfigPage,
  apiEditBillOnlyOrder,
  apiRetryBillOnlyOrderSendEcc,
  apiRetrySaveBillOnlyOrderBqReport,
  apiCloseAbnormalOrder,
  apiM2mBatchCancel,
  apiRepairOrderReportExportStatus,
  apiRetrySendASNData,
  apiCreateBillOnlyOrder,
  apiGetPayment,
  apiRepairErrorHandler,
  apiManualClose,
  apiManualReceive,
  apiManualCloseReason,
  apiUpdateDay,
  apiKitNameList,
  apiAddOderPartKit,
  apiSelectPauseLogs,
  apiUpdateTrackingNumber,
  apiGetRepairReportUrl
} from '../common/api';

export async function queryRepairOrdersReportFilters() {
  return request(`${apiRepairOrderReportFilters}`);
}

export async function queryRepairOrdersReport(params) {
  return request(`${apiRepairOrderReport}?${stringify(params)}`);
}

export async function queryGetRepairReportUrl(params) {
  return request(`${apiGetRepairReportUrl}?${stringify(params)}`);
}

export async function queryRepairOrdersReportExport(params) {
  return request(`${apiRepairOrderReportExport}?${stringify(params)}`);
}

export async function exportRecordPage(params) {
  return request(`${apiRepairOrderReportExportStatus}?${stringify(params)}`);
}

export async function queryEspRepairOrderExport(params) {
  return request(`${apiDownloadEspRepairOrder}?${stringify(params)}`);
}

export async function queryEspRepairReport(params) {
  return request(`${apiEspRepairOrderReport}?${stringify(params)}`);
}

export async function queryRepairOrders(params) {
  return request(`${apiRepairOrderList}?${stringify(params)}`);
}

export async function repairOrderListDownloadService(params) {
  return request(`${apiRepairOrderListDownload}?${stringify(params)}`);
}

export async function queryRepairOrderProduct(id) {
  return request(`${apiRepairOrderProduct}/${id}`);
}

export async function queryRepairOrderHistory(imei) {
  return request(`${apiRepairOrderHistory}/${imei}`);
}

export async function queryRepairOrderBasic(id) {
  return request(`${apiRepairOrderBasic}/${id}`);
}

export async function queryRepairOrderInfo(id) {
  return request(`${apiRepairOrderInfo}/${id}`);
}

export async function queryRepairOrderRepair(id) {
  return request(`${apiRepairOrderRepair}/${id}`);
}

export async function queryKitNameList(id) {
  return request(`${apiKitNameList}/${id}`);
}

export async function editAddOderPartKit(payload) {
  const { id, kitNameList } = payload;
  return request(`${apiAddOderPartKit}/${id}`, {
    method: 'POST',
    body: kitNameList,
  });
}

export async function queryRepairOrderUpgradeModels(params) {
  return request(`${apiGetUpgradeOptionsForOrder}?${stringify(params)}`);
}

export async function editCreditCardStatus(payload) {
  const { id, params } = payload;
  return request(`${apiChangeCreditCardStatus}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function editUpgradeModel(payload) {
  const { id, params } = payload;
  return request(`${apiChangeUpgradeModel}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function cancelRepairOrder(payload) {
  const { id, params } = payload;
  return request(`${apiRepairOrderCancel}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function queryRepairOrderLogistics(payload) {
  return request(`${apiRepairOrderLogistics}/${payload.id}?${stringify(payload.params)}`);
}

export async function queryRepairOrderChangeLog(payload) {
  return request(`${apiRepairOrderChangeLog}/${payload.id}?${stringify(payload.params)}`);
}

export async function queryRepairOrderCancel(id) {
  return request(`${apiRepairOrderCancel}/${id}`);
}

export async function queryRepairOrderLmstInfo(payload) {
  return request(`${apiLmstInfo}?${stringify(payload)}`);
}

export async function queryRepairOrderLmstUpdate(params) {
  return request(`${apiLmstUpdate}`, {
    method: 'POST',
    body: params,
  });
}

export async function queryRepairPaymentInfo(id) {
  return request(`${apiPaymentInfo}/${id}`);
}

export async function toGetPayment(id) {
  return request(`${apiGetPayment}/${id}`);
}

export async function queryCloseAbnormalOrder(payload) {
  return request(`${apiCloseAbnormalOrder}?id=${payload.id}`);
}

export async function queryExternalSystemStatusPage(payload) {
  return request(`${apiRepairErrorHandler}?${stringify(payload)}`);
}

export async function queryRetryCallIBaseRealTimeSwap(payload) {
  return request(`${apiRetryCallIBaseRealTimeSwap}/${payload.id}`, {
    method: 'POST',
  });
}

export async function queryRetryCloseOrderSendEcc(payload) {
  return request(`${apiRetryCloseOrderSendEcc}/${payload.id}`, {
    method: 'POST',
  });
}

export async function queryRetrySaveEspRepairOrder(payload) {
  return request(`${apiRetrySaveEspRepairOrder}/${payload.id}`, {
    method: 'POST',
  });
}

export async function queryRetrySaveRepairBqReport(payload) {
  return request(`${apiRetrySaveRepairBqReport}/${payload.id}`, {
    method: 'POST',
  });
}

export async function sendASN(payload) {
  return request(`${apiRetrySendASNData}/${payload.id}`, {
    method: 'POST',
  });
}

// bill-only order
export async function fetchBillOnlyOrderListService(payload) {
  return request(`${apiSearchBillOnlyOrder}?${stringify(payload)}`);
}

// BillOnlyOrderDetail详情
export async function queryBillOnlyOrderDetail(payload) {
  return request(`${apiBillOnlyOrderDetail}/${payload}`);
}

// BillOnlyOrderDetail详情 order
export async function queryBillOnlyOrderStatusLog(payload) {
  return request(`${apiBillOnlyOrderStatusLog}/${payload}`);
}

// BillOnlyOrderDetail 编辑下拉框
export async function querySystemCoderConfigPage(payload) {
  return request(`${apiSystemCoderConfigPage}?${stringify(payload)}`);
}

// BillOnlyOrderDetail 编辑提交
export async function queryEditBillOnlyOrder(payload) {
  return request(`${apiEditBillOnlyOrder}/${payload.id}`, {
    method: 'PUT',
    body: payload.params,
  });
}

// BillOnlyOrderDetail详情  ECC按钮
export async function queryRetryBillOnlyOrderSendEcc(payload) {
  return request(`${apiRetryBillOnlyOrderSendEcc}/${payload}`, {
    method: 'POST',
  });
}

// BillOnlyOrderDetail详情  Bq按钮
export async function queryRetrySaveBillOnlyOrderBqReport(payload) {
  return request(`${apiRetrySaveBillOnlyOrderBqReport}/${payload}`, {
    method: 'POST',
  });
}

// apiM2mBatchCancel 批量取消M2M订单
export async function m2mBatchCancel(payload) {
  const { params } = payload;
  return request(`${apiM2mBatchCancel}`, {
    method: 'POST',
    body: params,
  });
}

export async function createCreditOrder(params) {
  return request(apiCreateBillOnlyOrder, {
    method: 'POST',
    body: params,
  });
}

export async function toCloseOrder(params) {
  const { id, body } = params;
  return request(`${apiManualClose}/${id}`, { method: 'POST', body });
}

export async function toReceiveOrder(params) {
  return request(`${apiManualReceive}/${params}`);
}

export async function toGetReasonType() {
  return request(apiManualCloseReason)
}

export async function toUpdateDay(params) {
  const { id } = params;
  return request(`${apiUpdateDay}/${id}`,{
    method: 'PUT',
    body: params,
  })
}

export async function toSelectPauseLogs(params) {
  const { id } = params;
  return request(`${apiSelectPauseLogs}/${id}/logs`)
}

export async function toUpdateTrackingNumber(params) {
  return request(`${apiUpdateTrackingNumber}/${params.id}`, {
    method: 'POST',
    body: {logisticsType: params.logisticsType, trackingNumber: params.trackingNumber},
  });
}
