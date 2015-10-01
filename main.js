// HTTP request to a web server
var http = require('http');

//Inhalte Laden, wie html seiten
fs = require('fs');
var file = "./client.html"; // file = (string) filepath of the file to read
var port = 8080;

//Erstellen des Servers inhalt wird beim Aktuallisieren iterativ aufgerufen
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    //Entsprechendes File lesen
	fs.readFile(file, 'utf8', function (err,data) {
  		if (err) {
    		return console.log(err);
  		}
        //Ausgabe der Datei
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(data);  
        res.end();
        //Ausgabe in Konsole ausgeben
        console.log("HTML Ausgabe");
	});
});
server.listen(port);//Angabe des Ports
//Ausgabe beim ersten laden des Servers
console.log('Der Server ist erreichbar unter http://192.168.0.16:' + port + '/');

//Lauscher nach Änderungen
var io = require('socket.io').listen(server);
 
io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        io.sockets.emit("message_to_client",{ message: data["message"] });
    });
});