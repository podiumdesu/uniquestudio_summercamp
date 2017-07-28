/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "4c331d8675abfda5eed7"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(14)(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
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
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
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

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(23);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

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
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
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

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
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

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var dataToDownload = exports.dataToDownload = undefined;
exports.dataToDownload = dataToDownload = [];

// data应该只需要记录三个数值
// 第一个是开始时间 startTime
// 第二个是结束时间 endTime
// 第三个是字幕 subtitle
// 而id则直接使用它本身的index+1即可。
//标准srt格式：
/*
 1
 00:00:01,810 --> 00:00:03,200
 好啦  节目马上开始直播
 All right, we're about to go live.

 2
 00:00:03,200 --> 00:00:04,620
 大家拿出最佳表现
 Everyone on their A-game!

 3
 00:00:04,620 --> 00:00:06,660
 精神点
 Good energy!

 4
 00:00:07,380 --> 00:00:09,500
 大家好
 Hello.

 5
 00:00:10,400 --> 00:00:12,020
 我是谢尔顿·库珀博士
 I'm Dr. Sheldon Cooper.


 {
 index: 1,
 startTime: "00:00:01,810",
 endTime: "00:00:03,200",
 subtitleInfo: "好啦，节目马上开始",
 },
 {
 index: 2,
 startTime: "00:00:03,200",
 endTime: "00:00:04,620",
 subtitleInfo: "大家拿出最佳表现",
 },
 {
 index: 1,
 startTime: "00:00:01,810",
 endTime: "00:00:03,200",
 subtitleInfo: "好啦，节目马上开始",
 },
 {
 index: 2,
 startTime: "00:00:03,200",
 endTime: "00:00:04,620",
 subtitleInfo: "大家拿出最佳表现",
 },
 {
 index: 1,
 startTime: "00:00:01,810",
 endTime: "00:00:03,200",
 subtitleInfo: "好啦，节目马上开始",
 },
 {
 index: 2,
 startTime: "00:00:03,200",
 endTime: "00:00:04,620",
 subtitleInfo: "大家拿出最佳表现",
 },
 {
 index: 1,
 startTime: "00:00:01,810",
 endTime: "00:00:03,200",
 subtitleInfo: "好啦，节目马上开始",
 },
 {
 index: 2,
 startTime: "00:00:03,200",
 endTime: "00:00:04,620",
 subtitleInfo: "大家拿出最佳表现",
 },
 {
 index: 1,
 startTime: "00:00:01,810",
 endTime: "00:00:03,200",
 subtitleInfo: "好啦，节目马上开始",
 },
 {
 index: 2,
 startTime: "00:00:03,200",
 endTime: "00:00:04,620",
 subtitleInfo: "大家拿出最佳表现",
 },    {
 index: 1,
 startTime: "00:00:01,810",
 endTime: "00:00:03,200",
 subtitleInfo: "好啦，节目马上开始",
 },
 {
 index: 2,
 startTime: "00:00:03,200",
 endTime: "00:00:04,620",
 subtitleInfo: "大家拿出最佳表现",
 },
 {
 index: 1,
 startTime: "00:00:01,810",
 endTime: "00:00:03,200",
 subtitleInfo: "好啦，节目马上开始",
 },
 {
 index: 2,
 startTime: "00:00:03,200",
 endTime: "00:00:04,620",
 subtitleInfo: "大家拿出最佳表现",
 },
 {
 index: 1,
 startTime: "00:00:01,810",
 endTime: "00:00:03,200",
 subtitleInfo: "好啦，节目马上开始",
 },
 {
 index: 2,
 startTime: "00:00:03,200",
 endTime: "00:00:04,620",
 subtitleInfo: "大家拿出最佳表现",
 }
 */

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (renderData) {
    (0, _computeIndex2.default)();
    //console.log("This is render.js");
    //console.log(renderData);

    var targetNode = $("#info-table");
    //console.log(typeof(targetNode) );
    renderData.forEach(renderDataFunc);
};

var _computeIndex = __webpack_require__(20);

var _computeIndex2 = _interopRequireDefault(_computeIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderDataFunc(element, index) {
    //console.log(element);
    var targetNode = $("#info-table");
    var div = document.createElement("div");
    div.setAttribute("class", "display-info");
    var stringToInsert = "\n                        <span class='index'>" + element.index + "</span>\n                        <span class='start-time'>" + element.startTime + "</span>\n                        <span class='end-time'>" + element.endTime + "</span>\n                        <span class='subtitle'>" + element.subtitleInfo + "</span>\n                        <span class=\"close-item\">x</span>\n                        ";
    div.innerHTML = stringToInsert;
    //console.log(div);
    targetNode.append(div);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ms2TimeString = ms2TimeString;
exports.timeString2ms = timeString2ms;
/**
 * Created by petnakanojo on 26/07/2017.
 */
function ms2TimeString(a, ms, s, m, h) {
    return ms = a % 1e3 | 0, s = a / 1e3 % 60 | 0, m = a / 6e4 % 60 | 0, h = a / 36e5 % 24 | 0, (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) + ',' + (ms < 100 ? ms < 10 ? '00' + ms : '0' + ms : ms);
}
function timeString2ms(a, b) {
    return a = a.split(','), b = a[1] * 1 || 0, a = a[0].split(':'), b + (a[2] ? a[0] * 3600 + a[1] * 60 + a[2] * 1 : a[1] ? a[0] * 60 + a[1] * 1 : a[0] * 1) * 1e3;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var targetNode = $("#info-table");
    while (targetNode.children().length > 0) {
        targetNode.empty();
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "* {\n    padding:0px;\n    margin:0px;\n}\n.dropdown ul > li:nth-child(1) {\n    margin-top: 0px;\n}\n.dropdown ul li {\n    display: block;\n    width: 100%;\n    line-height: 25px;\n    font-size: 16px;\n    background-color: white;\n}\n\nbody {\n    background-repeat: no-repeat;\n    background-size: 100%;\n}\n.dropdown ul  {\n    list-style: none;\n    top: 28px;\n    left: 21px;\n    border: 1px solid #eaeaea;\n    border-top: 0px;\n    position: absolute;\n    width: 18%;\n    display: none;\n    background-color: white;\n    z-index: 999;\n}\n#searchIndexDiv:hover ul {\n    display: block;\n}\n#dropdown {\n    height: 30px;\n\n}\n\n#dropdown > p {\n    line-height: 28px;\n    position: relative;\n    display: inline-block;\n}\n\n#dropdown > ul {\n    position: absolute;\n    top: -10px;\n    margin: 0px;\n}\n\n.dropdown {\n    width: 100%;\n    position: relative;\n    text-align: center;\n    display: inline-block;\n}\n.dropdown p{\n\n    width: 100%;\n    line-height: 26px;\n    margin: 0px;\n}\n\n.dropdown ul li:hover {\n    background-color: rgba(52,52,52,0.1);\n    cursor: pointer;\n}\n#dropdown > div {\n    display: inline-block;\n}\n#searchIndexDiv {\n    width: 20%;\n    border: 1px solid #eaeaea;\n    margin-right: 1px;\n    margin-left: -3px;\n    box-shadow: 1px 1px 1px #eaeaea;\n}\n#inputAreaForValueToSearch {\n    line-height: 25px;\n    padding: 0 5px;\n    margin: 0px -5px;\n    width: 80%;\n    display: inline;\n}\n\n#clickToFindWhatYouWant {\n    line-height: 30px;\n    width: 18%;\n    padding: 2px;\n}", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/*.toHide {\n    display: none;\n}*/\n\n\n/* edit/video part*/\n\nbody {\n    background-color: #d6d6d6;\n}\n.part {\n    margin-top: 50px;\n    background-color: white;\n}\n\n.container {\n    width: 100%;\n    margin: 0px;\n    padding: 0px;\n}\n\n\n#body-part {\n    min-width: 1320px;\n}\n\n.toHide{\n    display: none;\n}\n.toDisplay {\n    display: inline-block;\n}\n.blur-display {\n    filter: blur(10px);\n}\n\n.video-js {\n    padding-bottom: 90%;\n    height: 0px;\n}\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "* {\n    margin: 0px;\n    padding:0px;\n}\n#banner {\n    margin: 0px;\n    height: 80px;\n    background-color: #343434;\n    padding:25px;\n}\n\n#banner h2 {\n    margin: 0px;\n    color: #fff;\n    margin-left: 20px;\n}\n\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "#video-part {\n    padding-right: 10px;\n    padding-left: 30px;\n    width: 53.34%;\n    float: left;\n    height: 0px;\n    margin: 0px;\n    padding-bottom: 58%;\n}\n#video-btn-container {\n    width: 100%;\n    padding: 0px 0px;\n    height: 35px;\n}\n.btn-load {\n    width: 48%;\n    padding: 10px;\n    border-radius: 5px;\n    text-align: center;\n    line-height: 15px;\n    box-shadow:  1px 1px 1px #eaeaea;\n    background-color: white;\n    border: 1px solid #eaeaea;\n}\n/*两个按钮*/\n#clickToUploadVideo {\n    float: left;\n    background-color: #343434;\n    color: #e6e8ea;\n\n}\n#btnInputSRTFile {\n    float: right;\n    border: 1px solid #e6e8ea;\n    background-color: transparent;\n    color: #343434;\n}\n\n/*视频包含区域*/\n#video-container {\n    border: 1px solid #eaeaea;\n    width: 100%;\n    height: 0px;\n    padding-bottom: 90%;\n    background-color: #343434;\n    margin-top: 20px;\n}\n\n#clickToGetRecentSubtitle {\n    margin-top: 15px;\n}\n#displayCurrentTime {\n    display: inline-block;\n    margin: 0px;\n    margin-top:15px;\n    vertical-align: middle;\n    border: 0px;\n    box-shadow: 0px;\n    margin-left:10px;\n}\n#part-container {\n    background-color: white;\n    /* width: 100%; */\n    height: 100px;\n    margin-left: 12.5%;\n    margin-right: 12.5%;\n}\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "#edit-part {\n    width: 46.66%;\n    float: right;\n    height: 0px;\n    padding-bottom: 57%;\n    position: relative;\n    padding-left: 10px;\n    margin: 0px;\n}\n\n#search-area-container {\n    width: 100%;\n    padding: 0;\n    height: 35px;\n\n}\n\n\n#part-container {\n    margin-top: 50px;\n    padding-top: 30px;\n    padding-bottom: 43.5%;\n    border-radius: 4px;\n}\n\n.edit-child {\n    width: 100%;\n}\n\n#moreFunc {\n    margin-top: 2px;\n}\n\n.btn-style {\n    height: 28px;\n    font-size: 12px;\n    padding:3px 20px;\n    background-color: white;\n    color: #434343;\n    border: 1px solid #eaeaea;\n    margin-top: 5px;\n    transition: all ease .5s;\n    box-shadow: 1px 1px 1px #eaeaea;\n}\n.btn-reverse {\n    background-color: #fff;\n    border: 1px solid #eae aea;\n    color: #434343;\n}\n\n#btnAddAfter {\n    float: left;\n}\n#btnDelete {\n    float: left;\n    margin-left: 6px;\n}\n\n#btnGoto {\n    float: left;\n    margin-left: 6px;\n}\n#btnInputThroughWrap {\n    float: right;\n}\n#clickToDownloadSRT {\n    float: right;\n    margin-left:6px;\n}\n\n#clickToAddDataThroughWrap {\n    float: left;\n}\n#clickToCancel {\n    float: right;\n\n}\n.btn-style:hover {\n    background-color: #434343;\n    color: white;\n}\n\n.btn-reverse:hover {\n    background-color: #434343;\n    color: white;\n}\n#textarea-container {\n    position: absolute;\n    top: 80px;\n    width: 100%;\n    z-index: 333;\n}\n#input_textarea {\n    height: 200px;\n    width: 100%;\n    padding: 5px;\n}\n\n.samePadding {\n    padding: 0 40px 0 20px;\n}\n\n\n\n#info-container {\n    padding-bottom: 10%;\n    width: 100%;\n    margin-top: 5px;\n    padding: 0 20px 0 20px;\n    position: relative;\n\n}\n\n#info-table {\n    margin-top:3px;\n    overflow: auto;\n    background-color: white;\n    width: 100%;\n    padding: 0px 0px 0px 0px;\n    height: 0px;\n    padding-bottom: 103%;\n}\n\n\n#submit-btn-div button {\n    border: 0px;\n    position: absolute;\n    display: inline-block;\n    background-color: white;\n}\n\n#submit-btn-div {\n    position: absolute;\n    display: inline-block;\n    right: 1%;\n    top: 75px;\n    height: 30px;\n    width: 30px;\n\n}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/*设置最顶层修改层的数据*/\n\n#edit-table tr td input{\n    width: 100%;\n    border: 0px;\n    border-radius: 5px;\n    height: 25px;\n    vertical-align: top;\n}\n\ninput {\n    width: 100%;\n}\n\n#edit-table td {\n    background-color: #434343;\n    padding: 0 5px;\n\n}\n#edit-info {\n    margin-top: 38px;\n    padding: 0 40px 0 20px;\n}\n\n#info-table div {\n    width: 100%;\n    height: 32px;\n}\n\n.display-info {\n    width: 100%;\n    margin-top: 3px;\n}\n#info-table span {\n    padding:0px 5px;\n    border: 1px solid #eaeaea;\n    display: inline-block;\n    line-height: 30px;\n    margin-right:-5px;\n    white-space: nowrap;\n    word-break: keep-all;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n/*共用的样式*/\n.index {\n    text-align: center;\n    width: 13%;\n}\n.start-time {\n    width: 21.5%;\n}\n.end-time {\n    width: 21.5%;\n}\n.subtitle {\n    width: 41%;\n}\n#info-table .close-item {\n    width: 5%;\n    border: 0px;\n    display: none;\n}\ntable {\n    width: 100%;\n    height: 35px;\n}\n\n.tabel-cell-style {\n    padding:5px 0;\n}\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    $("#edit-start-time").children().val("");
    $("#edit-end-time").children().val("");
    $("#edit-subtitle").children().val("");
    $("#input_textarea").val("");
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.videoNode = undefined;

var _convertTime = __webpack_require__(4);

var videoNode = exports.videoNode = document.querySelector('video'); /**
                                                                      * Created by petnakanojo on 26/07/2017.
                                                                      */

var fileNode = document.getElementById('inputFile');
URL = window.URL || window.webkitURL;
var playSelectorFile = function playSelectorFile(event) {
    var file = this.files[0];
    var fileURL = URL.createObjectURL(file);
    videoNode.src = fileURL;
};

fileNode.addEventListener('change', playSelectorFile, false);

var setTimeButtonNode = $("#clickToRecordTime");
setTimeButtonNode.click(function () {
    if ($(this).children().attr("src").indexOf("start") >= 0) {
        //说明此时需要记录的是开始时间
        //console.log(videoNode.currentTime);
        $("#edit-start-time").children().val((0, _convertTime.ms2TimeString)(videoNode.currentTime * 1000));
    } else {
        $("#edit-end-time").children().val((0, _convertTime.ms2TimeString)(videoNode.currentTime * 1000));
    }
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log("hello,world! It's entry.js");
__webpack_require__(15);
__webpack_require__(13);
__webpack_require__(22);
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _addLoadEvent = __webpack_require__(16);

var _addLoadEvent2 = _interopRequireDefault(_addLoadEvent);

var _splitDataThroughWrap = __webpack_require__(17);

var _splitDataThroughWrap2 = _interopRequireDefault(_splitDataThroughWrap);

var _clickToDownload = __webpack_require__(18);

var _data = __webpack_require__(2);

var _findDataThrough = __webpack_require__(19);

var _findDataThrough2 = _interopRequireDefault(_findDataThrough);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _clear = __webpack_require__(5);

var _clear2 = _interopRequireDefault(_clear);

var _addNewData = __webpack_require__(21);

var _addNewData2 = _interopRequireDefault(_addNewData);

var _empty = __webpack_require__(12);

var _empty2 = _interopRequireDefault(_empty);

var _videoDisplay = __webpack_require__(13);

var _convertTime = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var textAreaWithWrap = "#input_textarea"; //import myFunc from './test2.js';


/*禁止刷新*/
/*
$(window).bind('beforeunload', function(e) {    //用户刷新时提示数据未保存
    return "Unloading this page may lose data. What do you want to do..."
    e.preventDefault();
});
*/
/*点击将输入框中的数据存入数组中*/
$("#clickToAddDataThroughWrap").click(function () {
    //点击将输入框中的数据成行存入数组中
    (0, _splitDataThroughWrap2.default)(textAreaWithWrap);
    (0, _empty2.default)();
    alert("Added successfully!!!");
    (0, _clear2.default)();
    (0, _render2.default)(_data.dataToDownload);
});

/*点击下载srt文件*/
$("#clickToDownloadSRT").click(function () {
    //点击下载srt文件
    (0, _clickToDownload.saveFile)(_data.dataToDownload);
});

var searchWay;
/*用户选择搜索项目  time id subtitle*/
$(".select-item").click(function () {
    var item = $(this).html();
    $("#searchIndex").html(item);
    searchWay = item;
});
/*输入框*/

var searchBar = void 0;
searchBar = document.getElementById("inputAreaForValueToSearch");
//监听搜索的回车事件，并进一步执行程序
searchBar.addEventListener("keyup", function (event) {
    //监听回车事件
    var searchInfo = $("#inputAreaForValueToSearch").val();
    var event = event || window.event;
    if (event.keyCode == 13) {
        if (searchInfo.length === 0) {
            (0, _clear2.default)();
            (0, _render2.default)(_data.dataToDownload);
        } else {
            if (searchWay) {
                (0, _findDataThrough2.default)(searchWay, searchInfo);
            } else {
                alert("Please select the way to search");
            }
        }
    }
});

$("#btnAddAfter").click(function () {
    $("#edit-start-time").children().val("");
    $("#edit-end-time").children().val("");
    $("#edit-subtitle").children().val("");
    $("#clickToAddInfo").unbind('click');
    $("#clickToAddInfo").click(function () {
        (0, _addNewData2.default)();
    });
});

$("#clickToGetRecentSubtitle").click(function () {
    var targetTime = _videoDisplay.videoNode.currentTime;
    var targetArray = [];
    $("#displayCurrentTime").html("当前时间: " + (0, _convertTime.ms2TimeString)(_videoDisplay.videoNode.currentTime * 1000));
    _data.dataToDownload.forEach(function (element, index) {
        var newTime = (0, _convertTime.timeString2ms)(element.startTime) / 1000;
        if (Math.abs(targetTime - newTime) <= 25) {
            targetArray.push(element);
        }
    });
    (0, _clear2.default)();
    (0, _render2.default)(targetArray);
});
/*上传srt文件*/
$('#btnInputSRTFile').click(function () {});

/*多行输入*/
//点击显示"多行输入"的窗口
$('#btnInputThroughWrap').click(function () {
    $("#textarea-container").fadeIn();
    $("#info-table").addClass("blur-display");
    $("#edit-info").addClass("blur-display");
});

//点击取消显示"多行输入"的窗口
$("#clickToCancel").click(function () {
    $("#textarea-container").fadeOut();
    $("#info-table").removeClass("blur-display");
    $("#edit-info").removeClass("blur-display");
});

//点击记录时间，更换提示图
$("#clickToRecordTime").click(function () {
    if ($(this).children().attr('src').indexOf('start') >= 0) {
        $(this).children().attr('src', './src/images/end.png');
    } else {
        $(this).children().attr('src', './src/images/start.png');
    }
});

//点击添加新信息
$("#clickToAddInfo").click(function () {
    (0, _addNewData2.default)();
});

/*点击字幕显示区的某行字幕时，会将其自动填充至编辑区中*/
/*同时绑定点击确定，删除，跳转等事件*/
$(".display-info").live('click', function () {
    var startTime = $(this).children('.start-time').html();
    var endTime = $(this).children('.end-time').html();
    var subtitle = $(this).children('.subtitle').html();
    var index = $(this).children('.index').html();
    var ddd = index;
    $("#edit-start-time").children().val(startTime);
    $("#edit-end-time").children().val(endTime);
    $("#edit-subtitle").children().val(subtitle);
    $("#clickToAddInfo").unbind('click');
    $("#clickToAddInfo").click(function () {
        _data.dataToDownload[index - 1].startTime = $("#edit-start-time").children().val();
        _data.dataToDownload[index - 1].endTime = $("#edit-end-time").children().val();
        _data.dataToDownload[index - 1].subtitleInfo = $("#edit-subtitle").children().val();
        //console.log(dataToDownload[index-1]);
        (0, _clear2.default)();
        (0, _render2.default)(_data.dataToDownload);
        $("#clickToAddInfo").unbind('click');
    });

    $("#btnDelete").click(function () {
        console.log(ddd);
        (0, _empty2.default)();
        _data.dataToDownload.splice(ddd - 1, 1);
        console.log("dddddd");
        (0, _clear2.default)();
        (0, _render2.default)(_data.dataToDownload);
        $('#btnDelete').unbind('click');
    });

    $("#btnGoto").click(function () {
        _videoDisplay.videoNode.currentTime = (0, _convertTime.timeString2ms)(startTime) / 1000;
    });
});

$(".display-info").live('mouseover', function () {
    console.log("ddd");
    $(this).children('.close-item').addClass('toDisplay');
});
(0, _render2.default)(_data.dataToDownload);
/*
$('#clickToAddInfo').click(function(this) {
    console.log($("#edit-subtitle").children().val());
    $(this).children('.start-time').html($("#edit-start-time").children().val());
    $(this).children('.end-time').html($("#edit-end-time").children().val());
    $(this).children('.subtitle').html($("#edit-subtitle").children().val());
});
    */

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        };
    }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (textarea) {
    //传入的参数为节点id名
    var s = $(textarea).val();
    var textArray = s.split("\n");
    //console.log(textArray);
    var filteredArray = textArray.filter(popDataWith0Length);
    //console.log(filteredArray);
    filteredArray.forEach(pushIntoData);
};

var _data = __webpack_require__(2);

function popDataWith0Length(element) {
    //判断是否存在某行没有输入
    //console.log(element.length);
    return element.length > 0;
}
function pushIntoData(element, index, array) {
    //将用户批量上传的数据存入data数组中
    //console.log(element);
    var newData = {
        startTime: "00:00:00,000",
        endTime: "00:00:00,000",
        subtitleInfo: element
    };
    _data.dataToDownload.push(newData);
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveFile = saveFile;
function fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fakeClick(save_link);
}

var finalDataString = "";
function concatToString(element, index) {

    var everyArrayToDownload = element.index.toString();
    everyArrayToDownload = everyArrayToDownload.concat('\n');
    everyArrayToDownload = everyArrayToDownload.concat(element.startTime);
    everyArrayToDownload = everyArrayToDownload.concat(' --> ', element.endTime);
    everyArrayToDownload = everyArrayToDownload.concat('\n');
    everyArrayToDownload = everyArrayToDownload.concat(element.subtitleInfo, '\n\n');
    finalDataString = finalDataString.concat(everyArrayToDownload);
}
function saveFile(WhatToBeDownloaded) {
    //exportRaw('subtitle.srt', JSON.stringify(WhatToBeDownloaded,null,'\n'));
    WhatToBeDownloaded.forEach(concatToString);
    exportRaw('subtitle.srt', finalDataString);
    finalDataString = "";
}

//最终下载数据还需要再进行处理，因为数组中本身不包含id。
//标准srt格式：
/*
 1
 00:00:01,810 --> 00:00:03,200
 好啦  节目马上开始直播
 All right, we're about to go live.

 2
 00:00:03,200 --> 00:00:04,620
 大家拿出最佳表现
 Everyone on their A-game!

 3
 00:00:04,620 --> 00:00:06,660
 精神点
 Good energy!

 4
 00:00:07,380 --> 00:00:09,500
 大家好
 Hello.

 5
 00:00:10,400 --> 00:00:12,020
 我是谢尔顿·库珀博士
 I'm Dr. Sheldon Cooper.


 */

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (way, content) {
    var ID = "id";
    var TIME = "time";
    var SUBTITLE = "subtitle";
    switch (way) {
        case ID:
            findID(content);
            break;
        case TIME:
            findTIME(content);
            break;
        case SUBTITLE:
            findSUBTITLE(content);
            break;
    }
};

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _data = __webpack_require__(2);

var _clear = __webpack_require__(5);

var _clear2 = _interopRequireDefault(_clear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findID = function findID(content) {
    var targetArray = _data.dataToDownload.concat();
    targetArray = targetArray.filter(function (element, index) {
        console.log(index + 1);
        console.log(content);
        console.log(index + 1 === parseInt(content));
        return index + 1 === parseInt(content);
    });
    (0, _clear2.default)();
    (0, _render2.default)(targetArray);
};
var findTIME = function findTIME(content) {
    var targetArray = _data.dataToDownload.concat();
    targetArray = targetArray.filter(function (element) {
        return element.startTime.indexOf(content) >= 0 || element.endTime.indexOf(content) >= 0;
    });
    (0, _clear2.default)();
    (0, _render2.default)(targetArray);
};
var findSUBTITLE = function findSUBTITLE(content) {
    var targetArray = _data.dataToDownload.concat();
    targetArray = targetArray.filter(function (element) {
        return element.subtitleInfo.indexOf(content) >= 0;
    });
    (0, _clear2.default)();
    (0, _render2.default)(targetArray);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    _data.dataToDownload.sort(function (a, b) {
        return (0, _convertTime.timeString2ms)(a.startTime) / 1000 - (0, _convertTime.timeString2ms)(b.startTime) / 1000;
    });
    //console.log("dddddddddddddd");
    //console.log(dataToDownload);
    _data.dataToDownload.forEach(function (element, index) {
        element.index = index + 1;
    });
    //console.log(dataToDownload);
};

var _data = __webpack_require__(2);

var _convertTime = __webpack_require__(4);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var newData = {};
    newData.index = _data.dataToDownload.length + 1;

    newData.startTime = $("#edit-start-time").children().val();
    newData.endTime = $('#edit-end-time').children().val();
    newData.subtitleInfo = $("#edit-subtitle").children().val();
    if (!newData.startTime || !newData.endTime || !newData.subtitleInfo) {} else {
        _data.dataToDownload.push(newData);
        (0, _empty2.default)();
        (0, _clear2.default)();
        (0, _render2.default)(_data.dataToDownload);
    }
};

var _data = __webpack_require__(2);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _clear = __webpack_require__(5);

var _clear2 = _interopRequireDefault(_clear);

var _empty = __webpack_require__(12);

var _empty2 = _interopRequireDefault(_empty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(6, function() {
			var newContent = __webpack_require__(6);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
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
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(7, function() {
			var newContent = __webpack_require__(7);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(8, function() {
			var newContent = __webpack_require__(8);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(9, function() {
			var newContent = __webpack_require__(9);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(10, function() {
			var newContent = __webpack_require__(10);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(11, function() {
			var newContent = __webpack_require__(11);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);