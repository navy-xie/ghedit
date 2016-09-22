/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)},__decorate=this&&this.__decorate||function(e,t,i,o){var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s},__param=this&&this.__param||function(e,t){return function(i,o){t(i,o,e)}};define(["require","exports","vs/nls","vs/base/common/async","vs/base/common/errors","vs/base/common/keyCodes","vs/base/common/platform","vs/base/common/lifecycle","vs/base/browser/dom","vs/base/browser/ui/inputbox/inputBox","vs/editor/common/editorCommonExtensions","vs/editor/contrib/zoneWidget/browser/zoneWidget","vs/platform/contextview/browser/contextView","vs/platform/keybinding/common/keybinding","vs/workbench/parts/debug/common/debug","vs/css!../browser/media/breakpointWidget"],function(e,t,i,o,n,r,s,a,c,p,d,u,l,m,b){"use strict";var h=c.emmet,g="breakpointWidgetVisible",f="closeBreakpointWidget",v=function(e){function t(i,o,n,r,s){var a=this;e.call(this,i,{showFrame:!0,showArrow:!1}),this.lineNumber=o,this.contextViewService=n,this.debugService=r,this.toDispose=[],this.create(),this.breakpointWidgetVisible=s.createKey(g,!1),this.breakpointWidgetVisible.set(!0),t.INSTANCE=this,this.toDispose.push(i.onDidChangeModel(function(){return a.dispose()}))}return __extends(t,e),t.createInstance=function(e,i,o){t.INSTANCE&&t.INSTANCE.dispose(),o.createInstance(t,e,i),t.INSTANCE.show({lineNumber:i,column:1},2)},t.prototype._fillContainer=function(e){var t=this;c.addClass(e,"breakpoint-widget");var a=this.editor.getModel().uri,d=this.debugService.getModel().getBreakpoints().filter(function(e){return e.lineNumber===t.lineNumber&&e.source.uri.toString()===a.toString()}).pop(),u=c.append(e,h(".inputBoxContainer"));this.inputBox=new p.InputBox(u,this.contextViewService,{placeholder:i.localize("breakpointWidgetPlaceholder","Breakpoint on line {0} will only stop if this condition is true. 'Enter' to accept, 'esc' to cancel.",this.lineNumber),ariaLabel:i.localize("breakpointWidgetAriaLabel","Type the breakpoint condition for line {0}. The program will only stop here if this condition is true. Press Enter to accept or Escape to cancel.")}),this.toDispose.push(this.inputBox),c.addClass(this.inputBox.inputElement,s.isWindows?"windows":s.isMacintosh?"mac":"linux"),this.inputBox.value=d&&d.condition?d.condition:"",setTimeout(function(){return t.inputBox.focus()},0);var l=!1,m=o.once(function(e){if(!l){if(l=!0,e){var i={uri:a,lineNumber:t.lineNumber,enabled:!0,condition:t.inputBox.value},o=t.debugService.getModel().getBreakpoints().filter(function(e){return e.lineNumber===t.lineNumber&&e.source.uri.toString()===a.toString()}).pop();o&&t.debugService.removeBreakpoints(o.getId()).done(null,n.onUnexpectedError),t.debugService.addBreakpoints([i]).done(null,n.onUnexpectedError)}t.dispose()}});this.toDispose.push(c.addStandardDisposableListener(this.inputBox.inputElement,"keydown",function(e){var t=e.equals(r.CommonKeybindings.ESCAPE),i=e.equals(r.CommonKeybindings.ENTER);(t||i)&&(e.stopPropagation(),m(i))}))},t.prototype.dispose=function(){var i=this;e.prototype.dispose.call(this),this.breakpointWidgetVisible.reset(),t.INSTANCE=void 0,a.dispose(this.toDispose),setTimeout(function(){return i.editor.focus()},0)},t=__decorate([__param(2,l.IContextViewService),__param(3,b.IDebugService),__param(4,m.IKeybindingService)],t)}(u.ZoneWidget);t.BreakpointWidget=v,d.CommonEditorRegistry.registerEditorCommand(f,d.CommonEditorRegistry.commandWeight(8),{primary:r.KeyCode.Escape,secondary:[r.KeyMod.Shift|r.KeyCode.Escape]},!1,g,function(e,t,i){v.INSTANCE&&v.INSTANCE.dispose()})});