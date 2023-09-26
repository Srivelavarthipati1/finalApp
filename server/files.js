// var http = require('http');
var fs = require("fs");
const rqhandler = (req, res) => {
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
 fs.appendFileSync('message.txt',message);

});


}
// if(req.url === '/message'){// now down html code wont get executed and the input msg is saved in the file automatically.
res.setHeader('Content-Type', 'text/html');//here we are sending the response to the server call done. 
// using write method we can write the code easily.
res.write('<html>');
res.write('<head><title> MY FIRST WEB PAGE </title></head><body>')
res.write('<h1> HELLO IM NODE!!! </h1><p> </p></body>')
res.write('</html>')
// res.write("The date and time are currently: " + dt.date());
//res.write(req.url)
res.end();
};

module.exports = rqhandler;
