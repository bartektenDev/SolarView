let btnID = "dash";

function setup()  {
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
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			/*exit the function:*/
			return;
		}
	}
}

function navigate(btnID) {
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
              elmnt.removeAttribute("display");
              var att = elmnt.createAttribute("display");
              att.value = "dash.html";
              elmnt.setAttributeNode(att);
            }else if(btnID == "preferences"){
              elmnt.removeAttribute("display");
              var att = elmnt.createAttribute("display");
              att.value = "preferences.html";
              elmnt.setAttributeNode(att);
            }
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
        }
      }
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
                  document.getElementById("ip_address").innerHTML = testRE[1];
                }
                alert(testRE[1]);
            }
        }
    }
    rawFile.send(null);
}
