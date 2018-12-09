EtherDuck.IPFSManager = OBJECT({
	
	init : (inner, self) => {
		
		const ipfs = new Ipfs({
			repo : 'ipfs-' + Math.random()
		});
		
		let isReady = false;
		let waitingFuncs = [];
		
		ipfs.once('ready', () => {
			isReady = true;
			
			EACH(waitingFuncs, (waitingFunc) => {
				waitingFunc();
			});
		});
		
		let upload = self.upload = (file, callbackOrHandlers) => {
			//REQUIRED: file
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success
			
			let errorHandler;
			let callback;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}
			
			let f = () => {
				
				let fileReader = new FileReader();
				
				fileReader.onloadend = () => {
					
					ipfs.files.add(new ipfs.types.Buffer(fileReader.result), (error, fileInfos) => {
						
						if (error !== TO_DELETE) {

							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, file);
							} else {
								SHOW_ERROR('IPFSManager/upload', errorMsg, file);
							}
						}
						
						else {
							
							EACH(fileInfos, (fileInfo) => {
								
								if (callback !== undefined) {
									callback(fileInfo.hash);
								}
								
								return false;
							});
						}
					});
				};
				
				fileReader.readAsArrayBuffer(file);
			};
			
			if (isReady === true) {
				f();
			} else {
				waitingFuncs.push(f);
			}
		};
		
		let download = self.download = (hash, callbackOrHandlers) => {
			//REQUIRED: hash
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//REQUIRED: callbackOrHandlers.success
			
			let errorHandler;
			let callback;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}
			
			let f = () => {
				
				ipfs.files.cat(hash, (error, data) => {
					
					if (error !== TO_DELETE) {

						let errorMsg = error.toString();

						if (errorHandler !== undefined) {
							errorHandler(errorMsg, hash);
						} else {
							SHOW_ERROR('IPFSManager/download', errorMsg, hash);
						}
					}
					
					else {
						callback(data);
					}
				});
			};
			
			if (isReady === true) {
				f();
			} else {
				waitingFuncs.push(f);
			}
		};
	}
});