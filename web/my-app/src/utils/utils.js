import moment from 'moment';
import momentTimeZone from 'moment-timezone';
import React from 'react';
import nzh from 'nzh/cn';
import XLSX from 'xlsx';
import { parse, stringify } from 'qs';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  return nzh.toMoney(n);
}

function getRelation(str1, str2) {
  // if (str1 === str2) {
  //   console.warn('Two path are equal!'); // eslint-disable-line
  // }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}
export function formatDate (str,status=0) {
  if (str) {
    const date = new Date(str);
    let month = date.getMonth() + 1; // 月
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate(); // 日
    day = day < 10 ? `0${day}` : day;
    let hours = date.getHours(); // 时
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes = date.getMinutes(); // 分
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let seconds = date.getSeconds(); // 秒
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    if(status==1){
      return `${date.getFullYear()}-${month}-${day}`;
    }
    return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return '';
};
export function momentFormat(zeroTimeZoneDate, format = 'DD-MMM-YY HH:mm:ss') {
  return zeroTimeZoneDate ? momentTimeZone(zeroTimeZoneDate).tz('America/Chicago').format(format) : '';
}

export function transferTimeZone(time, range) {
  if (!time || typeof time !== 'string') return '';
  const reg1 = /^\d{4}-\d{2}-\d{2}$/;
  const reg2 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  const getZoneTime = (timeStr) => {
    const americaTime = momentTimeZone.tz(timeStr, 'America/Chicago');
    const result = moment(americaTime).utcOffset(0).format();
    return `${result.replace('Z', '.000Z')}`;
  };
  let timeStr = time.trim();
  if (reg1.test(timeStr)) {
    if (range === 'start' || range === 'from') {
      timeStr = `${timeStr} 00:00:00`;
    }
    if (range === 'end' || range === 'to') {
      timeStr = `${timeStr} 23:59:59`;
    }
    return getZoneTime(timeStr);
  }
  if (reg2.test(timeStr)) {
    return getZoneTime(timeStr);
  }
  return '';
}

// 导出表格数据 xlsx文件
export function exportExcel(headers, data, fileName = 'Sheet.xlsx') {
  const headersCopy = headers
    .map((item, i) => Object.assign({}, {
      key: item.key,
      title: item.title,
      position: String.fromCharCode(65 + i) + 1,
    }))
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }), {});

  const dataCopy = data
    .map((item, i) => headers.map((key, j) => Object.assign({}, {
      content: item[key.key],
      position: String.fromCharCode(65 + j) + (i + 2),
    })))
    // 对刚才的结果进行降维处理（二维数组变成一维数组）
    .reduce((prev, next) => prev.concat(next))
    // 转换成 worksheet 需要的结构
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});

  // 合并 headers 和 data
  const output = Object.assign({}, headersCopy, dataCopy);
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围 ,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

  // 构建 workbook 对象
  const wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      mySheet: Object.assign(
        {},
        output,
        {
          '!ref': ref,
          '!cols': [{ wpx: 45 }, { wpx: 100 }, { wpx: 200 }, { wpx: 80 }, { wpx: 150 }, { wpx: 100 }, { wpx: 300 }, { wpx: 300 }],
        },
      ),
    },
  };

  // 导出 Excel
  XLSX.writeFile(wb, fileName);
}

export function getRandomCode(length) {
  if (length > 0) {
    let len = length;
    const data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let nums = "";
    while (len >0 ){
      const r = parseInt(Math.random() * 61,0);
      nums += data[r];
      len -= 1;
    }
    return nums;
  }
  return false;
}

export function upFirstLetter(letter) {
  return letter.toLowerCase().replace(/\b\w+\b/g, (word) => (
    `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`
  ));
}

// 下划线转驼峰
export function toHump(str) {
  return str.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());
}

// 接口响应报文通用管道
export function commonPayload(payload) {
  return {
    type: 'global/parseRes',
    payload,
  }
}

export function clearTimer (timer) {
  if(window[timer]){
    window.clearInterval(window[timer]);
    window[timer] = null;
  }
};

// 比较函数 arr.sort(compare(prop))
export function compare(prop) {
  return function(obj1, obj2) {
    const val1 = obj1[prop];
    const val2 = obj2[prop];
    if (val1 < val2) {
      return -1;
    }
    if (val1 > val2) {
      return 1;
    }
    return 0;
  };
}

export const webStorage = {
  setSessionStorage(key, value) {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    sessionStorage.setItem(key, val);
  },
  getSessionStorage(key) {
    return sessionStorage.getItem(key);
  },
  removeSessionStorage(key) {
    sessionStorage.removeItem(key);
  },
  clearSessionStorage() {
    sessionStorage.clear();
  },
  getLocalStorage(key) {
    return localStorage.getItem(key);
  },
  setLocalStorage(key, value) {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, val);
  },
};
