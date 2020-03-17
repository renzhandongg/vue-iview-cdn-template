//数组扁平化
// export const flatten = (arr,depth = 1) =>
//     arr.reduce((item,v) => item.concat((depth>1 && Array.isArray(v)) ? flatten(v,depth - 1):v),[]);
// //返回数组中某值得所有索引
// export const indexOffAll = (arr,val) =>
//     arr.reduce((acc,el,i) => (el === val ? [...acc,i] : acc),[])
//两数组的交集
// export const intersection = (a,b) => {
//     const s = new Set(b);
//     return a.filter(x => s.has(x));
// }

//返回指定长度的升序数组
// export const minN = (arr,n=1) => arr.sort((a,b) => a - b).slice(0,n);

//根据条件反向筛选
// export const negate = func => (...args) => !func(...args);
// console.log([1,2,3,4].filter(negate(n => n%2 ===0)))

//生成两数之间指定长度的随机数组
// export const  randomInteArrrayInRange = (max,min,n=1) =>
//     Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);

//在指定数组中获取随机数
// export const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

//"洗牌数组"
// export const shuffle = ([...arr]) => {
//     let m = arr.length;
//     while(m){
//         const i = Math.floor(Math.random() * m--);
//         [arr[m],arr[i]] = [arr[i],arr[m]]
//     }
//     return arr;
// }


//nest : 根据parent_id生成树结构
// export const nest = (items, id = null, link = 'parent_id') =>
//     items
//         .filter(item => item[link] === id)
//         .map(item => ({ ...item, children: nest(items, item.id) }));
// let items = [
//     {
//         id:1,parent_id:null
//     },
//     {
//         id:2,parent_id:1
//     },
//     {
//         id:3,parent_id:1
//     },
//     {
//         id:4,parent_id:2
//     },
//     {
//         id:5,parent_id:3
//     }
// ];
// let nestedComments = nest(items);


//计算函数执行时间
// export const timeTaken = callBack => {
//     console.time('timeTaken');
//     const r = callBack();
//     console.timeEnd('timeTaken');
//     return r;
// }
//
// let r = timeTaken(() => Math.pow(2,10));

const arr = [0,1];
arr[5] = 5;
console.log(arr[4] === undefined);
console.log(arr[4] == null);
const newArray = arr.filter(it => it !== undefined);
console.log(newArray)
console.log(newArray.length)
