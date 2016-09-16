var __extends=this&&this.__extends||function(e,r){function t(){this.constructor=e}for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n]);e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)};define(["require","exports","vs/base/common/errors","vs/base/common/lifecycle","vs/base/common/winjs.base","vs/base/common/async"],function(e,r,t,n,o,s){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function i(e){return new c(e)}var a="$initialize",u=function(){function e(e){this._workerId=-1,this._handler=e,this._lastSentReq=0,this._pendingReplies=Object.create(null)}return e.prototype.setWorkerId=function(e){this._workerId=e},e.prototype.sendMessage=function(e,r){var t=String(++this._lastSentReq),n={c:null,e:null},s=new o.TPromise(function(e,r,t){n.c=e,n.e=r},function(){});return this._pendingReplies[t]=n,this._send({vsWorker:this._workerId,req:t,method:e,args:r}),s},e.prototype.handleMessage=function(e){var r;try{r=JSON.parse(e)}catch(t){}r.vsWorker&&(r.method&&console.log(this._workerId+" "+e),r.args&&r.args.length>0&&"getDefinitionAtPosition"===r.args[0],this._workerId!==-1&&r.vsWorker!==this._workerId||this._handleMessage(r))},e.prototype._handleMessage=function(e){var r=this;if(e.seq){var n=e;if(!this._pendingReplies[n.seq])return void console.warn("Got reply to unknown seq");var o=this._pendingReplies[n.seq];if(delete this._pendingReplies[n.seq],n.err){var s=n.err;return n.err.$isError&&(s=new Error,s.name=n.err.name,s.message=n.err.message,s.stack=n.err.stack),void o.e(s)}return void o.c(n.res)}var i=e,a=i.req,u=this._handler.handleMessage(i.method,i.args);u.then(function(e){r._send({vsWorker:r._workerId,seq:a,res:e,err:void 0})},function(e){r._send({vsWorker:r._workerId,seq:a,res:void 0,err:t.transformErrorForSerialization(e)})})},e.prototype._send=function(e){var r=JSON.stringify(e);this._handler.sendMessage(r)},e}(),l=function(e){function r(r,t){var n=this;e.call(this),this._lastRequestTimestamp=-1;var s=null,i=null;this._worker=this._register(r.create("vs/base/common/worker/simpleWorker",function(e){n._protocol.handleMessage(e)},function(e){i(e)})),this._protocol=new u({sendMessage:function(e){n._worker.postMessage(e)},handleMessage:function(e,r){return o.TPromise.as(null)}}),this._protocol.setWorkerId(this._worker.getId());var l=null,c=window.require;"function"==typeof c.getConfig?l=c.getConfig():"undefined"!=typeof window.requirejs&&(l=window.requirejs.s.contexts._.config),this._lazyProxy=new o.TPromise(function(e,r,t){s=e,i=r},function(){}),this._onModuleLoaded=this._protocol.sendMessage(a,[this._worker.getId(),t,l]),this._onModuleLoaded.then(function(e){for(var r={},t=0;t<e.length;t++)r[e[t]]=f(e[t],d);s(r)},function(e){i(e),n._onError("Worker failed to load "+t,e)});var d=function(e,r){return n._request(e,r)},f=function(e,r){return function(){var t=Array.prototype.slice.call(arguments,0);return r(e,t)}}}return __extends(r,e),r.prototype.getProxyObject=function(){return new s.ShallowCancelThenPromise(this._lazyProxy)},r.prototype.getLastRequestTimestamp=function(){return this._lastRequestTimestamp},r.prototype._request=function(e,r){var t=this;return new o.TPromise(function(n,o,s){t._onModuleLoaded.then(function(){t._lastRequestTimestamp=Date.now(),t._protocol.sendMessage(e,r).then(n,o)},o)},function(){})},r.prototype._onError=function(e,r){console.error(e),console.info(r)},r}(n.Disposable);r.SimpleWorkerClient=l;var c=function(){function r(e){var r=this;this._protocol=new u({sendMessage:function(r){e(r)},handleMessage:function(e,t){return r._handleMessage(e,t)}})}return r.prototype.onmessage=function(e){this._protocol.handleMessage(e)},r.prototype._handleMessage=function(e,r){if(e===a)return this.initialize(r[0],r[1],r[2]);if(!this._requestHandler||"function"!=typeof this._requestHandler[e])return o.TPromise.wrapError(new Error("Missing requestHandler or method: "+e));try{return o.TPromise.as(this._requestHandler[e].apply(this._requestHandler,r))}catch(t){return o.TPromise.wrapError(t)}},r.prototype.initialize=function(r,t,n){var s=this;if(this._protocol.setWorkerId(r),n){"undefined"!=typeof n.baseUrl&&delete n.baseUrl,"undefined"!=typeof n.paths&&"undefined"!=typeof n.paths.vs&&delete n.paths.vs;var i=n["vs/nls"];i&&i.pseudo&&e(["vs/nls"],function(e){e.setPseudoTranslation(i.pseudo)}),n.catchError=!0,self.require.config(n)}var a,u,l=new o.TPromise(function(e,r,t){a=e,u=r});return self.require([t],function(){for(var e=[],r=0;r<arguments.length;r++)e[r-0]=arguments[r];var t=e[0];s._requestHandler=t.create();var n=[];for(var o in s._requestHandler)"function"==typeof s._requestHandler[o]&&n.push(o);a(n)},u),l},r}();r.SimpleWorkerServer=c,r.create=i});