var http=require('http');
var route=require('./route.js');
var server=http.createServer(function(req,res){
	if(/favicon.ico/.test(req.url)) {
		res.end();return;
	}
	//可以跨域
	//什么是非简单请求?
	//method为PUT、DELETE、Content-Type为application/json的请求
	//服务器怎么应对?
	//服务器需要配置以下头
	//客户端如果是vue-resource需要以下配置(也可以不配置因为vue-resource本来这些就是默认值)
	//Vue.http.options.emulateJSON=false;
	//Vue.http.headers.post['Content-Type']='application/json';
	//客户端发之前还要JSON.stringifry(要发到服务器的json数据)
	res.writeHeader(200,{
		'Access-Control-Allow-Methods':'POST,GET,PUT,DELETE,OPTIONS',
		'Access-Control-Allow-Headers':'Content-Type',
		'Access-Control-Allow-Origin':'*'
	});
	if(req.method=='OPTIONS') res.end();
	else route(req,res);
});
server.listen(8080);
console.log('server is running at 8080 port...');