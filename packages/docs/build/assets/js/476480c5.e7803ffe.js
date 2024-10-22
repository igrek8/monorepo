"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[242],{2008:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>C,contentTitle:()=>A,default:()=>D,frontMatter:()=>_,metadata:()=>E,toc:()=>S});var t=n(5723),a=n(2232),s=n(2155),l=n(4188),o=n(851),i=n(9749),u=n(2934),c=n(7943),d=n(4366),p=n(6447),h=n(1897);function f(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:r}=e;return!!r&&"object"==typeof r&&"value"in r}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function m(e){const{values:r,children:n}=e;return(0,s.useMemo)((()=>{const e=r??function(e){return f(e).map((e=>{let{props:{value:r,label:n,attributes:t,default:a}}=e;return{value:r,label:n,attributes:t,default:a}}))}(n);return function(e){const r=(0,p.XI)(e,((e,r)=>e.value===r.value));if(r.length>0)throw new Error(`Docusaurus error: Duplicate values "${r.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[r,n])}function b(e){let{value:r,tabValues:n}=e;return n.some((e=>e.value===r))}function g(e){let{queryString:r=!1,groupId:n}=e;const t=(0,u.W6)(),a=function(e){let{queryString:r=!1,groupId:n}=e;if("string"==typeof r)return r;if(!1===r)return null;if(!0===r&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:r,groupId:n});return[(0,d.aZ)(a),(0,s.useCallback)((e=>{if(!a)return;const r=new URLSearchParams(t.location.search);r.set(a,e),t.replace({...t.location,search:r.toString()})}),[a,t])]}function j(e){const{defaultValue:r,queryString:n=!1,groupId:t}=e,a=m(e),[l,o]=(0,s.useState)((()=>function(e){let{defaultValue:r,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(r){if(!b({value:r,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${r}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return r}const t=n.find((e=>e.default))??n[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:r,tabValues:a}))),[i,u]=g({queryString:n,groupId:t}),[d,p]=function(e){let{groupId:r}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(r),[t,a]=(0,h.Dv)(n);return[t,(0,s.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:t}),f=(()=>{const e=i??d;return b({value:e,tabValues:a})?e:null})();(0,c.A)((()=>{f&&o(f)}),[f]);return{selectedValue:l,selectValue:(0,s.useCallback)((e=>{if(!b({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),p(e)}),[u,p,a]),tabValues:a}}var x=n(6549);const v={tabList:"tabList_I6Dx",tabItem:"tabItem_tCsK"};function k(e){let{className:r,block:n,selectedValue:a,selectValue:s,tabValues:l}=e;const u=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.a_)(),d=e=>{const r=e.currentTarget,n=u.indexOf(r),t=l[n].value;t!==a&&(c(r),s(t))},p=e=>{let r=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;r=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;r=u[n]??u[u.length-1];break}}r?.focus()};return(0,t.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":n},r),children:l.map((e=>{let{value:r,label:n,attributes:s}=e;return(0,t.jsx)("li",{role:"tab",tabIndex:a===r?0:-1,"aria-selected":a===r,ref:e=>u.push(e),onKeyDown:p,onClick:d,...s,className:(0,o.A)("tabs__item",v.tabItem,s?.className,{"tabs__item--active":a===r}),children:n??r},r)}))})}function y(e){let{lazy:r,children:n,selectedValue:a}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(r){const e=l.find((e=>e.props.value===a));return e?(0,s.cloneElement)(e,{className:(0,o.A)("margin-top--md",e.props.className)}):null}return(0,t.jsx)("div",{className:"margin-top--md",children:l.map(((e,r)=>(0,s.cloneElement)(e,{key:r,hidden:e.props.value!==a})))})}function w(e){const r=j(e);return(0,t.jsxs)("div",{className:(0,o.A)("tabs-container",v.tabList),children:[(0,t.jsx)(k,{...r,...e}),(0,t.jsx)(y,{...r,...e})]})}function I(e){const r=(0,x.A)();return(0,t.jsx)(w,{...e,children:f(e.children)},String(r))}const V={tabItem:"tabItem_JjH2"};function N(e){let{children:r,hidden:n,className:a}=e;return(0,t.jsx)("div",{role:"tabpanel",className:(0,o.A)(V.tabItem,a),hidden:n,children:r})}function T(e){let{name:r}=e;return(0,t.jsxs)(I,{children:[(0,t.jsxs)(N,{value:"npm",label:"npm",default:!0,children:[(0,t.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.npmjs.com/downloading-and-installing-node-js-and-npm",children:"npm"})," ","is the default package manager for"," ",(0,t.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://nodejs.org",children:"Node.js"}),", and to where ",(0,t.jsx)("code",{children:r})," is published.",(0,t.jsx)("br",{}),"Your project is using npm if it has a ",(0,t.jsx)("code",{children:"package-lock.json"})," file in its root folder.",(0,t.jsx)("br",{}),(0,t.jsx)("br",{}),(0,t.jsx)("strong",{children:"Run the following command in your terminal:"}),(0,t.jsx)("br",{}),(0,t.jsx)("br",{}),(0,t.jsxs)(l.default,{language:"shell",title:"terminal",children:["npm install ",r]})]}),(0,t.jsxs)(N,{value:"yarn",label:"yarn",default:!0,children:[(0,t.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://yarnpkg.com",children:"yarn"})," ","is a fast, reliable and secure dependency manager for"," ",(0,t.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://nodejs.org",children:"Node.js"}),".",(0,t.jsx)("br",{}),"Your project is using Yarn if it has a ",(0,t.jsx)("code",{children:"yarn.lock"})," file in its root folder.",(0,t.jsx)("br",{}),(0,t.jsx)("br",{}),(0,t.jsx)("strong",{children:"Run the following command in your terminal:"}),(0,t.jsx)("br",{}),(0,t.jsx)("br",{}),(0,t.jsxs)(l.default,{language:"shell",title:"terminal",children:["yarn add ",r]})]}),(0,t.jsxs)(N,{value:"pnpm",label:"pnpm",default:!0,children:[(0,t.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://pnpm.io/installation",children:"pnpm"})," ","is a fast, disk space efficient package manager for"," ",(0,t.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://nodejs.org",children:"Node.js"}),".",(0,t.jsx)("br",{}),"Your project is using pnpm if it has a ",(0,t.jsx)("code",{children:"pnpm-lock.yaml"})," file in its root folder.",(0,t.jsx)("br",{}),(0,t.jsx)("br",{}),(0,t.jsx)("strong",{children:"Run the following command in your terminal:"}),(0,t.jsx)("br",{}),(0,t.jsx)("br",{}),(0,t.jsxs)(l.default,{language:"shell",title:"terminal",children:["pnpm add ",r]})]})]})}const _={},A="Postgres Migration CLI",E={id:"packages/pgmcli",title:"Postgres Migration CLI",description:"Installation",source:"@site/docs/packages/01-pgmcli.mdx",sourceDirName:"packages",slug:"/packages/pgmcli",permalink:"/monorepo/packages/pgmcli",draft:!1,unlisted:!1,editUrl:"https://github.com/igrek8/monorepo/tree/main/packages/docs/docs/packages/01-pgmcli.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"docs",previous:{title:"Introduction",permalink:"/monorepo/"}},C={},S=[{value:"Installation",id:"installation",level:2}];function q(e){const r={h1:"h1",h2:"h2",header:"header",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.header,{children:(0,t.jsx)(r.h1,{id:"postgres-migration-cli",children:"Postgres Migration CLI"})}),"\n",(0,t.jsx)(r.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(T,{name:"pgmcli"})]})}function D(e={}){const{wrapper:r}={...(0,a.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(q,{...e})}):q(e)}}}]);