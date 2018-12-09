EtherDuck.IPFSNodeManager = OBJECT({
	
	init : (inner, self) => {
		
		const node = new Ipfs({
			repo : 'ipfs-' + Math.random()
		});
		
		node.once('ready', () => {
			
			console.log(node);
			
			node.files.add(new node.types.Buffer('Hello world!'), (err, filesAdded) => {
				filesAdded.forEach((file) => {
					console.log('successfully stored', file.hash)
					
					node.files.cat(file.hash, function (err, data) {
						console.log(data.toString())
					});
				})
			});
		});
		
		let upload = self.upload = (file) => {
			//REQUIRED: file
			
			let fileReader = new FileReader();
			fileReader.onloadend = () => {
				node.files.add(new node.types.Buffer(fileReader.result), (err, filesAdded) => {
					filesAdded.forEach((file) => {
						
						console.log('https://ipfs.io/ipfs/' + file.hash);
						
						node.files.cat(file.hash, function (err, data) {
							console.log(data.toString())
						});
					})
				});
			};
			fileReader.readAsArrayBuffer(file);
		};
	}
});