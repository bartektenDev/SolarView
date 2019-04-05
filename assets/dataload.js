//Copyright and all rights all reserved to Bart Tarasewicz

function setup()
{
  readConfigFile();
  step_display();
  dataPing();
}

function step_display()
{
  var z, i, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("display");
		if (file) {
			/*make an HTTP request using the attribute value as the file name:*/
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elmnt.innerHTML = this.responseText;
            elmnt.setAttribute("display", "preferences.html");
            document.getElementById("dash").disabled = true;
					}
					if (this.status == 404) {
						elmnt.innerHTML = "Page not found.";
					}
				}
			};
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}

function readConfigFile()
{
  var file = "./assets/configip.p";
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
                if (document.getElementById("sharedDisplayIP"))
                {
                  document.getElementById("sharedDisplayIP").innerHTML = ipvar;
                }
                if (document.getElementById("readIP"))
                {
                  document.getElementById("readIP").innerHTML = ipvar;
                }
              }
          }
      }
  };
  rawFile.send(null);
}

function navigate(btnID)
{
  //clean content view for the new data
  var myNode = document.getElementById("contents");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  //identify what button was clicked to do what
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("display");
    if (file) {
      /*make an HT*TP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
            if(btnID == "dash"){
              elmnt.setAttribute("display", "preferences.html");
              document.getElementById("menuTitle").innerHTML = "Dashboard";
              document.getElementById("dash").disabled = true;
              document.getElementById("preferences").disabled = false;
              readConfigFile();
            }else if(btnID == "preferences"){
              elmnt.setAttribute("display", "dash.html");
              document.getElementById("menuTitle").innerHTML = "Preferences";
              document.getElementById("dash").disabled = false;
              document.getElementById("preferences").disabled = true;
              readConfigFile();
            }
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}

function grabData()
{
  var file = "./assets/configip.p";
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

function grabData2()
{
  var file = "./assets/configzip.p";
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
              var firstvariable = "<zip>";
              var secondvariable = "</zip>";
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
    alert(allText);
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

function apply_settings()
{
  const fs = require('fs');

  let writeStream = fs.createWriteStream('./assets/configip.p');

  var ipAdd = document.getElementById("ip_address").value;
  if(ipAdd != ""){
    writeStream.write('<ip>' + ipAdd + '</ip>', 'UTF-8');

    writeStream.on('finish', () => {
      console.log('Applied new settings successfully!');
      alert("Successfully applied new settings!");
      readConfigFile();
      dataPing();
    });
    writeStream.end();
  }else{
    alert("Please enter a valid IP address!");
  }
}

function apply_settings2()
{
  const fs = require('fs');

  let writeStream = fs.createWriteStream('./assets/configzip.p');

  var zipAdd = document.getElementById("zipcodebox").value;
  if(zipAdd != ""){
    writeStream.write('<zip>' + zipAdd + '</zip>', 'UTF-8');

    writeStream.on('finish', () => {
      console.log('Applied new settings successfully!');
      alert("Successfully applied new settings!");
      readConfigFile();
    });
    writeStream.end();
  }else{

  }
}

function dataPing() {
    //start checking data connection to server
    var started = new Date().getTime();
    var host = document.getElementById("sharedDisplayIP").innerHTML;
    //var port = 8080;
    var http = new XMLHttpRequest();

    document.getElementById("connectionStatusIcon").src = "assets/cloud.gif";

    http.open("GET", "http://" + host, /*async*/true);
    http.onreadystatechange = function() {
      if (http.readyState == 4) {
        var ended = new Date().getTime();
        var milliseconds = ended - started;
        document.getElementById("connectionStatusIcon").src = "assets/connectedicon.png";
      }else{
        document.getElementById("connectionStatusIcon").src = "assets/connectionfailed2.png";
      }
    };
    try {
      http.send(null);
    } catch(exception) {
      // this is expected
      alert('failed');
    }
}
