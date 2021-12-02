function loadJSON(city) {

  var kaupunki = city;
  console.log("Tiedot: " + kaupunki);

  //Luodaan xhttp-pyyntö
  var xhttp = new XMLHttpRequest();

  //Haetaan oikean kaupungin tiedot
  if (city == 'Helsinki') {
    var url = "https://www.finnkino.fi/xml/Schedule/?area=1002"
  } else if (city == 'Oulu') {
    var url = "https://www.finnkino.fi/xml/Schedule/?area=1018"
  } else if (city == 'Vantaa') {
    var url = "https://www.finnkino.fi/xml/Schedule/?area=1013"
  } else if (city == 'Tampere') {
    var url = "https://www.finnkino.fi/xml/Schedule/?area=1021"
  //} else if (city == 'Espoo') {
    //var url = "https://www.finnkino.fi/xml/Schedule/?area=1012"
  } else if (city == 'Turku') {
    var url = "https://www.finnkino.fi/xml/Schedule/?area=1022"
  } else {
    alert("Kaupunkia ei löytynyt.");
  }

  //var url = "https://www.finnkino.fi/xml/Schedule/"

  //Lähetetään pyyntö
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Haku onnistui");

      //Luodaan xmlDoc-muuttuja vastauksen perusteella
      var xmlDoc = xhttp.responseXML;

      //Syötetään xml-tiedosto toiseen funktioon
      printJSON(xmlDoc);

    }
  }

}

function printJSON(xmlDoc) {

  //Etsitään tietoja tag'in perusteella xml-dokumentista
  var title = xmlDoc.getElementsByTagName('Title');

  var image = xmlDoc.getElementsByTagName('EventSmallImagePortrait');

  var showTime = xmlDoc.getElementsByTagName('dttmShowStart');

  var rating = xmlDoc.getElementsByTagName('Rating');

  var theatre = xmlDoc.getElementsByTagName('TheatreAndAuditorium');

  var length = xmlDoc.getElementsByTagName('LengthInMinutes');

  //Luodaan pöytä, joka esittää tietoja kaupungin perusteella
  var txt = "<table>";

  for (var i = 0; i < title.length; i++) {
    txt += "<tr><td>" + 'Movie title: ' + "<strong>"+title[i].childNodes[0].nodeValue+"</strong>" + "</td>" + 
    "<td>" + '<img src="'+image[i].innerHTML+'">' + "</td>" +
    "<td>" + 'Theatre and auditorium: ' + "<strong>"+ theatre[i].innerHTML + "</strong>" + "</td>" +
    "<td>" + 'Screening: ' + "<strong>"+showTime[i].innerHTML+"</strong>" + "</td>" +
    "<td>" + 'Rating: ' + "<strong>"+rating[i].innerHTML+"</strong>"+"</td>" +
    "<td>" + 'Length: ' + "<strong>"+length[i].innerHTML+"</strong>"+"</td>"+"</tr>";
    console.log(txt);
  }

  txt += "<table>";

  document.getElementById("tabledata").innerHTML = txt;

}
