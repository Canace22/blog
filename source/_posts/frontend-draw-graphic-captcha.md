---
title: 前端绘制图形验证码
categories: Web开发
comments: true
date: 2019-02-13 09:02:40
---

摘要：
本文主要实现了一下功能：1、图形验证码由验证码、干扰线、干扰点组合而成；2、验证码由数字和字母随机组合形成；3、每次切换验证码，验证码字体颜色和背景颜色变化

一、实现思路

1. 生成一个随机色，用于切换验证码时控制字体颜色和背景颜色

2. 生成一个随机数，用于改变颜色的 rgb 值和绘制干扰线与干扰点

3. 生成一个由数字和字母组合而成的随机码

4. 将随机数、干扰线、干扰点绘制在 canvas 画布上

5. 由于图形验证码是会刷新的，所以下一次刷新的时候要确保画布是空的，才不会出现上一次绘制的图形，因此，要在绘制图形之前，清空画布

6. 验证：通过对比输入的值和生成的随机码，验证是否输入正确

二、示例

```js
let code;

// 生成一个随机色
function randomColor(min, max) {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}

// 生成一个随机数
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// 生成随机码
function createCode() {
  code = "";
  //验证码的长度
  let codeLength = 4;
  const checkCode = document.getElementById("myCanvas");
  const codeChars = [];
  // 验证码所需数字和字母的集合
  for (let i = 0; i < 26; i++) {
    if (i < 10) {
      codeChars.push(String.fromCharCode(i + 48));
    }
    codeChars.push(String.fromCharCode(i + 97));
    codeChars.push(String.fromCharCode(i + 65));
  }
  // 组合数字和字母
  for (let i = 0; i < codeLength; i++) {
    let charNum = Math.floor(Math.random() * 52);
    code += codeChars[charNum];
  }
  if (checkCode) {
    drawVerify(checkCode, code);
  }
}

// 绘制验证码图形
function drawVerify(cEle, value) {
  const [ctx, width, height] = [cEle.getContext("2d"), cEle.width, cEle.height];

  // 清空画布
  ctx.clearRect(0, 0, width, height);
  // 绘制背景色
  ctx.fillStyle = randomColor(180, 240);
  ctx.fillRect(0, 0, width, height);
  // 填充字体
  ctx.font = "30px Arial";
  ctx.fillStyle = randomColor(50, 160);
  ctx.fillText(value, 20, 40);
  // 绘制干扰线
  for (var i = 0; i < 2; i++) {
    ctx.strokeStyle = randomColor(40, 180);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, width), randomNum(0, height));
    ctx.lineTo(randomNum(0, width), randomNum(0, height));
    ctx.stroke();
  }
  // 绘制干扰点
  for (var i = 0; i < 30; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
}
// 验证
function validateCode() {
  const [inputCode, warnToast] = [
    document.getElementById("inputCode").value,
    document.getElementById("warnToast")
  ];

  if (inputCode.length <= 0) {
    warnToast.innerHTML = "请输入验证码！";
  } else if (inputCode.toUpperCase() != code.toUpperCase()) {
    warnToast.innerHTML = "验证码错误";
    createCode();
  } else {
    warnToast.innerHTML = "验证码正确！";
  }
}
```
