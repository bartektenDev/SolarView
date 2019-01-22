function loadDash() {
 document.getElementById("menuTitle").innerHTML = "Dashboard";
 var z, i, elmnt, file, xhttp;
 /*loop through a collection of all HTML elements:*/
 z = document.getElementsByTagName("*");
 for (i = 0; i < z.length; i++) {
   elmnt = z[i];
   /*search for elements with a certain atrribute:*/
   file = elmnt.getAttribute("view-content-display-dash");
   if (file) {
     /*make an HTTP request using the attribute value as the file name:*/
     xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4) {
         if (this.status == 200) {elmnt.innerHTML = this.responseText;}
         if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
         /*remove the attribute, and call this function once more:*/
         elmnt.removeAttribute("view-content-display-dash");
         includeHTML();
       }
     }
     xhttp.open("GET", file, true);
     xhttp.send();
     /*exit the function:*/
     return;
   }
 }
}
function loadPref() {
  document.getElementById("menuTitle").innerHTML = "Preferences";
  readTextFile()
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("view-content-display-pref");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("view-content-display-pref");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

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
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
