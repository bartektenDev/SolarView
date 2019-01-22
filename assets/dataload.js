function loadDash() {
 document.getElementById("menuTitle").innerHTML = "Dashboard";
}
function loadPref() {
 document.getElementById("menuTitle").innerHTML = "Preferences";
 readTextFile()
}

function readTextFile()
{
    var file = "file:///D:/GitProjects/solarpanelUIforEnecsys/assets/config.p";
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
