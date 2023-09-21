import fs from "fs";
import inquirer from "inquirer";
import fse from "fs-extra";

// let a = 'React Hooks 与 Immutable 数据流实战/12.歌手列表3:上拉/下拉加载及优化全面助力移动web开发.md'
// let b = 0
// a = a.replace(/\//g, (match, offset) => {
//   b++
//   return (b === 1) ? match : "or"
// });
// a = a.replace(/:/g, (match, offset) => {
//   return ' '
// });
// console.log(a);
// fs.writeFileSync(a, '');


let a = 'React Hooks 与 Immutable 数据流实战/13.如何用： hooks 实现一个 Redux?【中途来波骚操作】.md'
let b = 0
a = a.replace(/\//g, (match, offset) => {
  b++
  return (b === 1) ? match : "or"
});
a = a.replace(/:/g, (match, offset) => {
  return '：'
});
a = a.replace(/\?/g, (match, offset) => {
  return '？'
});
console.log(a);
fs.writeFileSync(a, '');