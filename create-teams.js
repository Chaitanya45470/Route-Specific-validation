var fs=require('fs');
var prompt = require('prompt');
var math=require('math');
var range=require('range');
var shuffle=require('shuffle-array');

prompt.start();

  prompt.get(['path','teamSize'], function (err, result) {
    var contents = fs.readFileSync(result.path);
    var jsonContent = JSON.parse(contents);
    var noOfStudents=0;
    for(var exKey in jsonContent) {
        noOfStudents+=1;
    }
    var teamsize=result.teamSize;
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
    console.log("Do you want to continue?");
    prompt.get('input', function (err, result) {
      if (err) { return onErr(err);}
      if(result.input==="yes"){
          console.log("ok");
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
console.log("team "+p+"{");
  writeStream.write("team"+p+"{"+"\n");
while( i<t){
  console.log("student"+key[i]+" {");
  writeStream.write("student"+key[i]+"{"+"\n");
  for(var exValue in jsonContent[key[i]]) {
      console.log(exValue+":"+jsonContent[key[i]][exValue]);
        writeStream.write(exValue+":"+jsonContent[key[i]][exValue]+"\n");
  }
  console.log("}");
  writeStream.write("}"+"\n");
i++;
if(i==noOfStudents){
    break;
}
}
console.log("**********************" )
writeStream.write("*************************** \n");
t=t+teamsize;
}
writeStream.end();
}
});
