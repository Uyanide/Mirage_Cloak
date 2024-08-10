/*! For license information please see 11.26b21a9e47dda5a80d9c.js.LICENSE.txt */
"use strict";(self.webpackChunkmirage_cloak=self.webpackChunkmirage_cloak||[]).push([[11],{11:(t,e,r)=>{r.r(e),r.d(e,{CloakDecoder:()=>y});var n=r(490),o=r(23);function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function i(){i=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},s="function"==typeof Symbol?Symbol:{},c=s.iterator||"@@iterator",u=s.asyncIterator||"@@asyncIterator",l=s.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var a=e&&e.prototype instanceof m?e:m,i=Object.create(a.prototype),s=new I(n||[]);return o(i,"_invoke",{value:k(t,r,s)}),i}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=h;var d="suspendedStart",_="suspendedYield",v="executing",g="completed",y={};function m(){}function w(){}function b(){}var x={};f(x,c,(function(){return this}));var E=Object.getPrototypeOf,P=E&&E(E(T([])));P&&P!==r&&n.call(P,c)&&(x=P);var C=b.prototype=m.prototype=Object.create(x);function L(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(o,i,s,c){var u=p(t[o],t,i);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==a(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,s,c)}),(function(t){r("throw",t,s,c)})):e.resolve(f).then((function(t){l.value=t,s(l)}),(function(t){return r("throw",t,s,c)}))}c(u.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function k(e,r,n){var o=d;return function(a,i){if(o===v)throw Error("Generator is already running");if(o===g){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var s=n.delegate;if(s){var c=S(s,n);if(c){if(c===y)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===d)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var u=p(e,r,n);if("normal"===u.type){if(o=n.done?g:_,u.arg===y)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=g,n.method="throw",n.arg=u.arg)}}}function S(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,S(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;var a=p(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,y;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,y):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function B(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function T(e){if(e||""===e){var r=e[c];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(a(e)+" is not iterable")}return w.prototype=b,o(C,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:w,configurable:!0}),w.displayName=f(b,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,f(t,l,"GeneratorFunction")),t.prototype=Object.create(C),t},e.awrap=function(t){return{__await:t}},L(O.prototype),f(O.prototype,u,(function(){return this})),e.AsyncIterator=O,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new O(h(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},L(C),f(C,l,"Generator"),f(C,c,(function(){return this})),f(C,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=T,I.prototype={constructor:I,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(B),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return s.type="throw",s.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),B(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;B(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:T(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),y}},e}function s(t,e,r,n,o,a,i){try{var s=t[a](i),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function c(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){s(a,n,o,i,c,"next",t)}function c(t){s(a,n,o,i,c,"throw",t)}i(void 0)}))}}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,g(n.key),n)}}function l(t,e,r){return e&&u(t.prototype,e),r&&u(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e,r){return e=d(e),function(t,e){if(e&&("object"==a(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,p()?Reflect.construct(e,r||[],d(t).constructor):e.apply(t,r))}function p(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(p=function(){return!!t})()}function d(t){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},d(t)}function _(t,e){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},_(t,e)}function v(t,e,r){return(e=g(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function g(t){var e=function(t,e){if("object"!=a(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==a(e)?e:e+""}var y=function(t){function e(t,r,a){var s;return f(this,e),v(s=h(this,e,[t]),"updateImage",function(){var t=c(i().mark((function t(e){var r,o,a,c,u,l=arguments;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=l.length>1&&void 0!==l[1]?l[1]:null,o=l.length>2&&void 0!==l[2]?l[2]:null,a=l.length>3&&void 0!==l[3]?l[3]:null,c=l.length>4&&void 0!==l[4]?l[4]:null,s._fileExtension=null,s._byteArray=null,s._fileType=null,s._dataUrl=null,n.i.showTextOnMetaCanvas(s._outputMetaCanvas,"正在处理..."),t.prev=9,!r){t.next=16;break}s._inputCanvas.width=r.width,s._inputCanvas.height=r.height,s._inputCanvas.getContext("2d").drawImage(r,0,0),t.next=22;break;case 16:if("failed"===o){t.next=21;break}return t.next=19,new Promise((function(t,r){var n=new Image;n.onload=function(){s._inputCanvas.width=n.width,s._inputCanvas.height=n.height,s._inputCanvas.getContext("2d").drawImage(n,0,0),URL.revokeObjectURL(n.src),t()},n.onerror=function(t){r(t)},n.src=URL.createObjectURL(e)}));case 19:t.next=22;break;case 21:n.i.clearCanvas(s._inputCanvas);case 22:if("failed"!==o){t.next=27;break}return n.i.showTextOnMetaCanvas(s._outputMetaCanvas,"无法解码"),t.abrupt("return");case 27:if(!o){t.next=33;break}return s._dataUrl=o,s._fileExtension=a,t.next=32,n.i.showMetaCanvas(s._outputMetaCanvas,o,a,c);case 32:return t.abrupt("return");case 33:return s._srcImageFile=e,t.next=36,s._getImageDataFromImageFile(e);case 36:s._srcImageData=t.sent,s.process(),t.next=54;break;case 40:t.prev=40,t.t0=t.catch(9),t.t0.message="第一次处理失败！"+t.t0.message,t.prev=43,s._srcImageData=s._inputCanvas.getContext("2d").getImageData(0,0,s._inputCanvas.width,s._inputCanvas.height),s.process(),t.next=54;break;case 48:throw t.prev=48,t.t1=t.catch(43),n.i.clearMetaCanvas(s._outputMetaCanvas),(u=new Error(t.t0.message+" 第二次处理失败！"+t.t1.message)).stack=t.t0.stack+"\n"+t.t1.stack,u;case 54:case"end":return t.stop()}}),t,null,[[9,40],[43,48]])})));return function(e){return t.apply(this,arguments)}}()),v(s,"_getImageDataFromImageFile",function(){var t=c(i().mark((function t(e){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,r){var n=new FileReader;n.onload=function(){var e=c(i().mark((function e(n){var a,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{a=n.target.result,s=(0,o.D4)(new Uint8Array(a)),t(new ImageData(new Uint8ClampedArray(s.data),s.width,s.height))}catch(t){r(t)}case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.onerror=function(t){r(t)},n.readAsArrayBuffer(e)})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),v(s,"process",(function(){if(!s._srcImageData)throw new Error("请先加载图像！");console.log("Decoding...");var t=s._decoders[1].getVersion(s._srcImageData);if(console.log("   Version: "+t),t>=s._decoders.length)throw new Error("未知的编码方式！");var e=s._decoders[t].decode(s._srcImageData),r=e.fileExtension,o=e.byteArray;s._fileExtension=r,s._byteArray=o,s._fileType=n.i.classifyFileType(s._fileExtension);var a=new Blob([s._byteArray],{type:s._fileType});s._dataUrl=URL.createObjectURL(a),n.i.showMetaCanvas(s._outputMetaCanvas,s._dataUrl,s._fileExtension,s._byteArray.length),console.log("Decoding finished")})),v(s,"saveResult",(function(){if(!s._dataUrl)throw new Error("没有文件可供保存！");n.i.saveResultFromUrl(s._dataUrl,s._fileExtension)})),v(s,"getResult",(function(){return s._dataUrl?{url:s._dataUrl,fileExt:s._fileExtension,length:s._byteArray.length}:null})),s._srcImageFile=null,s._srcImageData=null,s._inputCanvas=document.getElementById(r),s._outputMetaCanvas=document.getElementById(a),s._version=t.version,s._decoders=[new b(t),new m(t),new w(t)],s}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&_(t,e)}(e,t),l(e)}(n.i),m=l((function t(e){var r=this;f(this,t),v(this,"getVersion",(function(t){var e=t.data;return!(7&e[0])&&3==(7&e[1])&&(7&e[2])>=1&&(7&e[2])<=6?0:(r._pos=0,r._threshold=r._globalDefaultThreshold,r._dataRange=t.data.length,r._getByte(t.data))})),v(this,"decode",(function(t){r._pos=12,r._threshold=r._defaultThreshold,r._dataRange=t.data.length;var e=t.data;r._threshold=r._getByte(e),console.log("   Threshold: "+r._threshold);for(var n=0,o=0;o<32;o+=8)n|=r._getByte(e)<<o;console.log("   Size to be decoded: "+n);for(var a="",i=!1,s=0;s<r._remained-6;s++){var c=r._getByte(e);i||(0===c?i=!0:a+=String.fromCharCode(c))}console.log("   File extension: "+a);for(var u=new Uint8Array(n),l=0;l<n;l++)u[l]=r._getByte(e);return{fileExtension:a,byteArray:u}})),v(this,"_getByte",(function(t){for(var e=0,n=0;r._pos<r._dataRange;r._pos+=4){var o=r._isSetL;if(t[r._pos]>127&&(o=r._isSetH),e|=o(t[r._pos])<<n++,e|=o(t[r._pos+1])<<n++,8===n){var a=o(t[r._pos+2]);if(r._checkParity(e,a))return r._pos+=4,e;console.log("Error Info:"),console.log("   Data: "+e.toString(16)),console.log("   Parity: "+a),console.log("   Pixel Index: "+r._pos/4),console.log("   Previous RGB:");for(var i=2;i>=0;i--)console.log(t[r._pos-4*i]),console.log(t[r._pos-4*i+1]),console.log(t[r._pos-4*i+2]);throw new Error("数据校验失败！详细信息可查看控制台输出。")}e|=o(t[r._pos+2])<<n++}throw new Error("不期望的文件结尾！")})),v(this,"_isSetH",(function(t){return t<255-r._threshold})),v(this,"_isSetL",(function(t){return t>r._threshold})),v(this,"_checkParity",(function(t,e){for(var r=0,n=0;n<8;n++)r^=t>>n&1;return r==e})),this._globalDefaultThreshold=e.default_threshold,this._defaultThreshold=e.version_1.default_threshold,this._remained=e.version_1.remained})),w=l((function t(e){var r=this;f(this,t),v(this,"decode",(function(t){r._pos=12,r._threshold=r._defaultThreshold,r._dataRange=t.data.length;var e=t.data;r._threshold=r._getBytePair(e),console.log("   Threshold: "+r._threshold);for(var n=0,o=0;o<32;o+=16)n|=r._getBytePair(e)<<o;console.log("   Size to be decoded: "+n);for(var a="",i=!1,s=0;s<r._remained-4;s++){var c=r._getBytePair(e);i||(0===c?i=!0:a+=String.fromCharCode(c))}console.log("   File extension: "+a);for(var u=new Uint8Array(n),l=0;l<n-2;l+=2){var f=r._getBytePair(e);u[l]=255&f,u[l+1]=f>>8}if(1&n)u[n-1]=r._getBytePair(e);else{var h=r._getBytePair(e);u[n-2]=255&h,u[n-1]=h>>8}return{fileExtension:a,byteArray:u}})),v(this,"_getBytePair",(function(t){for(var e=0,n=0;r._pos<r._dataRange;r._pos+=4){var o=r._getBitsPairL;if(t[r._pos]>127&&(o=r._getBitsPairH),e|=o(t[r._pos])<<(n++<<1),e|=o(t[r._pos+1])<<(n++<<1),8===n){var a=o(t[r._pos+2]);if(r._checkParityPair(e,a))return r._pos+=4,e;console.log("Error Info:"),console.log("   Data: "+e.toString(16)),console.log("   Parity: "+a),console.log("   Pixel Index: "+r._pos/4),console.log("   Previous RGB:");for(var i=2;i>=0;i--)console.log(t[r._pos-4*i]),console.log(t[r._pos-4*i+1]),console.log(t[r._pos-4*i+2]);throw new Error("数据校验失败！详情可查看控制台输出。")}e|=o(t[r._pos+2])<<(n++<<1)}throw new Error("不期望的文件结尾！")})),v(this,"_getBitsPairH",(function(t){return Math.max(Math.min(Math.floor((255-t+r._threshold)/(r._threshold<<1)),3),0)})),v(this,"_getBitsPairL",(function(t){return Math.max(Math.min(Math.floor((t+r._threshold)/(r._threshold<<1)),3),0)})),v(this,"_checkParityPair",(function(t,e){for(var r=0,n=0;n<8;n++)r^=t>>n&1;for(var o=8;o<16;o++)r^=(t>>o&1)<<1;return r==e})),this._defaultThreshold=e.version_2.default_threshold,this._remained=e.version_2.remained})),b=l((function t(e){var r=this;f(this,t),v(this,"decode",(function(t){if(r._data=t.data,r._compress=7&r._data[2],!r._compress)throw new Error("错误的标识符！");var e;console.log("   Compression: "+r._compress),r._dataPos=4,r._buffer=0,r._bufferSize=0;for(var n=0;1!==(e=r._getByte());)n=10*n+e-48;console.log("   Size to be decoded: "+n);for(var o="";1!==(e=r._getByte());)o+=String.fromCharCode(e);for(-1!==o.indexOf(".")&&(o=o.substring(o.indexOf(".")+1)),console.log("   File extension: "+o);0!==(e=r._getByte()););for(var a=new Uint8Array(n),i=0;i<n;i++)a[i]=r._getByte();return{fileExtension:o,byteArray:a}})),v(this,"_getByte",(function(){for(;r._bufferSize<8;){if(r._buffer=r._buffer<<r._compress|r._data[r._dataPos]&(1<<r._compress)-1,r._bufferSize+=r._compress,r._dataPos++,r._dataPos>=r._data.length)throw new Error("不期望的文件结尾！");3&~r._dataPos||r._dataPos++}r._bufferSize-=8;var t=r._buffer&255<<r._bufferSize;return r._buffer&=(1<<r._bufferSize)-1,t>>r._bufferSize}))}))}}]);