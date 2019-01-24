const Http = new XMLHttpRequest();
var ip = "";

function grabData()
{
  var file = "./assets/config.p";
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
      if(rawFile.readyState === 4)
      {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
              var allText = rawFile.responseText;
              //grab the ip value in the config.p file
              var firstvariable = "<ip>";
              var secondvariable = "</ip>";
              var regExString = new RegExp("(?:"+firstvariable+")(.*?)(?:"+secondvariable+")", "ig");
              var storeRawData = allText;
              var testRE = regExString.exec(storeRawData);

              if (testRE && testRE.length > 1)
              {
                var ipvar = testRE[1];
                ip = ipvar;
              }
              readData();
          }
      }
  };
  rawFile.send(null);
}

function readData()
{
  Http.open("GET", "http://" + ip + "/ajax.xml");
  Http.send();
  Http.onreadystatechange=(e)=>{
    //scan the data and then identify whether we see how many devices
    //are connected to the network and then display that to the User
    var allText = Http.responseText;
    //grab the ip value in the config.p file
    var firstvariable = "<devicesInNetwork>";
    var secondvariable = "</devicesInNetwork>";
    var regExString = new RegExp("(?:"+firstvariable+")(.*?)(?:"+secondvariable+")", "ig");
    var storeRawData = allText;
    var testRE = regExString.exec(storeRawData);

    if (testRE && testRE.length > 1)
    {
      var devicesConnected = testRE[1];
      document.getElementById("numOfDevices").innerHTML = devicesConnected;
    }
  }
}
