---
title: js-html转文本
comments: true
date: 2018-08-25 10:40:58
categories: web
tags: 文本转换
---

最近在折腾用 js 实现 html 转文本的东东，包括 html 转 docx、doc 以及 pdf 等文档，首选当然是用别人造好的轮子啦。

html 转 pdf 用的轮子是 jsPdf，这东西好用是好用，但是有一个很大的缺点，对中文的支持太差了，我用的是 fromhtml 方法，研究文档研究了几天，还是没发现对中文支持的方法，尝试了各种奇技淫巧（换字体，解码等）后，发现它这个方法根本就不支持中文，当然他官方就声明了不支持中文。不过他的 addhtml 方法勉强实现了我的需求，但是因为是采用截图方式，断页很不智能，甚至会出现文字被生生的拦腰截断的情况，加之生成的 pdf 像素实在惨不忍睹，决定还是放弃了。具体的实现，网上有很多的文档，大家可以自行查阅，我也是根据自己的需求定制了而已，所以源码示例就不做过多分享了。

html 转 word 文档，选的轮子是 html-docx，关于这个轮子的资料很少，不过看一下源码及实例还是很快上手的，网上说什么缺点是要用在线编辑器什么的，感觉就是没有自己动脑想过，直接抄官方示例的。官方示例摆出来的虽然是要用一个在线编辑器，但是我们可以根据自己的需求进行改良，比如我的需求是根据选定网页的不同区域，下载不同内容的 word 文档，就不容许出现什么在线编辑器啦，好吧，没什么要说了，看代码吧。

```
public downloadDocx(printArea: any, outputName: string) {
    // +++++++ 样式定制 +++++++
    const styles = `
        //code here
    `;

    // 样式加载
    let styleTagInnerHtml = '<style>';
    styleTagInnerHtml += styles;
    styleTagInnerHtml += '</style>';

    const content = '<!DOCTYPE html><html>' +
      '<head>' + styleTagInnerHtml + '</head>' +
      '<body><div>' printArea.outerHTML + '</div>';

    // +++++++ html 转 word +++++++
    const converted = htmlDocx.asBlob(content);
    saveAs(converted, outputName + '.docx');
  }
```

上面的代码是我写的示例，当然涉及业务需求更加复杂的逻辑就不展示了，上面的示例代码分为三部分。

第一部分是样式的定制，因为这个轮子要转 word 需要重新写一份 html 文档，而这份文档是检索不到我们在外面写的 css 的，只能检索得到 html 文档的 style 标签里的 css，所以需要根据自己的需求重新生成一份 css 文件，放到 html 文档里面。还有一个坑就是，word 并不是支持所有 css 属性的，一些比较新的属性建议还是不要用了，用老一点的方法实现吧。

第二部分是 css 文档部分，这部分主要是生成新的文档，用于转换成 word 文档。

第三部分是用轮子转换编码格式并保存为 word 文档的部分，这里其实是用了两个轮子：html-docx 和 file-saver，html-docx 这个轮子用于转换编码格式，file-saver 用于保存文档，后缀可以根据自己的需求改，但是要记得编码格式要对应上。

当然，我这里只是一个简单的示例，切无生搬硬套，可以根据自己的需求进行定制。
