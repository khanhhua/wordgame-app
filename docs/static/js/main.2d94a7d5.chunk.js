(this["webpackJsonpwordgame-app"]=this["webpackJsonpwordgame-app"]||[]).push([[0],{100:function(e,t,a){},102:function(e,t,a){},220:function(e,t,a){"use strict";a.r(t);var r=a(12),n=a(0),s=a.n(n),c=a(27),o=a.n(c),l=(a(99),a(100),a(4)),i=a.n(l),u=a(7),m=a(16),p=a(24),b=(a(102),s.a.createContext()),d=s.a.createContext(),g="http://wordgame-api.fatmandesigner.com",f=function(){var e=Object(u.a)(i.a.mark((function e(t,a){var r,n,s,c=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=c.length>2&&void 0!==c[2]?c[2]:null,n=localStorage.getItem("".concat("wg",":token")),s={"Content-Type":"application/json"},n&&(s.Authorization="Bearer ".concat(n)),e.abrupt("return",fetch(t,"get"===a?{headers:s,method:a}:{headers:s,method:a,body:r}).catch((function(e){return{ok:!1,error:e}})));case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),E=function(){var e=Object(u.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",{ok:!1});case 2:if(e.prev=2,!(a=t.headers.get("content-type"))||!a.match(/json/)){e.next=8;break}return e.abrupt("return",t.json());case 8:return e.next=10,t.text();case 10:return e.t0=e.sent,e.abrupt("return",{ok:!1,error:e.t0});case 12:e.next=17;break;case 14:return e.prev=14,e.t1=e.catch(2),e.abrupt("return",{ok:!1,error:e.t1});case 17:case"end":return e.stop()}}),e,null,[[2,14]])})));return function(t){return e.apply(this,arguments)}}(),k=function(e){return Object(u.a)(i.a.mark((function t(){var a;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f("".concat(g).concat(e),"GET");case 2:return a=t.sent,t.abrupt("return",E(a));case 4:case"end":return t.stop()}}),t)})))()},h=function(e,t){return Object(u.a)(i.a.mark((function a(){var r;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,f("".concat(g).concat(e),"POST",JSON.stringify(t));case 2:return r=a.sent,a.abrupt("return",E(r));case 4:case"end":return a.stop()}}),a)})))()},v=function(e){return Object(u.a)(i.a.mark((function t(){var a;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f("".concat(g).concat(e),"DELETE");case 2:return a=t.sent,t.abrupt("return",E(a));case 4:case"end":return t.stop()}}),t)})))()},x=a(15),w=a(238),y=a(222),N=a(221),O=a(223),j=a(224),C=a(225),I=a(239),S=a(240),R=a(226),_=a(227),P=a(88),D=function(){return s.a.createElement(w.a,{isOpen:!0,contentClassName:"bg-transparent border-0"},s.a.createElement(N.a,null,s.a.createElement("div",{className:"loader"},"Loading...")))},T=function(e){var t=e.term,a=e.addToCollection,c=Object(n.useContext)(b),o=Object(n.useContext)(d),l=Object(n.useState)(!1),m=Object(r.a)(l,2),p=m[0],g=m[1];return Object(n.useEffect)((function(){Object(u.a)(i.a.mark((function e(){var t,a,r,n,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="user/list-collections",e.next=3,k("/api/me/collections");case 3:if(a=e.sent,r=a.ok,n=a.collections,s=a.error,r){e.next=10;break}return c({type:t,status:"error",error:s}),e.abrupt("return");case 10:c({type:t,status:"ok",collections:n});case 11:case"end":return e.stop()}}),e)})))()}),[c]),s.a.createElement(w.a,{isOpen:!0},s.a.createElement(y.a,null,'Add "',t.get("word"),'" to collection...'),s.a.createElement(N.a,null,s.a.createElement(O.a,{row:!0},s.a.createElement(j.a,{className:"col-form-label col-2"},"Collection"),s.a.createElement("div",{className:"col-10"},s.a.createElement(C.a,{isOpen:p,toggle:function(){return g(!p)}},s.a.createElement(I.a,{caret:!0,className:"bg-transparent text-black-50 w-100"},"Choose a collection..."),s.a.createElement(S.a,{className:"w-100"},o.get("collections").map((function(e){return s.a.createElement(R.a,{key:e.get("id"),onClick:function(){return a(e.get("id"))}},e.get("name"))}))))))))},L=function(e){var t=e.sessionId,a=Object(n.useContext)(b),c=Object(n.useContext)(d),o=Object(n.useState)({busy:!1,error:null}),l=Object(r.a)(o,2),m=l[0],p=l[1],g=Object(n.useState)(null),f=Object(r.a)(g,2),E=f[0],y=f[1],O=Object(n.useState)(!1),j=Object(r.a)(O,2),C=j[0],I=j[1],S=Object(n.useState)(null),R=Object(r.a)(S,2),L=R[0],A=R[1];Object(n.useEffect)((function(){Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B();case 2:case"end":return e.stop()}}),e)})))()}),[t]),Object(n.useEffect)((function(){I(!1)}),[c.getIn(["gameSession","term"])]);var B=Object(n.useCallback)(Object(u.a)(i.a.mark((function e(){var t,r,n,s,o,l,u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.getIn(["gameSession","cursor"]),a({type:"user/next-term",status:"pending"}),e.next=4,k("/api/words?cursor=".concat(t||""));case 4:if(r=e.sent,n=r.ok,s=r.term,o=r.cursor,l=r.has_next,u=r.error,n){e.next=13;break}return a({type:"user/next-term",status:"error",error:u}),e.abrupt("return");case 13:a({type:"user/next-term",status:"ok",term:s,hasNext:l,cursor:o}),A(Date.now()/1e3);case 15:case"end":return e.stop()}}),e)}))),[a,c]),F=Object(n.useCallback)(function(){var e=Object(u.a)(i.a.mark((function e(a){var r,n,s,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=c.getIn(["gameSession","term","id"]),n=c.getIn(["gameSession","term","tags"]),s=n.includes(a),e.next=5,h("/api/stats",{session_id:t,term_id:r,correct:s,seconds:Date.now()/1e3-L});case 5:if(o=e.sent,o.ok){e.next=9;break}return e.abrupt("return");case 9:y({correct:s,article:n.includes("MAS")?"der":n.includes("FEM")?"die":"das"});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[a,L,c.getIn(["gameSession","term"])]),H=Object(n.useCallback)(Object(u.a)(i.a.mark((function e(){var t,n,s,o,l,u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p({busy:!0}),t=c.getIn(["gameSession","id"]),e.next=4,v("/api/session");case 4:return a({type:"user/show-report",status:"pending",sessionId:t}),e.next=7,Promise.all([k("/api/stats/".concat(t)),k("/api/stats?reports=weekly")]).then((function(e){var t=Object(r.a)(e,2),a=t[0],n=t[1];return{ok:a.ok||n.ok,sessionReport:a.report,weeklyReport:n.report}})).catch((function(e){return{ok:!1,error:e}}));case 7:if(n=e.sent,s=n.ok,o=n.error,l=n.sessionReport,u=n.weeklyReport,s){e.next=15;break}return a({type:"user/show-report",status:"error",error:o}),e.abrupt("return");case 15:p({busy:!1}),a({type:"user/show-report",status:"ok",report:Object(x.a)({session:l},u)});case 17:case"end":return e.stop()}}),e)}))),[a,c.getIn(["gameSession","term"])]),M=Object(n.useCallback)(Object(u.a)(i.a.mark((function e(){var t,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.getIn(["gameSession","term","id"]),e.next=3,h("/api/stats",{term_id:t,skipped:!0});case 3:if(a=e.sent,a.ok){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,B();case 9:case"end":return e.stop()}}),e)}))),[a,c.getIn(["gameSession","term"])]),W=Object(n.useCallback)(function(){var e=Object(u.a)(i.a.mark((function e(t){var r,n,s,o,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=c.getIn(["gameSession","term"]),a({type:"user/add-to-collections",status:"pending"}),e.next=4,h("/api/me/collections/".concat(t,"/terms"),{term_id:r.get("id")});case 4:if(n=e.sent,s=n.ok,o=n.collection,l=n.error,s){e.next=11;break}return a({type:"user/add-to-collections",status:"error",error:l}),e.abrupt("return");case 11:if(a({type:"user/add-to-collections",status:"ok",collection:o}),!c.getIn(["gameSession","hasNext"])){e.next=17;break}return e.next=15,B();case 15:e.next=18;break;case 17:H();case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[a,c.getIn(["gameSession","term"]),c.getIn(["gameSession","hasNext"])]),J=Object(n.useCallback)(Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y(null),!c.getIn(["gameSession","hasNext"])){e.next=6;break}return e.next=4,B();case 4:e.next=7;break;case 6:H();case 7:case"end":return e.stop()}}),e)}))),[a,c.getIn(["gameSession","term"]),c.getIn(["gameSession","hasNext"])]),z=c.getIn(["gameSession","term"]);return s.a.createElement("section",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("h2",{className:"text-center text-black-50"},"Play"),!z&&s.a.createElement("p",{className:"text-center"},"Loading..."),!!z&&s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"term mt-5 mb-5"},s.a.createElement("div",{className:"text-center display-2 text-break"},z.get("word")),s.a.createElement("button",{className:"btn btn-sm btn-link"},"Meaning >>")),s.a.createElement("div",{className:"actions text-center"},s.a.createElement("div",{className:"btn-group w-75"},s.a.createElement("button",{className:"btn btn-light btn-lg text-white btn-circle bg-masculine",onClick:function(){return F("MAS")}},"Der"),s.a.createElement("button",{className:"btn btn-light btn-lg text-white btn-circle bg-feminine",onClick:function(){return F("FEM")}},"Die"),s.a.createElement("button",{className:"btn btn-light btn-lg text-white btn-circle bg-neuter",onClick:function(){return F("NEU")}},"Das")),s.a.createElement("div",{className:"btn-group w-100 mt-5"},s.a.createElement("button",{className:"btn btn-light btn-sm",onClick:function(){return I(!0)}},"Learn"),s.a.createElement("button",{className:"btn btn-primary btn-sm",onClick:M},"Skip")),s.a.createElement("div",{className:"text-center mt-5"},s.a.createElement("button",{className:"btn btn-light",onClick:H},"I'm done for now"))))),!!E&&s.a.createElement(w.a,{isOpen:!0},s.a.createElement(N.a,null,s.a.createElement("div",{className:"display-2 text-center",style:{wordBreak:"break-word"}},s.a.createElement("span",{className:"font-weight-lighter text-muted"},z.get("word")),", ",s.a.createElement("br",null),s.a.createElement("span",{className:"font-weight-bold"},E.article))),s.a.createElement(_.a,null,s.a.createElement(P.a,{color:"success",onClick:J,className:"mx-auto"},"Next"))),!!C&&s.a.createElement(T,{term:z,addToCollection:W}),!!m.busy&&s.a.createElement(D,null))},A=a(42),B={fill:!1,lineTension:.1,backgroundColor:"rgba(63,69,192,0.4)",borderColor:"rgb(65,121,192)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10},F=function(e){var t=e.weeklyPerformance,a=t.map((function(e){var t,a=e.week;return t=new Date(7*a*86400*1e3),"".concat(t.getMonth()+1,".").concat(t.getDate())})),r=t.map((function(e){return(100*e.confidence_factor).toFixed(2)})),n=t.map((function(e){return(100*e.correct_factor).toFixed(2)}));return s.a.createElement(A.b,{data:{labels:a,datasets:[Object(x.a)({label:"Correct",data:n},B),Object(x.a)({label:"Confidence",data:r},B,{backgroundColor:"#C0122A",borderColor:"#f3132c"})]},width:100,height:40,options:{scales:{yAxes:[{ticks:{max:100,min:0,stepSize:20}}]},maintainAspectRatio:!0,layout:{padding:0}}})},H=function(){Object(n.useContext)(b);var e=Object(n.useContext)(d),t=e.getIn(["report","session"]),a=e.getIn(["report","weekly_performance"]),r=t.getIn(["der","corrects"])/(t.getIn(["der","corrects"])+t.getIn(["der","wrongs"])),c=t.getIn(["die","corrects"])/(t.getIn(["die","corrects"])+t.getIn(["die","wrongs"])),o=t.getIn(["das","corrects"])/(t.getIn(["das","corrects"])+t.getIn(["das","wrongs"]));return s.a.createElement("section",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("h2",null,"Report"),s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-header"},s.a.createElement("h3",null,"Session Report")),s.a.createElement("div",{className:"card-body"},s.a.createElement("div",{className:"progress-group"},s.a.createElement("div",{className:"progress-label"},"DER"),s.a.createElement("div",{className:"progress mr-0"},s.a.createElement("div",{className:"progress-bar bg-masculine",role:"progressbar",style:{width:"".concat(100*r,"%")}}))),s.a.createElement("div",{className:"progress-group"},s.a.createElement("div",{className:"progress-label"},"DIE"),s.a.createElement("div",{className:"progress mr-0"},s.a.createElement("div",{className:"progress-bar bg-feminine",role:"progressbar",style:{width:"".concat(100*c,"%")}}))),s.a.createElement("div",{className:"progress-group"},s.a.createElement("div",{className:"progress-label"},"DAS"),s.a.createElement("div",{className:"progress mr-0"},s.a.createElement("div",{className:"progress-bar bg-neuter",role:"progressbar",style:{width:"".concat(100*o,"%")}}))))),s.a.createElement("div",{className:"card mt-4"},s.a.createElement("div",{className:"card-header"},s.a.createElement("h3",{className:"mb-0"},"Weekly Report")),s.a.createElement("div",{className:"card-body"},s.a.createElement(F,{weeklyPerformance:a.toJS()})))))},M=a(43),W=a.n(M),J=function(e){var t=Object(n.useContext)(b),a=Object(n.useContext)(d),r=Object(p.g)(),c=Object(p.h)();Object(n.useEffect)((function(){Object(u.a)(i.a.mark((function e(){var a,r,n,s,o,l,u,m,p,b,d,g;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.sessionId){e.next=13;break}return e.next=3,k("/api/session");case 3:if(a=e.sent,r=a.ok,n=a.session,s=a.error,r){e.next=10;break}return t({type:"user/start-session",status:"error",error:s}),e.abrupt("return");case 10:t({type:"user/start-session",status:"ok",session:n}),e.next=37;break;case 13:return t({type:"user/start-session",status:"pending"}),e.next=16,k("/api/session");case 16:if(o=e.sent,l=o.ok,u=o.session,m=o.error,l){e.next=23;break}return t({type:"user/start-session",status:"error",error:m}),e.abrupt("return");case 23:if(u){e.next=36;break}return e.next=26,h("/api/session");case 26:if(p=e.sent,b=p.ok,d=p.session,g=p.error,b){e.next=33;break}return t({type:"user/start-session",status:"error",error:g}),e.abrupt("return");case 33:t({type:"user/start-session",status:"ok",session:d}),e.next=37;break;case 36:t({type:"user/start-session",status:"ok",session:u});case 37:case"end":return e.stop()}}),e)})))()}),[]);var o=Object(n.useCallback)(function(){var e=Object(u.a)(i.a.mark((function e(a){var n,s,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h("/api/auth",{tokenId:a.tokenId});case 2:n=e.sent,n.ok,s=n.token,c=n.profile,localStorage.setItem("wg:token",s),t({type:"user/login",status:"ok",token:s,profile:c}),r.replace("/collections");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[t]),l=a.getIn(["gameSession"]);return s.a.createElement("div",{className:"container play-page"},!(l&&l.get("id"))&&s.a.createElement("section",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("div",{className:"btn btn-primary btn-lg w-100",style:{marginTop:"75%"}},"START"))),!(!l||!l.get("id")||"playing"!==l.get("status"))&&s.a.createElement(L,{sessionId:l.get("id")}),!(!l||!l.get("id")||"done"!==l.get("status"))&&s.a.createElement(H,{sessionId:l.get("id")}),!(!l||!l.get("id")||"done"!==l.get("status"))&&s.a.createElement("section",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement(m.b,{className:"btn btn-sm btn-link btn-block",to:"/collections"},"Back to collections"),!a.getIn(["profile","isLoggedIn"])&&s.a.createElement(s.a.Fragment,null,s.a.createElement(W.a,{clientId:"976856176051-ietkcknpua13udt2tucm8sbecik7h5rt.apps.googleusercontent.com",redirectUri:"http://localhost:3000/auth/google",onSuccess:o,className:"mt-5"}),s.a.createElement("p",{className:"text-muted"},"...to keep track of your progress")))))},z=function(e){var t=Object(n.useContext)(b),a=Object(p.g)(),r=Object(n.useCallback)(function(){var e=Object(u.a)(i.a.mark((function e(r){var n,s,c,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h("/api/auth",{access_code:r.code});case 2:n=e.sent,n.ok,s=n.token,c=n.profile,o=n.default_collection,localStorage.setItem("wg:token",s),t({type:"user/login",status:"ok",token:s,profile:c,defaultCollection:o}),a.replace("/collections");case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[t]);return s.a.createElement("div",{className:"container login-page"},s.a.createElement("section",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("h3",{style:{marginTop:"50%"}},"Hallo Deutsch"),s.a.createElement(W.a,{clientId:"976856176051-ietkcknpua13udt2tucm8sbecik7h5rt.apps.googleusercontent.com",redirectUri:"http://localhost:3000/auth/google",onSuccess:r,responseType:"code"}),s.a.createElement("p",{className:"text-muted"},"...to coup with the insane irregularity in the German language."))),s.a.createElement("div",{className:"row justify-content-center"},s.a.createElement("div",{className:"col-6"},s.a.createElement(m.b,{className:"btn btn-primary btn-lg btn-block",to:"/play"},"TRY NOW!"))))},U=a(228),G=a(229),Y=function(e){var t=e.collections,a=e.onReviewClick;return s.a.createElement("div",{className:"list-group list-group-flush"},t.map((function(e){return s.a.createElement("div",{key:e.get("id"),className:"list-group-item px-1"},e.get("name"),s.a.createElement("div",{className:"actions float-right"},s.a.createElement("div",{className:"btn-group btn-group-sm"},s.a.createElement("button",{className:"btn btn-sm btn-primary",onClick:function(){return a(e)}},"Review"))))})))},$=function(e){var t=Object(n.useContext)(b),a=Object(n.useContext)(d),c=Object(n.useState)({visible:!1,name:""}),o=Object(r.a)(c,2),l=o[0],m=o[1],g=Object(n.useRef)(),f=Object(p.g)();Object(n.useEffect)((function(){Object(u.a)(i.a.mark((function e(){var a,n,s,c,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([k("/api/collections"),k("/api/me/collections")]).then((function(e){var t=Object(r.a)(e,2),a=t[0],n=a.ok,s=a.collections,c=t[1],o=c.ok;return{ok:n||o,collections:s,myCollections:c.collections}})).catch((function(e){return{ok:!1,error:e}}));case 2:if(a=e.sent,n=a.ok,s=a.collections,c=a.myCollections,o=a.error,n){e.next=10;break}return t({type:"user/list-collections",status:"error",error:o}),e.abrupt("return");case 10:t({type:"user/list-collections",status:"ok",collections:s,myCollections:c});case 11:case"end":return e.stop()}}),e)})))()}),[]);var E=function(){var e=Object(u.a)(i.a.mark((function e(a){var r,n,s,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:"user/start-session",status:"pending"}),e.next=3,h("/api/session",a.get("is_owned")?{collection_id:a.get("id")}:{category_id:a.get("id")});case 3:if(r=e.sent,n=r.ok,s=r.session,c=r.error,n){e.next=10;break}return t({type:"user/start-session",status:"error",error:c}),e.abrupt("return");case 10:t({type:"user/start-session",status:"ok",session:s}),f.push("/play/".concat(s.id));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=Object(n.useCallback)(Object(u.a)(i.a.mark((function e(){var a,r,n,s,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:a="user/create-collection",status:"pending"}),e.next=4,h("/api/me/collections",{name:g.current.value});case 4:if(r=e.sent,n=r.ok,s=r.collection,c=r.error,n){e.next=10;break}return e.abrupt("return",t({type:a,status:"error",error:c}));case 10:t({type:a,status:"ok",collection:s}),m({visible:!1});case 12:case"end":return e.stop()}}),e)}))),[t,g]),x=a.get("collections"),C=a.get("myCollections");return s.a.createElement("div",{className:"container my-collection-list-page"},s.a.createElement("section",{className:"row"},s.a.createElement("div",{className:"col"},!(!C||!C.size)&&s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"w-100"},s.a.createElement("button",{onClick:function(){return m({visible:!0})},className:"btn btn-sm btn-light mt-2 float-right"},"Add"),s.a.createElement("h2",null,"My Learning List")),s.a.createElement(Y,{collections:C,onReviewClick:E})),!(x&&x.size)&&s.a.createElement("p",{className:"text-center"},"Loading..."),!(!x||!x.size)&&s.a.createElement(s.a.Fragment,null,s.a.createElement("h2",{className:"mt-5"},"Collections"),s.a.createElement(Y,{collections:x,onReviewClick:E})))),!!l.visible&&s.a.createElement(w.a,{isOpen:l.visible},s.a.createElement(y.a,{toggle:function(){return m({visible:!1})}},"New Collection"),s.a.createElement(N.a,null,s.a.createElement(U.a,null,s.a.createElement(O.a,null,s.a.createElement(j.a,null,"Name"),s.a.createElement(G.a,{innerRef:g})))),s.a.createElement(_.a,null,s.a.createElement(P.a,{onClick:v,color:"primary"},"Create"))))},q=a(230),K=a(231),Q=a(232),V=a(233),X={backgroundColor:"rgba(63,69,192,0.4)",borderColor:"rgb(65,121,192)",borderWidth:1,hoverBackgroundColor:"rgba(63,69,192,0.4)",hoverBorderColor:"rgb(65,121,192)"},Z=function(e){var t=e.histogram;return s.a.createElement(A.a,{width:100,height:50,data:{labels:t.map((function(e){return e.seconds})),datasets:[Object(x.a)({label:"Correct Response Time (s)",data:t.map((function(e){return e.correct_count}))},X),Object(x.a)({label:"Incorrect Response Time (s)",data:t.map((function(e){return e.wrong_count}))},X,{backgroundColor:"rgba(192,83,102,0.4)",borderColor:"rgb(192,73,90)"})]},options:{scales:{yAxes:[{ticks:{min:0}}],xAxes:[{distribution:"series"}]}}})},ee=function(e){var t=Object(n.useState)({busy:!1,error:null}),a=Object(r.a)(t,2),c=a[0],o=a[1],l=Object(n.useState)({worstPerformers:[],weeklyPerformance:[],histogram:[]}),m=Object(r.a)(l,2),p=m[0],b=m[1];return Object(n.useEffect)((function(){Object(u.a)(i.a.mark((function e(){var t,a,r,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o({busy:!0}),e.next=3,k("/api/stats?reports=weekly&reports=worst&reports=histogram");case 3:if(t=e.sent,a=t.ok,r=t.report,n=t.error,a){e.next=10;break}return o({error:n}),e.abrupt("return");case 10:o({busy:!1}),b({worstPerformers:r.worst_performers,weeklyPerformance:r.weekly_performance,histogram:r.histogram});case 12:case"end":return e.stop()}}),e)})))()}),[]),s.a.createElement("div",{className:"container report-page"},!!c.busy&&s.a.createElement(D,null),s.a.createElement("section",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("h2",null,"Report"),s.a.createElement(q.a,null,s.a.createElement(K.a,null,s.a.createElement("h5",{className:"mb-0"},"Needs improvements")),s.a.createElement(Q.a,null,p.worstPerformers.map((function(e){return s.a.createElement(V.a,{pill:!0,color:"warning",className:"p-2 mr-2 mb-2",style:{opacity:1.05-e.confidence_factor}},e.word,s.a.createElement("span",{className:"pl-2"},100*e.correct_factor,"%"))})))),s.a.createElement(q.a,{className:"mt-2"},s.a.createElement(K.a,null,s.a.createElement("h5",{className:"mb-0"},"Performance")),s.a.createElement(Q.a,null,!!(p&&p.histogram&&p.histogram.length)&&s.a.createElement(Z,{histogram:p.histogram}),!!(p&&p.weeklyPerformance&&p.weeklyPerformance.length)&&s.a.createElement(F,{weeklyPerformance:p.weeklyPerformance}))))))},te=a(234),ae=a(235),re=a(236),ne=a(237),se=function(){var e=Object(n.useCallback)((function(){window.localStorage.clear(),window.location.href="/#/login"}),[]);return s.a.createElement(te.a,{light:!0,className:"bg-light"},s.a.createElement(ae.a,{className:"font-weight-lighter"},"Hallo Deutsch"),s.a.createElement(re.a,{className:"mx-auto"},s.a.createElement(m.c,{to:"/collections",exact:!0,className:"nav-item px-2"},"Collections"),s.a.createElement(m.c,{to:"/report",exact:!0,className:"nav-item px-2"},"Report")),s.a.createElement(re.a,null,s.a.createElement(ne.a,{onClick:e},"Logout")))};var ce=function(){var e=Object(n.useContext)(b),t=Object(n.useContext)(d);return Object(n.useEffect)((function(){Object(u.a)(i.a.mark((function a(){var r,n,s,c;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(!t.getIn(["profile","isLoggedIn"])){a.next=5;break}return a.abrupt("return");case 5:if(!localStorage.getItem("wg:token")){a.next=17;break}return a.next=9,k("/api/auth");case 9:if(r=a.sent,n=r.ok,s=r.profile,c=r.default_collection,n){a.next=16;break}return localStorage.clear(),a.abrupt("return",window.location.replace("/#/login"));case 16:e({type:"user/login",status:"ok",profile:s,defaultCollection:c});case 17:case"end":return a.stop()}}),a)})))()}),[e,t.getIn(["profile","isLoggedIn"])]),s.a.createElement("div",{className:"App"},s.a.createElement(m.a,null,s.a.createElement(p.d,null,s.a.createElement(p.b,{exact:!0,path:"/login"},s.a.createElement(z,null)),s.a.createElement(p.b,{exact:!0,path:"/play/:sessionId"},s.a.createElement(se,null),s.a.createElement(J,null)),s.a.createElement(p.b,{exact:!0,path:"/play"},s.a.createElement(se,null),s.a.createElement(J,null)),s.a.createElement(p.b,{exact:!0,path:"/report"},s.a.createElement(se,null),s.a.createElement(ee,null)),s.a.createElement(p.b,{exact:!0,path:"/collections"},s.a.createElement(se,null),s.a.createElement($,null)),s.a.createElement(p.b,null,s.a.createElement(p.a,{to:"/login"})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var oe=a(93),le=a(17),ie=Object(le.a)({profile:{isLoggedIn:!1},gameSession:{id:null,status:"pending"},collections:[],report:{}}),ue=function(e,t){var a=t.type,r=t.status,n=Object(oe.a)(t,["type","status"]);if("error"===r)return n.error&&"Invalid token"===n.error?e.set("profile",Object(le.a)({isLoggedIn:!1})):e;if("pending"===r)return e;switch(console.log({type:a,action:n,state:e.toJS()}),a){case"user/login":return e.set("profile",Object(le.a)(Object(x.a)({isLoggedIn:!0,defaultCollection:n.defaultCollection},n.profile)));case"user/list-collections":return e.set("collections",Object(le.a)(n.collections)).set("myCollections",Object(le.a)(n.myCollections));case"user/create-collection":return e.updateIn(["myCollections"],(function(e){return e.unshift(Object(le.a)(n.collection))}));case"user/start-session":return e.setIn(["gameSession"],Object(le.a)(Object(x.a)({},n.session,{hasNext:!0,status:"playing"})));case"user/next-term":return e.setIn(["gameSession","term"],Object(le.a)(n.term)).setIn(["gameSession","cursor"],n.cursor).setIn(["gameSession","hasNext"],n.hasNext);case"user/show-report":return e.setIn(["gameSession","status"],"done").set("report",Object(le.a)(n.report));default:return e}};o.a.render(s.a.createElement((function(e){var t=Object(n.useReducer)(ue,ie),a=Object(r.a)(t,2),c=a[0],o=a[1];return s.a.createElement(b.Provider,{value:o},s.a.createElement(d.Provider,{value:c},s.a.createElement(ce,null)))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},94:function(e,t,a){e.exports=a(220)}},[[94,1,2]]]);
//# sourceMappingURL=main.2d94a7d5.chunk.js.map