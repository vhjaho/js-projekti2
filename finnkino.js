function loadJSON(city) {

  var kaupunki = city;
  console.log("Tiedot: " + kaupunki);

  var xhttp = new XMLHttpRequest();

  if (city == 'Helsinki') {
    var url = "https://www.finnkino.fi/xml/Schedule/?area=1002"
  } else if (city == 'Oulu') {
    var url = "https://www.finnkino.fi/xml/Schedule/?area=1018"
  } else if (city == 'Vantaa') {
    var url = "https://www.finnkino.fi/xml/Schedule/?area=1013"
  } else if (city == 'Tampere') {
    var url = "https://www.finnkino.fi/xml/Schedule/?area=1021"
  }
  //var url = "https://www.finnkino.fi/xml/Schedule/"

  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Haku onnistui");

      var xmlDoc = xhttp.responseXML;

      printJSON(xmlDoc);

    }
  }

}

function printJSON(xmlDoc) {

  var title = xmlDoc.getElementsByTagName('Title');

  var image = xmlDoc.getElementsByTagName('EventSmallImagePortrait');

  var showTime = xmlDoc.getElementsByTagName('dttmShowStart');

  var rating = xmlDoc.getElementsByTagName('Rating');

  var theatre = xmlDoc.getElementsByTagName('TheatreAndAuditorium');

  var txt = "<table>";

  for (var i = 0; i < title.length; i++) {
    txt += "<tr><td>" + 'Movie title: ' + "<strong>"+title[i].childNodes[0].nodeValue+"</strong>" + "</td>" + 
    "<td>" + '<img src="'+image[i].innerHTML+'">' + "</td>" +
    "<td>" + 'Theatre and auditorium: ' + "<strong>"+ theatre[i].innerHTML + "</strong>" + "</td>" +
    "<td>" + 'Screening: ' + "<strong>"+showTime[i].innerHTML+"</strong>" + 
    "<td>" + 'Rating: ' + "<strong>"+rating[i].innerHTML+"</strong>"+"</td>"+"</tr>";
    console.log(txt);
  }

  txt += "<table>";

  document.getElementById("tabledata").innerHTML = txt;

}
