import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { validateBooking } from '../app/(site)/components/booking/bookingValidation.js';
import { getBookingFormContent } from '../app/(site)/components/booking/bookingForm.i18n.js';

const valid = {name:'Test Visitor',phone:'+371 20000000',device:'Future Model 2030',date:'2030-05-02',fault:'Screen repair',location:'branch-two',time:'13:00-17:00'};
const options = {minDate:'2030-05-02',locationIds:['branch-one','branch-two']};

test('drawer booking validates required fields and a real configured branch before any request', () => {
  assert.deepEqual(validateBooking(valid,options),{});
  assert.deepEqual(Object.keys(validateBooking({},options)),['name','phone','device','date','fault','location','time']);
  assert.equal(validateBooking({...valid,name:'  '},options).name,'required');
  assert.equal(validateBooking({...valid,location:'obsolete'},options).location,'required');
  assert.equal(validateBooking({...valid,time:'03:00'},options).time,'required');
});

test('drawer booking accepts international phone formatting and rejects invalid phones and past dates', () => {
  for (const phone of ['+371 20000000','+44 (20) 1234-5678','20000000']) assert.equal(validateBooking({...valid,phone},options).phone,undefined);
  for (const phone of ['123','letters','+371 20000000 <script>','1234567890123456']) assert.equal(validateBooking({...valid,phone},options).phone,'phoneInvalid');
  assert.equal(validateBooking({...valid,date:'2030-05-01'},options).date,'dateInvalid');
  assert.equal(validateBooking({...valid,date:'tomorrow'},options).date,'dateInvalid');
});

test('every catalog hero booking variant uses the existing provider with correct context', async () => {
  const require=createRequire(import.meta.url);
  const {transform}=require('next/dist/build/swc');
  const source=await readFile(new URL('../app/_components/sections/catalog-hub/CatalogBookingButton.jsx',import.meta.url),'utf8');
  const {code}=await transform(source,{filename:'CatalogBookingButton.jsx',jsc:{parser:{syntax:'ecmascript',jsx:true},transform:{react:{runtime:'classic'}}},module:{type:'commonjs'}});
  const calls=[];const compiledModule={exports:{}};
  new Function('require','module','exports','React',code)((id)=>{
    if(id.includes('UiDialogsProvider'))return{useUiDialogs:()=>({openBook:(...args)=>calls.push(args)})};
    if(id.includes('Button'))return{__esModule:true,default:()=>null};
    throw Error(id);
  },compiledModule,compiledModule.exports,React);
  const Button=compiledModule.exports.default;
  const opener={id:'actual-opener'};
  for(const props of [{},{hub:true},{brand:true},{model:true,initialValues:{device:'Future Model 2030'}}]){
    const element=Button({...props,children:'Book'});element.props.onClick({currentTarget:opener});
    assert.deepEqual(calls.at(-1),props.model?[opener,props.initialValues]:[opener]);
  }
});

test('enhanced drawer fields retain booking payload and unique labels while protected defaults stay opt-out', async () => {
  const require=createRequire(import.meta.url);
  const {transform}=require('next/dist/build/swc');
  const source=await readFile(new URL('../app/(site)/components/booking/BookingForm.jsx',import.meta.url),'utf8');
  const {code}=await transform(source,{filename:'BookingForm.jsx',jsc:{parser:{syntax:'ecmascript',jsx:true},transform:{react:{runtime:'classic'}}},module:{type:'commonjs'}});
  const compiledModule={exports:{}};
  new Function('require','module','exports','React',code)((id)=>{
    if(id==='react')return React;
    if(id==='next/link')return{__esModule:true,default:({children,href})=>React.createElement('a',{href},children)};
    if(id.includes('Button'))return{__esModule:true,default:({children,type,disabled})=>React.createElement('button',{type,disabled},children)};
    if(id.endsWith('.scss'))return{__esModule:true,default:new Proxy({},{get:(_,key)=>key})};
    if(id.endsWith('bookingForm.i18n'))return{getBookingFormContent};
    if(id.endsWith('bookingValidation'))return{validateBooking};
    throw Error(id);
  },compiledModule,compiledModule.exports,React);
  const Form=compiledModule.exports.default;
  const props={presentation:'drawer',locations:[{id:'branch-two',label:'Actual branch'}],initialValues:valid};
  const legacy=renderToStaticMarkup(React.createElement(Form,props));
  assert.match(legacy,/id="name"/);assert.match(legacy,/drawerForm/);assert.doesNotMatch(legacy,/aria-busy/);
  const enhanced=renderToStaticMarkup(React.createElement(Form,{...props,serviceInteractions:true}));
  assert.doesNotMatch(enhanced,/id="name"/);assert.match(enhanced,/aria-busy="false"/);
  for(const name of ['website','name','phone','device','date','fault','location','time']) assert.ok(enhanced.includes(`name="${name}"`),name);
  for(const [,id] of enhanced.matchAll(/for="([^"]+)"/g))assert.ok(enhanced.includes(`id="${id}"`),'label target '+id);
  assert.ok(enhanced.includes('Future Model 2030')&&enhanced.includes('Screen repair'));
});
