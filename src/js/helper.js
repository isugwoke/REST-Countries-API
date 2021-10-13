import { API_URL, TIMEOUT_SEC } from './config';

import { async } from 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second(s)`));
    }, s * 1000);
  });
};

export const AJAX = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`Problem getting country:  ${res.message}`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const formatNumber = function (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
