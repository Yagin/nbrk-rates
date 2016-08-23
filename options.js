window.onload = function(){
   DataExchange(false);

   var btnsave = document.getElementById("save-btn");
   btnsave.addEventListener("click", function() {
      return Save();
   });

   var btnexit = document.getElementById("exit-btn");
   btnexit.addEventListener("click", function() {
      window.close();
   });
}

function DataExchange(save)
{
   if(save)
   {
      localStorage["previewAll"] = document.getElementById("previewAll").checked;
      localStorage["preview3"]   = document.getElementById("preview3").checked;
   }
   else
   {
      document.getElementById("previewAll").checked = (GetProperty("previewAll", "true") == "true");
      document.getElementById("preview3").checked   = (GetProperty("preview3", "false") == "true");
   }
}

function GetProperty(property, defValue)
{
   if(localStorage[property] == null)
   {
      return defValue;
   }

   return localStorage[property];
}

function Save()
{
   DataExchange(true);
   window.close();
}
