//This script gets the IP from the config on launch
//and then the contents inside the page grab the shared IP

function readConfigFile()
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
                document.getElementById("sharedDisplayIP").innerHTML = testRE[1];
                alert('yeet');
              }
          }
      }
  };
  rawFile.send(null);
}
