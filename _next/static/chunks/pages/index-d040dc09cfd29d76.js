(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(2811)}])},2811:function(e,s,t){"use strict";t.r(s),t.d(s,{__N_SSG:function(){return y},default:function(){return m}});var n=t(5893),r=t(9008),i=t(4128),a=t.n(i),o=function(e){var s=e.repoConfig;return(0,n.jsxs)("h1",{className:a().title,children:[s.org,"/",s.repo,"  ",s.workflow,"@",s.branch]})},c=t(5376),l=t(3328);l.kL.register(l.uw,l.f$,l.od,l.jn,l.Dx,l.u,l.De);var u=function(e){var s=e.successStats,t=s[Object.keys(s).sort().slice(-1)[0]];return(0,n.jsxs)("div",{style:{width:"100%"},children:[(0,n.jsx)("p",{className:a().description,children:"CI success rate (%) \u2197 "}),(0,n.jsxs)("p",{className:a().latestValue,children:["7-point average:"," ",Math.round(t.movingByDaySuccessRate.seven)," % | Daily:"," ",Math.round(t.successRate)," %"]}),(0,n.jsx)(c.x1,{options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0}}},data:{labels:Object.keys(s).sort(),datasets:[{label:"7-point moving success rate",data:Object.keys(s).sort().map((function(e){return s[e].movingByDaySuccessRate.seven})),borderColor:"#33a122"},{label:"Daily success rate",data:Object.keys(s).sort().map((function(e){return s[e].successRate})),borderColor:"#c9e3c5"}]}})]})},d=t(381),p=t.n(d);l.kL.register(l.uw,l.f$,l.od,l.jn,l.Dx,l.u,l.De);var f=function(e){var s=e.runtimeStats,t=s[Object.keys(s).sort().slice(-1)[0]],r=function(e){return p()().startOf("day").seconds(e).format("mm:ss")};return(0,n.jsxs)("div",{style:{width:"100%"},children:[(0,n.jsx)("p",{className:a().description,children:"CI runtime (seconds) \u2198"}),(0,n.jsxs)("p",{className:a().latestValue,children:["7-point average:"," ",r(t.movingByDayAvgSuccessTime.seven)," | Daily:"," ",r(t.avgSuccessTime)]}),(0,n.jsx)(c.x1,{options:{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0}}},data:{labels:Object.keys(s).sort(),datasets:[{label:"7-point moving average",data:Object.keys(s).sort().map((function(e){return s[e].movingByDayAvgSuccessTime.seven})),borderColor:"#034efc"},{label:"Daily average",data:Object.keys(s).sort().map((function(e){return s[e].avgSuccessTime})),borderColor:"#c7d3f0"}]}})]})},y=!0,m=function(e){var s=e.data;return(0,n.jsxs)("div",{className:a().container,children:[(0,n.jsxs)(r.default,{children:[(0,n.jsx)("title",{children:"GitHub Actions statistics"}),(0,n.jsx)("meta",{name:"description",content:"Visualized statistics of GitHub Actions CI"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsx)("main",{className:a().main,children:s.map((function(e,s){return(0,n.jsxs)("div",{style:{width:"100%"},children:[(0,n.jsx)(o,{repoConfig:e.repoConfig}),(0,n.jsxs)("div",{style:{display:"flex"},children:[(0,n.jsx)(u,{successStats:e.successStats}),(0,n.jsx)(f,{runtimeStats:e.runtimeStats})]})]},s)}))}),(0,n.jsx)("footer",{className:a().footer,children:(0,n.jsx)("a",{href:"https://honeypot.io/",target:"_blank",rel:"noopener noreferrer",children:"Powered by Honeypot"})})]})}},4128:function(e){e.exports={container:"Styles_container__6hGck",main:"Styles_main__XQlvu",title:"Styles_title__TyWDc",footer:"Styles_footer__305ef",description:"Styles_description__d9MUm",latestValue:"Styles_latestValue__Z9u1b"}}},function(e){e.O(0,[885,570,333,774,888,179],(function(){return s=5301,e(e.s=s);var s}));var s=e.O();_N_E=s}]);