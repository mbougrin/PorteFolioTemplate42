const express = require("express");
const app = express();
var fs = require('fs');
//add static for use css
app.use(express.static(__dirname));
var path = require("path");

// add css sendfile
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
//add html sendfile
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/" + "dashboard.css");
});

app.get('/ip', function(req, res) {
	var ip = req.connection.remoteAddress;
	var builder = require('xmlbuilder');

	fs.readFile('ip.xml','utf8', function (err, data)
	{
		if (err)
		{
			var retxml = builder.create('allip').ele('ip')
							.ele('name').txt(ip)
							.up().ele('number').txt('0').end({ pretty: true});

			fs.writeFile('ip.xml', retxml, function (err) {
			  if (err) throw err;
			    console.log('New Client: ' + ip + " File Saved!");
			});
		}
		else
		{
			var retxml;
			var DOMParser = require('xmldom').DOMParser;
			var xml = new DOMParser().parseFromString(data, "text/xml");
			var check = false;
	
			var mainNode = xml.getElementsByTagName('allip');
			for (var i = 0 ; i < xml.getElementsByTagName('ip').length ; ++i)
			{
				var node = xml.getElementsByTagName('ip')[i];
				if (node.getElementsByTagName('name')[0].childNodes[0].nodeValue == ip)
				{
					var nb = node.getElementsByTagName('number')[0].childNodes[0].nodeValue;
					node.getElementsByTagName('number')[0].textContent  = parseInt(nb) + 1;
					check = true;
				}
			}
			if (check == true)
			{
				fs.writeFile('ip.xml', xml, function (err) {
			 		if (err) throw err;
			    		console.log('New Client: ' + ip + " File Saved!");
				});
			}
			else if (check == false)
			{
				console.log("new ip");	
				newNode = xml.createElement("ip");

				newNodeName = xml.createElement("name");
				newText = xml.createTextNode(ip);
				newNodeName.appendChild(newText);

				newNodeNumber = xml.createElement("number");
				newText = xml.createTextNode("0");
				newNodeNumber.appendChild(newText);


				newNode.appendChild(newNodeName);
				newNode.appendChild(newNodeNumber);

				xml.getElementsByTagName('allip')[0].appendChild(newNode);

				ret = xml.toString().split('\n');
				endline = ret[ret.length - 1];
				endlinetrim = endline.replace(/></g, ">|<")
				split = endlinetrim.split('|');
				newstr = "  " + split[0] + "\n\t" + split[1] + "\n\t" + split[2] 
										+ "\n  " + split[3] + "\n" + split[4];
				retxml = xml.toString().replace(endline, newstr);
				retxml = retxml.toString().replace(/    /g, '\t');
				fs.writeFile('ip.xml', retxml, function (err) {
			 		if (err) throw err;
			    		console.log('New Client: ' + ip + " File Saved!");
				});
			}
		}
	});
});


const port = 4242;

app.listen(port);

console.log("Running at Port " + port);
