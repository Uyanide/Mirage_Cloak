/*! For license information please see Encoder.worker.805c49e17b191d7df879.worker.js.LICENSE.txt */
(()=>{"use strict";var t={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",ico:"image/x-icon",svg:"image/svg+xml",svgz:"image/svg+xml",bmp:"image/bmp",tiff:"image/tiff",tif:"image/tiff",wbmp:"image/vnd.wap.wbmp",avif:"image/avif",apng:"image/apng",jxl:"image/jxl",heic:"image/heic",heif:"image/heif",mp3:"audio/mpeg",ogg:"audio/ogg",wav:"audio/wav",weba:"audio/webm",mid:"audio/midi",midi:"audio/midi",oga:"audio/ogg",spx:"audio/ogg",opus:"audio/ogg",flac:"audio/flac",m4a:"audio/mp4",aac:"audio/aac",wma:"audio/x-ms-wma",mka:"audio/x-matroska",mp4:"video/mp4",webm:"video/webm",ogv:"video/ogg",avi:"video/x-msvideo",wmv:"video/x-ms-wmv",flv:"video/x-flv",mov:"video/quicktime",mkv:"video/x-matros","3gp":"video/3gpp","3g2":"video/3gpp2",m4v:"video/mp4",m4p:"video/mp4",m4b:"video/mp4",m4r:"video/mp4",f4v:"video/mp4",f4p:"video/mp4",f4a:"video/mp4",f4b:"video/mp4",txt:"text/plain",html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",md:"text/markdown",markdown:"text/markdown",csv:"text/csv",tsv:"text/tab-separated-values",ics:"text/calendar",vcf:"text/vcard",pdf:"application/pdf",doc:"application/msword",xls:"application/vnd.ms-excel",ppt:"application/vnd.ms-powerpoint",json:"application/json",xml:"application/xml",zip:"application/zip",rar:"application/x-rar-compressed","7z":"application/x-7z-compressed",tar:"application/x-tar",gz:"application/gzip",bz2:"application/x-bzip2",xz:"application/x-xz",exe:"application/x-msdownload"};function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function i(){i=function(){return r};var t,r={},a=Object.prototype,n=a.hasOwnProperty,o=Object.defineProperty||function(t,e,i){t[e]=i.value},s="function"==typeof Symbol?Symbol:{},h=s.iterator||"@@iterator",c=s.asyncIterator||"@@asyncIterator",l=s.toStringTag||"@@toStringTag";function f(t,e,i){return Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,i){return t[e]=i}}function u(t,e,i,r){var a=e&&e.prototype instanceof v?e:v,n=Object.create(a.prototype),s=new F(r||[]);return o(n,"_invoke",{value:M(t,i,s)}),n}function _(t,e,i){try{return{type:"normal",arg:t.call(e,i)}}catch(t){return{type:"throw",arg:t}}}r.wrap=u;var d="suspendedStart",p="suspendedYield",g="executing",m="completed",y={};function v(){}function b(){}function w(){}var x={};f(x,h,(function(){return this}));var A=Object.getPrototypeOf,S=A&&A(A(k([])));S&&S!==a&&n.call(S,h)&&(x=S);var B=w.prototype=v.prototype=Object.create(x);function L(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,i){function r(a,o,s,h){var c=_(t[a],t,o);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==e(f)&&n.call(f,"__await")?i.resolve(f.__await).then((function(t){r("next",t,s,h)}),(function(t){r("throw",t,s,h)})):i.resolve(f).then((function(t){l.value=t,s(l)}),(function(t){return r("throw",t,s,h)}))}h(c.arg)}var a;o(this,"_invoke",{value:function(t,e){function n(){return new i((function(i,a){r(t,e,i,a)}))}return a=a?a.then(n,n):n()}})}function M(e,i,r){var a=d;return function(n,o){if(a===g)throw Error("Generator is already running");if(a===m){if("throw"===n)throw o;return{value:t,done:!0}}for(r.method=n,r.arg=o;;){var s=r.delegate;if(s){var h=P(s,r);if(h){if(h===y)continue;return h}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(a===d)throw a=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a=g;var c=_(e,i,r);if("normal"===c.type){if(a=r.done?m:p,c.arg===y)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(a=m,r.method="throw",r.arg=c.arg)}}}function P(e,i){var r=i.method,a=e.iterator[r];if(a===t)return i.delegate=null,"throw"===r&&e.iterator.return&&(i.method="return",i.arg=t,P(e,i),"throw"===i.method)||"return"!==r&&(i.method="throw",i.arg=new TypeError("The iterator does not provide a '"+r+"' method")),y;var n=_(a,e.iterator,i.arg);if("throw"===n.type)return i.method="throw",i.arg=n.arg,i.delegate=null,y;var o=n.arg;return o?o.done?(i[e.resultName]=o.value,i.next=e.nextLoc,"return"!==i.method&&(i.method="next",i.arg=t),i.delegate=null,y):o:(i.method="throw",i.arg=new TypeError("iterator result is not an object"),i.delegate=null,y)}function z(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function F(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(z,this),this.reset(!0)}function k(i){if(i||""===i){var r=i[h];if(r)return r.call(i);if("function"==typeof i.next)return i;if(!isNaN(i.length)){var a=-1,o=function e(){for(;++a<i.length;)if(n.call(i,a))return e.value=i[a],e.done=!1,e;return e.value=t,e.done=!0,e};return o.next=o}}throw new TypeError(e(i)+" is not iterable")}return b.prototype=w,o(B,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:b,configurable:!0}),b.displayName=f(w,l,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,f(t,l,"GeneratorFunction")),t.prototype=Object.create(B),t},r.awrap=function(t){return{__await:t}},L(E.prototype),f(E.prototype,c,(function(){return this})),r.AsyncIterator=E,r.async=function(t,e,i,a,n){void 0===n&&(n=Promise);var o=new E(u(t,e,i,a),n);return r.isGeneratorFunction(e)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},L(B),f(B,l,"Generator"),f(B,h,(function(){return this})),f(B,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),i=[];for(var r in e)i.push(r);return i.reverse(),function t(){for(;i.length;){var r=i.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},r.values=k,F.prototype={constructor:F,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(C),!e)for(var i in this)"t"===i.charAt(0)&&n.call(this,i)&&!isNaN(+i.slice(1))&&(this[i]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var i=this;function r(r,a){return s.type="throw",s.arg=e,i.next=r,a&&(i.method="next",i.arg=t),!!a}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var h=n.call(o,"catchLoc"),c=n.call(o,"finallyLoc");if(h&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(h){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var i=this.tryEntries.length-1;i>=0;--i){var r=this.tryEntries[i];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var i=this.tryEntries[e];if(i.finallyLoc===t)return this.complete(i.completion,i.afterLoc),C(i),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var i=this.tryEntries[e];if(i.tryLoc===t){var r=i.completion;if("throw"===r.type){var a=r.arg;C(i)}return a}}throw Error("illegal catch attempt")},delegateYield:function(e,i,r){return this.delegate={iterator:k(e),resultName:i,nextLoc:r},"next"===this.method&&(this.arg=t),y}},r}function r(t,e,i,r,a,n,o){try{var s=t[n](o),h=s.value}catch(t){return void i(t)}s.done?e(h):Promise.resolve(h).then(r,a)}function a(t,e){var i="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!i){if(Array.isArray(t)||(i=function(t,e){if(t){if("string"==typeof t)return n(t,e);var i={}.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?n(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){i&&(t=i);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,h=!1;return{s:function(){i=i.call(t)},n:function(){var t=i.next();return s=t.done,t},e:function(t){h=!0,o=t},f:function(){try{s||null==i.return||i.return()}finally{if(h)throw o}}}}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=Array(e);i<e;i++)r[i]=t[i];return r}function o(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,h(r.key),r)}}function s(t,e,i){return(e=h(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function h(t){var i=function(t,i){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var a=r.call(t,i||"default");if("object"!=e(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===i?String:Number)(t)}(t,"string");return"symbol"==e(i)?i:i+""}var c=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return e=t,n=null,s=[{key:"showTextOnMetaCanvas",value:function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"暂不支持预览此文件",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";t.clearMetaCanvas(e);var a=e.querySelector("canvas"),n=a.getContext("2d");n.font="15px Microsoft Yahei",n.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--front-color"),n.textAlign="center",r?(n.fillText(i,a.width/2,a.height/2-10),n.fillText(r,a.width/2,a.height/2+10)):n.fillText(i,a.width/2,a.height/2)}},{key:"cloneImageData",value:function(t){var e=new ImageData(new Uint8ClampedArray(t.data),t.width,t.height);return console.log(e),console.log(e.data),console.log(t.data),e}},{key:"truncate",value:function(t){return Math.min(255,Math.max(0,t))}},{key:"adjustImageData",value:function(e,i,r,a){for(var n=new Uint8ClampedArray(i.data.length),o=i.data,s=259*(255+(r=5.1*(r-50)))/(255*(259-r)),h=3*a-150,c=0;c<n.length;c+=4)n[c]=t.truncate(s*(o[c]-128)+128+h),n[c+1]=t.truncate(s*(o[c+1]-128)+128+h),n[c+2]=t.truncate(s*(o[c+2]-128)+128+h),n[c+3]=255;var l=new ImageData(n,i.width,i.height);e.width=l.width,e.height=l.height,e.getContext("2d").putImageData(l,0,0)}},{key:"saveResultFromUrl",value:function(t,e){var i=(new Date).getTime(),r=document.createElement("a");r.href=t,r.download="decoded_".concat(i,".").concat(e),document.body.appendChild(r),r.click(),document.body.removeChild(r)}},{key:"clearMetaCanvas",value:function(e){e.querySelector(".sizeLabel").innerText="",e.querySelector(".typeLabel").innerText="";var i,r=a(e.querySelectorAll("canvas, video, audio"));try{for(r.s();!(i=r.n()).done;)i.value.classList.remove("displayFlex")}catch(t){r.e(t)}finally{r.f()}var n=e.querySelector("canvas");n.classList.add("displayFlex"),t.clearCanvas(n);var o,s=a(e.querySelectorAll("video, audio"));try{for(s.s();!(o=s.n()).done;){var h=o.value;h.src&&(h.pause(),h.currentTime=0,h.src="")}}catch(t){s.e(t)}finally{s.f()}}},{key:"getImageDataFromImageCanvas",value:function(t){var e=document.createElement("canvas");e.width=t.width,e.height=t.height;var i=e.getContext("2d");return i.drawImage(t,0,0),i.getImageData(0,0,t.width,t.height)}},{key:"showMetaCanvas",value:(h=i().mark((function e(r,a,n,o){var s,h=arguments;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=h.length>4&&void 0!==h[4]?h[4]:1,e.abrupt("return",new Promise((function(e,i){var h=t.classifyFileType(n),c=[r.querySelector("canvas"),r.querySelector("video"),r.querySelector("audio")];switch(c.forEach((function(t){t.classList.remove("displayFlex")})),h.slice(0,5)){case"image":var l=new Image;l.onload=function(){c[0].width=l.width*s,c[0].height=l.height*s,c[0].getContext("2d").drawImage(l,0,0,l.width*s,l.height*s),c[0].classList.add("displayFlex"),e()},l.src=a;break;case"video":c[1].src=a,c[1].classList.add("displayFlex"),e();break;case"audio":c[2].src=a,c[2].classList.add("displayFlex"),e();break;default:t.showTextOnMetaCanvas(r,"暂不支持预览此文件","文件类型："+h),e()}t.showSize(r.querySelector(".sizeLabel"),o),r.querySelector(".typeLabel").innerText="里文件类型："+h})));case 2:case"end":return e.stop()}}),e)})),c=function(){var t=this,e=arguments;return new Promise((function(i,a){var n=h.apply(t,e);function o(t){r(n,i,a,o,s,"next",t)}function s(t){r(n,i,a,o,s,"throw",t)}o(void 0)}))},function(t,e,i,r){return c.apply(this,arguments)})},{key:"showSize",value:function(t,e){t.innerText="里文件大小："+function(t){return t>=1048576?(t/1048576).toFixed(2)+" MB":t>1024?(t/1024).toFixed(2)+" KB":t+" B"}(e)}}],n&&o(e.prototype,n),s&&o(e,s),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,n,s,h,c}();s(c,"classifyFileType",(function(e){return t[e]||"application/octet-stream"})),s(c,"clearCanvas",(function(t){t.width=300,t.height=150}));let l=[];self.onmessage=async t=>{try{switch(t.data.mission){case"init":l.push(new _(t.data.defaultArguments)),l.push(new f(t.data.defaultArguments)),l.push(new u(t.data.defaultArguments)),l.push(new d(t.data.defaultArguments)),l.push(new p(t.data.defaultArguments)),l.push(new g(t.data.defaultArguments));break;case"length":postMessage({success:!0,result:l[t.data.version].getRequiredLength(t.data.hiddenFile,t.data.diff)});break;case"encode":postMessage({success:!0,result:l[t.data.version].encode(t.data.innerImageData,t.data.coverImageData,t.data.hiddenFile,t.data.fileExt,t.data.diff)})}}catch(t){postMessage({success:!1,error:t})}};class f{constructor(t){this._version=1,this._globalDefaultDiff=t.default_difference,this._defaultDiff=t.version_1.default_difference,this._remained=t.version_1.remained,this._padding=t.version_1.padding,this._scale_i=t.version_1.scale_inner,this._offset_i=t.version_1.offset_inner,this._scale_c=t.version_1.scale_cover,this._offset_c=t.version_1.offset_cover}encode(t,e,i,r,a,n=1){if(this._innerData=t.data,this._coverData=e.data,this._width=t.width,this._height=t.height,this._pixelRange=1===n?this._innerData.length>>2:3,1===n&&this._pixelRange<this.getRequiredLength(i))throw new Error("可用像素过少，编码空间不足！");this._version=n;let o=new Uint8ClampedArray(this._innerData.length);this._byteArray=i,this._targetSize=this._byteArray.length,this._fileExtension=r,this._diff=a||this._defaultDiff;for(let t=0;t<this._pixelRange;t++){const e=t<3?this._globalDefaultDiff:t<6?this._defaultDiff:this._diff;if(this._isInner(t)){const i=this._scale(this._innerData[4*t],this._scale_i,this._offset_i),{r,g:a,b:n}=this._getBits(t);o[4*t]=r?255-e:255,o[4*t+1]=a?255-e:255,o[4*t+2]=n?255-e:255,o[4*t+3]=i}else{const i=this._scale(this._coverData[4*t],this._scale_c,this._offset_c),{r,g:a,b:n}=this._getBits(t);o[4*t]=r?e:0,o[4*t+1]=a?e:0,o[4*t+2]=n?e:0,o[4*t+3]=255-i}}return o}getRequiredLength(t){return 3*(t.length+this._remained+this._padding)}_getBits=t=>{const e=t%3,i=Math.floor(t/3);return 0===i?this._getBitsFromByte(this._version,e):1===i?this._getBitsFromByte(Math.floor(this._diff/2),e):i<=5?this._getBitsFromByte(this._targetSize>>(i-2<<3)&255,e):i<this._remained?i-6<this._fileExtension.length?this._getBitsFromByte(this._fileExtension.charCodeAt(i-6),e):this._getBitsFromByte(0,e):i<this._targetSize+this._remained?this._getBitsFromByte(this._byteArray[i-this._remained],e):this._getRandomBits()};_scale=(t,e,i)=>Math.floor(t*e+i);_isInner=t=>(t%this._width+Math.floor(t/this._width))%2==0;_getBitsFromByte=(t,e)=>{const i=t>>3*e,r=1&i,a=i>>1&1;return 2!=e?{r,g:a,b:i>>2&1}:{r,g:a,b:this._calParityBit(t)}};_getRandomBits=()=>({r:Math.random()>.5?1:0,g:Math.random()>.5?1:0,b:Math.random()>.5?1:0});_calParityBit=t=>{let e=0;for(let i=0;i<8;i++)e^=t>>i&1;return e}}class u extends f{constructor(t){super(t),this._version=2,this._defaultDiff=t.version_2.default_difference,this._remained=t.version_2.remained,this._padding=t.version_2.padding,this._scale_i=t.version_2.scale_inner,this._offset_i=t.version_2.offset_inner,this._scale_c=t.version_2.scale_cover,this._offset_c=t.version_2.offset_cover}getRequiredLength(t){return 3*(t.length>>1+this._remained+this._padding)}encode(t,e,i,r,a){let n=super.encode(t,e,i,r,void 0,this._version);if(this._diff=a,this._pixelRange=t.data.length>>2,this._pixelRange<this.getRequiredLength(i))throw new Error("可用像素过少，编码空间不足！");if(1&this._targetSize){let t=new Uint8Array(this._targetSize+1);t.set(this._byteArray),t[this._targetSize]=0,this._byteArray=t}for(let t=3;t<this._pixelRange;t++){const e=Math.floor((t<6?this._defaultDiff:this._diff)/3);if(this._isInner(t)){const i=this._scale(this._innerData[4*t],this._scale_i,this._offset_i),{r,g:a,b:o}=this._getBitsPair(t);n[4*t]=255-e*r,n[4*t+1]=255-e*a,n[4*t+2]=255-e*o,n[4*t+3]=i}else{const i=this._scale(this._coverData[4*t],this._scale_c,this._offset_c),{r,g:a,b:o}=this._getBitsPair(t);n[4*t]=e*r,n[4*t+1]=e*a,n[4*t+2]=e*o,n[4*t+3]=255-i}}return n}_getBitsPair=t=>{const e=t%3,i=Math.floor(t/3);return i<2?this._getBitsFromBytePair(Math.floor(this._diff/6),e):i<4?this._getBitsFromBytePair(this._targetSize>>(i-2<<4)&65535,e):i<this._remained?i-4<this._fileExtension.length?this._getBitsFromBytePair(this._fileExtension.charCodeAt(i-4),e):this._getBitsFromByte(0,e):i<Math.ceil(this._targetSize/2)+this._remained?this._getBitsFromBytePair(this._byteArray[i-this._remained<<1]|this._byteArray[1+(i-this._remained<<1)]<<8,e):this._getRandomBits()};_getBitsFromBytePair=(t,e)=>{const i=t>>6*e,r=3&i,a=i>>2&3;return 2!=e?{r,g:a,b:i>>4&3}:{r,g:a,b:this._calParityBitPair(t)}};_calParityBitPair=t=>{let e=0;for(let i=0;i<8;i++)e^=t>>i&1;for(let i=8;i<16;i++)e^=(t>>i&1)<<1;return e};_getRandomBits=()=>({r:Math.floor(4*Math.random()),g:Math.floor(4*Math.random()),b:Math.floor(4*Math.random())})}class _{constructor(t){this._defaultDiff=t.version_0.default_difference,this._padding=t.version_0.padding,this._scale_i=t.version_0.scale_inner,this._offset_i=t.version_0.offset_inner,this._scale_c=t.version_0.scale_cover,this._offset_c=t.version_0.offset_cover}encode=(t,e,i,r,a)=>{const n=t.data,o=e.data,s=t.width,h=n.length>>2;this._targetSize=i.length,this._compress=this._calCompress(a||this._defaultDiff);let l=new Uint8ClampedArray(n.length);if(l[0]=248,l[1]=251,l[2]=248|this._compress,l[3]=this._scaleInner(n[0]),this._byteArray=[],this._byteArray.push(...this._targetSize.toString().split("").map((t=>t.charCodeAt(0)))),this._byteArray.push(1),this._byteArray.push(...("mtc."+r).split("").map((t=>t.charCodeAt(0)))),this._byteArray.push(1),this._byteArray.push(...c.classifyFileType(r).split("").map((t=>t.charCodeAt(0)))),this._byteArray.push(0),this._fileArray=i,this._byteArray.length>this._padding)throw new Error("头部信息过长！可尝试更改文件拓展名。");this._bytePos=0,this._buffer=0,this._bufferSize=0;const f=255&~((1<<this._compress)-1);for(let t=1;t<h;t++){const e=(t%s+Math.floor(t/s))%2==0;l[4*t]=e?f|this._popBits():this._popBits(),l[4*t+1]=e?f|this._popBits():this._popBits(),l[4*t+2]=e?f|this._popBits():this._popBits(),l[4*t+3]=e?this._scaleInner(n[4*t]):255-this._scaleCover(o[4*t])}if(this._bytePos<this._byteArray.length+this._targetSize)throw new Error("可用像素过少，编码空间不足！");return l};getRequiredLength=(t,e)=>{const i=this._calCompress(e);return Math.ceil((this._padding+t.length<<3)/i/3)+1};_calCompress=t=>Math.min(Math.max(Math.floor(t/10),1),7);_pushByte=()=>{const t=this._bytePos<this._byteArray.length?this._byteArray[this._bytePos]:this._bytePos<this._byteArray.length+this._targetSize?this._fileArray[this._bytePos-this._byteArray.length]:Math.floor(256*Math.random());this._bytePos++,this._buffer=this._buffer<<8|t,this._bufferSize+=8};_popBits=()=>{this._bufferSize<this._compress&&this._pushByte();const t=(this._buffer&(1<<this._compress)-1<<this._bufferSize-this._compress)>>this._bufferSize-this._compress;return this._bufferSize-=this._compress,this._buffer&=(1<<this._bufferSize)-1,t};_scaleInner=t=>Math.floor(t*this._scale_i+this._offset_i);_scaleCover=t=>Math.floor(t*this._scale_c+this._offset_c)}class d extends _{constructor(t){super(t),this._defaultDiff=t.version_3.default_difference,this._padding=t.version_3.padding}encode=(t,e,i,r,a)=>{const n=t.data,o=n.length>>2;this._targetSize=i.length,this._compress=this._calCompress(a||this._defaultDiff);let s=new Uint8ClampedArray(n.length);if(s[0]=192&n[0]|56,s[1]=192&n[1]|35,s[2]=192&n[1]|this._compress,s[3]=255,this._byteArray=[],this._byteArray.push(...this._targetSize.toString().split("").map((t=>t.charCodeAt(0)))),this._byteArray.push(1),this._byteArray.push(...("mtc."+r).split("").map((t=>t.charCodeAt(0)))),this._byteArray.push(1),this._byteArray.push(...c.classifyFileType(r).split("").map((t=>t.charCodeAt(0)))),this._byteArray.push(0),this._fileArray=i,this._byteArray.length>this._padding)throw new Error("头部信息过长！可尝试更改文件拓展名。");this._bytePos=0,this._buffer=0,this._bufferSize=0;const h=255&~((1<<this._compress)-1);for(let t=1;t<o;t++)s[4*t]=n[4*t]&h|this._popBits(),s[4*t+1]=n[4*t+1]&h|this._popBits(),s[4*t+2]=n[4*t+2]&h|this._popBits(),s[4*t+3]=255;if(this._bytePos<this._byteArray.length+this._targetSize)throw new Error("可用像素过少，编码空间不足！");return s}}class p{constructor(t){this._scale_i=t.version_4.scale_inner,this._scale_c=t.version_4.scale_cover}encode=(t,e)=>{const i=t.data,r=e.data;let a=new Uint8ClampedArray(i.length);a[0]=114,a[1]=114,a[2]=114,a[3]=255;for(let t=4;t<i.length;t+=4){const e=this._scale_l(i[t],this._scale_i),n=this._scale_h(r[t],this._scale_c);a[t+3]=255-n+e,a[t]=255*e/a[t+3],a[t+1]=a[t+2]=a[t]}return a};_scale_l=(t,e)=>Math.floor(t*e);_scale_h=(t,e)=>Math.floor(255-(255-t)*e);getRequiredLength=()=>1}class g extends p{constructor(t){super(t),this._scale_i=t.version_4.scale_inner,this._scale_c=t.version_4.scale_cover,this._weight_i=t.version_5.weight_inner,this._weight_c=t.version_5.weight_cover}encode=(t,e)=>{const i=t.data,r=e.data;let a=new Uint8ClampedArray(i.length);a[0]=51,a[1]=51,a[2]=51,a[3]=255;for(let t=4;t<i.length;t+=4){const e=this._scale_l(i[t],this._scale_i),n=this._scale_l(i[t+1],this._scale_i),o=this._scale_l(i[t+2],this._scale_i),s=this._scale_h(r[t],this._scale_c),h=this._scale_h(r[t+1],this._scale_c),c=this._scale_h(r[t+2],this._scale_c),l=e-s,f=n-h,u=o-c,_=Math.max(255+((l*l-u*u)/512+(e+s)*(l-u)/256+4*l+8*f+5.9921875*u)/((l-u)/128+17+127/128),0);a[t]=255*e/_*this._weight_i+(255-(255-s)/_*255)*this._weight_c,a[t+1]=255*n/_*this._weight_i+(255-(255-h)/_*255)*this._weight_c,a[t+2]=255*o/_*this._weight_i+(255-(255-c)/_*255)*this._weight_c,a[t+3]=_}return a}}})();