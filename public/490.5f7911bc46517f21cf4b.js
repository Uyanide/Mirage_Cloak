/*! For license information please see 490.5f7911bc46517f21cf4b.js.LICENSE.txt */
"use strict";(self.webpackChunkmirage_cloak=self.webpackChunkmirage_cloak||[]).push([[490],{490:(t,e,r)=>{r.d(e,{i:()=>h});var n={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",ico:"image/x-icon",svg:"image/svg+xml",svgz:"image/svg+xml",bmp:"image/bmp",tiff:"image/tiff",tif:"image/tiff",wbmp:"image/vnd.wap.wbmp",avif:"image/avif",apng:"image/apng",jxl:"image/jxl",heic:"image/heic",heif:"image/heif",mp3:"audio/mpeg",ogg:"audio/ogg",wav:"audio/wav",weba:"audio/webm",mid:"audio/midi",midi:"audio/midi",oga:"audio/ogg",spx:"audio/ogg",opus:"audio/ogg",flac:"audio/flac",m4a:"audio/mp4",aac:"audio/aac",wma:"audio/x-ms-wma",mka:"audio/x-matroska",mp4:"video/mp4",webm:"video/webm",ogv:"video/ogg",avi:"video/x-msvideo",wmv:"video/x-ms-wmv",flv:"video/x-flv",mov:"video/quicktime",mkv:"video/x-matros","3gp":"video/3gpp","3g2":"video/3gpp2",m4v:"video/mp4",m4p:"video/mp4",m4b:"video/mp4",m4r:"video/mp4",f4v:"video/mp4",f4p:"video/mp4",f4a:"video/mp4",f4b:"video/mp4",txt:"text/plain",html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",md:"text/markdown",markdown:"text/markdown",csv:"text/csv",tsv:"text/tab-separated-values",ics:"text/calendar",vcf:"text/vcard",pdf:"application/pdf",doc:"application/msword",xls:"application/vnd.ms-excel",ppt:"application/vnd.ms-powerpoint",json:"application/json",xml:"application/xml",zip:"application/zip",rar:"application/x-rar-compressed","7z":"application/x-7z-compressed",tar:"application/x-tar",gz:"application/gzip",bz2:"application/x-bzip2",xz:"application/x-xz",exe:"application/x-msdownload"};function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function a(){a=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",l=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof w?e:w,a=Object.create(o.prototype),c=new I(n||[]);return i(a,"_invoke",{value:C(t,r,c)}),a}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=h;var d="suspendedStart",v="suspendedYield",m="executing",g="completed",y={};function w(){}function x(){}function b(){}var L={};f(L,u,(function(){return this}));var k=Object.getPrototypeOf,S=k&&k(k(P([])));S&&S!==r&&n.call(S,u)&&(L=S);var j=b.prototype=w.prototype=Object.create(L);function E(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function T(t,e){function r(a,i,c,u){var l=p(t[a],t,i);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==o(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):e.resolve(f).then((function(t){s.value=t,c(s)}),(function(t){return r("throw",t,c,u)}))}u(l.arg)}var a;i(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return a=a?a.then(o,o):o()}})}function C(e,r,n){var o=d;return function(a,i){if(o===m)throw Error("Generator is already running");if(o===g){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=O(c,n);if(u){if(u===y)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===d)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=m;var l=p(e,r,n);if("normal"===l.type){if(o=n.done?g:v,l.arg===y)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=g,n.method="throw",n.arg=l.arg)}}}function O(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,O(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;var a=p(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,y;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,y):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function F(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function P(e){if(e||""===e){var r=e[u];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function r(){for(;++a<e.length;)if(n.call(e,a))return r.value=e[a],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(o(e)+" is not iterable")}return x.prototype=b,i(j,"constructor",{value:b,configurable:!0}),i(b,"constructor",{value:x,configurable:!0}),x.displayName=f(b,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,f(t,s,"GeneratorFunction")),t.prototype=Object.create(j),t},e.awrap=function(t){return{__await:t}},E(T.prototype),f(T.prototype,l,(function(){return this})),e.AsyncIterator=T,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new T(h(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(j),f(j,s,"Generator"),f(j,u,(function(){return this})),f(j,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,I.prototype={constructor:I,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(F),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),F(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;F(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:P(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),y}},e}function i(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function c(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return u(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){c=!0,a=t},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw a}}}}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,f(n.key),n)}}function s(t,e,r){return(e=f(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function f(t){var e=function(t,e){if("object"!=o(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==o(e)?e:e+""}var h=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return e=t,r=null,n=[{key:"showTextOnMetaCanvas",value:function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"暂不支持预览此文件",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";t.clearMetaCanvas(e);var o=e.querySelector("canvas"),a=o.getContext("2d");a.font="15px Microsoft Yahei",a.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--front-color"),a.textAlign="center",n?(a.fillText(r,o.width/2,o.height/2-10),a.fillText(n,o.width/2,o.height/2+10)):a.fillText(r,o.width/2,o.height/2)}},{key:"cloneImageData",value:function(t){var e=new ImageData(new Uint8ClampedArray(t.data),t.width,t.height);return console.log(e),console.log(e.data),console.log(t.data),e}},{key:"truncate",value:function(t){return Math.min(255,Math.max(0,t))}},{key:"adjustImageData",value:function(e,r,n,o){for(var a=new Uint8ClampedArray(r.data.length),i=r.data,c=259*(255+(n=5.1*(n-50)))/(255*(259-n)),u=3*o-150,l=0;l<a.length;l+=4)a[l]=t.truncate(c*(i[l]-128)+128+u),a[l+1]=t.truncate(c*(i[l+1]-128)+128+u),a[l+2]=t.truncate(c*(i[l+2]-128)+128+u),a[l+3]=255;var s=new ImageData(a,r.width,r.height);e.width=s.width,e.height=s.height,e.getContext("2d").putImageData(s,0,0)}},{key:"saveResultFromUrl",value:function(t,e){var r=(new Date).getTime(),n=document.createElement("a");n.href=t,n.download="decoded_".concat(r,".").concat(e),document.body.appendChild(n),n.click(),document.body.removeChild(n)}},{key:"clearMetaCanvas",value:function(e){e.querySelector(".sizeLabel").innerText="",e.querySelector(".typeLabel").innerText="";var r,n=c(e.querySelectorAll("canvas, video, audio"));try{for(n.s();!(r=n.n()).done;)r.value.classList.remove("displayFlex")}catch(t){n.e(t)}finally{n.f()}var o=e.querySelector("canvas");o.classList.add("displayFlex"),t.clearCanvas(o);var a,i=c(e.querySelectorAll("video, audio"));try{for(i.s();!(a=i.n()).done;){var u=a.value;u.src&&(u.pause(),u.currentTime=0,u.src="")}}catch(t){i.e(t)}finally{i.f()}}},{key:"getImageDataFromImageCanvas",value:function(t){var e=document.createElement("canvas");e.width=t.width,e.height=t.height;var r=e.getContext("2d");return r.drawImage(t,0,0),r.getImageData(0,0,t.width,t.height)}},{key:"showMetaCanvas",value:(o=a().mark((function e(r,n,o,i){var c,u=arguments;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=u.length>4&&void 0!==u[4]?u[4]:1,e.abrupt("return",new Promise((function(e,a){var u=t.classifyFileType(o),l=[r.querySelector("canvas"),r.querySelector("video"),r.querySelector("audio")];switch(l.forEach((function(t){t.classList.remove("displayFlex")})),u.slice(0,5)){case"image":var s=new Image;s.onload=function(){l[0].width=s.width*c,l[0].height=s.height*c,l[0].getContext("2d").drawImage(s,0,0,s.width*c,s.height*c),l[0].classList.add("displayFlex"),e()},s.src=n;break;case"video":l[1].src=n,l[1].classList.add("displayFlex"),e();break;case"audio":l[2].src=n,l[2].classList.add("displayFlex"),e();break;default:t.showTextOnMetaCanvas(l[0],"暂不支持预览此文件","文件类型："+u),e()}t.showSize(r.querySelector(".sizeLabel"),i),r.querySelector(".typeLabel").innerText="里文件类型："+u})));case 2:case"end":return e.stop()}}),e)})),u=function(){var t=this,e=arguments;return new Promise((function(r,n){var a=o.apply(t,e);function c(t){i(a,r,n,c,u,"next",t)}function u(t){i(a,r,n,c,u,"throw",t)}c(void 0)}))},function(t,e,r,n){return u.apply(this,arguments)})},{key:"showSize",value:function(t,e){t.innerText="里文件大小："+function(t){return t>=1048576?(t/1048576).toFixed(2)+" MB":t>1024?(t/1024).toFixed(2)+" KB":t+" B"}(e)}}],r&&l(e.prototype,r),n&&l(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,r,n,o,u}();s(h,"classifyFileType",(function(t){return n[t]||"application/octet-stream"})),s(h,"clearCanvas",(function(t){t.width=300,t.height=150}))}}]);