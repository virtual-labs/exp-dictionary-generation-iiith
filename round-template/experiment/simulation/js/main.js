
var language;
var words;
var id=0;
var xmlhttp;
var mapping=new Array();

if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
function getOption(lang)
{
	language=lang;
	document.getElementById("textlang").innerHTML="";
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById("word").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET","Exp7/getWords.php?lang="+lang,true);
	xmlhttp.send();
}

function builtDictionary(word)
{
	document.getElementById("textword").innerHTML="";
	words=word;
	id=id+1;
	$.ajax({
		url: "Exp7/generate_dict.php",	
		type: "POST",		
		data: "lang="+language+"&word="+word+"&id="+id+"&map="+mapping,	
		success: function (html) {	
			$('#dict').html(html);	
		}		
	});

	document.getElementById("lang").disabled=true;
}

function check(word)
{
	//check
	document.getElementById("dropword").disabled=true;
	var pos=document.getElementById("pos_"+id).value;
	var elt=document.getElementById("mean_"+id);
	var mean="";
	if (elt.selectedIndex != -1){
		mean=elt.options[elt.selectedIndex].text;
	}
	$.ajax({
		url: "Exp7/check.php",	
		type: "POST",		
		data: "lang="+language+"&word="+word+"&map="+mapping+"&pos="+pos+"&mean="+mean,	
		success: function (html) {	
			if(html>=0){
				mapping[id-1]=html;
				builtDictionary(word);
			}
			else if(html==-1){
				alert("POS and Meaning do not match");
			}
			else if(html==-2){
				alert("Dictionary Entry repeated");
			}
		}		
	});
}
function loadAssign()
{
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById("assign").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET","Exp7/loadAssign.php?lang="+language+"&word="+words,true);
	xmlhttp.send();
}
function eval(i){

	var ans=document.getElementById("text_"+i).value;
	var myans=mapping[ans-1];
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(xmlhttp.responseText==1){
				document.getElementById("ans_"+i).innerHTML='<img src="images/right.png" style="height:25px;width:25px">';
			}
			else{
				document.getElementById("ans_"+i).innerHTML='<img src="images/wrong.png" style="height:25px;width:25px">';
			}
		}
	}
	xmlhttp.open("GET","Exp7/eval.php?lang="+language+"&word="+words+"&ans="+myans+"&i="+i,true);
	xmlhttp.send();
