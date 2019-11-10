const host = process.env.REACT_APP_HOST;
const key = process.env.REACT_APP_API_KEY;
const authorization = `Bearer ${key}`;


export default {
  listUrl: () => ({
    baseURL: host,
    method: 'get',
    url: 'list',
    headers: {
      authorization,
    },
  }),
  ratesUrl: (params) => ({
    baseURL: host,
    method: 'get',
    url: 'rates',
    headers: {
      authorization,
    },
    params,
  }),
  convertUrl: (from, to, amount = 1) => ({
    baseURL: host,
    method: 'get',
    url: ['convert', amount, from, to].join('/'),
    headers: {
      authorization,
    },
  }),
};
