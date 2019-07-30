import * as Axios from 'axios';
import config from '@/config';
import router from '@/router';
import {
    removeInfo
} from '@/utils';
window.axiosCancel = [] // 全局定义一个存放取消请求的标识
const baseURL = config.url.basicUrl;
const axios = Axios.default.create({
    baseURL, // api请求的baseURL
    timeout: 0,
    // withCredentials: true, // 允许跨域 cookie
    // headers: { 'X-Requested-With': 'XMLHttpRequest' },
    maxContentLength: 2000,
    transformResponse: [
        data => {
            try {
                data = JSON.parse(data);
            } catch (e) {
                data = {};
            }
            if (data.status === 403) {
                removeInfo();
                router.push('/user');
            }
            return data;
        },
    ],
});
//请求前拦截
axios.interceptors.request.use(
    config => {
        config.cancelToken = new Axios.CancelToken((cancel) => {
            window.axiosCancel.push({
                cancel
            })
        })
        return config
    },
    error => {
        return Promise.reject(error)
    })

//http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)
// get
export const _get = (req) => {
    return axios.get(req.url, {
        params: req.data
    });
};

// post
export const _post = (req) => {
    return axios({
        method: 'post',
        url: `/${req.url}`,
        data: req.data
    });
};

// patch
export const _put = (req) => {
    return axios({
        method: 'put',
        url: `/${req.url}`,
        data: req.data
    });
};

// delete
export const _delete = (req) => {
    return axios({
        method: 'delete',
        url: `/${req.url}`,
        data: req.data
    });
};