/*! For license information please see 38.365ff510bff8940fd907.js.LICENSE.txt */
"use strict";(self.webpackChunkmirage_cloak=self.webpackChunkmirage_cloak||[]).push([[38],{38:(e,t,r)=>{r.r(t),r.d(t,{CloakEncoder:()=>x});var n=r(246),a=r(23),i=r(287).hp;function o(e){Math.round;var t,r,n,a,o,s=Math.floor,c=new Array(64),h=new Array(64),u=new Array(64),f=new Array(64),_=new Array(65535),d=new Array(65535),l=new Array(64),g=new Array(64),v=[],m=0,p=7,y=new Array(64),w=new Array(64),b=new Array(64),C=new Array(256),I=new Array(2048),x=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],A=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],D=[0,1,2,3,4,5,6,7,8,9,10,11],k=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],E=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],S=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],L=[0,1,2,3,4,5,6,7,8,9,10,11],M=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],B=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];function j(e,t){for(var r=0,n=0,a=new Array,i=1;i<=16;i++){for(var o=1;o<=e[i];o++)a[t[n]]=[],a[t[n]][0]=r,a[t[n]][1]=i,n++,r++;r*=2}return a}function O(e){for(var t=e[0],r=e[1]-1;r>=0;)t&1<<r&&(m|=1<<p),r--,--p<0&&(255==m?(P(255),P(0)):P(m),p=7,m=0)}function P(e){v.push(e)}function z(e){P(e>>8&255),P(255&e)}function R(e,t,r,n,a){for(var i,o=a[0],s=a[240],c=function(e,t){var r,n,a,i,o,s,c,h,u,f,_=0;for(u=0;u<8;++u){r=e[_],n=e[_+1],a=e[_+2],i=e[_+3],o=e[_+4],s=e[_+5],c=e[_+6];var d=r+(h=e[_+7]),g=r-h,v=n+c,m=n-c,p=a+s,y=a-s,w=i+o,b=i-o,C=d+w,I=d-w,x=v+p,A=v-p;e[_]=C+x,e[_+4]=C-x;var D=.707106781*(A+I);e[_+2]=I+D,e[_+6]=I-D;var k=.382683433*((C=b+y)-(A=m+g)),E=.5411961*C+k,S=1.306562965*A+k,L=.707106781*(x=y+m),M=g+L,B=g-L;e[_+5]=B+E,e[_+3]=B-E,e[_+1]=M+S,e[_+7]=M-S,_+=8}for(_=0,u=0;u<8;++u){r=e[_],n=e[_+8],a=e[_+16],i=e[_+24],o=e[_+32],s=e[_+40],c=e[_+48];var j=r+(h=e[_+56]),O=r-h,P=n+c,z=n-c,R=a+s,T=a-s,F=i+o,U=i-o,H=j+F,q=j-F,G=P+R,N=P-R;e[_]=H+G,e[_+32]=H-G;var Q=.707106781*(N+q);e[_+16]=q+Q,e[_+48]=q-Q;var W=.382683433*((H=U+T)-(N=z+O)),J=.5411961*H+W,V=1.306562965*N+W,Y=.707106781*(G=T+z),$=O+Y,K=O-Y;e[_+40]=K+J,e[_+24]=K-J,e[_+8]=$+V,e[_+56]=$-V,_++}for(u=0;u<64;++u)f=e[u]*t[u],l[u]=f>0?f+.5|0:f-.5|0;return l}(e,t),h=0;h<64;++h)g[x[h]]=c[h];var u=g[0]-r;r=g[0],0==u?O(n[0]):(O(n[d[i=32767+u]]),O(_[i]));for(var f=63;f>0&&0==g[f];f--);if(0==f)return O(o),r;for(var v,m=1;m<=f;){for(var p=m;0==g[m]&&m<=f;++m);var y=m-p;if(y>=16){v=y>>4;for(var w=1;w<=v;++w)O(s);y&=15}i=32767+g[m],O(a[(y<<4)+d[i]]),O(_[i]),m++}return 63!=f&&O(o),r}function T(e){if(e<=0&&(e=1),e>100&&(e=100),o!=e){(function(e){for(var t=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],r=0;r<64;r++){var n=s((t[r]*e+50)/100);n<1?n=1:n>255&&(n=255),c[x[r]]=n}for(var a=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],i=0;i<64;i++){var o=s((a[i]*e+50)/100);o<1?o=1:o>255&&(o=255),h[x[i]]=o}for(var _=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],d=0,l=0;l<8;l++)for(var g=0;g<8;g++)u[d]=1/(c[x[d]]*_[l]*_[g]*8),f[d]=1/(h[x[d]]*_[l]*_[g]*8),d++})(e<50?Math.floor(5e3/e):Math.floor(200-2*e)),o=e}}this.encode=function(e,o){var s;(new Date).getTime();o&&T(o),v=new Array,m=0,p=7,z(65496),z(65504),z(16),P(74),P(70),P(73),P(70),P(0),P(1),P(1),P(0),z(1),z(1),P(0),P(0),void 0!==(s=e.comments)&&s.constructor===Array&&s.forEach((function(e){if("string"==typeof e){z(65534);var t,r=e.length;for(z(r+2),t=0;t<r;t++)P(e.charCodeAt(t))}})),function(e){if(e){z(65505),69===e[0]&&120===e[1]&&105===e[2]&&102===e[3]?z(e.length+2):(z(e.length+5+2),P(69),P(120),P(105),P(102),P(0));for(var t=0;t<e.length;t++)P(e[t])}}(e.exifBuffer),function(){z(65499),z(132),P(0);for(var e=0;e<64;e++)P(c[e]);P(1);for(var t=0;t<64;t++)P(h[t])}(),function(e,t){z(65472),z(17),P(8),z(t),z(e),P(3),P(1),P(17),P(0),P(2),P(17),P(1),P(3),P(17),P(1)}(e.width,e.height),function(){z(65476),z(418),P(0);for(var e=0;e<16;e++)P(A[e+1]);for(var t=0;t<=11;t++)P(D[t]);P(16);for(var r=0;r<16;r++)P(k[r+1]);for(var n=0;n<=161;n++)P(E[n]);P(1);for(var a=0;a<16;a++)P(S[a+1]);for(var i=0;i<=11;i++)P(L[i]);P(17);for(var o=0;o<16;o++)P(M[o+1]);for(var s=0;s<=161;s++)P(B[s])}(),z(65498),z(12),P(3),P(1),P(0),P(2),P(17),P(3),P(17),P(0),P(63),P(0);var _=0,d=0,l=0;m=0,p=7,this.encode.displayName="_encode_";for(var g,C,x,j,F,U,H,q,G,N=e.data,Q=e.width,W=e.height,J=4*Q,V=0;V<W;){for(g=0;g<J;){for(U=F=J*V+g,H=-1,q=0,G=0;G<64;G++)U=F+(q=G>>3)*J+(H=4*(7&G)),V+q>=W&&(U-=J*(V+1+q-W)),g+H>=J&&(U-=g+H-J+4),C=N[U++],x=N[U++],j=N[U++],y[G]=(I[C]+I[x+256|0]+I[j+512|0]>>16)-128,w[G]=(I[C+768|0]+I[x+1024|0]+I[j+1280|0]>>16)-128,b[G]=(I[C+1280|0]+I[x+1536|0]+I[j+1792|0]>>16)-128;_=R(y,u,_,t,n),d=R(w,f,d,r,a),l=R(b,f,l,r,a),g+=32}V+=8}if(p>=0){var Y=[];Y[1]=p+1,Y[0]=(1<<p+1)-1,O(Y)}return z(65497),i.from(v)},function(){(new Date).getTime();e||(e=50),function(){for(var e=String.fromCharCode,t=0;t<256;t++)C[t]=e(t)}(),t=j(A,D),r=j(S,L),n=j(k,E),a=j(M,B),function(){for(var e=1,t=2,r=1;r<=15;r++){for(var n=e;n<t;n++)d[32767+n]=r,_[32767+n]=[],_[32767+n][1]=r,_[32767+n][0]=n;for(var a=-(t-1);a<=-e;a++)d[32767+a]=r,_[32767+a]=[],_[32767+a][1]=r,_[32767+a][0]=t-1+a;e<<=1,t<<=1}}(),function(){for(var e=0;e<256;e++)I[e]=19595*e,I[e+256|0]=38470*e,I[e+512|0]=7471*e+32768,I[e+768|0]=-11059*e,I[e+1024|0]=-21709*e,I[e+1280|0]=32768*e+8421375,I[e+1536|0]=-27439*e,I[e+1792|0]=-5329*e}(),T(e),(new Date).getTime()}()}function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function c(e){return function(e){if(Array.isArray(e))return h(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function u(){return u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!{}.hasOwnProperty.call(e,t)&&null!==(e=y(e)););return e}(e,t);if(n){var a=Object.getOwnPropertyDescriptor(n,t);return a.get?a.get.call(arguments.length<3?e:r):a.value}},u.apply(null,arguments)}function f(){f=function(){return t};var e,t={},r=Object.prototype,n=r.hasOwnProperty,a=Object.defineProperty||function(e,t,r){e[t]=r.value},i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",h=i.toStringTag||"@@toStringTag";function u(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,r){return e[t]=r}}function _(e,t,r,n){var i=t&&t.prototype instanceof y?t:y,o=Object.create(i.prototype),s=new B(n||[]);return a(o,"_invoke",{value:E(e,r,s)}),o}function d(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=_;var l="suspendedStart",g="suspendedYield",v="executing",m="completed",p={};function y(){}function w(){}function b(){}var C={};u(C,o,(function(){return this}));var I=Object.getPrototypeOf,x=I&&I(I(j([])));x&&x!==r&&n.call(x,o)&&(C=x);var A=b.prototype=y.prototype=Object.create(C);function D(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function k(e,t){function r(a,i,o,c){var h=d(e[a],e,i);if("throw"!==h.type){var u=h.arg,f=u.value;return f&&"object"==s(f)&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,o,c)}),(function(e){r("throw",e,o,c)})):t.resolve(f).then((function(e){u.value=e,o(u)}),(function(e){return r("throw",e,o,c)}))}c(h.arg)}var i;a(this,"_invoke",{value:function(e,n){function a(){return new t((function(t,a){r(e,n,t,a)}))}return i=i?i.then(a,a):a()}})}function E(t,r,n){var a=l;return function(i,o){if(a===v)throw Error("Generator is already running");if(a===m){if("throw"===i)throw o;return{value:e,done:!0}}for(n.method=i,n.arg=o;;){var s=n.delegate;if(s){var c=S(s,n);if(c){if(c===p)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(a===l)throw a=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a=v;var h=d(t,r,n);if("normal"===h.type){if(a=n.done?m:g,h.arg===p)continue;return{value:h.arg,done:n.done}}"throw"===h.type&&(a=m,n.method="throw",n.arg=h.arg)}}}function S(t,r){var n=r.method,a=t.iterator[n];if(a===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,S(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),p;var i=d(a,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,p;var o=i.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function L(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function M(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function B(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(L,this),this.reset(!0)}function j(t){if(t||""===t){var r=t[o];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){for(;++a<t.length;)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}throw new TypeError(s(t)+" is not iterable")}return w.prototype=b,a(A,"constructor",{value:b,configurable:!0}),a(b,"constructor",{value:w,configurable:!0}),w.displayName=u(b,h,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===w||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,b):(e.__proto__=b,u(e,h,"GeneratorFunction")),e.prototype=Object.create(A),e},t.awrap=function(e){return{__await:e}},D(k.prototype),u(k.prototype,c,(function(){return this})),t.AsyncIterator=k,t.async=function(e,r,n,a,i){void 0===i&&(i=Promise);var o=new k(_(e,r,n,a),i);return t.isGeneratorFunction(r)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},D(A),u(A,h,"Generator"),u(A,o,(function(){return this})),u(A,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=j,B.prototype={constructor:B,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(M),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return s.type="throw",s.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),h=n.call(o,"finallyLoc");if(c&&h){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!h)throw Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),M(r),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;M(r)}return a}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),p}},t}function _(e,t,r,n,a,i,o){try{var s=e[i](o),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,a)}function d(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function o(e){_(i,n,a,o,s,"next",e)}function s(e){_(i,n,a,o,s,"throw",e)}o(void 0)}))}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function g(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,I(n.key),n)}}function v(e,t,r){return t&&g(e.prototype,t),r&&g(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function m(e,t,r){return t=y(t),function(e,t){if(t&&("object"==s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,p()?Reflect.construct(t,r||[],y(e).constructor):t.apply(e,r))}function p(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(p=function(){return!!e})()}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}function w(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&b(e,t)}function b(e,t){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},b(e,t)}function C(e,t,r){return(t=I(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function I(e){var t=function(e,t){if("object"!=s(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==s(t)?t:t+""}var x=function(e){function t(e,r,n,i,s,c,h){var u;switch(l(this,t),C(u=m(this,t,[e]),"updateInnerImage",function(){var e=d(f().mark((function e(t){var r,n;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u._innerImage=t,0!==u._mirageSize?u._innerImage.width>u._innerImage.height?(u._width=u._mirageSize,u._height=Math.ceil(u._innerImage.height*u._mirageSize/u._innerImage.width)):(u._height=u._mirageSize,u._width=Math.ceil(u._innerImage.width*u._mirageSize/u._innerImage.height)):(u._width=u._innerImage.width,u._height=u._innerImage.height),!u._byteArray){e.next=7;break}return e.next=5,u._adjustSize();case 5:r=e.sent,console.log("Size to be encoded: "+r);case 7:u._innerCanvas.width=u._width,u._innerCanvas.height=u._height,(n=u._innerCanvas.getContext("2d")).drawImage(t,0,0,u._width,u._height),u._innerImageData=n.getImageData(0,0,u._width,u._height),u._sizeLabel.innerHTML="输出图像预计尺寸: ".concat(u._width,"x").concat(u._height),u.convertGray(u._innerImageData),u.adjustImageData(u._innerCanvas,u._innerImageData,u._innerContrast,u._innerLuminance),u._isAddMark&&u.addMark(u._innerCanvas),u._coverImageData&&u.updateCoverImage(u._coverImage);case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C(u,"_adjustSize",d(f().mark((function e(){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=d(f().mark((function e(t,r){var n,a,i,o,s,c;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=u._width*u._height,!((a=u._encoders[u._version].getRequiredLength(u._byteArray,u._diff))>n)){e.next=41;break}if(i=a/n,!u._hiddenFile.type.startsWith("image")||u._hiddenFile.type.startsWith("image/gif")){e.next=33;break}return e.next=7,u._drawHiddenImageOnCanvas();case 7:if(!u._isCompress){e.next=30;break}if(!(o=u._hiddenCanvas.getContext("2d").getImageData(0,0,u._hiddenCanvas.width,u._hiddenCanvas.height))){e.next=30;break}if(s=u._JpegEncoder.encode(o,u._compressQuality),a=u._encoders[u._version].getRequiredLength(s,u._diff),!((i=a/n)>1)){e.next=25;break}return i=Math.sqrt(i),u._hiddenCanvas.width=Math.ceil(u._hiddenCanvas.width*i),u._hiddenCanvas.height=Math.ceil(u._hiddenCanvas.height*i),e.next=19,u._drawHiddenImageOnCanvas(1/i);case 19:c=u._hiddenCanvas.getContext("2d"),o=c.getImageData(0,0,u._hiddenCanvas.width,u._hiddenCanvas.height),s=u._JpegEncoder.encode(o,u._compressQuality),a=u._encoders[u._version].getRequiredLength(s,u._diff),(i=a/n)>1&&u._scaleSize(i);case 25:return u._hiddenSizeLabel.innerHTML="隐藏图像尺寸: ".concat(u._hiddenCanvas.width,"x").concat(u._hiddenCanvas.height),u._byteArrayCompressed=s,u._fileExtensionCompressed="jpg",t(u._byteArrayCompressed.length),e.abrupt("return");case 30:u._hiddenSizeLabel.innerHTML="隐藏图像尺寸: ".concat(u._hiddenCanvas.width,"x").concat(u._hiddenCanvas.height),e.next=36;break;case 33:u._hiddenSizeLabel.innerHTML="",u._byteArrayCompressed=null,u._fileExtensionCompressed="";case 36:return u._scaleSize(i),t(u._byteArray.length),e.abrupt("return");case 41:return u._byteArrayCompressed=null,u._fileExtensionCompressed="",t(u._byteArray.length),e.abrupt("return");case 45:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})))),C(u,"_scaleSize",(function(e){e=Math.sqrt(e),u._width=Math.ceil(u._width*e),u._height=Math.ceil(u._height*e)})),C(u,"updateHiddenFile",function(){var e=d(f().mark((function e(t){var r,n;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u._hiddenFile=t,u._byteArrayCompressed=null,r=t.name,-1!==(n=r.lastIndexOf("."))&&n<r.length-1?(u._fileExtension=r.substring(n+1).toLowerCase(),u._fileExtension.length>10&&(alert("文件拓展名过长，已截断为: "+u._fileExtension.substring(0,10)),u._fileExtension=u._fileExtension.substring(0,10))):u._fileExtension="",!t.type.startsWith("image/")||t.type.startsWith("image/gif")){e.next=12;break}return e.next=8,u._drawHiddenImageOnCanvas();case 8:u._hiddenSizeLabel.innerHTML="隐藏图像尺寸: ".concat(u._hiddenCanvas.width,"x").concat(u._hiddenCanvas.height),u._getHiddenByteArray(),e.next=15;break;case 12:u._hiddenSizeLabel.innerHTML="",u.showTextOnCanvas(u._hiddenCanvas,"暂不支持预览此文件",t.type?"文件类型: "+t.type:""),u._getHiddenByteArray();case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C(u,"_getHiddenByteArray",(function(){var e=new FileReader;e.onload=function(e){var t=e.target.result;u._byteArray=new Uint8Array(t),u._innerImage&&u.updateInnerImage(u._innerImage)},e.readAsArrayBuffer(u._hiddenFile)})),C(u,"_drawHiddenImageOnCanvas",d(f().mark((function e(){var t,r,n=arguments;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:1,r=new Image,e.next=4,new Promise((function(e,n){r.onload=function(){u.clearCanvas(u._hiddenCanvas),u._hiddenCanvas.width=r.width*t,u._hiddenCanvas.height=r.height*t,u._hiddenCanvas.getContext("2d").drawImage(r,0,0,u._hiddenCanvas.width,u._hiddenCanvas.height),URL.revokeObjectURL(r.src),e()},r.onerror=n,r.src=URL.createObjectURL(u._hiddenFile)}));case 4:case"end":return e.stop()}}),e)})))),C(u,"process",(function(){if(!u._innerImageData||!u._coverImageData||!u._byteArray)throw new Error("请先选择图像和文件！");u.showTextOnCanvas(u._outputCanvas,"正在处理，请稍候...");var e=u._innerCanvas.getContext("2d").getImageData(0,0,u._width,u._height),t=u._coverCanvas.getContext("2d").getImageData(0,0,u._width,u._height);console.log("Encoding..."),console.log("    Version: "+u._version),console.log("    Output size: "+u._width+"x"+u._height),console.log("    Size to be encoded: "+(u._isCompress&&u._byteArrayCompressed?u._byteArrayCompressed.length:u._byteArray.length)),console.log("    File extension: "+(u._isCompress&&u._fileExtensionCompressed?u._fileExtensionCompressed:u._fileExtension)),console.log("    Difference: "+u._diff),u._outputData=u._encoders[u._version].encode(e,t,u._isCompress&&u._byteArrayCompressed?u._byteArrayCompressed:u._byteArray,u._isCompress&&u._fileExtensionCompressed?u._fileExtensionCompressed:u._fileExtension,u._diff),u._outputCanvas.width=u._width,u._outputCanvas.height=u._height;var r=new ImageData(u._outputData,u._width,u._height);u._outputCanvas.getContext("2d").putImageData(r,0,0),u._isOutputCanvasCleared=!1,console.log("Encoding finished")})),C(u,"convertGray",(function(e){for(var t=e.data,r=0;r<t.length;r+=4){var n=.299*t[r]+.587*t[r+1]+.114*t[r+2];t[r]=n,t[r+1]=n,t[r+2]=n}})),C(u,"adjustInnerContrast",(function(e){u._innerContrast=e,u._innerImageData&&(u.adjustImageData(u._innerCanvas,u._innerImageData,e,u._innerLuminance),u._isAddMark&&u.addMark(u._innerCanvas))})),C(u,"adjustCoverContrast",(function(e){u._coverContrast=e,u._coverImageData&&(u.adjustImageData(u._coverCanvas,u._coverImageData,e,u._coverLuminance),u._isAddMark&&u.addMark(u._coverCanvas))})),C(u,"adjustInnerLuminance",(function(e){u._innerLuminance=e,u._innerImageData&&(u.adjustImageData(u._innerCanvas,u._innerImageData,u._innerContrast,e),u._isAddMark&&u.addMark(u._innerCanvas))})),C(u,"adjustCoverLuminance",(function(e){u._coverLuminance=e,u._coverImageData&&(u.adjustImageData(u._coverCanvas,u._coverImageData,u._coverContrast,e),u._isAddMark&&u.addMark(u._coverCanvas))})),C(u,"saveOutputImage",(function(){if(!u._outputData)throw new Error("请先处理图像！");var e=(new Date).getTime(),t=document.createElement("a"),r=new Blob([(0,a.lF)({width:u._width,height:u._height,data:u._outputData})],{type:"image/png"});t.href=URL.createObjectURL(r),t.download="encoded_".concat(e,".png"),document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(t.href)})),C(u,"setIsAddMark",(function(e){u._isAddMark=e,e?(u._innerImageData&&u.addMark(u._innerCanvas),u._coverImageData&&u.addMark(u._coverCanvas)):(u._innerImageData&&u.adjustImageData(u._innerCanvas,u._innerImageData,u._innerContrast,u._innerLuminance),u._coverImageData&&u.adjustImageData(u._coverCanvas,u._coverImageData,u._coverContrast,u._coverLuminance))})),C(u,"setMirageSize",(function(e){u._mirageSize=e,u._innerImage&&u.updateInnerImage(u._innerImage)})),C(u,"setDiff",(function(e){u._diff=e,0===u._version&&u._byteArray&&u._innerImage&&u.updateInnerImage(u._innerImage)})),C(u,"setVersion",(function(e){u._version=e,u._byteArray&&u._innerImage&&u.updateInnerImage(u._innerImage)})),C(u,"setIsCompress",function(){var e=d(f().mark((function e(t){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u._isCompress=t,u._byteArray&&u._innerImage&&u.updateInnerImage(u._innerImage);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C(u,"clearOutputCanvas",(function(){u._isOutputCanvasCleared||(u.clearCanvas(u._outputCanvas),u._isOutputCanvasCleared=!0,u._outputData=null)})),u._innerImage=null,u._coverImage=null,u._innerImageData=null,u._coverImageData=null,u._innerContrast=e.contrast_inner,u._coverContrast=e.contrast_cover,u._innerLuminance=e.luminance_inner,u._coverLuminance=e.luminance_cover,u._mirageSize=e.mirage_size,u._isCompress=e.encode_compress,u._compressQuality=e.encode_compress_quality,u._version=e.version,u._version){case 0:u._diff=e.version_0.difference;break;case 1:u._diff=e.version_1.difference;break;case 2:u._diff=e.version_2.difference}return u._hiddenFile=null,u._fileExtension="",u._fileExtensionCompressed="",u._byteArray=null,u._byteArrayCompressed=null,u._outputData=null,u._innerCanvas=document.getElementById(r),u._coverCanvas=document.getElementById(n),u._hiddenCanvas=document.getElementById(i),u._outputCanvas=document.getElementById(s),u._sizeLabel=document.getElementById(c),u._hiddenSizeLabel=document.getElementById(h),u._isAddMark=e.add_mark,u._markRatio=e.mark_ratio,u._JpegEncoder=new o(u._compressQuality),u._encoders=[new k(e),new A(e),new D(e)],u}return w(t,e),v(t,[{key:"updateCoverImage",value:function(e){if(this._coverImage=e,this._innerImage){var t,r,n,a,i=e.width/e.height;i<this._width/this._height?(t=0,r=Math.ceil((this._height-this._width/i)/2),n=this._width,a=Math.ceil(this._width/i)):(t=Math.ceil((this._width-this._height*i)/2),r=0,n=Math.ceil(this._height*i),a=this._height),this._coverCanvas.width=this._width,this._coverCanvas.height=this._height;var o=this._coverCanvas.getContext("2d");o.drawImage(e,t,r,n,a),this._coverImageData=o.getImageData(0,0,this._width,this._height)}else{this._coverCanvas.width=e.width,this._coverCanvas.height=e.height;var s=this._coverCanvas.getContext("2d");s.drawImage(e,0,0),this._coverImageData=s.getImageData(0,0,e.width,e.height)}this.convertGray(this._coverImageData),this.adjustImageData(this._coverCanvas,this._coverImageData,this._coverContrast,this._coverLuminance),this._isAddMark&&this.addMark(this._coverCanvas)}},{key:"addMark",value:function(e,t){if(!t){if(!applicationState.markImage)return;t=applicationState.markImage}var r=e.width*this._markRatio,n=e.height*this._markRatio,a=r/n,i=t.width/t.height;a>i?r=n*i:n=r/i,e.getContext("2d").drawImage(t,0,0,r,n)}}])}(n.i),A=function(){return v((function e(t){var r=this;l(this,e),C(this,"_getBits",(function(e){var t=e%3,n=Math.floor(e/3);return 0===n?r._getBitsFromByte(r._version,t):1===n?r._getBitsFromByte(Math.floor(r._diff/2),t):n<=5?r._getBitsFromByte(r._targetSize>>(n-2<<3)&255,t):n<r._remained?n-6<r._fileExtension.length?r._getBitsFromByte(r._fileExtension.charCodeAt(n-6),t):r._getBitsFromByte(0,t):n<r._targetSize+r._remained?r._getBitsFromByte(r._byteArray[n-r._remained],t):r._getRandomBits()})),C(this,"_scale",(function(e,t,r){return Math.floor(e*t+r)})),C(this,"_isInner",(function(e){return(e%r._width+Math.floor(e/r._width))%2==0})),C(this,"_getBitsFromByte",(function(e,t){var n=e>>3*t,a=1&n,i=n>>1&1;return 2!=t?{r:a,g:i,b:n>>2&1}:{r:a,g:i,b:r._calParityBit(e)}})),C(this,"_getRandomBits",(function(){return{r:Math.random()>.5?1:0,g:Math.random()>.5?1:0,b:Math.random()>.5?1:0}})),C(this,"_calParityBit",(function(e){for(var t=0,r=0;r<8;r++)t^=e>>r&1;return t})),this._version=1,this._globalDefaultDiff=t.default_difference,this._defaultDiff=t.version_1.default_difference,this._remained=t.version_1.remained,this._padding=t.version_1.padding,this._scale_i=t.version_1.scale_inner,this._offset_i=t.version_1.offset_inner,this._scale_c=t.version_1.scale_cover,this._offset_c=t.version_1.offset_cover}),[{key:"encode",value:function(e,t,r,n,a){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;if(this._innerData=e.data,this._coverData=t.data,this._width=e.width,this._height=e.height,this._pixelRange=1===i?this._innerData.length>>2:3,1===i&&this._pixelRange<this.getRequiredLength(r))throw new Error("可用像素过少，编码空间不足！");this._version=i;var o=new Uint8ClampedArray(this._innerData.length);this._byteArray=r,this._targetSize=this._byteArray.length,this._fileExtension=n,this._diff=a||this._defaultDiff;for(var s=0;s<this._pixelRange;s++){var c=s<3?this._globalDefaultDiff:s<6?this._defaultDiff:this._diff;if(this._isInner(s)){var h=this._scale(this._innerData[4*s],this._scale_i,this._offset_i),u=this._getBits(s),f=u.r,_=u.g,d=u.b;o[4*s]=f?255-c:255,o[4*s+1]=_?255-c:255,o[4*s+2]=d?255-c:255,o[4*s+3]=h}else{var l=this._scale(this._coverData[4*s],this._scale_c,this._offset_c),g=this._getBits(s),v=g.r,m=g.g,p=g.b;o[4*s]=v?c:0,o[4*s+1]=m?c:0,o[4*s+2]=p?c:0,o[4*s+3]=255-l}}return o}},{key:"getRequiredLength",value:function(e){return 3*(e.length+this._remained+this._padding)}}])}(),D=function(e){function t(e){var r;return l(this,t),C(r=m(this,t,[e]),"_getBitsPair",(function(e){var t=e%3,n=Math.floor(e/3);return n<2?r._getBitsFromBytePair(Math.floor(r._diff/6),t):n<4?r._getBitsFromBytePair(r._targetSize>>(n-2<<4)&65535,t):n<r._remained?n-4<r._fileExtension.length?r._getBitsFromBytePair(r._fileExtension.charCodeAt(n-4),t):r._getBitsFromByte(0,t):n<Math.ceil(r._targetSize/2)+r._remained?r._getBitsFromBytePair(r._byteArray[n-r._remained<<1]|r._byteArray[1+(n-r._remained<<1)]<<8,t):r._getRandomBits()})),C(r,"_getBitsFromBytePair",(function(e,t){var n=e>>6*t,a=3&n,i=n>>2&3;return 2!=t?{r:a,g:i,b:n>>4&3}:{r:a,g:i,b:r._calParityBitPair(e)}})),C(r,"_calParityBitPair",(function(e){for(var t=0,r=0;r<8;r++)t^=e>>r&1;for(var n=8;n<16;n++)t^=(e>>n&1)<<1;return t})),C(r,"_getRandomBits",(function(){return{r:Math.floor(4*Math.random()),g:Math.floor(4*Math.random()),b:Math.floor(4*Math.random())}})),r._version=2,r._defaultDiff=e.version_2.default_difference,r._remained=e.version_2.remained,r._padding=e.version_2.padding,r._scale_i=e.version_2.scale_inner,r._offset_i=e.version_2.offset_inner,r._scale_c=e.version_2.scale_cover,r._offset_c=e.version_2.offset_cover,r}return w(t,e),v(t,[{key:"getRequiredLength",value:function(e){return 3*(e.length>>1+this._remained+this._padding)}},{key:"encode",value:function(e,r,n,a,i){var o=function(e,t,r,n){var a=u(y(1&n?e.prototype:e),t,r);return 2&n?function(e){return a.apply(r,e)}:a}(t,"encode",this,3)([e,r,n,a,void 0,this._version]);if(this._diff=i,this._pixelRange=e.data.length>>2,this._pixelRange<this.getRequiredLength(n))throw new Error("可用像素过少，编码空间不足！");if(1&this._targetSize){var s=new Uint8Array(this._targetSize+1);s.set(this._byteArray),s[this._targetSize]=0,this._byteArray=s}for(var c=3;c<this._pixelRange;c++){var h=Math.floor((c<6?this._defaultDiff:this._diff)/3);if(this._isInner(c)){var f=this._scale(this._innerData[4*c],this._scale_i,this._offset_i),_=this._getBitsPair(c),d=_.r,l=_.g,g=_.b;o[4*c]=255-h*d,o[4*c+1]=255-h*l,o[4*c+2]=255-h*g,o[4*c+3]=f}else{var v=this._scale(this._coverData[4*c],this._scale_c,this._offset_c),m=this._getBitsPair(c),p=m.r,w=m.g,b=m.b;o[4*c]=h*p,o[4*c+1]=h*w,o[4*c+2]=h*b,o[4*c+3]=255-v}}return o}}])}(A),k=v((function e(t){var r=this;l(this,e),C(this,"encode",(function(e,t,a,i,o){var s,h,u,f=e.data,_=t.data,d=e.width,l=f.length>>2;r._targetSize=a.length,r._compress=r._calCompress(o||r._defaultDiff);var g=new Uint8ClampedArray(f.length);if(g[0]=248,g[1]=251,g[2]=248|r._compress,g[3]=r._scaleInner(f[0]),r._byteArray=[],(s=r._byteArray).push.apply(s,c(r._targetSize.toString().split("").map((function(e){return e.charCodeAt(0)})))),r._byteArray.push(1),(h=r._byteArray).push.apply(h,c(("mtc."+i).split("").map((function(e){return e.charCodeAt(0)})))),r._byteArray.push(1),(u=r._byteArray).push.apply(u,c(n.i.classifyFileType(i).split("").map((function(e){return e.charCodeAt(0)})))),r._byteArray.push(0),r._fileArray=a,r._byteArray.length>r._padding)throw new Error("头部信息过长！可尝试更改文件拓展名。");r._bytePos=0,r._buffer=0,r._bufferSize=0;for(var v=255&~((1<<r._compress)-1),m=1;m<l;m++){var p=(m%d+Math.floor(m/d))%2==0;g[4*m]=p?v|r._popBits():r._popBits(),g[4*m+1]=p?v|r._popBits():r._popBits(),g[4*m+2]=p?v|r._popBits():r._popBits(),g[4*m+3]=p?r._scaleInner(f[4*m]):255-r._scaleCover(_[4*m])}if(r._bytePos<r._byteArray.length+r._targetSize)throw new Error("可用像素过少，编码空间不足！");return g})),C(this,"getRequiredLength",(function(e,t){var n=r._calCompress(t);return Math.ceil((r._padding+e.length<<3)/n/3)+1})),C(this,"_calCompress",(function(e){return Math.min(Math.max(Math.floor(e/10),1),7)})),C(this,"_pushByte",(function(){var e=r._bytePos<r._byteArray.length?r._byteArray[r._bytePos]:r._bytePos<r._byteArray.length+r._targetSize?r._fileArray[r._bytePos-r._byteArray.length]:Math.floor(256*Math.random());r._bytePos++,r._buffer=r._buffer<<8|e,r._bufferSize+=8})),C(this,"_popBits",(function(){r._bufferSize<r._compress&&r._pushByte();var e=(r._buffer&(1<<r._compress)-1<<r._bufferSize-r._compress)>>r._bufferSize-r._compress;return r._bufferSize-=r._compress,r._buffer&=(1<<r._bufferSize)-1,e})),C(this,"_scaleInner",(function(e){return Math.floor(e*r._scale_i+r._offset_i)})),C(this,"_scaleCover",(function(e){return Math.floor(e*r._scale_c+r._offset_c)})),this._defaultDiff=t.version_0.default_difference,this._padding=t.version_0.padding,this._scale_i=t.version_0.scale_inner,this._offset_i=t.version_0.offset_inner,this._scale_c=t.version_0.scale_cover,this._offset_c=t.version_0.offset_cover}))},246:(e,t,r)=>{function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,i(n.key),n)}}function i(e){var t=function(e,t){if("object"!=n(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,t||"default");if("object"!=n(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==n(t)?t:t+""}r.d(t,{i:()=>u});var o,s,c,h={html:"text/html",css:"text/css",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",bmp:"image/bmp",webp:"image/webp",mp3:"audio/mpeg",wav:"audio/wav",ogg:"audio/ogg",mp4:"video/mp4",webm:"video/webm",flv:"video/x-flv",gif:"image/gif",svg:"image/svg+xml",pdf:"application/pdf",txt:"text/plain"},u=function(){return e=function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)},t=[{key:"showResult",value:function(e,t,r){var n=this;switch(r){case"png":case"jpg":case"jpeg":case"bmp":case"webp":var a=new Image;a.onload=function(){n.clearCanvas(e),e.width=a.width,e.height=a.height,e.getContext("2d").drawImage(a,0,0)},a.src=t;break;default:r?this.showTextOnCanvas(e,"暂不支持预览此文件","文件拓展名: "+r):this.showTextOnCanvas(e,"暂不支持预览此文件")}}},{key:"showTextOnCanvas",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"暂不支持预览此文件",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";this.clearCanvas(e);var n=e.getContext("2d");n.clearRect(0,0,e.width,e.height),n.font="15px Microsoft Yahei",n.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--front-color"),n.textAlign="center",r?(n.fillText(t,e.width/2,e.height/2-10),n.fillText(r,e.width/2,e.height/2+10)):n.fillText(t,e.width/2,e.height/2)}},{key:"cloneImageData",value:function(e){var t=new ImageData(new Uint8ClampedArray(e.data),e.width,e.height);return console.log(t),console.log(t.data),console.log(e.data),t}},{key:"truncate",value:function(e){return Math.min(255,Math.max(0,e))}},{key:"adjustImageData",value:function(e,t,r,n){for(var a=new Uint8ClampedArray(t.data.length),i=t.data,o=259*(255+(r=5.1*(r-50)))/(255*(259-r)),s=3*n-150,c=0;c<a.length;c+=4)a[c]=this.truncate(o*(i[c]-128)+128+s),a[c+1]=this.truncate(o*(i[c+1]-128)+128+s),a[c+2]=this.truncate(o*(i[c+2]-128)+128+s),a[c+3]=255;var h=new ImageData(a,t.width,t.height);e.width=h.width,e.height=h.height,e.getContext("2d").putImageData(h,0,0)}},{key:"saveResultFromUrl",value:function(e,t){var r=(new Date).getTime(),n=document.createElement("a");n.href=e,n.download="decoded_".concat(r,".").concat(t),document.body.appendChild(n),n.click(),document.body.removeChild(n)}},{key:"clearCanvas",value:function(e){e.width=300,e.height=150,e.getContext("2d").clearRect(0,0,e.width,e.height)}},{key:"getImageDataFromImage",value:function(e){var t=document.createElement("canvas");t.width=e.width,t.height=e.height;var r=t.getContext("2d");return r.drawImage(e,0,0),r.getImageData(0,0,e.width,e.height)}}],t&&a(e.prototype,t),r&&a(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t,r}();o=u,c=function(e){return h.hasOwnProperty(e)?h[e]:"application/octet-stream"},(s=i(s="classifyFileType"))in o?Object.defineProperty(o,s,{value:c,enumerable:!0,configurable:!0,writable:!0}):o[s]=c}}]);