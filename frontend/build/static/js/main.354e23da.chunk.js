(this.webpackJsonpswitchmap=this.webpackJsonpswitchmap||[]).push([[0],{28:function(e,t,n){},30:function(e,t,n){},49:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),a=n(23),s=n.n(a),o=(n(28),n(3)),i=n.n(o),d=n(7),u=n(6),p=n(14),l=n(2),j=n(9),h=(n(30),n(8)),b=n.n(h),f=(n(49),n(0)),m=function(e){var t=e.children,n=e.configuration,r=e.handleChangeInputValue,c=e.type;return Object(f.jsxs)("div",{className:"group",children:[Object(f.jsx)("input",{type:c,required:!0,id:n,value:t,onChange:r}),Object(f.jsx)("label",{})]})},x=function(e){var t=e.handleDeletePort,n=e.handleUpdatePort,c=Object(l.g)(),a=Object(l.f)(),s=Object(r.useState)({id:1,code:"1",switchCode:"1",desc:"",departId:1,department:{departName:"Indefinido",id:1}}),o=Object(u.a)(s,2),h=o[0],x=o[1],O=Object(r.useState)([{id:1,departName:"Admin"},{id:2,departName:"Comercial"}]),v=Object(u.a)(O,2),w=v[0],g=v[1];Object(r.useEffect)((function(){var e=function(){var e=Object(d.a)(i.a.mark((function e(){var t,n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("http://localhost:3001/port/".concat(c.portId));case 2:t=e.sent,n=t.data,x(n),r=function(){var e=Object(d.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("http://localhost:3001/department");case 2:t=e.sent,n=t.data,g(n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),r();case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var y=function(){var e=Object(d.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.delete("http://localhost:3001/port/".concat(c.portId));case 2:t().then(a("/"));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=document.getElementById("input-port-code").value,t=document.getElementById("input-port-desc").value,n=document.getElementById("department-select").value,r=Object(p.a)(Object(p.a)({},h),{},{code:e,desc:t,departId:n});x(r)},C=function(){var e=Object(d.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.put("http://localhost:3001/port/".concat(c.portId),h);case 2:n().then(a("/"));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(f.jsxs)("div",{className:"info-container",children:[Object(f.jsxs)("div",{className:"title-container",children:[Object(f.jsx)("div",{children:Object(f.jsx)(j.b,{to:"/",children:"Voltar"})}),Object(f.jsxs)("div",{className:"headers-info",children:[Object(f.jsx)("h1",{children:"Porta - "}),Object(f.jsx)(m,{handleChangeInputValue:N,configuration:"input-port-code",type:"number",children:h.code}),Object(f.jsxs)("h1",{children:["Switch - ",h.switchCode]})]})]}),Object(f.jsxs)("div",{className:"description",children:[Object(f.jsx)("h3",{children:"Descri\xe7\xe3o"}),Object(f.jsx)(m,{handleChangeInputValue:N,configuration:"input-port-desc",type:"text",children:h.desc}),Object(f.jsxs)("select",{name:"department-select",id:"department-select",onChange:N,className:"select-port-department",children:[Object(f.jsx)("option",{value:h.departId,children:h.department.departName}),w.map((function(e){return e.id===h.departId?null:Object(f.jsx)("option",{value:e.id,children:e.departName})}))]})]}),Object(f.jsxs)("div",{className:"port-control",children:[Object(f.jsx)("button",{className:"update-button",onClick:C,children:"Atualizar"}),Object(f.jsx)("button",{className:"delete-button",onClick:y,children:"Apagar"})]})]})},O=(n(51),n(52),function(e){var t=e.port,n=Object(l.f)();return Object(f.jsx)("div",{className:"sw-port",children:Object(f.jsx)("input",{type:"text",value:t.code,className:"port-input",onClick:function(){n("/port/".concat(t.id))},readOnly:!0})})}),v=function(e){var t=e.ports;return Object(f.jsx)("div",{className:"ports",children:t.map((function(e){return Object(f.jsx)(O,{port:e},e.id)}))})},w=(n(53),function(e){var t,n,r=e.sw;return n=r.Ports.filter((function(e){return e.code%2!==0})),t=r.Ports.filter((function(e){return e.code%2===0})),Object(f.jsxs)("div",{className:"switch",children:[Object(f.jsxs)("div",{children:[Object(f.jsx)(v,{ports:n}),Object(f.jsx)(v,{ports:t})]}),Object(f.jsxs)("div",{className:"control",children:[Object(f.jsx)("h1",{children:r.id}),Object(f.jsx)(j.b,{to:"/port/add",children:"Cadastrar"})]})]})}),g=function(e){var t=e.data;return Object(f.jsx)(f.Fragment,{children:t.map((function(e){return Object(f.jsx)(w,{sw:e},e.id)}))})},y=(n(54),n(55),function(e){var t=e.handleCreatePort,n=Object(r.useState)([{id:1,departName:"Admin"},{id:2,departName:"Comercial"}]),c=Object(u.a)(n,2),a=c[0],s=c[1];Object(r.useEffect)((function(){var e=function(){var e=Object(d.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("http://localhost:3001/department");case 2:t=e.sent,n=t.data,s(n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var o=Object(l.f)(),p=function(){var e=Object(d.a)(i.a.mark((function e(){var n,r,c,a,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.getElementById("inputPortSwCode").value,r=document.getElementById("inputPortCode").value,c=document.getElementById("inputPortDesc").value,a=document.getElementById("department-select").value,s={code:r,switchCode:n,portDesc:c,departId:a},e.next=7,b.a.post("http://localhost:3001/port/add",s);case 7:t().then(o("/"));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(f.jsxs)("div",{className:"add-container",children:[Object(f.jsxs)("div",{children:[Object(f.jsx)(j.b,{to:"/",children:"Voltar"}),Object(f.jsx)("h1",{children:"Adicionar porta"})]}),Object(f.jsxs)("div",{className:"input-container",children:[Object(f.jsx)("label",{htmlFor:"inputPortSwCode",children:"N\xfamero do Switch"}),Object(f.jsx)("input",{type:"text",id:"inputPortSwCode",name:"inputPortSwCode",required:!0}),Object(f.jsx)("label",{htmlFor:"inputPortCode",children:"N\xfamero da porta"}),Object(f.jsx)("input",{type:"text",id:"inputPortCode",name:"department-select",required:!0}),Object(f.jsx)("label",{htmlFor:"department-select",children:"Departamento"}),Object(f.jsx)("select",{name:"department-select",id:"department-select",children:a.map((function(e){return Object(f.jsx)("option",{value:e.id,children:e.departName})}))}),Object(f.jsx)("label",{htmlFor:"inputPortDesc",children:"Descri\xe7\xe3o"}),Object(f.jsx)("input",{type:"text",id:"inputPortDesc",name:"inputPortDesc",required:!0}),Object(f.jsx)("button",{onClick:p,children:"Cadastrar"})]})]})}),N=function(){var e=Object(r.useState)([{id:1,Ports:[{code:"1",desc:"lorenipsun"},{code:"2",desc:"loreion"}]},{id:2,Ports:[{code:"1",desc:"loren"},{code:"2",desc:"loren2"}]}]),t=Object(u.a)(e,2),n=t[0],c=t[1];Object(r.useEffect)((function(){var e=function(){var e=Object(d.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("http://localhost:3001");case 2:t=e.sent,n=t.data,c(n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var a=function(){var e=Object(d.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("http://localhost:3001/");case 2:return e.next=4,e.sent.data;case 4:return t=e.sent,c(t),e.abrupt("return","Deleted");case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),s=function(){var e=Object(d.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("http://localhost:3001/");case 2:return e.next=4,e.sent.data;case 4:return t=e.sent,c(t),e.abrupt("return","Created");case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(d.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("http://localhost:3001/");case 2:return e.next=4,e.sent.data;case 4:return t=e.sent,c(t),e.abrupt("return","Updated");case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(f.jsx)(j.a,{children:Object(f.jsx)("div",{className:"hack",children:Object(f.jsxs)(l.c,{children:[Object(f.jsx)(l.a,{exact:!0,path:"/",element:Object(f.jsx)(g,{data:n})}),Object(f.jsx)(l.a,{path:"port/:portId",element:Object(f.jsx)(x,{handleDeletePort:a,handleUpdatePort:o})}),Object(f.jsx)(l.a,{path:"port/add/",element:Object(f.jsx)(y,{handleCreatePort:s})})]})})})};s.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(N,{})}),document.getElementById("root"))}},[[56,1,2]]]);
//# sourceMappingURL=main.354e23da.chunk.js.map