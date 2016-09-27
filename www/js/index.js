/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		try {
			window.FirebasePlugin.grantPermission();
		} catch (e) {}
		window.FirebasePlugin.getInstanceId(function(token) {
			// save this server-side and use it to push notifications to this device
			console.log(token);
			}, function(error) {
				console.error(error);
		});
		
		window.FirebasePlugin.onNotificationOpen(function(notification) {
			console.log(notification);
		}, function(error) {
			console.error(error);
		});
		
		window.plugins.intent.setNewIntentHandler(function (intent) {
				console.log("intent");// Do things 
		});
		
		try {
		window.handleOpenURL = function (url) {
			console.log("IOS intent",url);
			window.resolveLocalFileSystemURI (
				url, 
				function (fileEntry) {
					fileEntry.file (
						function (file) {
							console.log ('Successfully received file: ' + file.name);
						},
						function (error) {
							console.log (error);
						}
					)
				}, 
				function (error) {
					console.log(error);
				}
			)
		};
		} catch (e) {}

    }
};

app.initialize();
