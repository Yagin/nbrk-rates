var XML = new Object(); 

// ������ ��������
XML.newDocument=function (rootTagName, namespaceURL) {

if(document.implementation && // FF ������� W3C ���������
	document.implementation.createDocument){	
	return document.implementation.createDocument("","",null);			
}
else { // IE  
var doc = new ActiveXObject("Microsoft.XmlDom"); 

// ���������, ������� �� � �������� ��������
// ������������ ������������ ���� 
if (rootTagName) {   
  var root; // �������� ��������
  var pref = ""; // ������� ������������ ���� 
  var lname = rootTagName; // ��������� ���

  var p = rootTagName.indexOf(":");   
  if (p != -1) { 
     pref = rootTagName.substring(0, p); 
     lname = rootTagName.substring(p+1); 
  } 

// ���� ��� ������������ ���� �����, � ������� ���
// ��������� ������� �� ���������
  if (namespaceURL) {
	if (!pref) pref = "a0"; // ��� � FF 
  } 
  else pref = ""; // ����� ���������� �������
  
  // ������� �������� ������� � ������ 
  // ���������� ������������ ����
  if(pref)  
	  root="<"+lname+">";
  else 
	  root="<"+pref+":"+lname+ 
	     "xlmns:"+pref+"='"+namespaceURL+"'/>"; 
  
  doc.loadXML(root);  
} 
return doc; 
}}; 

// ���������� �������� ���������
XML.load=function(url) { 
var doc = XML.newDocument(); 
doc.async = false;   
doc.load(url);       
return doc;          
}; 

// ����������� �������� 
XML.loadAsync = function(url, callback) { 
var doc = XML.newDocument(); 

if (document.implementation && // � FF ���������� ������� onload 
		document.implementation.createDocument) { 
doc.onload = function() { callback(doc); }; 
} 	 
else {// IE ��� � XMLHttpRequest 
doc.onreadystatechange = function() { 
   if (doc.readyState == 4) 
	  callback(doc); 
};} 
 
xmldoc.load(url); 
}; 

// ������ xml ������ 
XML.parse = function(text) {
if (window.DOMParser) { // FF       
    return (new DOMParser()). 
          parseFromString(text, "text/xml"); // ��� "application/xml" 
}
else if (ActiveXObject) {// IE    
    var doc = XML.newDocument(); 
    doc.loadXML(text);           
    return doc;                  
}
};
