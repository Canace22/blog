---
title: JavaScript 如何判断用户是否打开了大写键盘
categories: Web开发
tags: JavaScript&TypeScript
description: '检测大写键盘可用 getModifierState 方法，但需注意兼容性和实际使用场景的限制。'
author: Canace
comments: true
date: 2024-07-19 09:45:59
---
在输入密码时，用户可能会因为打开了大写键盘多次输入错误的密码。为了避免这种情况，在检测到用户打开了大写键盘时，我们可以提示一下用户，提升用户的体验。

在 JavaScript 中，我们可以使用 keyboardEvent 对象的 `getModifierState` 方法来检测用户是否打开了大写键盘。这个方法返回一个布尔值，表示用户是否打开了大写键盘。

demo:

```html
<input type='password'/>
```

```js
ddocument.querySelector('input[type=password]').addEventListener('keyup', function (keyboardEvent) {
    const capsLockOn = keyboardEvent.getModifierState('CapsLock');
    if (capsLockOn) {
      // Warn the user that their caps lock is on?
      console.log('你打开了大写键盘')
    }
});
```

除了检测大写键盘外，getModifierState 方法还可以检测其他键盘按钮的状态

````
dictionary EventModifierInit : UIEventInit {
  boolean ctrlKey = false;
  boolean shiftKey = false;
  boolean altKey = false;
  boolean metaKey = false;

  boolean modifierAltGraph = false;
  boolean modifierCapsLock = false;
  boolean modifierFn = false;
  boolean modifierFnLock = false;
  boolean modifierHyper = false;
  boolean modifierNumLock = false;
  boolean modifierScrollLock = false;
  boolean modifierSuper = false;
  boolean modifierSymbol = false;
  boolean modifierSymbolLock = false;
};
````

参考文献：
[Detect Caps Lock with JavaScript](https://davidwalsh.name/detect-caps-lock)
[KeyboardEvent: getModifierState() method](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState)