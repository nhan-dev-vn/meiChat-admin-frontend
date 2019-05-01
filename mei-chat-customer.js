/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../meiChat-customer-frontend/api.service.js":
/*!***************************************************!*\
  !*** ../meiChat-customer-frontend/api.service.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let appConfig = __webpack_require__(/*! ./app.config */ "../meiChat-customer-frontend/app.config.js")
const REGISTER = '/register'
const LOGIN = '/login'
const GET_LIST_CONVERSATION = '/conversation/list'
const GET_CONVERSATION = '/conversation'
const CREATE_CONVERSATION = '/conversation/new'
const POST_MESSAGE = '/message/new'
const SEEN_MESSAGE = '/message/seen'
const UPLOAD = '/upload'
const moduleName = 'apiServiceCustomer'
angular.module(moduleName, []).service(moduleName, apiService)

function apiService($http, Upload) {
    let self = this;
    this.URL = appConfig.baseUrl
    function doPost(URL, data, cb) {
        $http({
            method: 'POST',
            url: self.URL+URL,
            data: data
        }).then(function successCallback(response) {
            if (response.data.code != 200) {
                toastr.error(response.data.reason)
                cb();
            } else {
                cb(response.data.content)
            }
        }, function errorCallback(response) {
            toastr.error(response)
            cb();
        });
    }

    this.register = (data, cb) => {
        doPost(REGISTER, data, cb)
    }
    this.login = (data, cb) => {
        doPost(LOGIN, data, cb)
    }
    this.createConversation = function(data, cb) {
        doPost(CREATE_CONVERSATION, data, cb)
    }
    this.getConversation = function(data, cb) {
        doPost(GET_CONVERSATION, data, cb)
    }
    
    this.sendMessage = function(data, cb) {
        doPost(POST_MESSAGE, data, cb)
    }
    this.seenMessage = function(data, cb) {
        doPost(SEEN_MESSAGE, data, cb)
    }
    this.upload = (data, file, cb) => {
        Upload.upload({
            url: self.URL+UPLOAD,
            headers: {
                'Authorization': token
            },
            file: file,
            fields: data
        }).then(
            (response) => {
                if (response.data.code != 200) {
                    cb();
                } else {
                    cb(response.data.content);
                }
            },
            (error) => {
                if(error.config.file.size>50*1024*1024) 
                    toastr.error(file.name + ' is greater than 50MB');
                cb();
            });
    }
    return this;
}
module.exports.name = moduleName;

/***/ }),

/***/ "../meiChat-customer-frontend/app.config.js":
/*!**************************************************!*\
  !*** ../meiChat-customer-frontend/app.config.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.baseUrl = "http://192.168.1.4:3000"

/***/ }),

/***/ "../meiChat-customer-frontend/app.info.js":
/*!************************************************!*\
  !*** ../meiChat-customer-frontend/app.info.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.owner = "ad"

/***/ }),

/***/ "../meiChat-customer-frontend/app.js":
/*!*******************************************!*\
  !*** ../meiChat-customer-frontend/app.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./style.css */ "../meiChat-customer-frontend/style.css")
let appInfo = __webpack_require__(/*! ./app.info */ "../meiChat-customer-frontend/app.info.js")
let appConfig = __webpack_require__(/*! ./app.config */ "../meiChat-customer-frontend/app.config.js")
let chatService = __webpack_require__(/*! ./api.service.js */ "../meiChat-customer-frontend/api.service.js")
let moduleName = componentName = 'meiChatCustomer'
let socket = io(appConfig.baseUrl)

angular.module(moduleName, [chatService.name, 'ngFileUpload'])
    .component(componentName, {
        template: __webpack_require__(/*! ./index.html */ "../meiChat-customer-frontend/index.html"),
        controller: Controller,
        controllerAs: 'mcc'
    });

function Controller(apiServiceCustomer, $scope, $element, $timeout) {
    var self = this
    this.showInbox = false
    let owner = appInfo.owner
    $timeout(()=> {
        apiServiceCustomer.getConversation({ owner: owner }, (res) => {
            if (!$.isEmptyObject(res)) {
                self.conver = res
                socket.emit('join_room', self.conver.id)
                self.user = res.Users[0]
                msg_history_scroll(500)
            } else {
                self.showInbox = true
                console.log($('.write_msg_customer'))
                self.conver = {
                    Messages: [{
                        content: 'Xin chào! Tôi có thể giúp gì cho bạn?',
                        username: 'admin',
                        type: 'text',
                        sendAt: new Date()
                    }]
                }
                self.user = {}
            }
        })
    }, 2000)
    
    $('.write_msg_customer').keypress((e) => {
        console.log('fawe')
        if (e.which == 13) {
            excNewCustomer(() => {
                apiServiceCustomer.sendMessage(token, {
                    content: $('.write_msg_customer').val(),
                    type: 'text',
                    idUser: self.user.id,
                    username: self.user.username,
                    idConversation: self.curConver.id,
                    nameConversation: self.curConver.name,
                    sendAt: new Date()
                }, (res) => {
                    e.preventDefault()
                    $('.write_msg_customer').val('')
                })
            })
        }
    })
    function excNewCustomer(cb) {
        if (!self.user.id)
            apiServiceCustomer.register({
                password: 'customer',
                owner: owner,
                role: 2
            }, (res) => {
                if (!$.isEmptyObject(res)) {
                    self.user = res
                    apiServiceCustomer.createConversation({ owner: owner }, (res) => {
                        if (res) {
                            self.conver = res
                            msg_history_scroll(500)
                            socket.emit('join_room', self.conver.id)
                            cb()
                        }
                    })
                }
            })
        cb()
    }
    socket.on('sendMessage', (data) => {
        self.conver.Messages.push(data)
        $timeout(() => {
            msg_history_scroll(0)
        })
        if (data.idUser == self.user.id || $('.write_msg').is(':focus')) {
            seenMessage()
        } else {
            self.conver.newMess = true
        }
    })
    function seenMessage() {
        apiService.seenMessage({
            username: self.user.username,
            nameConversation: self.conver.name
        }, (res) => {
            if (res) {
                self.conver.newMess = false
            }
        })
    }
    function msg_history_scroll(timeout) {
        $timeout(() => {
            $('.msg_history').scrollTop($('.msg_history')[0].scrollHeight);
        }, timeout)
    }
    $('.container').draggable({
        start: function () {
            $(this).css("bottom", "auto");
            $(this).css("right", "auto");
        },
        containment: 'window',
        cursor: 'move'
    })
};


/***/ }),

/***/ "../meiChat-customer-frontend/index.html":
/*!***********************************************!*\
  !*** ../meiChat-customer-frontend/index.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"inbox\" ng-if=\"mcc.showInbox\">\n        <div class=\"header_inbox\">\n            <p class=\"name_inbox\">Hỗ trợ viên</p>\n            <p class=\"icon_close\" ng-click=\"mcc.showInbox=!mcc.showInbox\">X</p>\n        </div>\n        <div class=\"msg_history\">\n            <div class=\"msg\" ng-repeat=\"msg in mcc.conver.Messages\">\n                <div class=\"incoming_msg\" ng-if=\"mcc.user.username != msg.username\">\n                    <div class=\"received_msg\">\n                        <div class=\"received_withd_msg\">\n                            <p class=\"msg_text\" ng-if=\"msg.type=='text'\">{{msg.content}}</p>\n                            <p class=\"msg_file\" ng-if=\"msg.type=='file'\">\n                                <a href=\"{{msg.path+'/download'}}\">\n                                    <i class=\"glyphicon glyphicon-circle-arrow-down\"></i>\n                                    {{msg.content}}\n                                </a>\n                            </p>\n                            <img ng-src=\"{{msg.paththumb}}\" alt=\"not found\" ng-if=\"msg.type=='img'\">\n                            <span class=\"time_date\">{{msg.sendAt | date: \"MM/dd/yyyy '|' h:mma\"}}</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"outgoing_msg\" ng-if=\"mcc.user.username == msg.username\">\n                    <div class=\"sent_msg\">\n                        <p class=\"msg_text\" ng-if=\"msg.type=='text'\">{{msg.content}}</p>\n                        <p class=\"sent_msg_file\" ng-if=\"msg.type=='file'\"><a href=\"{{msg.path+'/download'}}\">\n                                <i class=\"glyphicon glyphicon-circle-arrow-down\"></i>\n                                {{msg.content}}\n                            </a>\n                        </p>\n                        <img ng-src=\"{{msg.paththumb}}\" alt=\"not found\" ng-if=\"msg.type=='img'\">\n                        <span class=\"time_date\">{{msg.sendAt | date: \"MM/dd/yyyy '|' h:mma\"}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"msg_type\">\n            <div class=\"input_msg_write\">\n                <input type=\"text\" class=\"write_msg_customer\" placeholder=\"Gõ tin nhắn...\" ng-model=\"mcc.msg_typing\" />\n                <button class=\"msg_send_btn\" type=\"button\">\n                    <span class=\"glyphicon glyphicon-paperclip\" aria-hidden=\"true\" ngf-select=\"mcc.sendImgFile($files)\"\n                        multiple=\"multiple\"></span>\n                </button>\n            </div>\n        </div>\n    </div>\n    <span class=\"icon_open glyphicon glyphicon-comment\" ng-if=\"!mcc.showInbox\"\n        ng-mouseup=\"mcc.showInbox=!mcc.showInbox\"></span>\n</div>";

/***/ }),

/***/ "../meiChat-customer-frontend/style.css":
/*!**********************************************!*\
  !*** ../meiChat-customer-frontend/style.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../meiChat-backend/node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!../meiChat-customer-frontend/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../meiChat-backend/node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!../meiChat-customer-frontend/style.css":
/*!************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!../meiChat-customer-frontend/style.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../meiChat-backend/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "mei-chat-customer .container {\n\tz-index: 1000;\n\tposition: fixed;\n\tbottom: 10px;\n\tleft: 10px;\n\twidth: auto;\n\theight: auto;\n\tpadding: 0px;\n\tborder-radius: 5px;\n}\n\nmei-chat-customer .icon_open {\n\tfont-size: 50px;\n\tcolor: #05728f;\n\tcursor: pointer;\n}\nmei-chat-customer .icon_close {\n\tfont-size: 20px;\n\tcursor: pointer;\n\tdisplay: table-cell;\n\tvertical-align: middle;\n\ttext-align: right;\n}\nmei-chat-customer .inbox {\n\twidth: 330px;\n\theight: 430px;\n}\nmei-chat-customer .header_inbox {\n\twidth: 100%;\n\theight: 60px;\n\tbackground: #05728f;\n\tborder-top-left-radius: 5px;\n\tborder-top-right-radius: 5px;\n\tdisplay: table;\n\tpadding: 10px;\n}\nmei-chat-customer .header_inbox p {\n\tcolor: white;\n\tfont-weight: bold;\n}\nmei-chat-customer .name_inbox {\n\tdisplay: table-cell;\n\tvertical-align: middle;\n}\nmei-chat-customer .msg_history {\n\twidth: 100%;\n\theight: 310px;\n\tbackground: #fafafa;\n}\nmei-chat-customer .msg_type {\n\twidth: 100%;\n\theight: 60px;\n\tbox-shadow: 0 0px 50px rgba(0,0,0,0.13);\n\tbackground: #fff;\n\tborder-bottom-left-radius: 5px;\n\tborder-bottom-right-radius: 5px;\n\tposition: relative;\n}\nmei-chat-customer .input_msg_write {\n\theight: 100%;\n\twidth: 100%;\n}\nmei-chat-customer .input_msg_write input {\n    background: white;\n    padding: 1px 5px;\n    border: medium none;\n    color: #4c4c4c;\n    font-size: 15px;\n    min-height: 48px;\n    width: 100%;\n    height: 100%;\n}\nmei-chat-customer .input_msg_write input:focus {\n\toutline: none;\n}\n\nmei-chat-customer .msg_send_btn {\n    background: #05728f none repeat scroll 0 0;\n    border: medium none;\n    border-radius: 50%;\n    color: #fff;\n    cursor: pointer;\n    font-size: 17px;\n    height: 33px;\n    position: absolute;\n    right: 0;\n    top: 11px;\n    width: 33px;\n    margin-right: 5px;\n}\nmei-chat-customer .incoming_msg_img {\n    display: inline-block;\n    width: 6%;\n}\n\nmei-chat-customer .received_msg {\n    display: inline-block;\n    padding: 0 0 0 10px;\n    vertical-align: top;\n    width: 92%;\n}\n\nmei-chat-customer .received_withd_msg p {\n    background: #ebebeb none repeat scroll 0 0;\n    border-radius: 3px;\n    color: #646464;\n    font-size: 14px;\n    margin: 0;\n    padding: 5px 10px 5px 12px;\n    width: 100%;\n}\n\nmei-chat-customer .time_date {\n    color: #747474;\n    display: block;\n    font-size: 12px;\n    margin: 8px 0 0;\n}\n\nmei-chat-customer .received_withd_msg {\n    width: 80%;\n}\n\nmei-chat-customer .msg {\n    padding-top: 5px;\n}\nmei-chat-customer .sent_msg_file a {\n    color: white;\n}\nmei-chat-customer .sent_msg p {\n    background: #05728f none repeat scroll 0 0;\n    border-radius: 3px;\n    font-size: 14px;\n    margin: 0;\n    color: #fff;\n    padding: 5px 10px 5px 12px;\n    width: 100%;\n}\n\nmei-chat-customer .outgoing_msg {\n    overflow: hidden;\n    margin: 26px 0 26px;\n}\n\nmei-chat-customer .sent_msg {\n    float: right;\n    width: 80%;\n}\nmei-chat-customer ::-webkit-scrollbar-thumb {\n\tbackground: rgb(207, 207, 207);\n\tborder-radius: 10px;\n}\n\nmei-chat-customer .tab-chosen {\n\tbackground: #ddd;\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi ../meiChat-customer-frontend/app.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../meiChat-customer-frontend/app.js */"../meiChat-customer-frontend/app.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL21laUNoYXQtY3VzdG9tZXItZnJvbnRlbmQvYXBpLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL21laUNoYXQtY3VzdG9tZXItZnJvbnRlbmQvYXBwLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi4vbWVpQ2hhdC1jdXN0b21lci1mcm9udGVuZC9hcHAuaW5mby5qcyIsIndlYnBhY2s6Ly8vLi4vbWVpQ2hhdC1jdXN0b21lci1mcm9udGVuZC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4uL21laUNoYXQtY3VzdG9tZXItZnJvbnRlbmQvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly8vLi4vbWVpQ2hhdC1jdXN0b21lci1mcm9udGVuZC9zdHlsZS5jc3M/MjA4ZSIsIndlYnBhY2s6Ly8vLi4vbWVpQ2hhdC1jdXN0b21lci1mcm9udGVuZC9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBLEtBQUssS0FBd0MsRUFBRSxFQUU3Qzs7QUFFRixRQUFRLHNCQUFpQjtBQUN6Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EiLCJmaWxlIjoibWVpLWNoYXQtY3VzdG9tZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJsZXQgYXBwQ29uZmlnID0gcmVxdWlyZSgnLi9hcHAuY29uZmlnJylcbmNvbnN0IFJFR0lTVEVSID0gJy9yZWdpc3RlcidcbmNvbnN0IExPR0lOID0gJy9sb2dpbidcbmNvbnN0IEdFVF9MSVNUX0NPTlZFUlNBVElPTiA9ICcvY29udmVyc2F0aW9uL2xpc3QnXG5jb25zdCBHRVRfQ09OVkVSU0FUSU9OID0gJy9jb252ZXJzYXRpb24nXG5jb25zdCBDUkVBVEVfQ09OVkVSU0FUSU9OID0gJy9jb252ZXJzYXRpb24vbmV3J1xuY29uc3QgUE9TVF9NRVNTQUdFID0gJy9tZXNzYWdlL25ldydcbmNvbnN0IFNFRU5fTUVTU0FHRSA9ICcvbWVzc2FnZS9zZWVuJ1xuY29uc3QgVVBMT0FEID0gJy91cGxvYWQnXG5jb25zdCBtb2R1bGVOYW1lID0gJ2FwaVNlcnZpY2VDdXN0b21lcidcbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKS5zZXJ2aWNlKG1vZHVsZU5hbWUsIGFwaVNlcnZpY2UpXG5cbmZ1bmN0aW9uIGFwaVNlcnZpY2UoJGh0dHAsIFVwbG9hZCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICB0aGlzLlVSTCA9IGFwcENvbmZpZy5iYXNlVXJsXG4gICAgZnVuY3Rpb24gZG9Qb3N0KFVSTCwgZGF0YSwgY2IpIHtcbiAgICAgICAgJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6IHNlbGYuVVJMK1VSTCxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiBzdWNjZXNzQ2FsbGJhY2socmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUgIT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKHJlc3BvbnNlLmRhdGEucmVhc29uKVxuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNiKHJlc3BvbnNlLmRhdGEuY29udGVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gZXJyb3JDYWxsYmFjayhyZXNwb25zZSkge1xuICAgICAgICAgICAgdG9hc3RyLmVycm9yKHJlc3BvbnNlKVxuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWdpc3RlciA9IChkYXRhLCBjYikgPT4ge1xuICAgICAgICBkb1Bvc3QoUkVHSVNURVIsIGRhdGEsIGNiKVxuICAgIH1cbiAgICB0aGlzLmxvZ2luID0gKGRhdGEsIGNiKSA9PiB7XG4gICAgICAgIGRvUG9zdChMT0dJTiwgZGF0YSwgY2IpXG4gICAgfVxuICAgIHRoaXMuY3JlYXRlQ29udmVyc2F0aW9uID0gZnVuY3Rpb24oZGF0YSwgY2IpIHtcbiAgICAgICAgZG9Qb3N0KENSRUFURV9DT05WRVJTQVRJT04sIGRhdGEsIGNiKVxuICAgIH1cbiAgICB0aGlzLmdldENvbnZlcnNhdGlvbiA9IGZ1bmN0aW9uKGRhdGEsIGNiKSB7XG4gICAgICAgIGRvUG9zdChHRVRfQ09OVkVSU0FUSU9OLCBkYXRhLCBjYilcbiAgICB9XG4gICAgXG4gICAgdGhpcy5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKGRhdGEsIGNiKSB7XG4gICAgICAgIGRvUG9zdChQT1NUX01FU1NBR0UsIGRhdGEsIGNiKVxuICAgIH1cbiAgICB0aGlzLnNlZW5NZXNzYWdlID0gZnVuY3Rpb24oZGF0YSwgY2IpIHtcbiAgICAgICAgZG9Qb3N0KFNFRU5fTUVTU0FHRSwgZGF0YSwgY2IpXG4gICAgfVxuICAgIHRoaXMudXBsb2FkID0gKGRhdGEsIGZpbGUsIGNiKSA9PiB7XG4gICAgICAgIFVwbG9hZC51cGxvYWQoe1xuICAgICAgICAgICAgdXJsOiBzZWxmLlVSTCtVUExPQUQsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiB0b2tlblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICBmaWVsZHM6IGRhdGFcbiAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUgIT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2IocmVzcG9uc2UuZGF0YS5jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyb3IuY29uZmlnLmZpbGUuc2l6ZT41MCoxMDI0KjEwMjQpIFxuICAgICAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IoZmlsZS5uYW1lICsgJyBpcyBncmVhdGVyIHRoYW4gNTBNQicpO1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59XG5tb2R1bGUuZXhwb3J0cy5uYW1lID0gbW9kdWxlTmFtZTsiLCJtb2R1bGUuZXhwb3J0cy5iYXNlVXJsID0gXCJodHRwOi8vMTkyLjE2OC4xLjQ6MzAwMFwiIiwibW9kdWxlLmV4cG9ydHMub3duZXIgPSBcImFkXCIiLCJyZXF1aXJlKCcuL3N0eWxlLmNzcycpXG5sZXQgYXBwSW5mbyA9IHJlcXVpcmUoJy4vYXBwLmluZm8nKVxubGV0IGFwcENvbmZpZyA9IHJlcXVpcmUoJy4vYXBwLmNvbmZpZycpXG5sZXQgY2hhdFNlcnZpY2UgPSByZXF1aXJlKCcuL2FwaS5zZXJ2aWNlLmpzJylcbmxldCBtb2R1bGVOYW1lID0gY29tcG9uZW50TmFtZSA9ICdtZWlDaGF0Q3VzdG9tZXInXG5sZXQgc29ja2V0ID0gaW8oYXBwQ29uZmlnLmJhc2VVcmwpXG5cbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtjaGF0U2VydmljZS5uYW1lLCAnbmdGaWxlVXBsb2FkJ10pXG4gICAgLmNvbXBvbmVudChjb21wb25lbnROYW1lLCB7XG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgY29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAnbWNjJ1xuICAgIH0pO1xuXG5mdW5jdGlvbiBDb250cm9sbGVyKGFwaVNlcnZpY2VDdXN0b21lciwgJHNjb3BlLCAkZWxlbWVudCwgJHRpbWVvdXQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB0aGlzLnNob3dJbmJveCA9IGZhbHNlXG4gICAgbGV0IG93bmVyID0gYXBwSW5mby5vd25lclxuICAgICR0aW1lb3V0KCgpPT4ge1xuICAgICAgICBhcGlTZXJ2aWNlQ3VzdG9tZXIuZ2V0Q29udmVyc2F0aW9uKHsgb3duZXI6IG93bmVyIH0sIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KHJlcykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnZlciA9IHJlc1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdqb2luX3Jvb20nLCBzZWxmLmNvbnZlci5pZClcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXIgPSByZXMuVXNlcnNbMF1cbiAgICAgICAgICAgICAgICBtc2dfaGlzdG9yeV9zY3JvbGwoNTAwKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dJbmJveCA9IHRydWVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkKCcud3JpdGVfbXNnX2N1c3RvbWVyJykpXG4gICAgICAgICAgICAgICAgc2VsZi5jb252ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIE1lc3NhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ1hpbiBjaMOgbyEgVMO0aSBjw7MgdGjhu4MgZ2nDunAgZ8OsIGNobyBi4bqhbj8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdhZG1pbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kQXQ6IG5ldyBEYXRlKClcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi51c2VyID0ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9LCAyMDAwKVxuICAgIFxuICAgICQoJy53cml0ZV9tc2dfY3VzdG9tZXInKS5rZXlwcmVzcygoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZmF3ZScpXG4gICAgICAgIGlmIChlLndoaWNoID09IDEzKSB7XG4gICAgICAgICAgICBleGNOZXdDdXN0b21lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXBpU2VydmljZUN1c3RvbWVyLnNlbmRNZXNzYWdlKHRva2VuLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICQoJy53cml0ZV9tc2dfY3VzdG9tZXInKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBpZFVzZXI6IHNlbGYudXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHNlbGYudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaWRDb252ZXJzYXRpb246IHNlbGYuY3VyQ29udmVyLmlkLFxuICAgICAgICAgICAgICAgICAgICBuYW1lQ29udmVyc2F0aW9uOiBzZWxmLmN1ckNvbnZlci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBzZW5kQXQ6IG5ldyBEYXRlKClcbiAgICAgICAgICAgICAgICB9LCAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAkKCcud3JpdGVfbXNnX2N1c3RvbWVyJykudmFsKCcnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcbiAgICBmdW5jdGlvbiBleGNOZXdDdXN0b21lcihjYikge1xuICAgICAgICBpZiAoIXNlbGYudXNlci5pZClcbiAgICAgICAgICAgIGFwaVNlcnZpY2VDdXN0b21lci5yZWdpc3Rlcih7XG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICdjdXN0b21lcicsXG4gICAgICAgICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgICAgICAgIHJvbGU6IDJcbiAgICAgICAgICAgIH0sIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXNlciA9IHJlc1xuICAgICAgICAgICAgICAgICAgICBhcGlTZXJ2aWNlQ3VzdG9tZXIuY3JlYXRlQ29udmVyc2F0aW9uKHsgb3duZXI6IG93bmVyIH0sIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnZlciA9IHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZ19oaXN0b3J5X3Njcm9sbCg1MDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2pvaW5fcm9vbScsIHNlbGYuY29udmVyLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICBjYigpXG4gICAgfVxuICAgIHNvY2tldC5vbignc2VuZE1lc3NhZ2UnLCAoZGF0YSkgPT4ge1xuICAgICAgICBzZWxmLmNvbnZlci5NZXNzYWdlcy5wdXNoKGRhdGEpXG4gICAgICAgICR0aW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIG1zZ19oaXN0b3J5X3Njcm9sbCgwKVxuICAgICAgICB9KVxuICAgICAgICBpZiAoZGF0YS5pZFVzZXIgPT0gc2VsZi51c2VyLmlkIHx8ICQoJy53cml0ZV9tc2cnKS5pcygnOmZvY3VzJykpIHtcbiAgICAgICAgICAgIHNlZW5NZXNzYWdlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuY29udmVyLm5ld01lc3MgPSB0cnVlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIGZ1bmN0aW9uIHNlZW5NZXNzYWdlKCkge1xuICAgICAgICBhcGlTZXJ2aWNlLnNlZW5NZXNzYWdlKHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiBzZWxmLnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICBuYW1lQ29udmVyc2F0aW9uOiBzZWxmLmNvbnZlci5uYW1lXG4gICAgICAgIH0sIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnZlci5uZXdNZXNzID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgZnVuY3Rpb24gbXNnX2hpc3Rvcnlfc2Nyb2xsKHRpbWVvdXQpIHtcbiAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJCgnLm1zZ19oaXN0b3J5Jykuc2Nyb2xsVG9wKCQoJy5tc2dfaGlzdG9yeScpWzBdLnNjcm9sbEhlaWdodCk7XG4gICAgICAgIH0sIHRpbWVvdXQpXG4gICAgfVxuICAgICQoJy5jb250YWluZXInKS5kcmFnZ2FibGUoe1xuICAgICAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5jc3MoXCJib3R0b21cIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgJCh0aGlzKS5jc3MoXCJyaWdodFwiLCBcImF1dG9cIik7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhaW5tZW50OiAnd2luZG93JyxcbiAgICAgICAgY3Vyc29yOiAnbW92ZSdcbiAgICB9KVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJpbmJveFxcXCIgbmctaWY9XFxcIm1jYy5zaG93SW5ib3hcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiaGVhZGVyX2luYm94XFxcIj5cXG4gICAgICAgICAgICA8cCBjbGFzcz1cXFwibmFtZV9pbmJveFxcXCI+SOG7lyB0cuG7oyB2acOqbjwvcD5cXG4gICAgICAgICAgICA8cCBjbGFzcz1cXFwiaWNvbl9jbG9zZVxcXCIgbmctY2xpY2s9XFxcIm1jYy5zaG93SW5ib3g9IW1jYy5zaG93SW5ib3hcXFwiPlg8L3A+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zZ19oaXN0b3J5XFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtc2dcXFwiIG5nLXJlcGVhdD1cXFwibXNnIGluIG1jYy5jb252ZXIuTWVzc2FnZXNcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbmNvbWluZ19tc2dcXFwiIG5nLWlmPVxcXCJtY2MudXNlci51c2VybmFtZSAhPSBtc2cudXNlcm5hbWVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicmVjZWl2ZWRfbXNnXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyZWNlaXZlZF93aXRoZF9tc2dcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibXNnX3RleHRcXFwiIG5nLWlmPVxcXCJtc2cudHlwZT09J3RleHQnXFxcIj57e21zZy5jb250ZW50fX08L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJtc2dfZmlsZVxcXCIgbmctaWY9XFxcIm1zZy50eXBlPT0nZmlsZSdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwie3ttc2cucGF0aCsnL2Rvd25sb2FkJ319XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaXJjbGUtYXJyb3ctZG93blxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7bXNnLmNvbnRlbnR9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgbmctc3JjPVxcXCJ7e21zZy5wYXRodGh1bWJ9fVxcXCIgYWx0PVxcXCJub3QgZm91bmRcXFwiIG5nLWlmPVxcXCJtc2cudHlwZT09J2ltZydcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwidGltZV9kYXRlXFxcIj57e21zZy5zZW5kQXQgfCBkYXRlOiBcXFwiTU0vZGQveXl5eSAnfCcgaDptbWFcXFwifX08L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm91dGdvaW5nX21zZ1xcXCIgbmctaWY9XFxcIm1jYy51c2VyLnVzZXJuYW1lID09IG1zZy51c2VybmFtZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZW50X21zZ1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcIm1zZ190ZXh0XFxcIiBuZy1pZj1cXFwibXNnLnR5cGU9PSd0ZXh0J1xcXCI+e3ttc2cuY29udGVudH19PC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJzZW50X21zZ19maWxlXFxcIiBuZy1pZj1cXFwibXNnLnR5cGU9PSdmaWxlJ1xcXCI+PGEgaHJlZj1cXFwie3ttc2cucGF0aCsnL2Rvd25sb2FkJ319XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy1kb3duXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e21zZy5jb250ZW50fX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIG5nLXNyYz1cXFwie3ttc2cucGF0aHRodW1ifX1cXFwiIGFsdD1cXFwibm90IGZvdW5kXFxcIiBuZy1pZj1cXFwibXNnLnR5cGU9PSdpbWcnXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwidGltZV9kYXRlXFxcIj57e21zZy5zZW5kQXQgfCBkYXRlOiBcXFwiTU0vZGQveXl5eSAnfCcgaDptbWFcXFwifX08L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zZ190eXBlXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dF9tc2dfd3JpdGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcIndyaXRlX21zZ19jdXN0b21lclxcXCIgcGxhY2Vob2xkZXI9XFxcIkfDtSB0aW4gbmjhuq9uLi4uXFxcIiBuZy1tb2RlbD1cXFwibWNjLm1zZ190eXBpbmdcXFwiIC8+XFxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcIm1zZ19zZW5kX2J0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXBhcGVyY2xpcFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIG5nZi1zZWxlY3Q9XFxcIm1jYy5zZW5kSW1nRmlsZSgkZmlsZXMpXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlPVxcXCJtdWx0aXBsZVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcImljb25fb3BlbiBnbHlwaGljb24gZ2x5cGhpY29uLWNvbW1lbnRcXFwiIG5nLWlmPVxcXCIhbWNjLnNob3dJbmJveFxcXCJcXG4gICAgICAgIG5nLW1vdXNldXA9XFxcIm1jYy5zaG93SW5ib3g9IW1jYy5zaG93SW5ib3hcXFwiPjwvc3Bhbj5cXG48L2Rpdj5cIjsiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbWVpQ2hhdC1iYWNrZW5kL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9tZWlDaGF0LWJhY2tlbmQvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbWVpQ2hhdC1iYWNrZW5kL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbWVpQ2hhdC1iYWNrZW5kL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL21laUNoYXQtYmFja2VuZC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwibWVpLWNoYXQtY3VzdG9tZXIgLmNvbnRhaW5lciB7XFxuXFx0ei1pbmRleDogMTAwMDtcXG5cXHRwb3NpdGlvbjogZml4ZWQ7XFxuXFx0Ym90dG9tOiAxMHB4O1xcblxcdGxlZnQ6IDEwcHg7XFxuXFx0d2lkdGg6IGF1dG87XFxuXFx0aGVpZ2h0OiBhdXRvO1xcblxcdHBhZGRpbmc6IDBweDtcXG5cXHRib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbm1laS1jaGF0LWN1c3RvbWVyIC5pY29uX29wZW4ge1xcblxcdGZvbnQtc2l6ZTogNTBweDtcXG5cXHRjb2xvcjogIzA1NzI4ZjtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxufVxcbm1laS1jaGF0LWN1c3RvbWVyIC5pY29uX2Nsb3NlIHtcXG5cXHRmb250LXNpemU6IDIwcHg7XFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcblxcdGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuXFx0dmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG5cXHR0ZXh0LWFsaWduOiByaWdodDtcXG59XFxubWVpLWNoYXQtY3VzdG9tZXIgLmluYm94IHtcXG5cXHR3aWR0aDogMzMwcHg7XFxuXFx0aGVpZ2h0OiA0MzBweDtcXG59XFxubWVpLWNoYXQtY3VzdG9tZXIgLmhlYWRlcl9pbmJveCB7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0aGVpZ2h0OiA2MHB4O1xcblxcdGJhY2tncm91bmQ6ICMwNTcyOGY7XFxuXFx0Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcblxcdGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxuXFx0ZGlzcGxheTogdGFibGU7XFxuXFx0cGFkZGluZzogMTBweDtcXG59XFxubWVpLWNoYXQtY3VzdG9tZXIgLmhlYWRlcl9pbmJveCBwIHtcXG5cXHRjb2xvcjogd2hpdGU7XFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbm1laS1jaGF0LWN1c3RvbWVyIC5uYW1lX2luYm94IHtcXG5cXHRkaXNwbGF5OiB0YWJsZS1jZWxsO1xcblxcdHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcbm1laS1jaGF0LWN1c3RvbWVyIC5tc2dfaGlzdG9yeSB7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0aGVpZ2h0OiAzMTBweDtcXG5cXHRiYWNrZ3JvdW5kOiAjZmFmYWZhO1xcbn1cXG5tZWktY2hhdC1jdXN0b21lciAubXNnX3R5cGUge1xcblxcdHdpZHRoOiAxMDAlO1xcblxcdGhlaWdodDogNjBweDtcXG5cXHRib3gtc2hhZG93OiAwIDBweCA1MHB4IHJnYmEoMCwwLDAsMC4xMyk7XFxuXFx0YmFja2dyb3VuZDogI2ZmZjtcXG5cXHRib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxuXFx0Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbm1laS1jaGF0LWN1c3RvbWVyIC5pbnB1dF9tc2dfd3JpdGUge1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHR3aWR0aDogMTAwJTtcXG59XFxubWVpLWNoYXQtY3VzdG9tZXIgLmlucHV0X21zZ193cml0ZSBpbnB1dCB7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICBwYWRkaW5nOiAxcHggNXB4O1xcbiAgICBib3JkZXI6IG1lZGl1bSBub25lO1xcbiAgICBjb2xvcjogIzRjNGM0YztcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICBtaW4taGVpZ2h0OiA0OHB4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5tZWktY2hhdC1jdXN0b21lciAuaW5wdXRfbXNnX3dyaXRlIGlucHV0OmZvY3VzIHtcXG5cXHRvdXRsaW5lOiBub25lO1xcbn1cXG5cXG5tZWktY2hhdC1jdXN0b21lciAubXNnX3NlbmRfYnRuIHtcXG4gICAgYmFja2dyb3VuZDogIzA1NzI4ZiBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xcbiAgICBib3JkZXI6IG1lZGl1bSBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMTdweDtcXG4gICAgaGVpZ2h0OiAzM3B4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0b3A6IDExcHg7XFxuICAgIHdpZHRoOiAzM3B4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDtcXG59XFxubWVpLWNoYXQtY3VzdG9tZXIgLmluY29taW5nX21zZ19pbWcge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHdpZHRoOiA2JTtcXG59XFxuXFxubWVpLWNoYXQtY3VzdG9tZXIgLnJlY2VpdmVkX21zZyB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgcGFkZGluZzogMCAwIDAgMTBweDtcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXG4gICAgd2lkdGg6IDkyJTtcXG59XFxuXFxubWVpLWNoYXQtY3VzdG9tZXIgLnJlY2VpdmVkX3dpdGhkX21zZyBwIHtcXG4gICAgYmFja2dyb3VuZDogI2ViZWJlYiBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICAgIGNvbG9yOiAjNjQ2NDY0O1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogNXB4IDEwcHggNXB4IDEycHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG5tZWktY2hhdC1jdXN0b21lciAudGltZV9kYXRlIHtcXG4gICAgY29sb3I6ICM3NDc0NzQ7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIG1hcmdpbjogOHB4IDAgMDtcXG59XFxuXFxubWVpLWNoYXQtY3VzdG9tZXIgLnJlY2VpdmVkX3dpdGhkX21zZyB7XFxuICAgIHdpZHRoOiA4MCU7XFxufVxcblxcbm1laS1jaGF0LWN1c3RvbWVyIC5tc2cge1xcbiAgICBwYWRkaW5nLXRvcDogNXB4O1xcbn1cXG5tZWktY2hhdC1jdXN0b21lciAuc2VudF9tc2dfZmlsZSBhIHtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5tZWktY2hhdC1jdXN0b21lciAuc2VudF9tc2cgcCB7XFxuICAgIGJhY2tncm91bmQ6ICMwNTcyOGYgbm9uZSByZXBlYXQgc2Nyb2xsIDAgMDtcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIHBhZGRpbmc6IDVweCAxMHB4IDVweCAxMnB4O1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXFxubWVpLWNoYXQtY3VzdG9tZXIgLm91dGdvaW5nX21zZyB7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIG1hcmdpbjogMjZweCAwIDI2cHg7XFxufVxcblxcbm1laS1jaGF0LWN1c3RvbWVyIC5zZW50X21zZyB7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gICAgd2lkdGg6IDgwJTtcXG59XFxubWVpLWNoYXQtY3VzdG9tZXIgOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XFxuXFx0YmFja2dyb3VuZDogcmdiKDIwNywgMjA3LCAyMDcpO1xcblxcdGJvcmRlci1yYWRpdXM6IDEwcHg7XFxufVxcblxcbm1laS1jaGF0LWN1c3RvbWVyIC50YWItY2hvc2VuIHtcXG5cXHRiYWNrZ3JvdW5kOiAjZGRkO1xcbn1cIiwgXCJcIl0pO1xuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gJ0BtZWRpYSAnICsgaXRlbVsyXSArICd7JyArIGNvbnRlbnQgKyAnfSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgIH1cbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gbW9kdWxlc1tpXTsgLy8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuICAgICAgLy8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcbiAgICAgIC8vIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cbiAgICAgIC8vIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblxuICAgICAgaWYgKGl0ZW1bMF0gPT0gbnVsbCB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBpZiAobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2UgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgICBpdGVtWzJdID0gJygnICsgaXRlbVsyXSArICcpIGFuZCAoJyArIG1lZGlhUXVlcnkgKyAnKSc7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLyc7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG4gIHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gdHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nXG5cdFx0ID8gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcykgXG5cdFx0IDogb3B0aW9ucy50cmFuc2Zvcm0uZGVmYXVsdChvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==