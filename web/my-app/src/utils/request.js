import React from 'react';
import fetch from 'dva/fetch';
import { stringify } from 'qs';
import { notification } from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';
import { getAccessToken } from './authority';
import {
  apiForgotPassword,
  apiGetMaintenanceByDate,
  apiLogin,
  apiResetPasswordNew,
  apiGetImageCode,
  apiItcodeloginUrl
} from '../common/api';

const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'Create or modify data successfully.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'Delete data successfully.',
  400: 'The request was made with an error, and the server did not perform operations to create or modify data.',
  401: 'User does not have permission (token, username, password is incorrect).',
  403: 'User is authorized, but access is forbidden.',
  404: 'The request is made for a record that does not exist, and the server does not operate.',
  406: 'The format of the request is not available.',
  410: 'The requested resource is permanently deleted and will not be obtained again.',
  422: 'A validation error occurred when creating an object',
  500: 'Server error, please check the server',
  502: 'Gateway error',
  503: 'Service is unavailable, server is temporarily overloaded or maintained.',
  504: 'Timeout.',
};

const checkStatus = response => {
  const urlArray = response.url.split('/');
  if (
    (response.status >= 200 && response.status < 300) ||
    (response.status === 401 && urlArray[urlArray.length - 1] === 'token')
  ) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  if (response.status !== 401) {
    notification.error({
      description: errortext,
      message: <div>Request Error {response.status}: <br />{response.url}</div>,
      style: {
        wordBreak: 'break-all',
      }
    });
  }

  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
  const options = {
    expirys: isAntdPro(),
    ...option,
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  // Do not need Authorization
  const notNeedAuthApiArray = [apiForgotPassword, apiResetPasswordNew, apiGetMaintenanceByDate, apiGetImageCode, apiItcodeloginUrl];
  const notNeedApiNum = notNeedAuthApiArray.filter(item => url.indexOf(item) > -1);
  if (notNeedApiNum.length > 0) {
    delete defaultOptions.headers;
  }
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body =
        url === apiLogin ? stringify(newOptions.body) : JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      if (response?.url.indexOf('order/order/getRepairReportUrl') !== -1) {
        return response.text()
      } else {
        return response.json()
      }
    })
    .then((res) => {
      const { success } = res;
      let resPackage = res;
      if (success === true) {
        resPackage = {
          ...resPackage,
          status: 0,
          message: 'success',
        };
      }
      if (success === false) {
        const { error } = res;
        let status;
        let message;
        if (error !== undefined) {
          const { code, message: msg } = error;
          status = code;
          message = !msg ? 'Request error, but no error message' : msg;
        } else {
          status = 'No error object';
          message = 'No error object';
        }
        resPackage = {
          ...resPackage,
          status,
          message,
        };
      }
      return resPackage;
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      // environment should not be used
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/exception/404');
      }
    });
}
