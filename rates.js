GetRatesXML(CBText);

function GetRatesXML(callback) {
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function(data) {
      if (xhr.readyState == 4) {
         if (xhr.status == 200) {
            var data =  XML.parse(xhr.responseText);
            callback(data);
         } else {
            callback(null);
         }
      }
   }
   var LocalDate = new Date();
   var url = 'http://www.nationalbank.kz/rss/get_rates.cfm?fdate=' + LocalDate.toLocaleDateString();
   xhr.open('GET', url, true);
   xhr.send();
};


function CBText(data) {

  var DivTable = document.createElement("div");
  var messageNode = data.getElementsByTagName("rates")[0];
  var messNode = messageNode.getElementsByTagName("item");
  var node = messNode[0];
  var j = 0;
  var mRub = 0;
  var mEur = 0;
  var mUsd = 0;

  var mDate = messageNode.getElementsByTagName("date")[0].childNodes[0].nodeValue;

  if(GetProperty("preview3", "false") == "true")
  {
     var mType = "EUR,RUB,USD";
     var mShort = "yes";
  }
  else
  {
     var mType = "*";
     var mShort = "no";
  }

  var mHtml = '<br> <center> <B>  Курсы валют НБ РК на ' + mDate + ' </B> </center>';
  
  mHtml = mHtml + '<table width="100%">';
  mHtml = mHtml + '<thead style="text-align: left; padding-right: 1em; border-bottom: 3px solid #ccc;">';
  mHtml = mHtml + '  <tr><th>Наименование</th><th>ISO</th><th>Курс</th><th>Номинал</th></tr>';
  mHtml = mHtml + '</thead>';

  if (node)
    for(var i=0; i<messNode.length; i++){
      var node = messNode[i];
      var fullname = node.getElementsByTagName("fullname")[0].childNodes[0].nodeValue;
      var title = node.getElementsByTagName("title")[0].childNodes[0].nodeValue;
      var description = node.getElementsByTagName("description")[0].childNodes[0].nodeValue;
      var quant = node.getElementsByTagName("quant")[0].childNodes[0].nodeValue;

      if (title == "USD")
      {
         mUsd = Number(description);
      } else if (title == "EUR")
      {
         mEur = Number(description);
      } else if (title == "RUB")
      {
         mRub = Number(description);
      }

      if(mType.lastIndexOf(title) >= 0 || mType == "*")
      {
         if ( j % 2 == 0 ) {
            mHtml = mHtml + ' <tr class="first"><td><b>' + fullname + '</b></td>' +
                                               '<td>' + title + '</td>' +
                                               '<td>' + description + '</td>' + 
                                               '<td>' + quant + '</td>' + 
                            ' </tr>';
         } else {
            mHtml = mHtml + ' <tr class="second"><td><b>' + fullname + '</b></td>' +
                                                '<td>' + title + '</td>' +
                                                '<td>' + description + '</td>' + 
                                                '<td>' + quant + '</td>' + 
                            ' </tr>';
         }
         j++;
      }
    }

  mHtml = mHtml + '</table>';

  vSelectStr = vSelectStr.replace(',','.');  // Заменяем запятые на точки
  vSelectStr = vSelectStr.replace(/\s+/g,''); // Удаляем пробелы в выделенной строке

  if ( mShort == "yes" && isNaN(Number(vSelectStr)) != true && vSelectStr != "" )
  {
     mHtml = mHtml + '<hr>';
     mHtml = mHtml + '<center><table>';

     mHtml = mHtml + '<tr>';
     mHtml = mHtml + '<td><b>Выделенное число</b></td> <td><b>' + vSelectStr + '</b></td>';
     mHtml = mHtml + '</tr>';

     mHtml = mHtml + '<tr class="first">';   
     mHtml = mHtml + '<td><b> USD-KZT </b></td> <td>  ' + (vSelectStr * mUsd).toFixed(4) + '  </td> <td>  KZT  </td>';
     mHtml = mHtml + '</tr>';

     mHtml = mHtml + '<tr class="second">';
     mHtml = mHtml + '<td><b> EUR-KZT </b></td> <td>  ' + (vSelectStr * mEur).toFixed(4) + '  </td> <td>  KZT  </td>';
     mHtml = mHtml + '</tr>';

     mHtml = mHtml + '<tr class="first">';
     mHtml = mHtml + '<td><b> RUB-KZT </b></td> <td>  ' + (vSelectStr * mRub).toFixed(4) + '  </td> <td>  KZT  </td>';
     mHtml = mHtml + '</tr>';

     mHtml = mHtml + '<tr class="second">';
     mHtml = mHtml + '<td><b> KZT-USD </b></td> <td>  ' + (vSelectStr / mUsd).toFixed(4) + '  </td> <td>  USD  </td>';
     mHtml = mHtml + '</tr>';

     mHtml = mHtml + '<tr class="first">';
     mHtml = mHtml + '<td><b> KZT-EUR </b></td> <td>  ' + (vSelectStr / mEur).toFixed(4) + '  </td> <td>  EUR  </td>';
     mHtml = mHtml + '</tr>';

     mHtml = mHtml + '<tr class="second">';
     mHtml = mHtml + '<td><b> KZT-RUB </b></td> <td>  ' + (vSelectStr / mRub).toFixed(4) + '  </td> <td>  RUB  </td>';
     mHtml = mHtml + '</tr>';

     mHtml = mHtml + '</table></center>';
  }
  DivTable.innerHTML = mHtml;
  document.body.appendChild(DivTable);

};
