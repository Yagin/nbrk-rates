var XML = new Object(); 

// пустой документ
XML.newDocument=function (rootTagName, namespaceURL) {

if(document.implementation && // FF следует W3C стандарту
	document.implementation.createDocument){	
	return document.implementation.createDocument("","",null);			
}
else { // IE  
var doc = new ActiveXObject("Microsoft.XmlDom"); 

// проверяем, указано ли в корневом элементе
// используемое пространство имен 
if (rootTagName) {   
  var root; // корневой элемента
  var pref = ""; // префикс пространства имен 
  var lname = rootTagName; // локальное имя

  var p = rootTagName.indexOf(":");   
  if (p != -1) { 
     pref = rootTagName.substring(0, p); 
     lname = rootTagName.substring(p+1); 
  } 

// если урл пространства имен задан, а префикс нет
// назначаем префикс по умолчанию
  if (namespaceURL) {
	if (!pref) pref = "a0"; // как в FF 
  } 
  else pref = ""; // иначе сбрасываем префикс
  
  // создаем корневой элемент с учетом 
  // указанного пространства имен
  if(pref)  
	  root="<"+lname+">";
  else 
	  root="<"+pref+":"+lname+ 
	     "xlmns:"+pref+"='"+namespaceURL+"'/>"; 
  
  doc.loadXML(root);  
} 
return doc; 
}}; 

// синхронная загрузка документа
XML.load=function(url) { 
var doc = XML.newDocument(); 
doc.async = false;   
doc.load(url);       
return doc;          
}; 

// асинхронная загрузка 
XML.loadAsync = function(url, callback) { 
var doc = XML.newDocument(); 

if (document.implementation && // в FF используем событие onload 
		document.implementation.createDocument) { 
doc.onload = function() { callback(doc); }; 
} 	 
else {// IE как в XMLHttpRequest 
doc.onreadystatechange = function() { 
   if (doc.readyState == 4) 
	  callback(doc); 
};} 
 
xmldoc.load(url); 
}; 

// разбор xml строки 
XML.parse = function(text) {
if (window.DOMParser) { // FF       
    return (new DOMParser()). 
          parseFromString(text, "text/xml"); // или "application/xml" 
}
else if (ActiveXObject) {// IE    
    var doc = XML.newDocument(); 
    doc.loadXML(text);           
    return doc;                  
}
};
