var fs=require('fs');
var prompt = require('prompt');
var math=require('math');
var range=require('range');
var shuffle=require('shuffle-array');
let http = require('http');
prompt.start();

prompt.get(['path','teamSize'], function (err, result) {
    fs.readFile(result.path,function(err,contents){
    var jsonContent = JSON.parse(contents);
    var noOfStudents=0;
    for(var exKey in jsonContent) {
        noOfStudents+=1;
    }
    if(result.teamSize>0 && result.teamSize<noOfStudents){
    var teamsize=result.teamSize;
    }
    else{
        console.log('Team size must be greater than 0 and less than number of students');
        process.exit();}
    var teamsize=parseInt(result.teamSize,10);
    if (err) { return onErr(err); }
    if(noOfStudents%result.teamSize === 0){
        noOfTeams=noOfStudents/result.teamSize;
        console.log("noOfTeams: "+noOfTeams+"with size"+teamsize);
        f();
    }
    else{
        console.log(teamsize);
        noOfTeams=math.floor(noOfStudents/result.teamSize) +1;
        console.log(noOfTeams-1+" teams with size "+result.teamSize+" and 1 team with size "+(noOfStudents%result.teamSize));
        console.log("Do you want to continue?yes/no");
        prompt.get('input', function (err, result) {
        if (err) { return onErr(err);}
        if(result.input==="yes"){
            console.log('creating teams');
          f();
        }
        
        else if(result.input==="no"){
               console.log("bye");
        }
});
}
function f(){
        var writeStream = fs.createWriteStream("teams.txt");
        var t=teamsize,i=0,exkey=range.range(0,noOfStudents);
        key=shuffle(exkey);
        for(var p=1;p<=noOfTeams;p++){
                //console.log("team "+p+"{");
                writeStream.write("team"+p+"{"+"\n");
                while( i<t){
                    //console.log("student"+key[i]+" {");
                    writeStream.write("student"+key[i]+"{"+"\n");
                        for(var exValue in jsonContent[key[i]]) {
                                //console.log(exValue+":"+jsonContent[key[i]][exValue]);
                                writeStream.write(exValue+":"+jsonContent[key[i]][exValue]+"\n");
  }
                    //console.log("}");
                    writeStream.write("}"+"\n");
                    i++;
                        if(i==noOfStudents){
                                break;
}
}
                //console.log("**********************" )
                writeStream.write("*************************** \n");
                t=t+teamsize;
                
}
                console.log('teams created');
                writeStream.end();
                let server=http.createServer(function(req,res){
                    console.log('request was made:'+req.url);
                    if(req.url==='/'){
                    res.writeHead(200,{'Content-Type':'text/plain'});
                    let myReadStream=fs.createReadStream(__dirname+'/teams.txt','utf-8');
                    myReadStream.pipe(res);
                    //res.write('We have had '+visits+' nd visit at'+ new Date()+'\n');
                    var writeStream = fs.createWriteStream("log.txt",{'flags':'a'});
                    writeStream.write('We had visit at '+ new Date()+'\n');
                    writeStream.end();
                    }
                    });
                    server.listen(3000,'127.0.0.1');
}

    });
    });
