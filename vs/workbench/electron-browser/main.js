/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/base/common/winjs.base","vs/workbench/electron-browser/shell","vs/base/common/errors","vs/base/common/platform","vs/base/common/paths","vs/base/common/timer","vs/base/common/objects","vs/base/common/uri","vs/base/common/strings","vs/platform/event/common/eventService","vs/workbench/services/workspace/common/contextService","vs/workbench/services/configuration/node/configurationService","path","fs","graceful-fs"],function(e,n,o,t,r,i,s,a,c,l,f,u,m,v,d,p,b){"use strict";function w(){return new o.Promise(function(e,n){var o=document.readyState;"complete"===o||document&&null!==document.body?window.setImmediate(e):window.addEventListener("DOMContentLoaded",e,!1)})}function h(e,n){"1"!==process.env.VSCODE_CLI&&c.assign(process.env,e.userEnv);var o={env:e},t=e.filesToOpen&&e.filesToOpen.length?T(e.filesToOpen):null,r=e.filesToCreate&&e.filesToCreate.length?T(e.filesToCreate):null,i=e.filesToDiff&&e.filesToDiff.length?T(e.filesToDiff):null,s={singleFileMode:!e.workspacePath,filesToOpen:t,filesToCreate:r,filesToDiff:i,extensionsToInstall:e.extensionsToInstall,globalSettings:n};return e.enablePerformance&&(a.ENABLE_TIMER=!0),g(S(e),o,s)}function T(e){return e.map(function(e){var n={resource:l["default"].file(e.filePath)};return e.lineNumber&&(n.options={selection:{startLineNumber:e.lineNumber,startColumn:e.columnNumber}}),n})}function S(e){if(!e.workspacePath)return null;var n=d.normalize(p.realpathSync(e.workspacePath));s.isUNC(n)&&f.endsWith(n,s.nativeSep)&&(n=f.rtrim(n,s.nativeSep));var o=l["default"].file(n),t=d.basename(n)||n,r=p.statSync(n),a={resource:o,id:i.isLinux?n:n.toLowerCase(),name:t,uid:i.isLinux?r.ino:r.birthtime.getTime(),mtime:r.mtime.getTime()};return a}function g(e,n,o){var i=new u.EventService,s=new m.WorkspaceContextService(i,e,n,o),c=new v.ConfigurationService(s,i);return c.initialize().then(function(){return C.beforeReady=new Date,w().then(function(){C.afterReady=new Date;var l=new Date,f=new t.WorkbenchShell(document.body,e,{configurationService:c,eventService:i,contextService:s},n,o);f.open(),f.joinCreation().then(function(){a.start(a.Topic.STARTUP,"Open Shell, Viewlet & Editor",l,"Workbench has opened after this event with viewlet and editor restored").stop()}),self.require.config({onError:function(e){"load"===e.errorCode&&f.onUnexpectedError(r.loaderError(e))}})})})}b.gracefulify(p);var C=window.MonacoEnvironment.timers;n.startup=h});