/*! For license information please see 38.7b696641fbb0185c2796.js.LICENSE.txt */
"use strict";(self.webpackChunkmirage_cloak=self.webpackChunkmirage_cloak||[]).push([[38],{38:(e,t,r)=>{r.r(t),r.d(t,{CloakEncoder:()=>x});var n=r(490),a=r(23),i=r(287).hp;function o(e){Math.round;var t,r,n,a,o,s=Math.floor,c=new Array(64),u=new Array(64),_=new Array(64),f=new Array(64),h=new Array(65535),l=new Array(65535),d=new Array(64),v=new Array(64),g=[],p=0,y=7,m=new Array(64),b=new Array(64),w=new Array(64),C=new Array(256),I=new Array(2048),x=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],A=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],D=[0,1,2,3,4,5,6,7,8,9,10,11],M=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],E=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],k=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],L=[0,1,2,3,4,5,6,7,8,9,10,11],S=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],B=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];function j(e,t){for(var r=0,n=0,a=new Array,i=1;i<=16;i++){for(var o=1;o<=e[i];o++)a[t[n]]=[],a[t[n]][0]=r,a[t[n]][1]=i,n++,r++;r*=2}return a}function z(e){for(var t=e[0],r=e[1]-1;r>=0;)t&1<<r&&(p|=1<<y),r--,--y<0&&(255==p?(O(255),O(0)):O(p),y=7,p=0)}function O(e){g.push(e)}function P(e){O(e>>8&255),O(255&e)}function R(e,t,r,n,a){for(var i,o=a[0],s=a[240],c=function(e,t){var r,n,a,i,o,s,c,u,_,f,h=0;for(_=0;_<8;++_){r=e[h],n=e[h+1],a=e[h+2],i=e[h+3],o=e[h+4],s=e[h+5],c=e[h+6];var l=r+(u=e[h+7]),v=r-u,g=n+c,p=n-c,y=a+s,m=a-s,b=i+o,w=i-o,C=l+b,I=l-b,x=g+y,A=g-y;e[h]=C+x,e[h+4]=C-x;var D=.707106781*(A+I);e[h+2]=I+D,e[h+6]=I-D;var M=.382683433*((C=w+m)-(A=p+v)),E=.5411961*C+M,k=1.306562965*A+M,L=.707106781*(x=m+p),S=v+L,B=v-L;e[h+5]=B+E,e[h+3]=B-E,e[h+1]=S+k,e[h+7]=S-k,h+=8}for(h=0,_=0;_<8;++_){r=e[h],n=e[h+8],a=e[h+16],i=e[h+24],o=e[h+32],s=e[h+40],c=e[h+48];var j=r+(u=e[h+56]),z=r-u,O=n+c,P=n-c,R=a+s,F=a-s,T=i+o,U=i-o,q=j+T,G=j-T,N=O+R,H=O-R;e[h]=q+N,e[h+32]=q-N;var Q=.707106781*(H+G);e[h+16]=G+Q,e[h+48]=G-Q;var W=.382683433*((q=U+F)-(H=P+z)),J=.5411961*q+W,V=1.306562965*H+W,Y=.707106781*(N=F+P),$=z+Y,K=z-Y;e[h+40]=K+J,e[h+24]=K-J,e[h+8]=$+V,e[h+56]=$-V,h++}for(_=0;_<64;++_)f=e[_]*t[_],d[_]=f>0?f+.5|0:f-.5|0;return d}(e,t),u=0;u<64;++u)v[x[u]]=c[u];var _=v[0]-r;r=v[0],0==_?z(n[0]):(z(n[l[i=32767+_]]),z(h[i]));for(var f=63;f>0&&0==v[f];f--);if(0==f)return z(o),r;for(var g,p=1;p<=f;){for(var y=p;0==v[p]&&p<=f;++p);var m=p-y;if(m>=16){g=m>>4;for(var b=1;b<=g;++b)z(s);m&=15}i=32767+v[p],z(a[(m<<4)+l[i]]),z(h[i]),p++}return 63!=f&&z(o),r}function F(e){if(e<=0&&(e=1),e>100&&(e=100),o!=e){(function(e){for(var t=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],r=0;r<64;r++){var n=s((t[r]*e+50)/100);n<1?n=1:n>255&&(n=255),c[x[r]]=n}for(var a=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],i=0;i<64;i++){var o=s((a[i]*e+50)/100);o<1?o=1:o>255&&(o=255),u[x[i]]=o}for(var h=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],l=0,d=0;d<8;d++)for(var v=0;v<8;v++)_[l]=1/(c[x[l]]*h[d]*h[v]*8),f[l]=1/(u[x[l]]*h[d]*h[v]*8),l++})(e<50?Math.floor(5e3/e):Math.floor(200-2*e)),o=e}}this.encode=function(e,o){var s;(new Date).getTime();o&&F(o),g=new Array,p=0,y=7,P(65496),P(65504),P(16),O(74),O(70),O(73),O(70),O(0),O(1),O(1),O(0),P(1),P(1),O(0),O(0),void 0!==(s=e.comments)&&s.constructor===Array&&s.forEach((function(e){if("string"==typeof e){P(65534);var t,r=e.length;for(P(r+2),t=0;t<r;t++)O(e.charCodeAt(t))}})),function(e){if(e){P(65505),69===e[0]&&120===e[1]&&105===e[2]&&102===e[3]?P(e.length+2):(P(e.length+5+2),O(69),O(120),O(105),O(102),O(0));for(var t=0;t<e.length;t++)O(e[t])}}(e.exifBuffer),function(){P(65499),P(132),O(0);for(var e=0;e<64;e++)O(c[e]);O(1);for(var t=0;t<64;t++)O(u[t])}(),function(e,t){P(65472),P(17),O(8),P(t),P(e),O(3),O(1),O(17),O(0),O(2),O(17),O(1),O(3),O(17),O(1)}(e.width,e.height),function(){P(65476),P(418),O(0);for(var e=0;e<16;e++)O(A[e+1]);for(var t=0;t<=11;t++)O(D[t]);O(16);for(var r=0;r<16;r++)O(M[r+1]);for(var n=0;n<=161;n++)O(E[n]);O(1);for(var a=0;a<16;a++)O(k[a+1]);for(var i=0;i<=11;i++)O(L[i]);O(17);for(var o=0;o<16;o++)O(S[o+1]);for(var s=0;s<=161;s++)O(B[s])}(),P(65498),P(12),O(3),O(1),O(0),O(2),O(17),O(3),O(17),O(0),O(63),O(0);var h=0,l=0,d=0;p=0,y=7,this.encode.displayName="_encode_";for(var v,C,x,j,T,U,q,G,N,H=e.data,Q=e.width,W=e.height,J=4*Q,V=0;V<W;){for(v=0;v<J;){for(U=T=J*V+v,q=-1,G=0,N=0;N<64;N++)U=T+(G=N>>3)*J+(q=4*(7&N)),V+G>=W&&(U-=J*(V+1+G-W)),v+q>=J&&(U-=v+q-J+4),C=H[U++],x=H[U++],j=H[U++],m[N]=(I[C]+I[x+256|0]+I[j+512|0]>>16)-128,b[N]=(I[C+768|0]+I[x+1024|0]+I[j+1280|0]>>16)-128,w[N]=(I[C+1280|0]+I[x+1536|0]+I[j+1792|0]>>16)-128;h=R(m,_,h,t,n),l=R(b,f,l,r,a),d=R(w,f,d,r,a),v+=32}V+=8}if(y>=0){var Y=[];Y[1]=y+1,Y[0]=(1<<y+1)-1,z(Y)}return P(65497),i.from(g)},function(){(new Date).getTime();e||(e=50),function(){for(var e=String.fromCharCode,t=0;t<256;t++)C[t]=e(t)}(),t=j(A,D),r=j(k,L),n=j(M,E),a=j(S,B),function(){for(var e=1,t=2,r=1;r<=15;r++){for(var n=e;n<t;n++)l[32767+n]=r,h[32767+n]=[],h[32767+n][1]=r,h[32767+n][0]=n;for(var a=-(t-1);a<=-e;a++)l[32767+a]=r,h[32767+a]=[],h[32767+a][1]=r,h[32767+a][0]=t-1+a;e<<=1,t<<=1}}(),function(){for(var e=0;e<256;e++)I[e]=19595*e,I[e+256|0]=38470*e,I[e+512|0]=7471*e+32768,I[e+768|0]=-11059*e,I[e+1024|0]=-21709*e,I[e+1280|0]=32768*e+8421375,I[e+1536|0]=-27439*e,I[e+1792|0]=-5329*e}(),F(e),(new Date).getTime()}()}function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function c(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function _(){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!{}.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}(e,t);if(n){var a=Object.getOwnPropertyDescriptor(n,t);return a.get?a.get.call(arguments.length<3?e:r):a.value}},_.apply(null,arguments)}function f(){f=function(){return t};var e,t={},r=Object.prototype,n=r.hasOwnProperty,a=Object.defineProperty||function(e,t,r){e[t]=r.value},i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function _(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{_({},"")}catch(e){_=function(e,t,r){return e[t]=r}}function h(e,t,r,n){var i=t&&t.prototype instanceof m?t:m,o=Object.create(i.prototype),s=new B(n||[]);return a(o,"_invoke",{value:E(e,r,s)}),o}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=h;var d="suspendedStart",v="suspendedYield",g="executing",p="completed",y={};function m(){}function b(){}function w(){}var C={};_(C,o,(function(){return this}));var I=Object.getPrototypeOf,x=I&&I(I(j([])));x&&x!==r&&n.call(x,o)&&(C=x);var A=w.prototype=m.prototype=Object.create(C);function D(e){["next","throw","return"].forEach((function(t){_(e,t,(function(e){return this._invoke(t,e)}))}))}function M(e,t){function r(a,i,o,c){var u=l(e[a],e,i);if("throw"!==u.type){var _=u.arg,f=_.value;return f&&"object"==s(f)&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,o,c)}),(function(e){r("throw",e,o,c)})):t.resolve(f).then((function(e){_.value=e,o(_)}),(function(e){return r("throw",e,o,c)}))}c(u.arg)}var i;a(this,"_invoke",{value:function(e,n){function a(){return new t((function(t,a){r(e,n,t,a)}))}return i=i?i.then(a,a):a()}})}function E(t,r,n){var a=d;return function(i,o){if(a===g)throw Error("Generator is already running");if(a===p){if("throw"===i)throw o;return{value:e,done:!0}}for(n.method=i,n.arg=o;;){var s=n.delegate;if(s){var c=k(s,n);if(c){if(c===y)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(a===d)throw a=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a=g;var u=l(t,r,n);if("normal"===u.type){if(a=n.done?p:v,u.arg===y)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(a=p,n.method="throw",n.arg=u.arg)}}}function k(t,r){var n=r.method,a=t.iterator[n];if(a===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;var i=l(a,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,y;var o=i.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,y):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function L(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function S(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function B(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(L,this),this.reset(!0)}function j(t){if(t||""===t){var r=t[o];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){for(;++a<t.length;)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}throw new TypeError(s(t)+" is not iterable")}return b.prototype=w,a(A,"constructor",{value:w,configurable:!0}),a(w,"constructor",{value:b,configurable:!0}),b.displayName=_(w,u,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===b||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,w):(e.__proto__=w,_(e,u,"GeneratorFunction")),e.prototype=Object.create(A),e},t.awrap=function(e){return{__await:e}},D(M.prototype),_(M.prototype,c,(function(){return this})),t.AsyncIterator=M,t.async=function(e,r,n,a,i){void 0===i&&(i=Promise);var o=new M(h(e,r,n,a),i);return t.isGeneratorFunction(r)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},D(A),_(A,u,"Generator"),_(A,o,(function(){return this})),_(A,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=j,B.prototype={constructor:B,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(S),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return s.type="throw",s.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),y},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),S(r),y}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;S(r)}return a}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},t}function h(e,t,r,n,a,i,o){try{var s=e[i](o),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,a)}function l(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function o(e){h(i,n,a,o,s,"next",e)}function s(e){h(i,n,a,o,s,"throw",e)}o(void 0)}))}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,I(n.key),n)}}function g(e,t,r){return t&&v(e.prototype,t),r&&v(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function p(e,t,r){return t=m(t),function(e,t){if(t&&("object"==s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,y()?Reflect.construct(t,r||[],m(e).constructor):t.apply(e,r))}function y(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(y=function(){return!!e})()}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}function b(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&w(e,t)}function w(e,t){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},w(e,t)}function C(e,t,r){return(t=I(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function I(e){var t=function(e,t){if("object"!=s(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==s(t)?t:t+""}var x=function(e){function t(e,r,i,s,c,u,_){var h;switch(d(this,t),C(h=p(this,t,[e]),"updateInnerImage",function(){var e=l(f().mark((function e(t){var r,a;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h._innerImage=t,0!==h._mirageSize?h._innerImage.width>h._innerImage.height?(h._width=h._mirageSize,h._height=Math.ceil(h._innerImage.height*h._mirageSize/h._innerImage.width)):(h._height=h._mirageSize,h._width=Math.ceil(h._innerImage.width*h._mirageSize/h._innerImage.height)):(h._width=h._innerImage.width,h._height=h._innerImage.height),!h._byteArray){e.next=8;break}return e.next=5,h._adjustSize();case 5:r=e.sent,n.i.showSize(h._hiddenMetaCanvas.querySelector(".sizeLabel"),r),console.log("Size to be encoded: "+r);case 8:h._innerCanvas.width=h._width,h._innerCanvas.height=h._height,(a=h._innerCanvas.getContext("2d")).drawImage(t,0,0,h._width,h._height),h._innerImageData=a.getImageData(0,0,h._width,h._height),h._sizeLabel.innerHTML="输出图像预计尺寸：".concat(h._width,"x").concat(h._height),h.convertGray(h._innerImageData),n.i.adjustImageData(h._innerCanvas,h._innerImageData,h._innerContrast,h._innerLuminance),h._isAddMark&&h.addMark(h._innerCanvas),h._coverImageData&&h.updateCoverImage(h._coverImage);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C(h,"_adjustSize",l(f().mark((function e(){var t,r,a,i,o;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=h._width*h._height,!((r=h._encoders[h._version].getRequiredLength(h._byteArray,h._diff))>t)){e.next=37;break}if(a=r/t,!h._hiddenFile.type.startsWith("image")||h._hiddenFile.type.startsWith("image/gif")){e.next=30;break}return e.next=7,n.i.showMetaCanvas(h._hiddenMetaCanvas,h._hiddenUrl,h._fileExtension,h._hiddenFile.size);case 7:if(!h._isCompress){e.next=27;break}if(!(i=h._hiddenCanvas.getContext("2d").getImageData(0,0,h._hiddenCanvas.width,h._hiddenCanvas.height))){e.next=27;break}if(o=h._JpegEncoder.encode(i,h._compressQuality),r=h._encoders[h._version].getRequiredLength(o,h._diff),!((a=r/t)>1)){e.next=22;break}return a=Math.sqrt(a),e.next=17,n.i.showMetaCanvas(h._hiddenMetaCanvas,h._hiddenUrl,h._fileExtension,h._hiddenFile.size,1/a);case 17:i=h._hiddenCanvas.getContext("2d").getImageData(0,0,h._hiddenCanvas.width,h._hiddenCanvas.height),o=h._JpegEncoder.encode(i,h._compressQuality),r=h._encoders[h._version].getRequiredLength(o,h._diff),(a=r/t)>1&&h._scaleSize(a);case 22:return h._hiddenSizeLabel.innerHTML="隐藏图像尺寸：".concat(h._hiddenCanvas.width,"x").concat(h._hiddenCanvas.height),h._byteArrayCompressed=o,h._fileExtensionCompressed="jpg",h._hiddenMetaCanvas.querySelector(".typeLabel").innerText="里文件类型：image/jpeg",e.abrupt("return",h._byteArrayCompressed.length);case 27:h._hiddenSizeLabel.innerHTML="隐藏图像尺寸：".concat(h._hiddenCanvas.width,"x").concat(h._hiddenCanvas.height),e.next=33;break;case 30:h._hiddenSizeLabel.innerHTML="",h._byteArrayCompressed=null,h._fileExtensionCompressed="";case 33:return h._scaleSize(a),e.abrupt("return",h._byteArray.length);case 37:return h._byteArrayCompressed=null,h._fileExtensionCompressed="",e.abrupt("return",h._byteArray.length);case 40:case"end":return e.stop()}}),e)})))),C(h,"_scaleSize",(function(e){e=Math.sqrt(e),h._width=Math.ceil(h._width*e),h._height=Math.ceil(h._height*e)})),C(h,"updateCoverImage",(function(e){if(h._coverImage=e,h._innerImage){var t,r,a,i,o=e.width/e.height;o<h._width/h._height?(t=0,r=Math.ceil((h._height-h._width/o)/2),a=h._width,i=Math.ceil(h._width/o)):(t=Math.ceil((h._width-h._height*o)/2),r=0,a=Math.ceil(h._height*o),i=h._height),h._coverCanvas.width=h._width,h._coverCanvas.height=h._height;var s=h._coverCanvas.getContext("2d");s.drawImage(e,t,r,a,i),h._coverImageData=s.getImageData(0,0,h._width,h._height)}else{h._coverCanvas.width=e.width,h._coverCanvas.height=e.height;var c=h._coverCanvas.getContext("2d");c.drawImage(e,0,0),h._coverImageData=c.getImageData(0,0,e.width,e.height)}h.convertGray(h._coverImageData),n.i.adjustImageData(h._coverCanvas,h._coverImageData,h._coverContrast,h._coverLuminance),h._isAddMark&&h.addMark(h._coverCanvas)})),C(h,"updateHiddenFile",function(){var e=l(f().mark((function e(t){var r,a;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h._hiddenFile=t,h._byteArrayCompressed=null,h._hiddenUrl&&URL.revokeObjectURL(h._hiddenUrl),h._hiddenUrl=URL.createObjectURL(t),r=t.name,-1!==(a=r.lastIndexOf("."))&&a<r.length-1?(h._fileExtension=r.substring(a+1).toLowerCase(),h._fileExtension.length>10&&(alert("文件拓展名过长，已截断为: "+h._fileExtension.substring(0,10)),h._fileExtension=h._fileExtension.substring(0,10))):h._fileExtension="",e.next=9,n.i.showMetaCanvas(h._hiddenMetaCanvas,h._hiddenUrl,h._fileExtension,t.size);case 9:return t.type.startsWith("image/")&&!t.type.startsWith("image/gif")?h._hiddenSizeLabel.innerHTML="隐藏图像尺寸: ".concat(h._hiddenCanvas.width,"x").concat(h._hiddenCanvas.height):h._hiddenSizeLabel.innerHTML="",e.next=12,h._getHiddenByteArray();case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C(h,"_getHiddenByteArray",l(f().mark((function e(){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){var r=new FileReader;r.onload=function(){var r=l(f().mark((function r(n){var a;return f().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(r.prev=0,a=n.target.result,h._byteArray=new Uint8Array(a),!h._innerImage){r.next=6;break}return r.next=6,h.updateInnerImage(h._innerImage);case 6:e(),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(0),t(r.t0);case 12:case"end":return r.stop()}}),r,null,[[0,9]])})));return function(e){return r.apply(this,arguments)}}(),r.readAsArrayBuffer(h._hiddenFile)})));case 1:case"end":return e.stop()}}),e)})))),C(h,"process",(function(){if(!h._innerImageData||!h._coverImageData||!h._byteArray)throw new Error("请先选择图像和文件！");var e=h._innerCanvas.getContext("2d").getImageData(0,0,h._width,h._height),t=h._coverCanvas.getContext("2d").getImageData(0,0,h._width,h._height);console.log("Encoding..."),console.log("    Version: "+h._version),console.log("    Output size: "+h._width+"x"+h._height),console.log("    Size to be encoded: "+(h._isCompress&&h._byteArrayCompressed?h._byteArrayCompressed.length:h._byteArray.length)),console.log("    File extension: "+(h._isCompress&&h._fileExtensionCompressed?h._fileExtensionCompressed:h._fileExtension)),console.log("    Difference: "+h._diff),h._outputData=h._encoders[h._version].encode(e,t,h._isCompress&&h._byteArrayCompressed?h._byteArrayCompressed:h._byteArray,h._isCompress&&h._fileExtensionCompressed?h._fileExtensionCompressed:h._fileExtension,h._diff),h._outputCanvas.width=h._width,h._outputCanvas.height=h._height;var r=new ImageData(h._outputData,h._width,h._height);h._outputCanvas.getContext("2d").putImageData(r,0,0),h._isOutputCanvasCleared=!1,console.log("Encoding finished")})),C(h,"convertGray",(function(e){for(var t=e.data,r=0;r<t.length;r+=4){var n=.299*t[r]+.587*t[r+1]+.114*t[r+2];t[r]=n,t[r+1]=n,t[r+2]=n}})),C(h,"adjustInnerContrast",(function(e){h._innerContrast=e,h._innerImageData&&(n.i.adjustImageData(h._innerCanvas,h._innerImageData,e,h._innerLuminance),h._isAddMark&&h.addMark(h._innerCanvas))})),C(h,"adjustCoverContrast",(function(e){h._coverContrast=e,h._coverImageData&&(n.i.adjustImageData(h._coverCanvas,h._coverImageData,e,h._coverLuminance),h._isAddMark&&h.addMark(h._coverCanvas))})),C(h,"adjustInnerLuminance",(function(e){h._innerLuminance=e,h._innerImageData&&(n.i.adjustImageData(h._innerCanvas,h._innerImageData,h._innerContrast,e),h._isAddMark&&h.addMark(h._innerCanvas))})),C(h,"adjustCoverLuminance",(function(e){h._coverLuminance=e,h._coverImageData&&(n.i.adjustImageData(h._coverCanvas,h._coverImageData,h._coverContrast,e),h._isAddMark&&h.addMark(h._coverCanvas))})),C(h,"saveOutputImage",(function(){if(!h._outputData)throw new Error("请先处理图像！");var e=(new Date).getTime(),t=document.createElement("a"),r=new Blob([(0,a.lF)({width:h._width,height:h._height,data:h._outputData})],{type:"image/png"});t.href=URL.createObjectURL(r),t.download="encoded_".concat(e,".png"),document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(t.href)})),C(h,"setIsAddMark",(function(e){h._isAddMark=e,e?(h._innerImageData&&h.addMark(h._innerCanvas),h._coverImageData&&h.addMark(h._coverCanvas)):(h._innerImageData&&n.i.adjustImageData(h._innerCanvas,h._innerImageData,h._innerContrast,h._innerLuminance),h._coverImageData&&n.i.adjustImageData(h._coverCanvas,h._coverImageData,h._coverContrast,h._coverLuminance))})),C(h,"setMirageSize",function(){var e=l(f().mark((function e(t){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h._mirageSize=t,!h._innerImage){e.next=4;break}return e.next=4,h.updateInnerImage(h._innerImage);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C(h,"setDiff",function(){var e=l(f().mark((function e(t){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h._diff=t,0!==h._version||!h._byteArray||!h._innerImage){e.next=4;break}return e.next=4,h.updateInnerImage(h._innerImage);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C(h,"setVersion",function(){var e=l(f().mark((function e(t){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h._version=t,!h._byteArray||!h._innerImage){e.next=4;break}return e.next=4,h.updateInnerImage(h._innerImage);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C(h,"setIsCompress",function(){var e=l(f().mark((function e(t){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h._isCompress=t,!h._byteArray||!h._innerImage){e.next=4;break}return e.next=4,h.updateInnerImage(h._innerImage);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C(h,"clearOutputCanvas",(function(){h._isOutputCanvasCleared||(n.i.clearCanvas(h._outputCanvas),h._isOutputCanvasCleared=!0,h._outputData=null)})),h._innerImage=null,h._coverImage=null,h._innerImageData=null,h._coverImageData=null,h._innerContrast=e.contrast_inner,h._coverContrast=e.contrast_cover,h._innerLuminance=e.luminance_inner,h._coverLuminance=e.luminance_cover,h._mirageSize=e.mirage_size,h._isCompress=e.encode_compress,h._compressQuality=e.encode_compress_quality,h._version=e.version,h._version){case 0:h._diff=e.version_0.difference;break;case 1:h._diff=e.version_1.difference;break;case 2:h._diff=e.version_2.difference}return h._hiddenFile=null,h._fileExtension="",h._fileExtensionCompressed="",h._byteArray=null,h._byteArrayCompressed=null,h._outputData=null,h._innerCanvas=document.getElementById(r),h._coverCanvas=document.getElementById(i),h._hiddenMetaCanvas=document.getElementById(s),h._hiddenCanvas=h._hiddenMetaCanvas.querySelector("canvas"),h._outputCanvas=document.getElementById(c),h._sizeLabel=document.getElementById(u),h._hiddenSizeLabel=document.getElementById(_),h._isAddMark=e.add_mark,h._markRatio=e.mark_ratio,h._JpegEncoder=new o(h._compressQuality),h._encoders=[new M(e),new A(e),new D(e)],h}return b(t,e),g(t,[{key:"addMark",value:function(e,t){if(!t){if(!applicationState.markImage)return;t=applicationState.markImage}var r=e.width*this._markRatio,n=e.height*this._markRatio,a=r/n,i=t.width/t.height;a>i?r=n*i:n=r/i,e.getContext("2d").drawImage(t,0,0,r,n)}}])}(n.i),A=function(){return g((function e(t){var r=this;d(this,e),C(this,"_getBits",(function(e){var t=e%3,n=Math.floor(e/3);return 0===n?r._getBitsFromByte(r._version,t):1===n?r._getBitsFromByte(Math.floor(r._diff/2),t):n<=5?r._getBitsFromByte(r._targetSize>>(n-2<<3)&255,t):n<r._remained?n-6<r._fileExtension.length?r._getBitsFromByte(r._fileExtension.charCodeAt(n-6),t):r._getBitsFromByte(0,t):n<r._targetSize+r._remained?r._getBitsFromByte(r._byteArray[n-r._remained],t):r._getRandomBits()})),C(this,"_scale",(function(e,t,r){return Math.floor(e*t+r)})),C(this,"_isInner",(function(e){return(e%r._width+Math.floor(e/r._width))%2==0})),C(this,"_getBitsFromByte",(function(e,t){var n=e>>3*t,a=1&n,i=n>>1&1;return 2!=t?{r:a,g:i,b:n>>2&1}:{r:a,g:i,b:r._calParityBit(e)}})),C(this,"_getRandomBits",(function(){return{r:Math.random()>.5?1:0,g:Math.random()>.5?1:0,b:Math.random()>.5?1:0}})),C(this,"_calParityBit",(function(e){for(var t=0,r=0;r<8;r++)t^=e>>r&1;return t})),this._version=1,this._globalDefaultDiff=t.default_difference,this._defaultDiff=t.version_1.default_difference,this._remained=t.version_1.remained,this._padding=t.version_1.padding,this._scale_i=t.version_1.scale_inner,this._offset_i=t.version_1.offset_inner,this._scale_c=t.version_1.scale_cover,this._offset_c=t.version_1.offset_cover}),[{key:"encode",value:function(e,t,r,n,a){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;if(this._innerData=e.data,this._coverData=t.data,this._width=e.width,this._height=e.height,this._pixelRange=1===i?this._innerData.length>>2:3,1===i&&this._pixelRange<this.getRequiredLength(r))throw new Error("可用像素过少，编码空间不足！");this._version=i;var o=new Uint8ClampedArray(this._innerData.length);this._byteArray=r,this._targetSize=this._byteArray.length,this._fileExtension=n,this._diff=a||this._defaultDiff;for(var s=0;s<this._pixelRange;s++){var c=s<3?this._globalDefaultDiff:s<6?this._defaultDiff:this._diff;if(this._isInner(s)){var u=this._scale(this._innerData[4*s],this._scale_i,this._offset_i),_=this._getBits(s),f=_.r,h=_.g,l=_.b;o[4*s]=f?255-c:255,o[4*s+1]=h?255-c:255,o[4*s+2]=l?255-c:255,o[4*s+3]=u}else{var d=this._scale(this._coverData[4*s],this._scale_c,this._offset_c),v=this._getBits(s),g=v.r,p=v.g,y=v.b;o[4*s]=g?c:0,o[4*s+1]=p?c:0,o[4*s+2]=y?c:0,o[4*s+3]=255-d}}return o}},{key:"getRequiredLength",value:function(e){return 3*(e.length+this._remained+this._padding)}}])}(),D=function(e){function t(e){var r;return d(this,t),C(r=p(this,t,[e]),"_getBitsPair",(function(e){var t=e%3,n=Math.floor(e/3);return n<2?r._getBitsFromBytePair(Math.floor(r._diff/6),t):n<4?r._getBitsFromBytePair(r._targetSize>>(n-2<<4)&65535,t):n<r._remained?n-4<r._fileExtension.length?r._getBitsFromBytePair(r._fileExtension.charCodeAt(n-4),t):r._getBitsFromByte(0,t):n<Math.ceil(r._targetSize/2)+r._remained?r._getBitsFromBytePair(r._byteArray[n-r._remained<<1]|r._byteArray[1+(n-r._remained<<1)]<<8,t):r._getRandomBits()})),C(r,"_getBitsFromBytePair",(function(e,t){var n=e>>6*t,a=3&n,i=n>>2&3;return 2!=t?{r:a,g:i,b:n>>4&3}:{r:a,g:i,b:r._calParityBitPair(e)}})),C(r,"_calParityBitPair",(function(e){for(var t=0,r=0;r<8;r++)t^=e>>r&1;for(var n=8;n<16;n++)t^=(e>>n&1)<<1;return t})),C(r,"_getRandomBits",(function(){return{r:Math.floor(4*Math.random()),g:Math.floor(4*Math.random()),b:Math.floor(4*Math.random())}})),r._version=2,r._defaultDiff=e.version_2.default_difference,r._remained=e.version_2.remained,r._padding=e.version_2.padding,r._scale_i=e.version_2.scale_inner,r._offset_i=e.version_2.offset_inner,r._scale_c=e.version_2.scale_cover,r._offset_c=e.version_2.offset_cover,r}return b(t,e),g(t,[{key:"getRequiredLength",value:function(e){return 3*(e.length>>1+this._remained+this._padding)}},{key:"encode",value:function(e,r,n,a,i){var o=function(e,t,r,n){var a=_(m(1&n?e.prototype:e),t,r);return 2&n?function(e){return a.apply(r,e)}:a}(t,"encode",this,3)([e,r,n,a,void 0,this._version]);if(this._diff=i,this._pixelRange=e.data.length>>2,this._pixelRange<this.getRequiredLength(n))throw new Error("可用像素过少，编码空间不足！");if(1&this._targetSize){var s=new Uint8Array(this._targetSize+1);s.set(this._byteArray),s[this._targetSize]=0,this._byteArray=s}for(var c=3;c<this._pixelRange;c++){var u=Math.floor((c<6?this._defaultDiff:this._diff)/3);if(this._isInner(c)){var f=this._scale(this._innerData[4*c],this._scale_i,this._offset_i),h=this._getBitsPair(c),l=h.r,d=h.g,v=h.b;o[4*c]=255-u*l,o[4*c+1]=255-u*d,o[4*c+2]=255-u*v,o[4*c+3]=f}else{var g=this._scale(this._coverData[4*c],this._scale_c,this._offset_c),p=this._getBitsPair(c),y=p.r,b=p.g,w=p.b;o[4*c]=u*y,o[4*c+1]=u*b,o[4*c+2]=u*w,o[4*c+3]=255-g}}return o}}])}(A),M=g((function e(t){var r=this;d(this,e),C(this,"encode",(function(e,t,a,i,o){var s,u,_,f=e.data,h=t.data,l=e.width,d=f.length>>2;r._targetSize=a.length,r._compress=r._calCompress(o||r._defaultDiff);var v=new Uint8ClampedArray(f.length);if(v[0]=248,v[1]=251,v[2]=248|r._compress,v[3]=r._scaleInner(f[0]),r._byteArray=[],(s=r._byteArray).push.apply(s,c(r._targetSize.toString().split("").map((function(e){return e.charCodeAt(0)})))),r._byteArray.push(1),(u=r._byteArray).push.apply(u,c(("mtc."+i).split("").map((function(e){return e.charCodeAt(0)})))),r._byteArray.push(1),(_=r._byteArray).push.apply(_,c(n.i.classifyFileType(i).split("").map((function(e){return e.charCodeAt(0)})))),r._byteArray.push(0),r._fileArray=a,r._byteArray.length>r._padding)throw new Error("头部信息过长！可尝试更改文件拓展名。");r._bytePos=0,r._buffer=0,r._bufferSize=0;for(var g=255&~((1<<r._compress)-1),p=1;p<d;p++){var y=(p%l+Math.floor(p/l))%2==0;v[4*p]=y?g|r._popBits():r._popBits(),v[4*p+1]=y?g|r._popBits():r._popBits(),v[4*p+2]=y?g|r._popBits():r._popBits(),v[4*p+3]=y?r._scaleInner(f[4*p]):255-r._scaleCover(h[4*p])}if(r._bytePos<r._byteArray.length+r._targetSize)throw new Error("可用像素过少，编码空间不足！");return v})),C(this,"getRequiredLength",(function(e,t){var n=r._calCompress(t);return Math.ceil((r._padding+e.length<<3)/n/3)+1})),C(this,"_calCompress",(function(e){return Math.min(Math.max(Math.floor(e/10),1),7)})),C(this,"_pushByte",(function(){var e=r._bytePos<r._byteArray.length?r._byteArray[r._bytePos]:r._bytePos<r._byteArray.length+r._targetSize?r._fileArray[r._bytePos-r._byteArray.length]:Math.floor(256*Math.random());r._bytePos++,r._buffer=r._buffer<<8|e,r._bufferSize+=8})),C(this,"_popBits",(function(){r._bufferSize<r._compress&&r._pushByte();var e=(r._buffer&(1<<r._compress)-1<<r._bufferSize-r._compress)>>r._bufferSize-r._compress;return r._bufferSize-=r._compress,r._buffer&=(1<<r._bufferSize)-1,e})),C(this,"_scaleInner",(function(e){return Math.floor(e*r._scale_i+r._offset_i)})),C(this,"_scaleCover",(function(e){return Math.floor(e*r._scale_c+r._offset_c)})),this._defaultDiff=t.version_0.default_difference,this._padding=t.version_0.padding,this._scale_i=t.version_0.scale_inner,this._offset_i=t.version_0.offset_inner,this._scale_c=t.version_0.scale_cover,this._offset_c=t.version_0.offset_cover}))}}]);