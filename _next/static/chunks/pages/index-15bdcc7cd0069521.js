(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(2811)}])},2811:function(e,s,t){"use strict";t.r(s),t.d(s,{__N_SSG:function(){return f},default:function(){return p}});var n=t(5893),r=t(9008),o=t(4128),i=t.n(o),a=function(e){var s=e.org,t=e.repo,r=e.workflow,o=e.branch;return(0,n.jsx)("h1",{className:i().title,children:(0,n.jsxs)("code",{className:i().code,children:[s,"/",t," ",r,"@",o]})})},c=t(5376),l=t(3328);l.kL.register(l.uw,l.f$,l.od,l.jn,l.Dx,l.u,l.De);var u=function(e){var s=e.successStats;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{className:i().description,children:"CI success rate (%) \u2197"}),(0,n.jsx)(c.x1,{options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0}}},data:{labels:Object.keys(s).sort(),datasets:[{label:"Daily success rate",data:Object.keys(s).sort().map((function(e){return s[e].successRate})),borderColor:"#c9e3c5"},{label:"7-point moving success rate",data:Object.keys(s).sort().map((function(e){return s[e].movingByDaySuccessRate.seven})),borderColor:"#33a122"}]}})]})};l.kL.register(l.uw,l.f$,l.od,l.jn,l.Dx,l.u,l.De);var d=function(e){var s=e.runtimeStats;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{className:i().description,children:"CI runtime (seconds) \u2198"}),(0,n.jsx)(c.x1,{options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0}}},data:{labels:Object.keys(s).sort(),datasets:[{label:"Daily average",data:Object.keys(s).sort().map((function(e){return s[e].avgSuccessTime})),borderColor:"#c7d3f0"},{label:"7-point moving average",data:Object.keys(s).sort().map((function(e){return s[e].movingByDayAvgSuccessTime.seven})),borderColor:"#034efc"}]}})]})},f=!0,p=function(e){var s=e.runtimeStats,t=e.successStats,o=e.repoConfig,c=o.org,l=o.repo,f=o.workflow,p=o.branch;return(0,n.jsxs)("div",{className:i().container,children:[(0,n.jsxs)(r.default,{children:[(0,n.jsx)("title",{children:"GitHub Actions statistics"}),(0,n.jsx)("meta",{name:"description",content:"Visualized statistics of GitHub Actions CI"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("main",{className:i().main,children:[(0,n.jsx)(a,{org:c,repo:l,workflow:f,branch:p}),(0,n.jsx)(u,{successStats:t}),(0,n.jsx)(d,{runtimeStats:s})]}),(0,n.jsx)("footer",{className:i().footer,children:(0,n.jsx)("a",{href:"https://honeypot.io/",target:"_blank",rel:"noopener noreferrer",children:"Powered by Honeypot"})})]})}},4128:function(e){e.exports={container:"Styles_container__6hGck",main:"Styles_main__XQlvu",code:"Styles_code___gkeN",title:"Styles_title__TyWDc",footer:"Styles_footer__305ef",description:"Styles_description__d9MUm"}}},function(e){e.O(0,[570,333,774,888,179],(function(){return s=5301,e(e.s=s);var s}));var s=e.O();_N_E=s}]);