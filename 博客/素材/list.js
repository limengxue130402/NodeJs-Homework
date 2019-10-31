const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

http.createServer(function(req, res) {
    var urlObj = url.parse(req.url);
    var pathName = urlObj.pathname;
    var pathArr = pathName.split("/"); 
    switch(pathArr[1]){
        case '':
        case 'list':
            var filePath = path.join(__dirname, "/chapterList.html");
            var fileContent = fs.readFileSync(filePath);
            res.writeHead(200, {"content-Type": "text/html"});
            res.write(fileContent);
            res.end();
        break;
        case 'login':
            var filePath = path.join(__dirname, "./login.html");
            var fileContent = fs.readFileSync(filePath);
            res.writeHead(200, {"content-Type": "text/html"});
            res.write(fileContent);
            res.end();
        break;
        case 'listmanager':
            var filePath = path.join(__dirname, "/list.html");
            var fileContent = fs.readFileSync(filePath);
            res.writeHead(200, {"content-Type": "text/html"});
            res.write(fileContent);
            res.end();
        break;
        case 'addChapter':
            var filePath = path.join(__dirname, "./addChapter.html");
            var fileContent = fs.readFileSync(filePath);
            res.writeHead(200, {"content-Type": "text/html"});
            res.write(fileContent);
            res.end();
        break;
        case 'detail':
            var filePath = path.join(__dirname, "./chapter.html");
            var fileContent = fs.readFileSync(filePath);
            res.writeHead(200, {"content-Type": "text/html"});
            res.write(fileContent);
            res.end();
        break;
        case 'css':
            var cssPath = path.join(__dirname,'css/'+pathArr[2]);
            var cssContent = fs.readFileSync(cssPath);
            res.writeHead(200, {"content-Type": "text/css"});
            res.end(cssContent);
        break;
        case 'images':
            
            if(pathArr[2] == 'img'){
                var imgName = pathArr[3].split(".")[0];
                var imgType = pathArr[3].split(".")[1];
                var imgPath = path.join(__dirname,'images/img/'+pathArr[3]);
                var imgContent = fs.readFileSync(imgPath);
            }else{
                var imgName = pathArr[2].split(".")[0];
                var imgType = pathArr[2].split(".")[1];
                var imgPath = path.join(__dirname,'images/'+pathArr[2]);
                var imgContent = fs.readFileSync(imgPath);
            }
            res.writeHead(200, {"content-Type": "image/"+imgType});
            res.end(imgContent);
        break;
        case 'js':
            var jsPath = path.join(__dirname,"js/"+pathArr[2]);
            var jsContent = fs.readFileSync(jsPath);
            res.writeHead(200, {"content-Type": "text/JavaScript"});
            res.end(jsContent);
        break;
        case 'getDetail':
            var jsonPath = path.join(__dirname,"data.json");
            var jsonContent = fs.readFileSync(jsonPath);
            var jsonStr = decoder.write(jsonContent);
            res.writeHead(200, {"content-Type": "text/plain"});
            res.end(jsonStr);
        break;
        case 'getUserName':
            var jsonPath = path.join(__dirname,'login.json');
            var jsonContent = fs.readFileSync(jsonPath);
            var jsonStr = decoder.write(jsonContent);
            res.writeHead(200, {"content-Type": "text/plain"});
            res.end(jsonStr);
        break;
        case 'addChapt':
            var addPath = urlObj.query;
            var titleContent = addPath.split("&");
            var title = titleContent[0].split("=")[1];
            var content = titleContent[1].split("=")[1];
            var obj = new Object();
            obj.title = decodeURI(decodeURI(title));;
            obj.content = decodeURI(decodeURI(content));;
            var filePath = path.join(__dirname,'addChapter.json');
            var addContent = fs.readFileSync(filePath);
            var addContent1 = JSON.parse(addContent);
            addContent1.push(obj);
            var addStr = JSON.stringify(addContent1);
            fs.writeFileSync(filePath,addStr,{"encoding":'utf8'});


        break;
        case 'getChapter':
            var jsonPath = path.join(__dirname,'addChapter.json');
            var jsonContent = fs.readFileSync(jsonPath);
            var jsonStr = decoder.write(jsonContent);
            res.writeHead(200, {"content-Type": "text/plain"});
            res.end(jsonStr);
        break;
    }
    
}).listen(8083);



console.log("server is listening 8083");