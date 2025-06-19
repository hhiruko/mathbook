var h=s=>{throw TypeError(s)};var E=(s,e,t)=>e.has(s)||h("Cannot "+t);var p=(s,e,t)=>e.has(s)?h("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var g=(s,e,t)=>(E(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();class b{static get(e){return localStorage.getItem(e)}static set(e,t){localStorage.setItem(e,t)}static remove(e){localStorage.removeItem(e)}static clear(){localStorage.clear()}static keys(){const e=[];for(let t=0;t<localStorage.length;t++){const r=localStorage.key(t);e.push(parseInt(r))}return e.sort((t,r)=>t-r),e}}var c,m;class k{constructor(e){p(this,c);this.storage=e,this.writer=document.getElementById("writer");const t=[{key:"space",command:["insert","\\quad "]},{key:"enter",command:["addRowAfter"]}];this.writer.keybindings=[...this.writer.keybindings,...t]}set(e=Date.now()){this.number=e,g(this,c,m).call(this)}}c=new WeakSet,m=function(){this.writer.style.display="block",this.writer.addEventListener("input",()=>{this.storage.set(this.number,this.writer.value)});const e=this.storage.get(this.number);e!==null?this.writer.value=e:this.writer.value=""};class I{constructor(e=b){this.storage=e,this.pages=e.keys(),this.page=new k(e)}add(){return this.page.set(),this.page.number}open(e){this.page.set(e)}delete(e){this.storage.remove(e),this.page.writer.style.display="none"}list(){return this.pages}}/**
 * @license lucide v0.517.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.517.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=([s,e,t])=>{const r=document.createElementNS("http://www.w3.org/2000/svg",s);return Object.keys(e).forEach(o=>{r.setAttribute(o,String(e[o]))}),t!=null&&t.length&&t.forEach(o=>{const n=y(o);r.appendChild(n)}),r},l=(s,e={})=>{const t="svg",r={...L,...e};return y([t,r,s])};/**
 * @license lucide v0.517.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{d:"M8 11h8"}],["path",{d:"M8 7h6"}]];/**
 * @license lucide v0.517.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M3 15h6"}],["path",{d:"M6 12v6"}]];/**
 * @license lucide v0.517.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"}],["circle",{cx:"13",cy:"12",r:"2"}],["path",{d:"M18 19c-2.8 0-5-2.2-5-5v8"}],["circle",{cx:"20",cy:"19",r:"2"}]],d=new I,f=document.getElementById("add-button"),u=document.getElementById("home-button"),C=document.getElementById("pages"),O=document.getElementById("src-code"),v=document.getElementById("frontpage"),P=l(B),x=l(S),A=l(M);f.appendChild(P);u.appendChild(x);O.appendChild(A);const w=(s,e)=>{const t=document.createElement("div");return t.textContent=e,t.classList.add("page"),t.addEventListener("click",()=>{d.open(s),document.querySelectorAll(".active").forEach(r=>r.classList.remove("active")),t.classList.add("active"),v.style.display="none"}),C.appendChild(t),t};let i=0;d.list().forEach((s,e)=>{e++,w(s,e),i=e});f.addEventListener("click",()=>{i++;const s=d.add();w(s,i).click()});u.addEventListener("click",()=>{document.getElementById("writer").style.display="none",v.style.display="block"});u.click();
