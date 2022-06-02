export const enumDurationPeriod = {
  YEAR: 'Year',
  MONTH: 'Month',
  DAY: 'Day',
  HOUR: 'Hour',
  MINUTE: 'Minute',
  SECOND: 'Second',
  MILLISECOND: 'Millisecond',
};

export const enumCountries = {
  US: 'US',
  CA: 'CA',
  CN: 'CN',
};

export const enumRepairCenterOptions = {
  FTW: 'Foxconn FTW',
  CUU: 'Foxconn CUU',
  ER: 'Electronic Renewal',
};

export const enumCodeRepairCenterOptions = {
  FTW: 'Foxconn FTW',
  CUU: 'Foxconn CUU',
  ER: 'Electronic Renewal',
};

export const enumCodeRepairCenterOptionsMascRouting = {
  '013': 'Foxconn FTW',
  '014': 'Foxconn CUU',
  '015': 'Electronic Renewal',
  '884': 'CPR'
};

export const enumTimeDuration = {
  YEAR: 'Year',
  MONTH: 'Month',
  DAY: 'Day',
  HOUR: 'Hour',
  MINUTE: 'Minute',
  SECOND: 'Second',
  MILLISECOND: 'Millisecond',
};

export const enumWarrantyStatus = {
  OOW: 'Out Of Warranty',
  INW: 'In Warranty',
  None: 'None',
};

export const enumCreditCardValidationStatus = {
  Pending: 'Review',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
};

/*
* 解决BASIC REPORT页面下CC AUTH STATUS搜索条件是空的问题
* 避免其他地方用到enumCreditCardValidationStatus 所以添加enumCreditCardValidationStatusTwo
* */
export const enumCreditCardValidationStatusTwo = {
  REVIEW: 'Review',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
};

/*
* 解决search so详情页面下CC AUTH STATUS显示问题
* 避免其他地方用到enumCreditCardValidationStatus 所以添加enumCreditCardValidationStatusSo
* */
export const enumCreditCardValidationStatusSo = {
  REVIEW: 'Review',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  POPOK: 'Accepted & Interfaced with iBase',
  EMPTY: 'Empty',
};

export const enumRepairOrderStatus = {
  ON_HOLD: 'On Hold',
  SUBMITTED: 'Submitted',
  CANCEL: 'Cancel',
  CLOSED: 'Closed',
  WAITING_FOR_PICK_UP:'Waiting For Pick Up',
  PRE_SUBMITTED:'Pre Submitted',
  REPAIR_IN_PROGRESS:'Repair In Progress',
};

export const enumRepairTypes = {
  AE: 'Advance Exchange',
  RE: 'Return and Exchange',
  LR: 'Liner Replacement',
  SUR: 'Same Unit Repair',
  M2M: 'Repair Only',//'Masc to Masc',
  BAE: 'Bounce AE',
  NPR: 'New Phone Replacement',
  BILLONLY: 'Bill Only Order',
  RT: 'Return and Triage',
  WALKIN: 'Walkin Return and Triage',
  RECEIVEONLY: 'Receive type-Receive Only'
};

export const enumServiceOfferName = {
  '(SVC-SO-00016)': 'Advanced Exchange',
  '(SVC-SO-00021)': 'Repair and Return (Same Unit Repair)',
  '(SVC-SO-00044)': 'Return and Exchange',
  '(SVC-SO-00047)': 'Liner Replacement',
  '(SVC-SO-00052)': 'Bounce AE',
  '(SVC-SO-00053)': 'New Phone Replacement',
};

export const enumRefundOrderStatus = {
  IN_ESCALATION: 'In Escalation',
  SUBMITTED: 'Submitted',
  RECEIVING_IN_PROGRESS: 'Receiving in Progress',
  SECONDARY_RECEIPT_COMPLETE: 'Secondary Receipt Completed',
  CLOSED: 'Closed',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
};

export const enumEscalationStatus = {
  WAIT_APPROVAL: 'Waiting for Approval',
  APPROVE: 'Approved',
  REJECT: 'Reject',
  CANCELED: 'Cancel',
};

export const enumShipReturnStatus = {
  BOOKED: 'Booked',
  SHIPPED: 'Shipped',
  CANCELED: 'Canceled',
};
export const enumReturnStatus = {
  BOOKED: 'Booked',
  RECEIVED: 'Received',
  DEFECTIVE_RECEIVED: 'Defective Received',
  REFURBISHED_RECEIVED: 'Refurbished Received',
  CANCELED: 'Canceled',
};

export const enumEspAdp = {
  ESP: 'ESP',
  ADP: 'ADP',
  PROTECT: 'PROTECT',
};

export const enumFinalDescriptionOptions = {
  ACKNOWLEDGE: 'Acknowledge',
  REPLACE_DEP: 'Replace DEP',
  RUR: 'RUR',
  EXCHANGE: 'Exchange',
  REPAIRED: 'Repaired',
  REPAIRED_BS: 'Repaired（BS）',
  SER_AND_RET: 'Ser And Ret',
  SER_AND_RET_BS: 'Ser And Ret（BS）',
  SCRA: 'Scra',
};

export const enumEspRejectStatus = {
  REJECT: 'Rejected',
  RESEND: 'Resend',
  UNSEND: 'Unsend',
  SEND: 'Send',
  WAITINGRESEND: 'Waiting Resend',
};

export const enumRepairOrderCancelReason = {
  POP_REJECTION: 'POP Rejection',
  CC_AUTH_REJECTION: 'Credit Card Auth Rejection',
  CUSTOMER_REQUESTED: 'Customer Requested',
  OTHER: 'Other',
};

export const enumRefundTypes = {
  RECEIPT_ONLY: 'Receipt Only',
  RECEIPT_CREDIT: 'Receipt Credit',
  CREDIT_ONLY: 'Credit Only',
  REPAIR_CREDIT: 'Repair Credit',
};

export const enumRefundScenario = {
  B2B: 'B2B',
  B2C: 'B2C',
  SMB: 'SMB',
};

export const enumReturnReasons = {
  LOST_IN_TRANSIT: 'Lost In Transit',
  BUYER_REMORSE: 'Buyer Remorse',
  DOA_OOB: 'DOA/OOB',
  PROMOTIONAL_CREDIT: 'Promotional Credit',
  CUSTOMER_SATISFACTION: 'Customer Satisfaction',
  // SHOPPING_COST: 'Shipping Cost',
  CSAT:'CSAT',
  WAIVE_SHIP_NOT_SELECTED:'Waive Ship Not Selected',
};

export const enumSbomStatus = {
  ACTIVE: 'Active',
  OBSOLETE: 'Obsolete',
  END_OF_LIFE: 'End Of Life',
};

export const enumOfferType = {
  REP_TYPE: 'REP_TYPE',
  VAL_SVC: 'VAL_SVC',
  ADD_FEES: 'ADD_FEES',
  ONE_OFF: 'ONE_OFF',
};

export const enumServiceCategory = {
  OOW: 'Out Of Warranty',
  INW: 'In Warranty',
  NA: 'None',
};

export const enumMascRoutingStatus = {
  INACTIVE: 'Inactive',
  ACTIVE: 'Active',
  OBSOLETE: 'Obsolete/EOL',
  MISSING: 'Missing',
};

export const surveyResult = {
  '0':'Satisfied',
  '1':'Unsatisfied'
};

export const emailType = {
  REPAIR_OPEN_REPORT:'Repair Open Report',
  REPAIR_FAILURE_REPORT:'Repair Failure Report',
  SPRINT_QUARANTINE_BUCKET:'Sprint Quarantine Bucket',
  ORDER_CLOSE_COUNT_DAY:'Order Close Count Day',
};

export const requestStatus = {
  'success':'Success',
  'failed':'Failed',
};

export const statusType = {
  'ACTIVE': 'Active',
  'INACTIVE': 'Inactive',
};

export const globalCodeType = {
  categoryComplaintCode: 'CATEGORY_COMPLAINT_CODE',
  subCategoryComplaintCode : 'SUB_CATEGORY_COMPLAINT_CODE',
  detailComplaintCode:'DETAIL_COMPLAINT_CODE',
  globalComplaintCode: 'GLOBAL_COMPLAINT_CODE',
  IMEIStatus:'IMEI_STATUS',
  problemCode: 'PROBLEM_CODE',
  repairCode: 'REPAIR_CODE',
  groupCode: 'GROUP_CODE',
  refDesignator: 'REFERENCE_DESIGNATOR',
  repairReportMessage: 'REPAIR_REPORT_MESSAGE',
};

// 邮件模板维护界面所有下拉选项VALUE ENUM_NAME对照表
export const emailAllEnum = {
  scenario_type: {
    'SHIPPED':0,
    'RECEIVED':1,
    'SHIPPED_DELAY':2,
    'FIRST_REMIND':3,
    'FINAL_REMIND':4,
    'NOTICE_DEPOSIT':5,
    'REPAIR_OPEN_REPORT':6,
    'REPAIR_FAILURE_REPORT':7,
    'ORDER_CLOSE_COUNT_DAY':8,
    'SPRINT_WEEK_SUMMARY':9,
    'SPRINT_M2M_PUSH':10,
    'SPRINT_CUU_SHIP':11,
    'SPRINT_NOTICE_AFTER_CLEANED':12,
  },
  order_type: {
    'AE':0,
    'RE':1,
    'LR':2,
    'SUR':3,
    'M2M':4,
    'BAE':5,
    'NPR':6,
    'BILLONLY':7,
    'RT':8,
    'WALKIN':9,
    'RECEIVEONLY':10
  },
  disposition: {
    'ACKNOWLEDGE':0,
    'REPLACE_DEP':1,
    'RUR':2,
    'EXCHANGE':3,
    'REPAIRED':4,
    'REPAIRED(BS)':5,
    'SER AND RET':6,
    'SER AND RET(BS)':7,
    'SCRAP':8,
    'LATE RECEIVED':9,
    'Software':10,
    'HARDWARE WITHOUT PARTS':11,
    'NTF':12,
    'Accessory':13,
    'HARDWARE_WITH_PARTS(L2)':14,
    'HARDWARE_WITH_PARTS(BSW)':15,
  },
};

export const EnableStatus = {
  ENABLED: 'Enable',
  DISABLED: 'Disable'
};

export const externalSystemType = {
  "sendEcc": 'MDS-ECC',
  "Ibase cancel": 'MDS-iBase',
  "rnt espcancel mail": 'MDS-RNT',
  "Jurisdiction": 'Geolink-jurisdiction code',
  "ESP_UPDATE_CLAIM_STATUS": 'MDS-LUDP',
};
//MDS-17064

export const BoolStatus = {
  N: 'No',
  Y: 'Yes',
};
export const TimeZone = {
  CST: 'CST',
  EST: 'EST',
  MST: 'MST',
  PST: 'PST',
  AST: 'AST',
  NST: 'NST',
  AKST: 'AKST',
  HST: 'HST',
};


