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
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/src/index.ts":
/*!*****************************!*\
  !*** ./server/src/index.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\nconsole.log('Test');\nconsole.log(express__WEBPACK_IMPORTED_MODULE_0___default.a);\n// import express from 'express'\n// import http from 'http'\n// import url from 'url'\n// import { GamesManager } from './GamesManager'\n// const app = express()\n// const port = parseInt(process.env.PORT || '', 10) || 8080\n// const gamesManager = new GamesManager()\n// gamesManager.createGame('Initial room', true, false, 'initial')\n// for (let i = 1; i <= 9; i++) {\n// \tgamesManager.createGame(`Test room ${i}`, true, false, `test-${i}`)\n// }\n// app.use(express.json())\n// app.use(express.static('dist/public'))\n// app.get('/public-games.json', (request, response) =>\n// \tresponse.send({\n// \t\tgames: gamesManager\n// \t\t\t.getPublicGames()\n// \t\t\t.map((game) => ({\n// \t\t\t\tid: game.id,\n// \t\t\t\tname: game.name,\n// \t\t\t\tplayersCount: game.getPlayersCount(),\n// \t\t\t}))\n// \t\t\t.sort((a, b) => b.playersCount - a.playersCount),\n// \t}),\n// )\n// app.post('/create-game.json', (request, response) => {\n// \t// @TODO: reuse api parser from client\n// \tconst data = request.body\n// \tconst game = gamesManager.createGame(data.gameName, data.isPublic, true)\n// \tresponse.send({\n// \t\tgameId: game.id,\n// \t})\n// })\n// const server = http.createServer(app)\n// server.on('upgrade', (request, socket, head) => {\n// \tconst { pathname } = url.parse(request.url)\n// \tconst match = pathname?.match(/\\/game\\/(.*)\\.ws/)\n// \tconst gameId = match ? match[1] : null\n// \tconst game = gameId ? gamesManager.getGameById(gameId) : undefined\n// \tif (game) {\n// \t\tgame.handleIncomingConnection(request, socket, head)\n// \t} else {\n// \t\tsocket.destroy()\n// \t}\n// })\n// server.listen(port, () => {\n// \tconsole.log(`Server started on port ${port}`)\n// })\n\n\n//# sourceURL=webpack:///./server/src/index.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ })

/******/ });