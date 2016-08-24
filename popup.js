var vSelectStr = "";

window.onload = function(){
   chrome.extension.getBackgroundPage().getSelection();
   chrome.extension.onRequest.addListener(function(request) {
      vSelectStr = request;
   });

   var btnClose = document.getElementById("close");
   btnClose.addEventListener("click", function() {
      return closePopup();
   });
}

function GetProperty(property, defValue)
{
   if(localStorage[property] == null)
   {
      return defValue;
   }   
   return localStorage[property];
}

function OpenHref(iHref)
{
   var hrefPlace = document.getElementById(iHref);
   var url = hrefPlace.getAttribute('href');
    
   chrome.tabs.create({selected: true, url: url});
    
   return false;
}

function closePopup()
{
   window.close();
}

function showOptions()
{
   chrome.tabs.create({url:'options.html'});
}
