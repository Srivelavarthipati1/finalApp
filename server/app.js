const http = require('http');
var dt = require('./date');
const fs= require('fs');
const url = require('url');
//http.createServer(function(req, res) {

// here the "createServer"is a built in method which is used to create a server

// the above is a function written while creating a server to give some constraints.
//if x happens do y.


// we can also use arrow functions.
const server=http.createServer((req, res)=> {
   // console.log(req.url,req.method,req.headers);
   // process.exit();
   if(req.url === '/'){
      res.write('<html>');
res.write('<head><title> MY FIRST WEB PAGE </title></head><body>');
res.write('<form action="/message" method="POST"><input type="text" name="message" placeholder="Type something..."><br>');
res.write('<button type="submit">SEND</button></form></body></html>');
return res.end();  //it returns the above funnctuin. after the resEnd noo other function need to be writte. but here we are redirecting the page. 
}
//Redirecting the message.
if(req.url === '/message' && req.method === 'POST'){
 const body = [];
 req.on('data',(chunk)=> {
   console.log(chunk);
   body.push(chunk);
 });
 return req.on('end',()=> {
//    const parsedBody = Buffer.concat(body).toString();
//    const message = parsedBody.split('=')[1];
//    fs.writeFileSync('message.txt',message);
//    res.statusCode = 302;
//    //code for redirecting
//   // res.setHeader('Location','/');
//    return res.end();
//  });

// here the appendFilesync or any function of fs can take other parameter. that is error.
const parsedBody = Buffer.concat(body).toString();
   const message = parsedBody.split('=')[1];
   fs.appendFileSync('message.txt',message,err=>{
      res.statusCode = 302;
      //code for redirecting
     res.setHeader('Location','/');
      return res.end();
   });
  
 });


}// now down html code wont get executed and the input msg is saved in the file automatically.
res.setHeader('Content-Type', 'text/html');//here we are sending the response to the server call done. 
// using write method we can write the code easily.
res.write('<html>');
res.write('<head><title> MY FIRST WEB PAGE </title></head><body>')
res.write('<h1> HELLO IM NODE!!! </h1><p> </p></body>')
res.write('</html>')
res.write("The date and time are currently: " + dt.date());
//res.write(req.url)
res.end();
});
server.listen(3000);