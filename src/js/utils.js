/**
 * @description布尔全等判断
 * @param {Array} 数组内容
 * @return {Boolean} 
 */
const all = (arr,fn = Boolean) => arr.every(fn);
all([2,3,4],x => x >1 )// true
all([2,3,4]); // true

/**
 * @description检查数组各项相等
 * @param {Array}
 * @return {boolean}
 * */

const allEaual = (arr) => arr.every(it => it===arr[0]);
allEaual(([1,2,3,4]));//false
allEaual([2,2,2]);//true

/**
 * @description 约等于
 * @param {Number}
 * @param {Number}
 * @return {Boolean}
 * */

//Math.abs()返回绝对值
//Math.abs(1-2) 1

const approximatelyEqual = (v1,v2,epsilon=0.001) => Math.abs(v1-v2) < epsilon
approximatelyEqual(Math.PI / 2.0,1.5708)//true

/**
 * @description 数组转li列表
 * @param {Array}
 * @param {Dom} 元素id
 */

// const arrayToHtmlList = (arr, listID) =>
//     (el => (
//         (el = document.querySelector('#' + listID)),
//             (el.innerHTML += arr.map(item => `<li>${item}</li>`).join(''))
//     ))();
//
// arrayToHtmlList(['item 1', 'item 2'], 'myListID');


/**
 * @description 数组平均数
 * @param {Array}
 * @return {Number}
 * */

const average = (...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length;
average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2

/**
 * @description 数组对象属性平均值
 * @param {Object}
 * @param {function}
 * @return {Number}
 * */

const averageBy = (arr, fn) =>
    arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) /
    arr.length;

averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 5


/**
 * @description 其它类型转数组
 * @param {Object}
 * @return {Array}
 * */

const castArray = val => Array.isArray(val) ? val : [val];
castArray([1]) // [1]

/**
 * @description 去除数组中的无用值
 * @param {Array}
 * @return {Array}
 * */

const compact = (val) => val.filter(Boolean);
compact([undefined,null,""," " ,false,1,NaN,'a' * 23]); // [" ",1]

/**
 * @description 检查数值出现次数
 * @param {Array}
 * @param {Number,String}
 * @return {Number}
 * */

const countOccurrences = (arr,val) => arr.reduce((a,v) => v===val?a+1:a);
countOccurrences([1,2,3,1,2,3,1],1); //3

/**
 * @description 数组扁平化
 * @param {Array}
 * @return {Array}
 * */

const deepFlatten = (arr) => [].concat(...arr.map(v=> Array.isArray(v) ? deepFlatten(v) : v));
deepFlatten([1,[2,[3]]]); // [1,2,3]
