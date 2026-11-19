import { useEffect, useMemo, useState } from "react";

export type DemoAccount = {id:string;type:string;number:string;holder:string;balancePaise:number};
export type DemoBeneficiary = {id:string;name:string;accountLast4:string;kind:"INTERNAL"|"EXTERNAL";accountId?:string;bank?:string};
export type BankTransaction = {
 id:string;reference:string;accountId:string;fromAccountLabel:string;counterparty:string;amountPaise:number;
 direction:"in"|"out";type:"TRANSFER"|"PAYMENT";status:"COMPLETED"|"PENDING"|"FAILED";
 description:string;createdAt:string;
};
export type DemoNotification = {id:string;title:string;body:string;kind:"activity"|"transfer"|"payment"|"security"|"card";createdAt:string;read:boolean};
type DemoState = {
 accounts:DemoAccount[];beneficiaries:DemoBeneficiary[];transactions:BankTransaction[];
 notifications:DemoNotification[];cardNumber:string;cardControls:{frozen:boolean;online:boolean;international:boolean};
 dailyLimitPaise:number;monthlyLimitPaise:number;cardCount:number;
};
const STORAGE_KEY="nexora-bank-demo-v2";
const now=Date.now();
const ago=(minutes:number)=>new Date(now-minutes*60000).toISOString();
const seed:DemoState={
 accounts:[
  {id:"acc-savings",type:"PRIMARY SAVINGS",number:"NXR00002048",holder:"Tushar Gupta",balancePaise:74205000},
  {id:"acc-current",type:"CURRENT ACCOUNT",number:"NXR00007912",holder:"Tushar Gupta",balancePaise:27000000}
 ],
 beneficiaries:[
  {id:"ben-aarya",name:"NEXORA Current Account",accountLast4:"7912",kind:"INTERNAL",accountId:"acc-current"},
  {id:"ben-rahul",name:"Rahul Mehta",accountLast4:"1940",kind:"EXTERNAL",bank:"Demo National Bank"},
  {id:"ben-neha",name:"Neha Kapoor",accountLast4:"5022",kind:"EXTERNAL",bank:"Unity Demo Bank"},
  {id:"ben-vikram",name:"NEXORA Savings Account",accountLast4:"2048",kind:"INTERNAL",accountId:"acc-savings"}
 ],
 transactions:[
  {id:"tx-1",reference:"NXB202611110001",accountId:"acc-savings",fromAccountLabel:"Primary Savings ···· 2048",counterparty:"Salary credited",amountPaise:8500000,direction:"in",type:"TRANSFER",status:"COMPLETED",description:"Monthly salary",createdAt:ago(1450)},
  {id:"tx-2",reference:"NXB202611110002",accountId:"acc-savings",fromAccountLabel:"Primary Savings ···· 2048",counterparty:"Netflix Subscription",amountPaise:64900,direction:"out",type:"PAYMENT",status:"COMPLETED",description:"Monthly subscription",createdAt:ago(900)},
  {id:"tx-3",reference:"NXB202611110003",accountId:"acc-savings",fromAccountLabel:"Primary Savings ···· 2048",counterparty:"Google Drive",amountPaise:14900,direction:"out",type:"PAYMENT",status:"COMPLETED",description:"Cloud storage",createdAt:ago(700)},
  {id:"tx-4",reference:"NXB202611110004",accountId:"acc-current",fromAccountLabel:"Current Account ···· 7912",counterparty:"Received from Aarya",amountPaise:2500000,direction:"in",type:"TRANSFER",status:"COMPLETED",description:"Shared expenses",createdAt:ago(500)},
  {id:"tx-5",reference:"NXB202611110005",accountId:"acc-savings",fromAccountLabel:"Primary Savings ···· 2048",counterparty:"Whole Foods Market",amountPaise:248000,direction:"out",type:"PAYMENT",status:"COMPLETED",description:"Groceries",createdAt:ago(280)}
 ],
 notifications:[
  {id:"nt-1",title:"Welcome to NEXORA",body:"Your local banking demo is ready to explore.",kind:"activity",createdAt:ago(1600),read:false},
  {id:"nt-2",title:"Card security",body:"Your demo card controls are available in the Cards section.",kind:"card",createdAt:ago(1400),read:false}
 ],
 cardNumber:"4532 8210 7744 4821",cardControls:{frozen:false,online:true,international:false},
 dailyLimitPaise:5000000,monthlyLimitPaise:20000000,cardCount:1
};
function load():DemoState {
 if(typeof window==="undefined")return seed;
 try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return seed;const parsed=JSON.parse(raw) as DemoState;
  if(!parsed.accounts||!parsed.transactions||!parsed.beneficiaries)return seed;return parsed;
 }catch{return seed}
}
const id=()=>`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
const ref=()=>`NXB${new Date().toISOString().replace(/\D/g,"").slice(0,14)}${Math.floor(Math.random()*90+10)}`;
export function useDemoBank(){
 const [state,setState]=useState<DemoState>(load);
 useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))},[state]);
 const addNotification=(title:string,body:string,kind:DemoNotification["kind"]="activity")=>{
  setState(s=>({ ...s,notifications:[{id:id(),title,body,kind,createdAt:new Date().toISOString(),read:false},...s.notifications].slice(0,30)}));
 };
 const transfer=({fromId,beneficiaryId,amountPaise,note,outcome}:{fromId:string;beneficiaryId:string;amountPaise:number;note:string;outcome?:"COMPLETED"|"PENDING"|"FAILED"}):BankTransaction|null=>{
  const from=state.accounts.find(a=>a.id===fromId);const beneficiary=state.beneficiaries.find(b=>b.id===beneficiaryId);
  if(!from||!beneficiary||amountPaise<=0||amountPaise>from.balancePaise)return null;
  const target=beneficiary.kind==="INTERNAL"?state.accounts.find(a=>a.id===beneficiary.accountId):undefined;
  if(beneficiary.kind==="INTERNAL"&&(!target||target.id===from.id))return null;
  const reference=ref(),createdAt=new Date().toISOString();const status=outcome||"COMPLETED";
  const tx:BankTransaction={id:id(),reference,accountId:from.id,fromAccountLabel:`${from.type} ···· ${from.number.slice(-4)}`,counterparty:beneficiary.name,amountPaise,direction:"out",type:"TRANSFER",status,description:note,createdAt};
  const accounts=status==="COMPLETED"?state.accounts.map(a=>a.id===from.id?{...a,balancePaise:a.balancePaise-amountPaise}:target&&a.id===target.id?{...a,balancePaise:a.balancePaise+amountPaise}:a):state.accounts;
  const mirrored:BankTransaction|undefined=status==="COMPLETED"&&target?{...tx,id:id(),accountId:target.id,fromAccountLabel:`${target.type} ···· ${target.number.slice(-4)}`,counterparty:`From ${from.holder}`,direction:"in"}:undefined;
  setState(s=>({...s,accounts,transactions:[...(mirrored?[mirrored]:[]),tx,...s.transactions]}));
  return tx;
 };
 const pay=({fromId,merchant,amountPaise,note,outcome}:{fromId:string;merchant:string;amountPaise:number;note:string;outcome?:"COMPLETED"|"PENDING"|"FAILED"}):BankTransaction|null=>{
  const from=state.accounts.find(a=>a.id===fromId);
  if(!from||amountPaise<=0||amountPaise>from.balancePaise||!merchant.trim())return null;
  const status=outcome||"COMPLETED";
  const tx:BankTransaction={id:id(),reference:ref(),accountId:from.id,fromAccountLabel:`${from.type} ···· ${from.number.slice(-4)}`,counterparty:merchant.trim(),amountPaise,direction:"out",type:"PAYMENT",status,description:note,createdAt:new Date().toISOString()};
  const accounts=status==="COMPLETED"?state.accounts.map(a=>a.id===from.id?{...a,balancePaise:a.balancePaise-amountPaise}:a):state.accounts;
  setState(s=>({...s,accounts,transactions:[tx,...s.transactions]}));
  return tx;
 };
 const addBeneficiary=(name:string,accountLast4:string,kind:"INTERNAL"|"EXTERNAL",bank?:string,accountId?:string)=>{
  setState(s=>({...s,beneficiaries:[{id:id(),name,accountLast4,kind,bank,accountId},...s.beneficiaries]}));
 };
 const updateCard=(key:string,value:boolean)=>setState(s=>({...s,cardControls:{...s.cardControls,[key]:value}}));
 const addCard=()=>setState(s=>({...s,cardCount:s.cardCount+1}));
 const markRead=(notificationId:string)=>setState(s=>({...s,notifications:s.notifications.map(n=>n.id===notificationId?{...n,read:true}:n)}));
 const dismissNotification=(notificationId:string)=>setState(s=>({...s,notifications:s.notifications.filter(n=>n.id!==notificationId)}));
 const markAllRead=()=>setState(s=>({...s,notifications:s.notifications.map(n=>({...n,read:true}))}));
 const reset=()=>setState(seed);
 const downloadStatement=()=>{
  const rows=[["Reference","Date","Account","Counterparty","Type","Direction","Amount INR","Status","Description"],...state.transactions.map(t=>[t.reference,t.createdAt,t.fromAccountLabel,t.counterparty,t.type,t.direction,(t.amountPaise/100).toFixed(2),t.status,t.description])];
  const csv=rows.map(r=>r.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="nexora-demo-statement.csv";a.click();URL.revokeObjectURL(url);
 };
 return useMemo(()=>({...state,transfer,pay,addBeneficiary,updateCard,addCard,addNotification,markRead,dismissNotification,markAllRead,reset,downloadStatement}),[state]);
}
