/*! For license information please see 128.b90a0a205df97a2436e2.js.LICENSE.txt */
"use strict";(self.webpackChunkmirage_cloak=self.webpackChunkmirage_cloak||[]).push([[128],{128:(t,e,r)=>{r.r(e),r.d(e,{MultiDecoder:()=>h});var n=r(195);r(490);function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(){i=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",s=c.asyncIterator||"@@asyncIterator",l=c.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof b?e:b,i=Object.create(o.prototype),c=new F(n||[]);return a(i,"_invoke",{value:I(t,r,c)}),i}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=h;var p="suspendedStart",v="suspendedYield",y="executing",g="completed",m={};function b(){}function w(){}function L(){}var _={};f(_,u,(function(){return this}));var x=Object.getPrototypeOf,E=x&&x(x(R([])));E&&E!==r&&n.call(E,u)&&(_=E);var k=L.prototype=b.prototype=Object.create(_);function S(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function r(i,a,c,u){var s=d(t[i],t,a);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==o(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):e.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return r("throw",t,c,u)}))}u(s.arg)}var i;a(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function I(e,r,n){var o=p;return function(i,a){if(o===y)throw Error("Generator is already running");if(o===g){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=P(c,n);if(u){if(u===m)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var s=d(e,r,n);if("normal"===s.type){if(o=n.done?g:v,s.arg===m)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=g,n.method="throw",n.arg=s.arg)}}}function P(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,P(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=d(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,m;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,m):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function F(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function R(e){if(e||""===e){var r=e[u];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,a=function r(){for(;++i<e.length;)if(n.call(e,i))return r.value=e[i],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(o(e)+" is not iterable")}return w.prototype=L,a(k,"constructor",{value:L,configurable:!0}),a(L,"constructor",{value:w,configurable:!0}),w.displayName=f(L,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,f(t,l,"GeneratorFunction")),t.prototype=Object.create(k),t},e.awrap=function(t){return{__await:t}},S(j.prototype),f(j.prototype,s,(function(){return this})),e.AsyncIterator=j,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new j(h(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},S(k),f(k,l,"Generator"),f(k,u,(function(){return this})),f(k,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=R,F.prototype={constructor:F,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(C),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),C(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;C(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:R(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),m}},e}function a(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function c(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function c(t){a(i,n,o,c,u,"next",t)}function u(t){a(i,n,o,c,u,"throw",t)}c(void 0)}))}}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,f(n.key),n)}}function s(t,e,r){return e&&u(t.prototype,e),r&&u(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function l(t,e,r){return(e=f(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function f(t){var e=function(t,e){if("object"!=o(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==o(e)?e:e+""}var h=s((function t(e,r,o,a){var u=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),l(this,"appendQueue",function(){var t=c(i().mark((function t(e){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,r){try{e.type.startsWith("image")||r(new Error("请选择图片文件")),u._fileList.push({src:e,status:"pending",image:null,url:null,fileExt:null,length:null});var o=new Image,i=u._fileList.length-1;o.onload=function(){var e=document.createElement("canvas");e.id="queue"+i,e.addEventListener("click",n.L.sidebarImageProcess);var r=e.getContext("2d");e.width=o.width,e.height=o.height,r.drawImage(o,0,0),u._sidebarContent.appendChild(e),u._fileList[i].image=o,t()},o.onerror=function(){URL.revokeObjectURL(o.src),u._fileList[i].status="failed";var t=document.getElementById("queue"+i);t&&"function"==typeof t.remove?t.remove():t&&t.parentNode&&t.parentNode.removeChild(t),r(new Error("Error loading image"))},o.src=URL.createObjectURL(e)}catch(t){r(t)}})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),l(this,"decode",function(){var t=c(i().mark((function t(e){var r,o,a,c;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"decodePage"!==applicationState.currPageId&&n.L.switchPage(),t.prev=1,r=parseInt(e.target.id.slice(5)),void 0!==u._selected&&(o=document.getElementById("queue"+u._selected))&&o.classList.remove("canvasSelected"),e.target.classList.add("canvasSelected"),u._selected=r,a="#00FF00",c=null,t.next=10,u._processSingle(r).then((function(t){t||(a="#FF0000")})).catch((function(t){a="#FF0000",c=t}));case 10:if(u.showCornerStatus(e.target,a),!c){t.next=13;break}throw c;case 13:t.next=19;break;case 15:t.prev=15,t.t0=t.catch(1),alert("解码失败："+t.t0.message),console.error("Failed to decode:",t.t0.stack,t.t0.message);case 19:case"end":return t.stop()}}),t,null,[[1,15]])})));return function(e){return t.apply(this,arguments)}}()),l(this,"showCornerStatus",(function(t,e){var r=Math.min(t.width,t.height)/10,n=t.getContext("2d"),o=t.width-r/2,i=t.height-r/2,a=.4*r;n.beginPath(),n.arc(o,i,a,0,2*Math.PI,!1),n.fillStyle=e,n.fill()})),l(this,"_processSingle",function(){var t=c(i().mark((function t(e){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=u._fileList[e].status,t.next="dontcare"===t.t0||"pending"===t.t0?3:"decoded"===t.t0?21:"failed"===t.t0?24:27;break;case 3:return t.next=5,u._decoder.updateImage(u._fileList[e].src,u._fileList[e].image).catch((function(t){throw u._fileList[e].status="failed",t}));case 5:if("dontcare"!==(r=u._decoder.getResult())){t.next=11;break}return u._fileList[e].status="dontcare",t.abrupt("return",!0);case 11:if(!r){t.next=18;break}u._fileList[e].status="decoded",u._fileList[e].url=r.url,u._fileList[e].fileExt=r.fileExt,u._fileList[e].length=r.length,t.next=20;break;case 18:throw u._fileList[e].status="failed",new Error("Invalid result");case 20:case 23:return t.abrupt("return",!0);case 21:return t.next=23,u._decoder.updateImage(null,u._fileList[e].image,u._fileList[e].url,u._fileList[e].fileExt,u._fileList[e].length);case 24:return t.next=26,u._decoder.updateImage(null,u._fileList[e].image,"failed",null,null);case 26:return t.abrupt("return",!1);case 27:throw new Error("Invalid status");case 28:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),l(this,"clearQueue",(function(){for(var t=0;t<u._fileList.length;t++){var e=document.getElementById("queue"+t);e&&u._sidebarContent.removeChild(e),u._fileList[t].image&&URL.revokeObjectURL(u._fileList[t].image.src),u._fileList[t].url&&URL.revokeObjectURL(u._fileList[t].url)}u._fileList=[],u._sidebarAmountLabel.innerText="数量：0"})),l(this,"saveCurrResult",(function(){try{u._decoder.saveResult()}catch(t){throw t}})),l(this,"saveAllResults",c(i().mark((function t(){var e,r,n,o;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=0,r=0,n=i().mark((function t(n){var a,c;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=u._fileList[n].status,t.next="failed"===t.t0?3:"pending"===t.t0?5:"decoded"===t.t0?16:"dontcare"===t.t0?26:28;break;case 3:return r++,t.abrupt("break",29);case 5:return a=!1,t.next=8,u._processSingle(n).catch((function(){r++,a=!0}));case 8:if(!a){t.next=13;break}return u.showCornerStatus(document.getElementById("queue"+n),"#FF0000"),t.abrupt("break",29);case 13:return u.showCornerStatus(document.getElementById("queue"+n),"#00FF00"),n--,t.abrupt("break",29);case 16:return(c=document.createElement("a")).href=u._fileList[n].url,c.download="decoded_".concat((new Date).getTime(),".").concat(u._fileList[n].fileExt),document.body.appendChild(c),c.click(),document.body.removeChild(c),e++,t.next=25,new Promise((function(t){return setTimeout(t,500)}));case 25:return t.abrupt("break",29);case 26:return e++,t.abrupt("break",29);case 28:throw new Error("Invalid status");case 29:o=n;case 30:case"end":return t.stop()}}),t)})),o=0;case 3:if(!(o<u._fileList.length)){t.next=8;break}return t.delegateYield(n(o),"t0",5);case 5:o++,t.next=3;break;case 8:u._sidebarAmountLabel.innerHTML="数量：".concat(u._fileList.length,"<br>成功：").concat(e,"<br>失败：").concat(r);case 9:case"end":return t.stop()}}),t)})))),this._decoder=r,this._sidebarContent=document.getElementById(o),this._sidebarAmountLabel=document.getElementById(a),this._fileList=[]}))}}]);