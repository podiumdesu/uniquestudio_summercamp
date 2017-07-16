/*! Created by PetnaKanojo */
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
/******/ 	var hotCurrentHash = "8e831d7bdd407f9f7b52"; // eslint-disable-line no-unused-vars
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
/******/ 	return hotCreateRequire(2)(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "* {\n  margin: 0;\n  padding : 0;\n}\nh1 {\n  font-size: 18px;\n}\n\nnav.nav-container {\n  min-height: 50px;\n}\n.nav-container ul img{\n  display: inline;\n}\n.nav-container div {\n  display: inline-block;\n}\n.nav-container ul li {\n  display: inline;\n}\n.nav-container #img_category img {\n  width: 20px;\n}\n\ndiv.category {     /*最左侧的索引图标*/\n  display: inline-block;\n    padding: 0 12px 0 12px;\n}\ndiv .header-icon {\n  display: inline-block;\n\n\n}\n\n\ndiv .header-content {\n  padding: 0px;\n  line-height: 15px;\n    padding: 0 12px 0 12px;\n}\ndiv.header-content a {\n  color: black;\n    vertical-align: middle;\n  text-decoration: none;\n}\ndiv.header-content a:hover {\n  color: black;\n  text-decoration: underline;\n}\n\nnav.nav-body {\n  position: relative;\n    border-bottom: 1px solid #e5e5e5;\n  width: 100%;\n\n}\n\n.issueOpen span.labelInissue {\n   margin:3px 4px;\n   padding:3px 7px;\n   color: #ffffff;\n   border-radius: 100px;\n   font-size: 12px;\n   vertical-align: text-bottom;\n\n}\n\n.issueClosed {\n   background-color: #fafafa;\n}\n\n.issueOpen {\n\n  padding: 10px 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n.issueOpen span {\n  color: rgba(0,0,0,0.55);\n}\n.displayClose {\n  position: absolute;\n  right: 10%;\n}\nnav.nav-body div.body-container {\n  display: flex;\n  text-align: center;\n  justify-content: center;\n}\nnav.nav-body ul {\n  list-style: none;\n  display: flex;\n  margin: 0;\n}\n\n\nul.words-display{\n  list-style: none;\n  display: flex;\n  margin: 0;\n}\n\nul.words-display li {\n  line-height: 23px;\n  padding: 19px 15px 10px;\n}\n\nul.words-display li a{\n  color: rgba(0,0,0,0.55);\n}\n\nul.words-display  li:hover{\n  border-bottom: 2px solid rgba(0,0,0,0.5);\n}\n\nul.words-display li:hover a{\n  color: #000;\n  text-decoration: none;\n}\n.words-display a span {\n  padding: 3px 7px;\n  background-color: rgba(0,0,0,0.07);\n  border-radius: 50%;\n  margin-left: 5px;\n}\nul.words-display li:hover {\n  border-bottom: 2px solid rgba(0,0,0,0.5);\n}\nnav.nav-body ul li {\n  line-height: 30px;\n  padding: 10px 15px;\n}\n\nul.titleChange li:hover {\n  border-bottom: 2px solid rgba(0,0,0,0.5);\n}\nnav.nav-body div.main-body div {\n  justify-content: center;\n}\n\n/*设置字体颜色*/\nnav.nav-body ul li a {\n  font-weight: normal;\n  font-size: 14px;\n  text-decoration: none;\n  color: rgba(0,0,0,0.55);\n  transition: all ease 0.5s;\n\n}\nnav.nav-body ul li:hover a span {\n  color: #000000;\n}\nnav.nav-body ul li:hover a span {\n}\nnav.nav-body ul li:hover a{\n  color: #000;\n}\n\nnav.nav-body ul.titleChange a {\n  font-size: 16px;\n}\n\nnav.nav-second{\n  background-color: #f5f5f5;\n}\n\n\n#boardPage > span {\n  vertical-align: text-bottom;\n}\n\n.btn-add-list {\n  border: 1px solid green;\n  background-color: white;\n  color: green;\n}\n.allinhere {\n  height: 70px;\n  padding: 0;\n  position: relative;\n  background-color: #fafafa;\n}\n\ndiv.row > span {\n  height: 33px;\n  border-radius: 4px;\n  vertical-align: baseline;\n    border: 1px solid #e5e5e5;\n    padding: 5px 6px 7px;\n    text-align: center;\n}\ndiv.row {\n  height: 70px;\n  margin: 0px;\npadding: 18px 30px;\nposition: relative;\nbackground-color: #f6f6f6;\n}\ndiv.display-issue p{\n  line-height: 25px;\n  font-size: 14px;\n  font-weight: 500;\n  margin: 0px;\n}\n\ndiv.display-issue {\n  font-size: 12px;\n}\ndiv.flex-body {\n  margin-left: 5%;\n  margin-right: 5%;\n  background-color: transparent;\n}\n\n\ndiv.search-bar div.select-bar ul {\n  display: none;\n}\ndiv.search-bar div.select-menu {\n  width: 20%;\n}\ndiv.search-bar div.click-to-search input {\n  height: 36px;\n  width: 100%;\n  padding: 0 10px;\n  vertical-align: text-top;\n}\n\n/*****boards页面的css******/\n/*\n感觉自己多个div间没法进行共用一个class，我是面向div进行class编写，但是应该是通过class来对每个写的div进行定义\n如果class不能复用的话就会导致有非常多的css要写，但是本身是没必要的。\n\n就像js中的函数的封装一样，多封装一个可复用的函数，就可以少写好多行代码。\n\n如果之后还能重构整个代码结构的话，还是应该考虑一下css的重复类的编写还有js的模块化。\n\n这次项目感觉没实现的功能还有很多，所以可能还是不够优雅，直接上手就开始使用框架了。页面的逻辑什么的还需要好好理清楚才好。\n\n*/\n\n.chooseActive {\n  border-bottom: 2px solid #1f78d1;\n}\n.words-display .chooseActive a{\n  text-decoration: none;\n  color: #000;\n}\n.chooseDisactive {\n  border-bottom: 2px solid rgba(0,0,0,0.5);\n}\n\n.UpdownFlow {\n  background-color: white;\n  width: 300px;\n  z-index: 100;\n  position: absolute;\n  right: 44px;\n  top: 52px;\n  border: 1px solid #e5e5e5;\n}\n\n\n#addListUpdown h1 {\n  text-align: center;\n  margin: 8px;\n  padding: 7px 0;\n  border-bottom: 1px solid #e5e5e5;\n}\ndiv.updownIntro {\n  margin: 8px;\n  border-bottom: 1px solid #e5e5e5;\n}\n\n div.updownSearch {\n  margin: 8px;\n\n}\n\n\n\ndiv.labelsTodisplay {\n  margin: 8px;\n  border-bottom: 1px solid #e5e5e5;\n  padding: 3px 0;\n\n}\n\n\ndiv.choose label {\n  margin-bottom: 0px;\n}\ninput.labelsCheckout {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n}\n/*设置复选框的大小和颜色*/\ninput.labelsCheckout {\n    opacity: 0;\n    position: absolute;\n    z-index: -1;\n}\n\n/* + 只有紧邻的才会被选中 */\ninput.labelsCheckout + span {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  border-radius: 4px;\n  transition: all ease 1s;\n}\n.labelsName > span {\n  transition: all ease 0.5s;\n}\n\n.changeBack {\n  background-color: lightgreen;\n\n}\n.changeFontweight {\n  font-weight: bold;\n}\n\n.menu-bar-left {\n  border-bottom: 1px solid #e5e5e5;\n}\ndiv.click-to-search > div.input-group {\n  width: 100%;\n  padding: 10px 10px;\n  background-color:#fafafa;\n  border-bottom: 1px solid #e5e5e5;\n\n}\n\ndiv.input-group input {\n  border: 1px solid #e5e5e5;\n}\n\nul.titleChange li.chooseActive a {\n  font-weight: 600;\n  color: black;\n}\n\n\ndiv.labelsColor {\n  margin-left: 8px;\n}\ndiv.labelsName {\n  vertical-align: top;\n  margin-left: 8px;\n}\n\ndiv.labelsName > span{\n  font-size: 15px;\n}\ndiv.labelsTodisplay div.labelsColor {\n  width: 1.6em;\n  height: 1.6em;\n\n  display: inline-block;\n  border-radius: 4px;\n}\n\ndiv.choose:hover{\n  background-color: #C5F7FF;\n}\n\ndiv.choose {\n  padding: 3px 0;\n  height: 30px;\n  margin-bottom: 5px;\n}\n\n.toDisplay {\n  display: block;\n}\n.toHide {\n  display: none;\n}\n\ndiv.addListMore {\n  margin: 8px;\n}\n\ndiv.createNewLabels {\n  height: 30px;\n  padding: 5px;\n}\n\ndiv.createNewLabels:hover {\n  background-color: #c5f7ff;\n  cursor: pointer;\n}\ndiv.createNewLabels > span {\n  vertical-align: bottom;\n}\n\n\n#addNewLabel h1 {\n  display: inline-block;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 25%;\n}\n\ndiv.title {\n  display: inline-block;\n}\n\nbutton.back {\n  display: inline-block;\n  position: absolute;\n  left: 10px;\n  top:9px;\n}\nbutton.closebtn {\n  display: inline-block;\n  position: absolute;\n  right: 10px;\n  top: 9px;\n}\n#title {\n  margin: 0 8px;\n  border-bottom: 1px solid #e5e5e5;\n}\n\n.margin8px {\n    margin: 8px;\n}\n\n#addNewLabel input {\n  padding: 5px 4px;\n}\n\n#colorSection {\n  width: 282px;\n  letter-spacing: normal;\n  word-spacing: -1px;\n}\n.eachColor {\n  display: inline-block;\n  width: 47px;\n  margin: 0px;\n  height: 30px;\n  margin-bottom: -5px;\n  /*这样就可以解决多行span之间存在空格的问题了*/\n\n}\n.btn-block2 {\n  display: inline-block;\n  width: 86%;\n  vertical-align: middle;\n}\n.eachColor:hover {\n  cursor: pointer;\n}\n\n#chosenColor {\n  display: inline-block;\n  width: 34px;\n  height: 34px;\n  vertical-align: middle;\n  background-color: transparent;\n  border: 1px dotted pink;\n}\n\n.flow-to-right {\n  display: inline-block;\n  position: absolute;\n  right: 8px;\n}\n.height55px {\n  height: 60px;\n}\n\n/*****设置labellist页面的多个方框****/\n\n.inlineDisplay {\n\n  width: 100%;\n  padding: 30px 0px;\n  overflow-x: scroll;\n  white-space: nowrap;  /*设置滑动效果*/\n  display: block;\n  background-color: #fff;\n}\n\n.board {   /*整个方框的样式*/\n  width: 370px;\n  height: 510px;\n  border: 1px solid #e5e5e5;\n  position: relative;\n\n  display: inline-block;    /*设置滑动效果*/\n  margin-right: 25px;\n  background-color: #fafafa;\n  border-radius: 4px;\n  vertical-align: -webkit-baseline-middle;\n}\n.board:first-child {\n  margin-left: 25px;\n}\n.board:last-child {\n  margin-right: 25px;\n}\n.board ul {\n  list-style: none;\n}\n.board:last-child {\n  margin: 0px;\n}\ndiv.add-btn {   /*右上角的数字以及添加按钮的div*/\n  display: inline-block;\n  position: absolute;\n  right: 10%;\n  width: 10px;\n}\ndiv.add-btn> button {   /*添加新issue的button*/\n  display: inline;\n}\n\n.board-header {  /*最上方的label块显示信息*/\n  border-bottom: 1px solid #e5e5e5;\n  height: 50px;\n  padding: 5px 10px;\n}\n.boardtitle {\n  font-size: 15px;\n  font-weight: 500;\n}\n.every-issue-to-drag {   /*每个可拖动的小方块*/\n  box-shadow: 0px 1px 2px rgba(186,186,186,0.5);\n  border: 1px solid #e5e5e5;\n  margin: 10px 10px;\n  height: 70px;\n  padding: 10px;\n  border-radius: 5px;\n  background-color: #fff;\n}\n#closeAddListUpdown {\n  position: absolute;\n  right: 0px;\n  top: 13px;\n  cursor: pointer;\n  padding: 0px 10px;\n}\n/*\nbackground-color:#F6F6F6;\nborder-bottom: 1px solid #DFEFF0;\n*/\n\n/*单独设置backlog和closed的样式*/\n.left-board > .board-header{\n  border-top: 3px solid transparent;\n}\n.right-board > .board-header{\n  border-top: 3px solid transparent;\n}\n\n.left-board > .board-header:hover {\n  cursor: pointer;\n}\n.right-board > .board-header:hover {\n  cursor: pointer;\n}\n\n\n/*设置点击框框displaySmall的样式*/\n.displaySmall {\n  width: 40px;\n\n}\n.fa {\n  font:normal normal normal 14px/1 FontAwesome\n}\n\ni {\n  margin: 7px;\n}\n.displaySmall .board-header  span {\n  display: block;\n  transform: rotate(90deg) translate(7px,0);\n}\n.displaySmall .board-header i {\n  position: absolute;\n  top: 50%;\n  right: 50%;\n  margin: 0px;\n}\n.left-board.displaySmall .board-header i:before{\n  content: '\\F0DA';\n}\n.right-board.displaySmall .board-header i:before{\n  content: '\\F0D9';\n}\n.fa-caret-down:before {\n  content: \"\\F0D7\";\n}\n/*******************/\n\n\n.changeColor {\n  background-color: red;\n}\ni.fa-plus:before {\n  content: \"\\F067\";\n  padding: 1px;\n  vertical-align: bottom;\n}\ni.fa-trash::before {\n  content: \"\\F1F8\";\n}\n\n.board-issue-count {\n  margin: -5px;\n  vertical-align: baseline;\n}\n.board-issue-count {\n    padding-right: 10px;\n    padding-left: 10px;\n    line-height: 22px;\n    border-radius: 3px 0 0 3px;\n    border: 1px solid #e5e5e5;\n}\n.right-board .board-issue-count {\n  border-radius: 3px\n}\n.board-issue-count-container .btn {\n    line-height: 13px;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.right-board .board-issue-count {\n  margin-right: 0;\n}\n.btn.btn-small {\n    padding: 0px 0px;\n    font-size: 12px;\n    vertical-align: baseline;\n}\n\n\nul.listboardChange li:hover {\n  color: black;\n}\n\nul.listboardChange .listToChoose {\n    color: #1f78d1;\n    font-weight: 600;\n}\n\n\ndiv.issue-to-drag_labels {\n  margin-top: 0px;\n  height: 50%;\n}\n.issue-to-drag_title {\n  height: 50%;\n}\n/*为board显示的每个list中的label设置颜色*/\n.issue-to-drag_labels span{\n  border-radius: 10px;\n  margin-right: 10px;\n  padding: 2px 6px;\n  line-height: 10px;\n  margin-top: 4px;\n  font-size: 12px;\n  color: white;\n}\n.issue-to-drag_title span {\n  font-size: 14px;\n  font-weight: 500;\n}\n\ndiv.issue-to-drag_title span:nth-child(1){\n  margin-right: 5px;\n  color: rgba(0,0,0,0.8);\n}\ndiv.issue-to-drag_title span:nth-child(2){\n  color: rgba(0,0,0,0.6)\n}\n\n/*changelist*/\n\n#changeIssueData {\n  height: 600px;\n  width: 25%;\n  z-index: 4;\n  background: white;\n  position: absolute;\n  right: 0;\n  top: 220px;\n  border: 1px solid #e5e5e5;\n  overflow: scroll;\n}\n.width100 {\n  width: 100%;\n}\n\n.width75 {\n  width: 75%;\n}\n.ChangeIssueName {\n  margin: 0 14px;\n  margin-top: 10px;\n  border-bottom: 1px solid #e5e5e5;\n  font-size: 17px;\n}\n.ChangeIssueName p:nth-child(3){\n  margin-top: -10px;\n}\n.changeList {\n  margin: 0 14px;\n}\n\n.changeItem {\n  margin: 0 14px;\n  border-bottom: 1px solid #e5e5e5;\n\n  padding: 8px 0px;\n}\n.changeItem {\n  font-size: 15px;\n}\n\n#change_close {\n  text-decoration: none;\n  color: #e5e5e5;\n}\n.changeItem p {\n  font-size: 13px;\n  margin-top: 5px;\n  color: grey;\n}\n.ddd {\n\n    border-radius: 10px;\n    margin-right: 10px;\n    padding: 2px 6px;\n    line-height: 14px;\n    margin-top: 4px;\n    color: white;\n    display: inline-block;\n}\n\n\n.addNewIssueInTheBoard {\n  border: 1px solid #e5e5e5;\n  box-shadow: 0px 1px 2px rgba(186,186,186,0.5);\n\n}\n.add_clickToCreate {\n  margin-top: 10px;\n\n}\n.addNewIssueInTheBoard header {\n  font-size: 20px;\n}\n.addNewIssueInTheBoard input {\n  width: 100%;\n  padding: 5px;\n}\n.addNewIssueInTheBoard > div {\n  margin: 8px;\n  position: relative;\n}\n\n.newBoard {\n  overflow: auto;\n}\n\n\n.margin10px {\n  margin: 10px;\n}\n.float-to-left {\n  position: absolute;\n  left: 0px;\n}\n.float-to-right2 {\n  position: absolute;\n  right: 0px;\n}\n.droparea:-moz-drag-over {\n  border : 1px dashed black;\n}\n\n\n.sortable-ghost {\n  opacity: .2;\n  background: #dedede;\n}\n\n.board-delete i {\n  vertical-align: baseline;\n  margin: 2px;\n}\n\n.board-delete {\n  border: 0px;\n  line-height: 17px;\n  margin-right: 7px;\n  padding: 2px;\n  background-color: transparent;\n}\n", ""]);

// exports


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//entry.js
__webpack_require__(3);
__webpack_require__(7);
//require("./js/data.js");
//require("./js/showlist.js");
__webpack_require__(8);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(1);
module.exports = __webpack_require__(10);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(0);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(0, function() {
			var newContent = __webpack_require__(0);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
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
/* 5 */
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

var	fixUrls = __webpack_require__(6);

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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    };
  }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var issue_info = __webpack_require__(9).issue_info;

/******获取allIssue，openIssue，closeIssue数组中的issue编号****/
function allIssue() {
  var alls = issue_info.length - 1;
  var s = [];
  for (var i = 1; i <= alls; i++) {
    s.push(i);
  }
  return s;
}
module.exports = allIssue;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*定义数量*/ //使用一个数组包裹的对象的时候，就不再需要初始化all了
/*var all = 3;
var open = 3;
var close = 0;
*/
/*
var issue_info = new Array();
for (var i = 1; i <= all ; i++) {
  issue_info[i] = new Object();
}
*/
/***这些全部都是数据*******/
//mentor用了很魔法的方法w
//因为后面设计函数时候的问题，所以数组第一个设置成空的对象了。
module.exports = {
  issue_info: [{}, {
    tag: ["bug", "array_err", "object_err", "js_err", "ddd"],
    tagColor: ["#aedede", "red", "yellow", "pink", "lightyellow"],
    no: 1,
    name: "pushpushtest",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  }, {
    tag: ["js_err", "bug"],
    tagColor: ["pink", "#aedede"],
    no: 2,
    name: "second test",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  }, {
    tag: ["display_err", "bug", "wtf"],
    tagColor: ["#fddeae", "#aedede", "#aeeaea"],
    no: 3,
    name: "third push test",
    date: "2017-07-03T08:47:28.713Z",
    state: 0
  }, {
    tag: ["hello-world", "wtf"],
    tagColor: ["#fddddd", "#aeeaea"],
    no: 4,
    name: "what do you want",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  }, {
    tag: [],
    tagColor: [],
    no: 5,
    name: "I have no label",
    date: "2017-07-03T08:47:28.713Z",
    state: 0
  }, {
    tag: [],
    tagColor: [],
    no: 6,
    name: "I have no label too",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  }],
  allLabels: [{
    name: "bug",
    IssueHave: [1, 2, 3],
    color: "#aedede"
  }, {
    name: "js_err",
    IssueHave: [1, 2],
    color: "pink"
  }, {
    name: "object_err",
    IssueHave: [1],
    color: "yellow"
  }, {
    name: "array_err",
    IssueHave: [1],
    color: "red"
  }, {
    name: "display_err",
    IssueHave: [3],
    color: "#fddeae"
  }, {
    name: "ddd",
    IssueHave: [1],
    color: "lightyellow"
  }, {
    name: "hello-world",
    IssueHave: [4],
    color: "#fddddd"
  }, {
    name: "wtf",
    IssueHave: [3, 4],
    color: "#aeeaea"
  }]
};

/*
export let issue_info = [
  {

  },
  {
    tag: [
      "bug",
      "array_err",
      "object_err",
      "js_err",
      "ddd"
    ],
    tagColor: [
      "#aedede",
      "red",
      "yellow",
      "pink",
      "lightyellow"
    ],
    no: 1,
    name: "pushpushtest",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  },
  {
    tag: [
      "js_err",
      "bug"
    ],
    tagColor: [
      "pink",
      "#aedede"
    ],
    no: 2,
    name: "second test",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  },
  {
    tag: [
      "display_err",
      "bug",
      "wtf"
    ],
    tagColor: [
      "#fddeae",
      "#aedede",
      "#aeeaea"
    ],
    no: 3,
    name: "third push test",
    date: "2017-07-03T08:47:28.713Z",
    state: 0
  },
  {
    tag: [
      "hello-world",
      "wtf"
    ],
    tagColor: [
      "#fddddd",
      "#aeeaea"
    ],
    no: 4,
    name: "what do you want",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  },
  {
    tag: [
    ],
    tagColor: [
    ],
    no: 5,
    name: "I have no label",
    date: "2017-07-03T08:47:28.713Z",
    state: 0
  },
  {
    tag: [
    ],
    tagColor: [
    ],
    no: 6,
    name: "I have no label too",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  }
];
*/

/*获取所有的label以及所有的labelcolor*/
/*
export let allLabels = [
  {
    name: "bug",
    IssueHave: [1,2,3],
    color: "#aedede"
  },
  {
    name: "js_err",
    IssueHave: [1,2],
    color: "pink"
  },
  {
    name: "object_err",
    IssueHave: [1],
    color: "yellow"
  },
  {
    name: "array_err",
    IssueHave: [1],
    color: "red"
  },
  {
    name: "display_err",
    IssueHave: [3],
    color: "#fddeae"
  },
  {
    name: "ddd",
    IssueHave: [1],
    color: "lightyellow"
  },
  {
    name: "hello-world",
    IssueHave: [4],
    color: "#fddddd"
  },
  {
    name: "wtf",
    IssueHave: [3,4],
    color: "#aeeaea"
  }
];
*/

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Created by PetnaKanojo */
/******/(function (modules) {
	// webpackBootstrap
	/******/function hotDisposeChunk(chunkId) {
		/******/delete installedChunks[chunkId];
		/******/
	}
	/******/var parentHotUpdateCallback = this["webpackHotUpdate"];
	/******/this["webpackHotUpdate"] =
	/******/function webpackHotUpdateCallback(chunkId, moreModules) {
		// eslint-disable-line no-unused-vars
		/******/hotAddUpdateChunk(chunkId, moreModules);
		/******/if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
		/******/
	};
	/******/
	/******/function hotDownloadUpdateChunk(chunkId) {
		// eslint-disable-line no-unused-vars
		/******/var head = document.getElementsByTagName("head")[0];
		/******/var script = document.createElement("script");
		/******/script.type = "text/javascript";
		/******/script.charset = "utf-8";
		/******/script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
		/******/head.appendChild(script);
		/******/
	}
	/******/
	/******/function hotDownloadManifest(requestTimeout) {
		// eslint-disable-line no-unused-vars
		/******/requestTimeout = requestTimeout || 10000;
		/******/return new Promise(function (resolve, reject) {
			/******/if (typeof XMLHttpRequest === "undefined")
				/******/return reject(new Error("No browser support"));
			/******/try {
				/******/var request = new XMLHttpRequest();
				/******/var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
				/******/request.open("GET", requestPath, true);
				/******/request.timeout = requestTimeout;
				/******/request.send(null);
				/******/
			} catch (err) {
				/******/return reject(err);
				/******/
			}
			/******/request.onreadystatechange = function () {
				/******/if (request.readyState !== 4) return;
				/******/if (request.status === 0) {
					/******/ // timeout
					/******/reject(new Error("Manifest request to " + requestPath + " timed out."));
					/******/
				} else if (request.status === 404) {
					/******/ // no update available
					/******/resolve();
					/******/
				} else if (request.status !== 200 && request.status !== 304) {
					/******/ // other failure
					/******/reject(new Error("Manifest request to " + requestPath + " failed."));
					/******/
				} else {
					/******/ // success
					/******/try {
						/******/var update = JSON.parse(request.responseText);
						/******/
					} catch (e) {
						/******/reject(e);
						/******/return;
						/******/
					}
					/******/resolve(update);
					/******/
				}
				/******/
			};
			/******/
		});
		/******/
	}
	/******/
	/******/
	/******/
	/******/var hotApplyOnUpdate = true;
	/******/var hotCurrentHash = "69e9e3cf1f847ec1258c"; // eslint-disable-line no-unused-vars
	/******/var hotRequestTimeout = 10000;
	/******/var hotCurrentModuleData = {};
	/******/var hotCurrentChildModule; // eslint-disable-line no-unused-vars
	/******/var hotCurrentParents = []; // eslint-disable-line no-unused-vars
	/******/var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
	/******/
	/******/function hotCreateRequire(moduleId) {
		// eslint-disable-line no-unused-vars
		/******/var me = installedModules[moduleId];
		/******/if (!me) return __webpack_require__;
		/******/var fn = function fn(request) {
			/******/if (me.hot.active) {
				/******/if (installedModules[request]) {
					/******/if (installedModules[request].parents.indexOf(moduleId) < 0)
						/******/installedModules[request].parents.push(moduleId);
					/******/
				} else {
					/******/hotCurrentParents = [moduleId];
					/******/hotCurrentChildModule = request;
					/******/
				}
				/******/if (me.children.indexOf(request) < 0)
					/******/me.children.push(request);
				/******/
			} else {
				/******/console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
				/******/hotCurrentParents = [];
				/******/
			}
			/******/return __webpack_require__(request);
			/******/
		};
		/******/var ObjectFactory = function ObjectFactory(name) {
			/******/return {
				/******/configurable: true,
				/******/enumerable: true,
				/******/get: function get() {
					/******/return __webpack_require__[name];
					/******/
				},
				/******/set: function set(value) {
					/******/__webpack_require__[name] = value;
					/******/
				}
				/******/ };
			/******/
		};
		/******/for (var name in __webpack_require__) {
			/******/if (Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
				/******/Object.defineProperty(fn, name, ObjectFactory(name));
				/******/
			}
			/******/
		}
		/******/fn.e = function (chunkId) {
			/******/if (hotStatus === "ready")
				/******/hotSetStatus("prepare");
			/******/hotChunksLoading++;
			/******/return __webpack_require__.e(chunkId).then(finishChunkLoading, function (err) {
				/******/finishChunkLoading();
				/******/throw err;
				/******/
			});
			/******/
			/******/function finishChunkLoading() {
				/******/hotChunksLoading--;
				/******/if (hotStatus === "prepare") {
					/******/if (!hotWaitingFilesMap[chunkId]) {
						/******/hotEnsureUpdateChunk(chunkId);
						/******/
					}
					/******/if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
						/******/hotUpdateDownloaded();
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
		};
		/******/return fn;
		/******/
	}
	/******/
	/******/function hotCreateModule(moduleId) {
		// eslint-disable-line no-unused-vars
		/******/var hot = {
			/******/ // private stuff
			/******/_acceptedDependencies: {},
			/******/_declinedDependencies: {},
			/******/_selfAccepted: false,
			/******/_selfDeclined: false,
			/******/_disposeHandlers: [],
			/******/_main: hotCurrentChildModule !== moduleId,
			/******/
			/******/ // Module API
			/******/active: true,
			/******/accept: function accept(dep, callback) {
				/******/if (typeof dep === "undefined")
					/******/hot._selfAccepted = true;
					/******/else if (typeof dep === "function")
						/******/hot._selfAccepted = dep;
						/******/else if ((typeof dep === "undefined" ? "undefined" : _typeof(dep)) === "object")
							/******/for (var i = 0; i < dep.length; i++) {
								/******/hot._acceptedDependencies[dep[i]] = callback || function () {};
							} /******/else
							/******/hot._acceptedDependencies[dep] = callback || function () {};
				/******/
			},
			/******/decline: function decline(dep) {
				/******/if (typeof dep === "undefined")
					/******/hot._selfDeclined = true;
					/******/else if ((typeof dep === "undefined" ? "undefined" : _typeof(dep)) === "object")
						/******/for (var i = 0; i < dep.length; i++) {
							/******/hot._declinedDependencies[dep[i]] = true;
						} /******/else
						/******/hot._declinedDependencies[dep] = true;
				/******/
			},
			/******/dispose: function dispose(callback) {
				/******/hot._disposeHandlers.push(callback);
				/******/
			},
			/******/addDisposeHandler: function addDisposeHandler(callback) {
				/******/hot._disposeHandlers.push(callback);
				/******/
			},
			/******/removeDisposeHandler: function removeDisposeHandler(callback) {
				/******/var idx = hot._disposeHandlers.indexOf(callback);
				/******/if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
				/******/
			},
			/******/
			/******/ // Management API
			/******/check: hotCheck,
			/******/apply: hotApply,
			/******/status: function status(l) {
				/******/if (!l) return hotStatus;
				/******/hotStatusHandlers.push(l);
				/******/
			},
			/******/addStatusHandler: function addStatusHandler(l) {
				/******/hotStatusHandlers.push(l);
				/******/
			},
			/******/removeStatusHandler: function removeStatusHandler(l) {
				/******/var idx = hotStatusHandlers.indexOf(l);
				/******/if (idx >= 0) hotStatusHandlers.splice(idx, 1);
				/******/
			},
			/******/
			/******/ //inherit from previous dispose call
			/******/data: hotCurrentModuleData[moduleId]
			/******/ };
		/******/hotCurrentChildModule = undefined;
		/******/return hot;
		/******/
	}
	/******/
	/******/var hotStatusHandlers = [];
	/******/var hotStatus = "idle";
	/******/
	/******/function hotSetStatus(newStatus) {
		/******/hotStatus = newStatus;
		/******/for (var i = 0; i < hotStatusHandlers.length; i++) {
			/******/hotStatusHandlers[i].call(null, newStatus);
		} /******/
	}
	/******/
	/******/ // while downloading
	/******/var hotWaitingFiles = 0;
	/******/var hotChunksLoading = 0;
	/******/var hotWaitingFilesMap = {};
	/******/var hotRequestedFilesMap = {};
	/******/var hotAvailableFilesMap = {};
	/******/var hotDeferred;
	/******/
	/******/ // The update info
	/******/var hotUpdate, hotUpdateNewHash;
	/******/
	/******/function toModuleId(id) {
		/******/var isNumber = +id + "" === id;
		/******/return isNumber ? +id : id;
		/******/
	}
	/******/
	/******/function hotCheck(apply) {
		/******/if (hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
		/******/hotApplyOnUpdate = apply;
		/******/hotSetStatus("check");
		/******/return hotDownloadManifest(hotRequestTimeout).then(function (update) {
			/******/if (!update) {
				/******/hotSetStatus("idle");
				/******/return null;
				/******/
			}
			/******/hotRequestedFilesMap = {};
			/******/hotWaitingFilesMap = {};
			/******/hotAvailableFilesMap = update.c;
			/******/hotUpdateNewHash = update.h;
			/******/
			/******/hotSetStatus("prepare");
			/******/var promise = new Promise(function (resolve, reject) {
				/******/hotDeferred = {
					/******/resolve: resolve,
					/******/reject: reject
					/******/ };
				/******/
			});
			/******/hotUpdate = {};
			/******/var chunkId = 0;
			/******/{
				// eslint-disable-line no-lone-blocks
				/******/ /*globals chunkId */
				/******/hotEnsureUpdateChunk(chunkId);
				/******/
			}
			/******/if (hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
				/******/hotUpdateDownloaded();
				/******/
			}
			/******/return promise;
			/******/
		});
		/******/
	}
	/******/
	/******/function hotAddUpdateChunk(chunkId, moreModules) {
		// eslint-disable-line no-unused-vars
		/******/if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
			/******/return;
		/******/hotRequestedFilesMap[chunkId] = false;
		/******/for (var moduleId in moreModules) {
			/******/if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
				/******/hotUpdate[moduleId] = moreModules[moduleId];
				/******/
			}
			/******/
		}
		/******/if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
			/******/hotUpdateDownloaded();
			/******/
		}
		/******/
	}
	/******/
	/******/function hotEnsureUpdateChunk(chunkId) {
		/******/if (!hotAvailableFilesMap[chunkId]) {
			/******/hotWaitingFilesMap[chunkId] = true;
			/******/
		} else {
			/******/hotRequestedFilesMap[chunkId] = true;
			/******/hotWaitingFiles++;
			/******/hotDownloadUpdateChunk(chunkId);
			/******/
		}
		/******/
	}
	/******/
	/******/function hotUpdateDownloaded() {
		/******/hotSetStatus("ready");
		/******/var deferred = hotDeferred;
		/******/hotDeferred = null;
		/******/if (!deferred) return;
		/******/if (hotApplyOnUpdate) {
			/******/hotApply(hotApplyOnUpdate).then(function (result) {
				/******/deferred.resolve(result);
				/******/
			}, function (err) {
				/******/deferred.reject(err);
				/******/
			});
			/******/
		} else {
			/******/var outdatedModules = [];
			/******/for (var id in hotUpdate) {
				/******/if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
					/******/outdatedModules.push(toModuleId(id));
					/******/
				}
				/******/
			}
			/******/deferred.resolve(outdatedModules);
			/******/
		}
		/******/
	}
	/******/
	/******/function hotApply(options) {
		/******/if (hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
		/******/options = options || {};
		/******/
		/******/var cb;
		/******/var i;
		/******/var j;
		/******/var module;
		/******/var moduleId;
		/******/
		/******/function getAffectedStuff(updateModuleId) {
			/******/var outdatedModules = [updateModuleId];
			/******/var outdatedDependencies = {};
			/******/
			/******/var queue = outdatedModules.slice().map(function (id) {
				/******/return {
					/******/chain: [id],
					/******/id: id
					/******/ };
				/******/
			});
			/******/while (queue.length > 0) {
				/******/var queueItem = queue.pop();
				/******/var moduleId = queueItem.id;
				/******/var chain = queueItem.chain;
				/******/module = installedModules[moduleId];
				/******/if (!module || module.hot._selfAccepted)
					/******/continue;
				/******/if (module.hot._selfDeclined) {
					/******/return {
						/******/type: "self-declined",
						/******/chain: chain,
						/******/moduleId: moduleId
						/******/ };
					/******/
				}
				/******/if (module.hot._main) {
					/******/return {
						/******/type: "unaccepted",
						/******/chain: chain,
						/******/moduleId: moduleId
						/******/ };
					/******/
				}
				/******/for (var i = 0; i < module.parents.length; i++) {
					/******/var parentId = module.parents[i];
					/******/var parent = installedModules[parentId];
					/******/if (!parent) continue;
					/******/if (parent.hot._declinedDependencies[moduleId]) {
						/******/return {
							/******/type: "declined",
							/******/chain: chain.concat([parentId]),
							/******/moduleId: moduleId,
							/******/parentId: parentId
							/******/ };
						/******/
					}
					/******/if (outdatedModules.indexOf(parentId) >= 0) continue;
					/******/if (parent.hot._acceptedDependencies[moduleId]) {
						/******/if (!outdatedDependencies[parentId])
							/******/outdatedDependencies[parentId] = [];
						/******/addAllToSet(outdatedDependencies[parentId], [moduleId]);
						/******/continue;
						/******/
					}
					/******/delete outdatedDependencies[parentId];
					/******/outdatedModules.push(parentId);
					/******/queue.push({
						/******/chain: chain.concat([parentId]),
						/******/id: parentId
						/******/ });
					/******/
				}
				/******/
			}
			/******/
			/******/return {
				/******/type: "accepted",
				/******/moduleId: updateModuleId,
				/******/outdatedModules: outdatedModules,
				/******/outdatedDependencies: outdatedDependencies
				/******/ };
			/******/
		}
		/******/
		/******/function addAllToSet(a, b) {
			/******/for (var i = 0; i < b.length; i++) {
				/******/var item = b[i];
				/******/if (a.indexOf(item) < 0)
					/******/a.push(item);
				/******/
			}
			/******/
		}
		/******/
		/******/ // at begin all updates modules are outdated
		/******/ // the "outdated" status can propagate to parents if they don't accept the children
		/******/var outdatedDependencies = {};
		/******/var outdatedModules = [];
		/******/var appliedUpdate = {};
		/******/
		/******/var warnUnexpectedRequire = function warnUnexpectedRequire() {
			/******/console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
			/******/
		};
		/******/
		/******/for (var id in hotUpdate) {
			/******/if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
				/******/moduleId = toModuleId(id);
				/******/var result;
				/******/if (hotUpdate[id]) {
					/******/result = getAffectedStuff(moduleId);
					/******/
				} else {
					/******/result = {
						/******/type: "disposed",
						/******/moduleId: id
						/******/ };
					/******/
				}
				/******/var abortError = false;
				/******/var doApply = false;
				/******/var doDispose = false;
				/******/var chainInfo = "";
				/******/if (result.chain) {
					/******/chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
					/******/
				}
				/******/switch (result.type) {
					/******/case "self-declined":
						/******/if (options.onDeclined)
							/******/options.onDeclined(result);
						/******/if (!options.ignoreDeclined)
							/******/abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
						/******/break;
					/******/case "declined":
						/******/if (options.onDeclined)
							/******/options.onDeclined(result);
						/******/if (!options.ignoreDeclined)
							/******/abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
						/******/break;
					/******/case "unaccepted":
						/******/if (options.onUnaccepted)
							/******/options.onUnaccepted(result);
						/******/if (!options.ignoreUnaccepted)
							/******/abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
						/******/break;
					/******/case "accepted":
						/******/if (options.onAccepted)
							/******/options.onAccepted(result);
						/******/doApply = true;
						/******/break;
					/******/case "disposed":
						/******/if (options.onDisposed)
							/******/options.onDisposed(result);
						/******/doDispose = true;
						/******/break;
					/******/default:
						/******/throw new Error("Unexception type " + result.type);
					/******/}
				/******/if (abortError) {
					/******/hotSetStatus("abort");
					/******/return Promise.reject(abortError);
					/******/
				}
				/******/if (doApply) {
					/******/appliedUpdate[moduleId] = hotUpdate[moduleId];
					/******/addAllToSet(outdatedModules, result.outdatedModules);
					/******/for (moduleId in result.outdatedDependencies) {
						/******/if (Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
							/******/if (!outdatedDependencies[moduleId])
								/******/outdatedDependencies[moduleId] = [];
							/******/addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
							/******/
						}
						/******/
					}
					/******/
				}
				/******/if (doDispose) {
					/******/addAllToSet(outdatedModules, [result.moduleId]);
					/******/appliedUpdate[moduleId] = warnUnexpectedRequire;
					/******/
				}
				/******/
			}
			/******/
		}
		/******/
		/******/ // Store self accepted outdated modules to require them later by the module system
		/******/var outdatedSelfAcceptedModules = [];
		/******/for (i = 0; i < outdatedModules.length; i++) {
			/******/moduleId = outdatedModules[i];
			/******/if (installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
				/******/outdatedSelfAcceptedModules.push({
					/******/module: moduleId,
					/******/errorHandler: installedModules[moduleId].hot._selfAccepted
					/******/ });
			/******/
		}
		/******/
		/******/ // Now in "dispose" phase
		/******/hotSetStatus("dispose");
		/******/Object.keys(hotAvailableFilesMap).forEach(function (chunkId) {
			/******/if (hotAvailableFilesMap[chunkId] === false) {
				/******/hotDisposeChunk(chunkId);
				/******/
			}
			/******/
		});
		/******/
		/******/var idx;
		/******/var queue = outdatedModules.slice();
		/******/while (queue.length > 0) {
			/******/moduleId = queue.pop();
			/******/module = installedModules[moduleId];
			/******/if (!module) continue;
			/******/
			/******/var data = {};
			/******/
			/******/ // Call dispose handlers
			/******/var disposeHandlers = module.hot._disposeHandlers;
			/******/for (j = 0; j < disposeHandlers.length; j++) {
				/******/cb = disposeHandlers[j];
				/******/cb(data);
				/******/
			}
			/******/hotCurrentModuleData[moduleId] = data;
			/******/
			/******/ // disable module (this disables requires from this module)
			/******/module.hot.active = false;
			/******/
			/******/ // remove module from cache
			/******/delete installedModules[moduleId];
			/******/
			/******/ // remove "parents" references from all children
			/******/for (j = 0; j < module.children.length; j++) {
				/******/var child = installedModules[module.children[j]];
				/******/if (!child) continue;
				/******/idx = child.parents.indexOf(moduleId);
				/******/if (idx >= 0) {
					/******/child.parents.splice(idx, 1);
					/******/
				}
				/******/
			}
			/******/
		}
		/******/
		/******/ // remove outdated dependency from module children
		/******/var dependency;
		/******/var moduleOutdatedDependencies;
		/******/for (moduleId in outdatedDependencies) {
			/******/if (Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
				/******/module = installedModules[moduleId];
				/******/if (module) {
					/******/moduleOutdatedDependencies = outdatedDependencies[moduleId];
					/******/for (j = 0; j < moduleOutdatedDependencies.length; j++) {
						/******/dependency = moduleOutdatedDependencies[j];
						/******/idx = module.children.indexOf(dependency);
						/******/if (idx >= 0) module.children.splice(idx, 1);
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
		}
		/******/
		/******/ // Not in "apply" phase
		/******/hotSetStatus("apply");
		/******/
		/******/hotCurrentHash = hotUpdateNewHash;
		/******/
		/******/ // insert new code
		/******/for (moduleId in appliedUpdate) {
			/******/if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
				/******/modules[moduleId] = appliedUpdate[moduleId];
				/******/
			}
			/******/
		}
		/******/
		/******/ // call accept handlers
		/******/var error = null;
		/******/for (moduleId in outdatedDependencies) {
			/******/if (Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
				/******/module = installedModules[moduleId];
				/******/moduleOutdatedDependencies = outdatedDependencies[moduleId];
				/******/var callbacks = [];
				/******/for (i = 0; i < moduleOutdatedDependencies.length; i++) {
					/******/dependency = moduleOutdatedDependencies[i];
					/******/cb = module.hot._acceptedDependencies[dependency];
					/******/if (callbacks.indexOf(cb) >= 0) continue;
					/******/callbacks.push(cb);
					/******/
				}
				/******/for (i = 0; i < callbacks.length; i++) {
					/******/cb = callbacks[i];
					/******/try {
						/******/cb(moduleOutdatedDependencies);
						/******/
					} catch (err) {
						/******/if (options.onErrored) {
							/******/options.onErrored({
								/******/type: "accept-errored",
								/******/moduleId: moduleId,
								/******/dependencyId: moduleOutdatedDependencies[i],
								/******/error: err
								/******/ });
							/******/
						}
						/******/if (!options.ignoreErrored) {
							/******/if (!error)
								/******/error = err;
							/******/
						}
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
		}
		/******/
		/******/ // Load self accepted modules
		/******/for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
			/******/var item = outdatedSelfAcceptedModules[i];
			/******/moduleId = item.module;
			/******/hotCurrentParents = [moduleId];
			/******/try {
				/******/__webpack_require__(moduleId);
				/******/
			} catch (err) {
				/******/if (typeof item.errorHandler === "function") {
					/******/try {
						/******/item.errorHandler(err);
						/******/
					} catch (err2) {
						/******/if (options.onErrored) {
							/******/options.onErrored({
								/******/type: "self-accept-error-handler-errored",
								/******/moduleId: moduleId,
								/******/error: err2,
								/******/orginalError: err
								/******/ });
							/******/
						}
						/******/if (!options.ignoreErrored) {
							/******/if (!error)
								/******/error = err2;
							/******/
						}
						/******/if (!error)
							/******/error = err;
						/******/
					}
					/******/
				} else {
					/******/if (options.onErrored) {
						/******/options.onErrored({
							/******/type: "self-accept-errored",
							/******/moduleId: moduleId,
							/******/error: err
							/******/ });
						/******/
					}
					/******/if (!options.ignoreErrored) {
						/******/if (!error)
							/******/error = err;
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
		}
		/******/
		/******/ // handle errors in accept handlers and self accepted module load
		/******/if (error) {
			/******/hotSetStatus("fail");
			/******/return Promise.reject(error);
			/******/
		}
		/******/
		/******/hotSetStatus("idle");
		/******/return new Promise(function (resolve) {
			/******/resolve(outdatedModules);
			/******/
		});
		/******/
	}
	/******/
	/******/ // The module cache
	/******/var installedModules = {};
	/******/
	/******/ // The require function
	/******/function __webpack_require__(moduleId) {
		/******/
		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId]) {
			/******/return installedModules[moduleId].exports;
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/i: moduleId,
			/******/l: false,
			/******/exports: {},
			/******/hot: hotCreateModule(moduleId),
			/******/parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
			/******/children: []
			/******/ };
		/******/
		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
		/******/
		/******/ // Flag the module as loaded
		/******/module.l = true;
		/******/
		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}
	/******/
	/******/
	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;
	/******/
	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;
	/******/
	/******/ // define getter function for harmony exports
	/******/__webpack_require__.d = function (exports, name, getter) {
		/******/if (!__webpack_require__.o(exports, name)) {
			/******/Object.defineProperty(exports, name, {
				/******/configurable: false,
				/******/enumerable: true,
				/******/get: getter
				/******/ });
			/******/
		}
		/******/
	};
	/******/
	/******/ // getDefaultExport function for compatibility with non-harmony modules
	/******/__webpack_require__.n = function (module) {
		/******/var getter = module && module.__esModule ?
		/******/function getDefault() {
			return module['default'];
		} :
		/******/function getModuleExports() {
			return module;
		};
		/******/__webpack_require__.d(getter, 'a', getter);
		/******/return getter;
		/******/
	};
	/******/
	/******/ // Object.prototype.hasOwnProperty.call
	/******/__webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	};
	/******/
	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";
	/******/
	/******/ // __webpack_hash__
	/******/__webpack_require__.h = function () {
		return hotCurrentHash;
	};
	/******/
	/******/ // Load entry module and return exports
	/******/return hotCreateRequire(1)(__webpack_require__.s = 1);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)(undefined);
	// imports


	// module
	exports.push([module.i, "* {\n  margin: 0;\n  padding : 0;\n}\nh1 {\n  font-size: 18px;\n}\n\nnav.nav-container {\n  min-height: 50px;\n}\n.nav-container ul img{\n  display: inline;\n}\n.nav-container div {\n  display: inline-block;\n}\n.nav-container ul li {\n  display: inline;\n}\n.nav-container #img_category img {\n  width: 20px;\n}\n\ndiv.category {     /*最左侧的索引图标*/\n  display: inline-block;\n    padding: 0 12px 0 12px;\n}\ndiv .header-icon {\n  display: inline-block;\n\n\n}\n\n\ndiv .header-content {\n  padding: 0px;\n  line-height: 15px;\n    padding: 0 12px 0 12px;\n}\ndiv.header-content a {\n  color: black;\n    vertical-align: middle;\n  text-decoration: none;\n}\ndiv.header-content a:hover {\n  color: black;\n  text-decoration: underline;\n}\n\nnav.nav-body {\n  position: relative;\n    border-bottom: 1px solid #e5e5e5;\n  width: 100%;\n\n}\n\n.issueOpen span.labelInissue {\n   margin:3px 4px;\n   padding:3px 7px;\n   color: #ffffff;\n   border-radius: 100px;\n   font-size: 12px;\n   vertical-align: text-bottom;\n\n}\n\n.issueClosed {\n   background-color: #fafafa;\n}\n\n.issueOpen {\n\n  padding: 10px 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n.issueOpen span {\n  color: rgba(0,0,0,0.55);\n}\n.displayClose {\n  position: absolute;\n  right: 10%;\n}\nnav.nav-body div.body-container {\n  display: flex;\n  text-align: center;\n  justify-content: center;\n}\nnav.nav-body ul {\n  list-style: none;\n  display: flex;\n  margin: 0;\n}\n\n\nul.words-display{\n  list-style: none;\n  display: flex;\n  margin: 0;\n}\n\nul.words-display li {\n  line-height: 23px;\n  padding: 19px 15px 10px;\n}\n\nul.words-display li a{\n  color: rgba(0,0,0,0.55);\n}\n\nul.words-display  li:hover{\n  border-bottom: 2px solid rgba(0,0,0,0.5);\n}\n\nul.words-display li:hover a{\n  color: #000;\n  text-decoration: none;\n}\n.words-display a span {\n  padding: 3px 7px;\n  background-color: rgba(0,0,0,0.07);\n  border-radius: 50%;\n  margin-left: 5px;\n}\nul.words-display li:hover {\n  border-bottom: 2px solid rgba(0,0,0,0.5);\n}\nnav.nav-body ul li {\n  line-height: 30px;\n  padding: 10px 15px;\n}\n\nul.titleChange li:hover {\n  border-bottom: 2px solid rgba(0,0,0,0.5);\n}\nnav.nav-body div.main-body div {\n  justify-content: center;\n}\n\n/*设置字体颜色*/\nnav.nav-body ul li a {\n  font-weight: normal;\n  font-size: 14px;\n  text-decoration: none;\n  color: rgba(0,0,0,0.55);\n  transition: all ease 0.5s;\n\n}\nnav.nav-body ul li:hover a span {\n  color: #000000;\n}\nnav.nav-body ul li:hover a span {\n}\nnav.nav-body ul li:hover a{\n  color: #000;\n}\n\nnav.nav-body ul.titleChange a {\n  font-size: 16px;\n}\n\nnav.nav-second{\n  background-color: #f5f5f5;\n}\n\n\n#boardPage > span {\n  vertical-align: text-bottom;\n}\n\n.btn-add-list {\n  border: 1px solid green;\n  background-color: white;\n  color: green;\n}\n.allinhere {\n  height: 70px;\n  padding: 0;\n  position: relative;\n  background-color: #fafafa;\n}\n\ndiv.row > span {\n  height: 33px;\n  border-radius: 4px;\n  vertical-align: baseline;\n    border: 1px solid #e5e5e5;\n    padding: 5px 6px 7px;\n    text-align: center;\n}\ndiv.row {\n  height: 70px;\n  margin: 0px;\npadding: 18px 30px;\nposition: relative;\nbackground-color: #f6f6f6;\n}\ndiv.display-issue p{\n  line-height: 25px;\n  font-size: 14px;\n  font-weight: 500;\n  margin: 0px;\n}\n\ndiv.display-issue {\n  font-size: 12px;\n}\ndiv.flex-body {\n  margin-left: 5%;\n  margin-right: 5%;\n  background-color: transparent;\n}\n\n\ndiv.search-bar div.select-bar ul {\n  display: none;\n}\ndiv.search-bar div.select-menu {\n  width: 20%;\n}\ndiv.search-bar div.click-to-search input {\n  height: 36px;\n  width: 100%;\n  padding: 0 10px;\n  vertical-align: text-top;\n}\n\n/*****boards页面的css******/\n/*\n感觉自己多个div间没法进行共用一个class，我是面向div进行class编写，但是应该是通过class来对每个写的div进行定义\n如果class不能复用的话就会导致有非常多的css要写，但是本身是没必要的。\n\n就像js中的函数的封装一样，多封装一个可复用的函数，就可以少写好多行代码。\n\n如果之后还能重构整个代码结构的话，还是应该考虑一下css的重复类的编写还有js的模块化。\n\n这次项目感觉没实现的功能还有很多，所以可能还是不够优雅，直接上手就开始使用框架了。页面的逻辑什么的还需要好好理清楚才好。\n\n*/\n\n.chooseActive {\n  border-bottom: 2px solid #1f78d1;\n}\n.words-display .chooseActive a{\n  text-decoration: none;\n  color: #000;\n}\n.chooseDisactive {\n  border-bottom: 2px solid rgba(0,0,0,0.5);\n}\n\n.UpdownFlow {\n  background-color: white;\n  width: 300px;\n  z-index: 100;\n  position: absolute;\n  right: 44px;\n  top: 52px;\n  border: 1px solid #e5e5e5;\n}\n\n\n#addListUpdown h1 {\n  text-align: center;\n  margin: 8px;\n  padding: 7px 0;\n  border-bottom: 1px solid #e5e5e5;\n}\ndiv.updownIntro {\n  margin: 8px;\n  border-bottom: 1px solid #e5e5e5;\n}\n\n div.updownSearch {\n  margin: 8px;\n\n}\n\n\n\ndiv.labelsTodisplay {\n  margin: 8px;\n  border-bottom: 1px solid #e5e5e5;\n  padding: 3px 0;\n\n}\n\n\ndiv.choose label {\n  margin-bottom: 0px;\n}\ninput.labelsCheckout {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n}\n/*设置复选框的大小和颜色*/\ninput.labelsCheckout {\n    opacity: 0;\n    position: absolute;\n    z-index: -1;\n}\n\n/* + 只有紧邻的才会被选中 */\ninput.labelsCheckout + span {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  border-radius: 4px;\n  transition: all ease 1s;\n}\n.labelsName > span {\n  transition: all ease 0.5s;\n}\n\n.changeBack {\n  background-color: lightgreen;\n\n}\n.changeFontweight {\n  font-weight: bold;\n}\n\n.menu-bar-left {\n  border-bottom: 1px solid #e5e5e5;\n}\ndiv.click-to-search > div.input-group {\n  width: 100%;\n  padding: 10px 10px;\n  background-color:#fafafa;\n  border-bottom: 1px solid #e5e5e5;\n\n}\n\ndiv.input-group input {\n  border: 1px solid #e5e5e5;\n}\n\nul.titleChange li.chooseActive a {\n  font-weight: 600;\n  color: black;\n}\n\n\ndiv.labelsColor {\n  margin-left: 8px;\n}\ndiv.labelsName {\n  vertical-align: top;\n  margin-left: 8px;\n}\n\ndiv.labelsName > span{\n  font-size: 15px;\n}\ndiv.labelsTodisplay div.labelsColor {\n  width: 1.6em;\n  height: 1.6em;\n\n  display: inline-block;\n  border-radius: 4px;\n}\n\ndiv.choose:hover{\n  background-color: #C5F7FF;\n}\n\ndiv.choose {\n  padding: 3px 0;\n  height: 30px;\n  margin-bottom: 5px;\n}\n\n.toDisplay {\n  display: block;\n}\n.toHide {\n  display: none;\n}\n\ndiv.addListMore {\n  margin: 8px;\n}\n\ndiv.createNewLabels {\n  height: 30px;\n  padding: 5px;\n}\n\ndiv.createNewLabels:hover {\n  background-color: #c5f7ff;\n  cursor: pointer;\n}\ndiv.createNewLabels > span {\n  vertical-align: bottom;\n}\n\n\n#addNewLabel h1 {\n  display: inline-block;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 25%;\n}\n\ndiv.title {\n  display: inline-block;\n}\n\nbutton.back {\n  display: inline-block;\n  position: absolute;\n  left: 10px;\n  top:9px;\n}\nbutton.closebtn {\n  display: inline-block;\n  position: absolute;\n  right: 10px;\n  top: 9px;\n}\n#title {\n  margin: 0 8px;\n  border-bottom: 1px solid #e5e5e5;\n}\n\n.margin8px {\n    margin: 8px;\n}\n\n#addNewLabel input {\n  padding: 5px 4px;\n}\n\n#colorSection {\n  width: 282px;\n  letter-spacing: normal;\n  word-spacing: -1px;\n}\n.eachColor {\n  display: inline-block;\n  width: 47px;\n  margin: 0px;\n  height: 30px;\n  margin-bottom: -5px;\n  /*这样就可以解决多行span之间存在空格的问题了*/\n\n}\n.btn-block2 {\n  display: inline-block;\n  width: 86%;\n  vertical-align: middle;\n}\n.eachColor:hover {\n  cursor: pointer;\n}\n\n#chosenColor {\n  display: inline-block;\n  width: 34px;\n  height: 34px;\n  vertical-align: middle;\n  background-color: transparent;\n  border: 1px dotted pink;\n}\n\n.flow-to-right {\n  display: inline-block;\n  position: absolute;\n  right: 8px;\n}\n.height55px {\n  height: 60px;\n}\n\n/*****设置labellist页面的多个方框****/\n\n.inlineDisplay {\n\n  width: 100%;\n  padding: 30px 0px;\n  overflow-x: scroll;\n  white-space: nowrap;  /*设置滑动效果*/\n  display: block;\n  background-color: #fff;\n}\n\n.board {   /*整个方框的样式*/\n  width: 370px;\n  height: 510px;\n  border: 1px solid #e5e5e5;\n  position: relative;\n\n  display: inline-block;    /*设置滑动效果*/\n  margin-right: 25px;\n  background-color: #fafafa;\n  border-radius: 4px;\n  vertical-align: -webkit-baseline-middle;\n}\n.board:first-child {\n  margin-left: 25px;\n}\n.board:last-child {\n  margin-right: 25px;\n}\n.board ul {\n  list-style: none;\n}\n.board:last-child {\n  margin: 0px;\n}\ndiv.add-btn {   /*右上角的数字以及添加按钮的div*/\n  display: inline-block;\n  position: absolute;\n  right: 10%;\n  width: 10px;\n}\ndiv.add-btn> button {   /*添加新issue的button*/\n  display: inline;\n}\n\n.board-header {  /*最上方的label块显示信息*/\n  border-bottom: 1px solid #e5e5e5;\n  height: 50px;\n  padding: 5px 10px;\n}\n.boardtitle {\n  font-size: 15px;\n  font-weight: 500;\n}\n.every-issue-to-drag {   /*每个可拖动的小方块*/\n  box-shadow: 0px 1px 2px rgba(186,186,186,0.5);\n  border: 1px solid #e5e5e5;\n  margin: 10px 10px;\n  height: 70px;\n  padding: 10px;\n  border-radius: 5px;\n  background-color: #fff;\n}\n#closeAddListUpdown {\n  position: absolute;\n  right: 0px;\n  top: 13px;\n  cursor: pointer;\n  padding: 0px 10px;\n}\n/*\nbackground-color:#F6F6F6;\nborder-bottom: 1px solid #DFEFF0;\n*/\n\n/*单独设置backlog和closed的样式*/\n.left-board > .board-header{\n  border-top: 3px solid transparent;\n}\n.right-board > .board-header{\n  border-top: 3px solid transparent;\n}\n\n.left-board > .board-header:hover {\n  cursor: pointer;\n}\n.right-board > .board-header:hover {\n  cursor: pointer;\n}\n\n\n/*设置点击框框displaySmall的样式*/\n.displaySmall {\n  width: 40px;\n\n}\n.fa {\n  font:normal normal normal 14px/1 FontAwesome\n}\n\ni {\n  margin: 7px;\n}\n.displaySmall .board-header  span {\n  display: block;\n  transform: rotate(90deg) translate(7px,0);\n}\n.displaySmall .board-header i {\n  position: absolute;\n  top: 50%;\n  right: 50%;\n  margin: 0px;\n}\n.left-board.displaySmall .board-header i:before{\n  content: '\\F0DA';\n}\n.right-board.displaySmall .board-header i:before{\n  content: '\\F0D9';\n}\n.fa-caret-down:before {\n  content: \"\\F0D7\";\n}\n/*******************/\n\n\n.changeColor {\n  background-color: red;\n}\ni.fa-plus:before {\n  content: \"\\F067\";\n  padding: 1px;\n  vertical-align: bottom;\n}\ni.fa-trash::before {\n  content: \"\\F1F8\";\n}\n\n.board-issue-count {\n  margin: -5px;\n  vertical-align: baseline;\n}\n.board-issue-count {\n    padding-right: 10px;\n    padding-left: 10px;\n    line-height: 22px;\n    border-radius: 3px 0 0 3px;\n    border: 1px solid #e5e5e5;\n}\n.right-board .board-issue-count {\n  border-radius: 3px\n}\n.board-issue-count-container .btn {\n    line-height: 13px;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.right-board .board-issue-count {\n  margin-right: 0;\n}\n.btn.btn-small {\n    padding: 0px 0px;\n    font-size: 12px;\n    vertical-align: baseline;\n}\n\n\nul.listboardChange li:hover {\n  color: black;\n}\n\nul.listboardChange .listToChoose {\n    color: #1f78d1;\n    font-weight: 600;\n}\n\n\ndiv.issue-to-drag_labels {\n  margin-top: 0px;\n  height: 50%;\n}\n.issue-to-drag_title {\n  height: 50%;\n}\n/*为board显示的每个list中的label设置颜色*/\n.issue-to-drag_labels span{\n  border-radius: 10px;\n  margin-right: 10px;\n  padding: 2px 6px;\n  line-height: 10px;\n  margin-top: 4px;\n  font-size: 12px;\n  color: white;\n}\n.issue-to-drag_title span {\n  font-size: 14px;\n  font-weight: 500;\n}\n\ndiv.issue-to-drag_title span:nth-child(1){\n  margin-right: 5px;\n  color: rgba(0,0,0,0.8);\n}\ndiv.issue-to-drag_title span:nth-child(2){\n  color: rgba(0,0,0,0.6)\n}\n\n/*changelist*/\n\n#changeIssueData {\n  height: 600px;\n  width: 25%;\n  z-index: 4;\n  background: white;\n  position: absolute;\n  right: 0;\n  top: 220px;\n  border: 1px solid #e5e5e5;\n  overflow: scroll;\n}\n.width100 {\n  width: 100%;\n}\n\n.width75 {\n  width: 75%;\n}\n.ChangeIssueName {\n  margin: 0 14px;\n  margin-top: 10px;\n  border-bottom: 1px solid #e5e5e5;\n  font-size: 17px;\n}\n.ChangeIssueName p:nth-child(3){\n  margin-top: -10px;\n}\n.changeList {\n  margin: 0 14px;\n}\n\n.changeItem {\n  margin: 0 14px;\n  border-bottom: 1px solid #e5e5e5;\n\n  padding: 8px 0px;\n}\n.changeItem {\n  font-size: 15px;\n}\n\n#change_close {\n  text-decoration: none;\n  color: #e5e5e5;\n}\n.changeItem p {\n  font-size: 13px;\n  margin-top: 5px;\n  color: grey;\n}\n.ddd {\n\n    border-radius: 10px;\n    margin-right: 10px;\n    padding: 2px 6px;\n    line-height: 14px;\n    margin-top: 4px;\n    color: white;\n    display: inline-block;\n}\n\n\n.addNewIssueInTheBoard {\n  border: 1px solid #e5e5e5;\n  box-shadow: 0px 1px 2px rgba(186,186,186,0.5);\n\n}\n.add_clickToCreate {\n  margin-top: 10px;\n\n}\n.addNewIssueInTheBoard header {\n  font-size: 20px;\n}\n.addNewIssueInTheBoard input {\n  width: 100%;\n  padding: 5px;\n}\n.addNewIssueInTheBoard > div {\n  margin: 8px;\n  position: relative;\n}\n\n.newBoard {\n  overflow: auto;\n}\n\n\n.margin10px {\n  margin: 10px;\n}\n.float-to-left {\n  position: absolute;\n  left: 0px;\n}\n.float-to-right2 {\n  position: absolute;\n  right: 0px;\n}\n.droparea:-moz-drag-over {\n  border : 1px dashed black;\n}\n\n\n.sortable-ghost {\n  opacity: .2;\n  background: #dedede;\n}\n\n.board-delete i {\n  vertical-align: baseline;\n  margin: 2px;\n}\n\n.board-delete {\n  border: 0px;\n  line-height: 17px;\n  margin-right: 7px;\n  padding: 2px;\n  background-color: transparent;\n}\n", ""]);

	// exports


	/***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	//entry.js

	__webpack_require__(2);
	__webpack_require__(6);
	//require("./js/data.js");
	//require("./js/showlist.js");
	__webpack_require__(7);

	/***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(0);
	if (typeof content === 'string') content = [[module.i, content, '']];
	// Prepare cssTransformation
	var transform;

	var options = {};
	options.transform = transform;
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, options);
	if (content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if (true) {
		// When the styles change, update the <style> tags
		if (!content.locals) {
			module.hot.accept(0, function () {
				var newContent = __webpack_require__(0);
				if (typeof newContent === 'string') newContent = [[module.i, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function () {
			update();
		});
	}

	/***/
},
/* 3 */
/***/function (module, exports) {

	/*
 	MIT License http://www.opensource.org/licenses/mit-license.php
 	Author Tobias Koppers @sokra
 */
	// css base code, injected by the css-loader
	module.exports = function (useSourceMap) {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if (item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
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
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
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

	/***/
},
/* 4 */
/***/function (module, exports, __webpack_require__) {

	/*
 	MIT License http://www.opensource.org/licenses/mit-license.php
 	Author Tobias Koppers @sokra
 */

	var stylesInDom = {};

	var memoize = function memoize(fn) {
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

	var getElement = function (fn) {
		var memo = {};

		return function (selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}

			return memo[selector];
		};
	}(function (target) {
		return document.querySelector(target);
	});

	var singleton = null;
	var singletonCounter = 0;
	var stylesInsertedAtTop = [];

	var fixUrls = __webpack_require__(5);

	module.exports = function (list, options) {
		if (typeof DEBUG !== "undefined" && DEBUG) {
			if ((typeof document === "undefined" ? "undefined" : _typeof(document)) !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};

		options.attrs = _typeof(options.attrs) === "object" ? options.attrs : {};

		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (!options.singleton) options.singleton = isOldIE();

		// By default, add <style> tags to the <head> element
		if (!options.insertInto) options.insertInto = "head";

		// By default, add <style> tags to the bottom of the target
		if (!options.insertAt) options.insertAt = "bottom";

		var styles = listToStyles(list, options);

		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];

			for (var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];

				domStyle.refs--;
				mayRemove.push(domStyle);
			}

			if (newList) {
				var newStyles = listToStyles(newList, options);
				addStylesToDom(newStyles, options);
			}

			for (var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];

				if (domStyle.refs === 0) {
					for (var j = 0; j < domStyle.parts.length; j++) {
						domStyle.parts[j]();
					}delete stylesInDom[domStyle.id];
				}
			}
		};
	};

	function addStylesToDom(styles, options) {
		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			if (domStyle) {
				domStyle.refs++;

				for (var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}

				for (; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];

				for (var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}

				stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
			}
		}
	}

	function listToStyles(list, options) {
		var styles = [];
		var newStyles = {};

		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = options.base ? item[0] + options.base : item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = { css: css, media: media, sourceMap: sourceMap };

			if (!newStyles[id]) styles.push(newStyles[id] = { id: id, parts: [part] });else newStyles[id].parts.push(part);
		}

		return styles;
	}

	function insertStyleElement(options, style) {
		var target = getElement(options.insertInto);

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

	function removeStyleElement(style) {
		if (style.parentNode === null) return false;
		style.parentNode.removeChild(style);

		var idx = stylesInsertedAtTop.indexOf(style);
		if (idx >= 0) {
			stylesInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var style = document.createElement("style");

		options.attrs.type = "text/css";

		addAttrs(style, options.attrs);
		insertStyleElement(options, style);

		return style;
	}

	function createLinkElement(options) {
		var link = document.createElement("link");

		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";

		addAttrs(link, options.attrs);
		insertStyleElement(options, link);

		return link;
	}

	function addAttrs(el, attrs) {
		Object.keys(attrs).forEach(function (key) {
			el.setAttribute(key, attrs[key]);
		});
	}

	function addStyle(obj, options) {
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
				return function () {
					// noop
				};
			}
		}

		if (options.singleton) {
			var styleIndex = singletonCounter++;

			style = singleton || (singleton = createStyleElement(options));

			update = applyToSingletonTag.bind(null, style, styleIndex, false);
			remove = applyToSingletonTag.bind(null, style, styleIndex, true);
		} else if (obj.sourceMap && typeof URL === "function" && typeof URL.createObjectURL === "function" && typeof URL.revokeObjectURL === "function" && typeof Blob === "function" && typeof btoa === "function") {
			style = createLinkElement(options);
			update = updateLink.bind(null, style, options);
			remove = function remove() {
				removeStyleElement(style);

				if (style.href) URL.revokeObjectURL(style.href);
			};
		} else {
			style = createStyleElement(options);
			update = applyToTag.bind(null, style);
			remove = function remove() {
				removeStyleElement(style);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if (newObj) {
				if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
					return;
				}

				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;

			return textStore.filter(Boolean).join('\n');
		};
	}();

	function applyToSingletonTag(style, index, remove, obj) {
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

	function applyToTag(style, obj) {
		var css = obj.css;
		var media = obj.media;

		if (media) {
			style.setAttribute("media", media);
		}

		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			while (style.firstChild) {
				style.removeChild(style.firstChild);
			}

			style.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(link, options, obj) {
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

		if (oldSrc) URL.revokeObjectURL(oldSrc);
	}

	/***/
},
/* 5 */
/***/function (module, exports) {

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
		var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
				return $1;
			}).replace(/^'(.*)'$/, function (o, $1) {
				return $1;
			});

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

	/***/
},
/* 6 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	function addLoadEvent(func) {
		var oldonload = window.onload;
		if (typeof window.onload != "function") {
			window.onload = func;
		} else {
			window.onload = function () {
				oldonload();
				func();
			};
		}
	}

	/***/
},
/* 7 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var issue_info = __webpack_require__(8).issue_info;

	/******获取allIssue，openIssue，closeIssue数组中的issue编号****/
	function allIssue() {
		var alls = issue_info.length - 1;
		var s = [];
		for (var i = 1; i <= alls; i++) {
			s.push(i);
		}
		return s;
	}
	module.exports = allIssue;

	/***/
},
/* 8 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	/*定义数量*/ //使用一个数组包裹的对象的时候，就不再需要初始化all了
	/*var all = 3;
 var open = 3;
 var close = 0;
 */
	/*
 var issue_info = new Array();
 for (var i = 1; i <= all ; i++) {
   issue_info[i] = new Object();
 }
 */
	/***这些全部都是数据*******/
	//mentor用了很魔法的方法w
	//因为后面设计函数时候的问题，所以数组第一个设置成空的对象了。

	module.exports = {
		issue_info: [{}, {
			tag: ["bug", "array_err", "object_err", "js_err", "ddd"],
			tagColor: ["#aedede", "red", "yellow", "pink", "lightyellow"],
			no: 1,
			name: "pushpushtest",
			date: "2017-07-03T08:47:28.713Z",
			state: 1
		}, {
			tag: ["js_err", "bug"],
			tagColor: ["pink", "#aedede"],
			no: 2,
			name: "second test",
			date: "2017-07-03T08:47:28.713Z",
			state: 1
		}, {
			tag: ["display_err", "bug", "wtf"],
			tagColor: ["#fddeae", "#aedede", "#aeeaea"],
			no: 3,
			name: "third push test",
			date: "2017-07-03T08:47:28.713Z",
			state: 0
		}, {
			tag: ["hello-world", "wtf"],
			tagColor: ["#fddddd", "#aeeaea"],
			no: 4,
			name: "what do you want",
			date: "2017-07-03T08:47:28.713Z",
			state: 1
		}, {
			tag: [],
			tagColor: [],
			no: 5,
			name: "I have no label",
			date: "2017-07-03T08:47:28.713Z",
			state: 0
		}, {
			tag: [],
			tagColor: [],
			no: 6,
			name: "I have no label too",
			date: "2017-07-03T08:47:28.713Z",
			state: 1
		}],
		allLabels: [{
			name: "bug",
			IssueHave: [1, 2, 3],
			color: "#aedede"
		}, {
			name: "js_err",
			IssueHave: [1, 2],
			color: "pink"
		}, {
			name: "object_err",
			IssueHave: [1],
			color: "yellow"
		}, {
			name: "array_err",
			IssueHave: [1],
			color: "red"
		}, {
			name: "display_err",
			IssueHave: [3],
			color: "#fddeae"
		}, {
			name: "ddd",
			IssueHave: [1],
			color: "lightyellow"
		}, {
			name: "hello-world",
			IssueHave: [4],
			color: "#fddddd"
		}, {
			name: "wtf",
			IssueHave: [3, 4],
			color: "#aeeaea"
		}]
	};

	/*
 export let issue_info = [
   {
 
   },
   {
     tag: [
       "bug",
       "array_err",
       "object_err",
       "js_err",
       "ddd"
     ],
     tagColor: [
       "#aedede",
       "red",
       "yellow",
       "pink",
       "lightyellow"
     ],
     no: 1,
     name: "pushpushtest",
     date: "2017-07-03T08:47:28.713Z",
     state: 1
   },
   {
     tag: [
       "js_err",
       "bug"
     ],
     tagColor: [
       "pink",
       "#aedede"
     ],
     no: 2,
     name: "second test",
     date: "2017-07-03T08:47:28.713Z",
     state: 1
   },
   {
     tag: [
       "display_err",
       "bug",
       "wtf"
     ],
     tagColor: [
       "#fddeae",
       "#aedede",
       "#aeeaea"
     ],
     no: 3,
     name: "third push test",
     date: "2017-07-03T08:47:28.713Z",
     state: 0
   },
   {
     tag: [
       "hello-world",
       "wtf"
     ],
     tagColor: [
       "#fddddd",
       "#aeeaea"
     ],
     no: 4,
     name: "what do you want",
     date: "2017-07-03T08:47:28.713Z",
     state: 1
   },
   {
     tag: [
     ],
     tagColor: [
     ],
     no: 5,
     name: "I have no label",
     date: "2017-07-03T08:47:28.713Z",
     state: 0
   },
   {
     tag: [
     ],
     tagColor: [
     ],
     no: 6,
     name: "I have no label too",
     date: "2017-07-03T08:47:28.713Z",
     state: 1
   }
 ];
 */

	/*获取所有的label以及所有的labelcolor*/
	/*
 export let allLabels = [
   {
     name: "bug",
     IssueHave: [1,2,3],
     color: "#aedede"
   },
   {
     name: "js_err",
     IssueHave: [1,2],
     color: "pink"
   },
   {
     name: "object_err",
     IssueHave: [1],
     color: "yellow"
   },
   {
     name: "array_err",
     IssueHave: [1],
     color: "red"
   },
   {
     name: "display_err",
     IssueHave: [3],
     color: "#fddeae"
   },
   {
     name: "ddd",
     IssueHave: [1],
     color: "lightyellow"
   },
   {
     name: "hello-world",
     IssueHave: [4],
     color: "#fddddd"
   },
   {
     name: "wtf",
     IssueHave: [3,4],
     color: "#aeeaea"
   }
 ];
 */

	/***/
}]
/******/);

/***/ })
/******/ ]);