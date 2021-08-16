var http = require('http');
var fs = require("fs");
var qs = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";
var isLoginSucceessful=false;





http.createServer(function(request, response) {

	if(request.url === "/mes"){
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	}
	else if(request.url === "/"){
        if (request.method === "POST") {
            console.log("sending");
            formData = '';
            msg = '';
            return request.on('data', function (data) {
                formData += data;
                console.log(formData);
                info = formData.split("&");
                console.log(info[0]);
                console.log(info[1]);


                return request.on('end', function () {
                    var user;
                    user = qs.parse(formData);
                    //user.id = "xxx";
                    msg = JSON.stringify(user);
                   

                    for (i = 0; i < 1; i++) {
                        var c = info[i].split("=");
                    }

                    console.log(c[0]);
                    console.log(c[1]);

                    for (i = 1; i < info.length; i++) {

                        var d = info[i].split("=");

                    }

                    console.log(d[0]);
                    console.log(d[1]);

                    stringMsg = JSON.parse(msg);

                


                    MongoClient.connect(dbUrl, function (err, db)  {
						
						
                        if (err) throw err;

                        var dbo = db.db("mydb");
                        var myobj = stringMsg;
                        var query = { login: c[1], password: d[1], id: c[1]};
                        var items = query
						console.log(query)

                        dbo.collection("customers").find(query).toArray(function (err, items) {

                            var array = [];
                            for (var i = 0; i < items.length; i++) {
                                array.push(items[i].login);
                            }

                            if (err) throw err;
                            console.log(items.length);

                            if (items.length > 0) {
                                isLoginSuccessful = true;
                                console.log("Login OK");
                                response.end("Yeah!YouGetIt!");

                            } else {
                                isLoginSuccessful = false;
                                console.log("Fail To login");
                                response.end("You Failed Successful!");
                                db.close();


                            }

                        });
                    });
                });
            });



        } else {

            sendFileContent(response, "index.html", "text/html");
        }
	}
		else if(request.url === "/favlist"){
		if (request.method === "POST") {
				console.log("sending");
				formData = '';
				msg = '';
			return request.on('data', function (data) {
				formData += data;
				console.log(formData);
				info=formData.split("&");
				console.log(info[0]);
				console.log(info[1]);
			  
			  
				return request.on('end', function () {
					var user;
					user = qs.parse(formData);
					msg = JSON.stringify(user);
				
				  
					for(i=0; i<1; i++){
						var c=info[i].split("=");
					}
				
					console.log(c[0]);
					console.log(c[1]);
				
					for(i=1; i<info.length; i++){
						
						var f=info[i].split("=");
						
					}
				
					console.log(f[0]);
					console.log(f[1]);
					
					stringMsg = JSON.parse(msg);
					
					
		
					var logid = c[1];
					var content = f[1];
					var items = { login: logid, cart: content, id: logid};
							
						MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						
						var dbo = db.db("mydb");
						
						
						
							dbo.collection("favlist").insertOne(items, function(err, res) {
						
								if (err) throw err;
								console.log("1 document inserted");
								db.close();
								response.end("success");
								
			
							
							
							});
						});
					});
				});
			
			
			
		}else {

			sendFileContent(response, "favlist.html", "text/html");
		}
		
					

		
}
else if(request.url === "/favlistaddmore"){
	if (request.method === "POST") {
			console.log("sending");
			formData = '';
			msg = '';
		return request.on('data', function (data) {
			formData += data;
			console.log(formData);
			info=formData.split("&");
			console.log(info[0]);
			console.log(info[1]);
		  
		  
			return request.on('end', function () {
				var user;
				user = qs.parse(formData);
				msg = JSON.stringify(user);
			
			  
				for(i=0; i<1; i++){
					var c=info[i].split("=");
				}
			
				console.log(c[0]);
				console.log(c[1]);
			
				for(i=1; i<info.length; i++){
					
					var f=info[i].split("=");
					
				}
			
				console.log(f[0]);
				console.log(f[1]);
				
				stringMsg = JSON.parse(msg);
				
				
	
				var logid = c[1];
				var content = f[1];

				var items = { login: logid, cart: content, id: logid};
					
				
				MongoClient.connect(dbUrl, function(err, db) {
				  if (err) throw err;
				  var dbo = db.db("mydb");
				  var obj = [
					{ login: logid, cart: 'Item1'},
					{ login: logid, cart: 'Item2'},
					{ login: logid, cart: 'Item3'},
					{ login: logid, cart: 'Item4'},
				  ];
				  console.log(obj);
				  dbo.collection("favlist").insertMany(obj, function(err, res) {
					if (err) throw err;
					console.log("Number of documents inserted: " + res.insertedCount);
					console.log("All item were added");
					db.close();
					
		
					response.end("success");
				  });
				});
				});
			});
		
		
		
	}else {

		sendFileContent(response, "favlist.html", "text/html");
	}
	
				

	
}
		else if(request.url === "/checkoutlist"){
		if (request.method === "POST") {
				console.log("send");
				formData = '';
				msg = '';
					return request.on('data', function (data) {
					formData += data;
					console.log(formData);
						return request.on('end', function () {
						console.log("request data");	
								MongoClient.connect(dbUrl, function(err, db) {
									if (err) throw err;
									var dbo = db.db("mydb");
									dbo.collection("favlist").find({ login: formData }).toArray(function(err, result) {
									if (err) throw err;

										db.close();
										response.end(JSON.stringify(result));
									});
								});
						});		
					});

			
			
			
		}else {

			sendFileContent(response, "checkoutlist.html", "text/html");
		}
		
					

		
}
else if(request.url === "/deleteitem"){
	if (request.method === "POST") {
			console.log("Deleting");
				formData = '';
				msg = '';
				return request.on('data', function (formData) {
				console.log("lll="+formData);
					stringMsg = formData;
		
					return request.on('end', function () {
						console.log("The Item was Deleted");	
											MongoClient.connect(dbUrl, function(err, db) {
												if (err) throw err;
												var dbo = db.db("mydb");
												var myquery = { login : stringMsg.toString()};
												dbo.collection("favlist").deleteMany(myquery, function(err, obj) {
												if (err) throw err;
												console.log(obj.result.n + " document(s) deleted");
												db.close();
												response.end("success")
												});
											});
					});		
				});

			
			
			
	}else {

		sendFileContent(response, "checkoutlist.html", "text/html");
	}
		
					

		
}
else if(request.url === "/deleteac"){
	if (request.method === "POST") {
			console.log("Deleting");
				formData = '';
				msg = '';
				return request.on('data', function (formData) {
				console.log("lll="+formData);
					stringMsg = formData;
					return request.on('end', function () {
						console.log("Account was deleted");	
						MongoClient.connect(dbUrl, function(err, db) {
						  if (err) throw err;
						  var dbo = db.db("mydb");
						  var myquery = { login : stringMsg.toString()};
						  console.log(myquery);
						  dbo.collection("customers").deleteOne(myquery, function(err, obj) {
							if (err) throw err;
							console.log("1 document deleted");
							db.close();
							response.end("success")
						  });
						});
					});		
				});

			
			
			
	}else {

		sendFileContent(response, "checkoutlist.html", "text/html");
	}
		
					

		
}
else if(request.url === "/userpage"){
	if (request.method === "POST") {
		console.log("send");
		formData = '';
		msg = '';
			return request.on('data', function (data) {
			formData += data;
			console.log(formData);
			console.log({ login: formData })
	
				return request.on('end', function () {
				console.log("request data");	
						MongoClient.connect(dbUrl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("mydb");
							dbo.collection("customers").find({ login: formData }).toArray(function(err, result) {
							if (err) throw err;
			
								db.close();
								response.end(JSON.stringify(result));
							});
						});
				});		
			});

		
		
		
	}else {

		sendFileContent(response, "userpage.html", "text/html");
	}
	
}
	
 else if(request.url==="/test"){
		if (request.method === "POST") {
			console.log("sending");
			formData = '';
			msg = '';
			return request.on('data', function (data) {
			formData += data;
			console.log(formData);
			info=formData.split("&");
			console.log(info[0]);
			console.log(info[1]);
			  
			  
				return request.on('end', function () {
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						
						
						
				  
				   for(i=0; i<1; i++){
					
						var c=info[i].split("=");

					}
					console.log(c[0]);
					console.log(c[1]);
				
					for(i=1; i<info.length; i++){
						var d=info[i].split("=");
					}
				
					console.log(d[0]);
					console.log(d[1]);
				
					stringMsg = JSON.parse(msg);
				
					
				
					
					MongoClient.connect(dbUrl, function(err, db) {
							if (err) throw err;
							
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							var query = { login: c[1] , password: d[1], id: c[1]};
							var items = query
							console.log(query);
							
						dbo.collection("customers").insertOne(query, function(err, res) {
							  if (err) throw err;

								db.close();
								

						});
				
						
						response.end("Regiester Success");
					});
				});	
			});
		
		} else {
			sendFileContent(response, "index.html", "text/html");
		}
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/jpg");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.png$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/png");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.min.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.*$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(8000)

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}