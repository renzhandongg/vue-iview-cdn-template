import {
    _get
} from './index';

// 登录
export const findPageUser = (data) => {
    const req = {
        data,
        url: 'user/findPageUser',
    };
    return _get(req);
};

// 用户详情
export const findOneUser = (data) => {
    const req = {
        data,
        url: 'user/findOneUser',
    };
    return _get(req);
};

// 商品详情
export const findUserOrderPredict = (data) => {
    const req = {
        data,
        url: 'user/findUserOrderPredict',
    };
    return _get(req);
};

//商品
export const findPageItem = (data) => {
    const req = {
        data,
        url: 'item/findPageItem',
    };
    return _get(req);
};

//AI理财接口
export const findPageHotItem = (data) => {
    const req = {
        data,
        url: 'item/findPageHotItem',
    };
    return _get(req);
};

export const findPageHotItemDetail = (data) => {
    const req = {
        data,
        url: 'item/findPageHotItemDetail',
    };
    return _get(req);
};


//AI理财用户展示接口
export const findItemUserDetail = (data) => {
    const req = {
        data,
        url: 'item/findItemUserDetail',
    };
    return _get(req);
};