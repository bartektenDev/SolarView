//Copyright and all rights all reserved to Bart Tarasewicz

function setup()
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
      /*make an HTTP request using the attribute value as the file name:*/
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
              readTextFile();
            }else if(btnID == "preferences"){
              elmnt.setAttribute("display", "dash.html");
              document.getElementById("menuTitle").innerHTML = "Preferences";
              document.getElementById("dash").disabled = false;
              document.getElementById("preferences").disabled = true;
              readTextFile();
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

function readTextFile()
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
                  document.getElementById("readIP").innerHTML = testRE[1];
                }
            }
        }
    };
    rawFile.send(null);
}

function apply_settings()
{
  const fs = require('fs');

  let writeStream = fs.createWriteStream('./assets/config.p');

  var ipAdd = document.getElementById("ip_address").value;
  if(ipAdd != ""){
    writeStream.write('<ip>' + ipAdd + '</ip>', 'UTF-8');

    writeStream.on('finish', () => {
      console.log('Applied new settings successfully!');
      alert("Successfully applied new settings!");
      readTextFile();
    });
    writeStream.end();
  }else{
    alert("Please enter a valud IP address!");
  }
}
