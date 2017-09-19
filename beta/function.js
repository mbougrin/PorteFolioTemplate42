//All Variable Global
var oldpage = "homeid";
var langue = "fr";
var stylea = "style=width:130px;";
var sortSkill = "graph";
var backgroundColor = "#eff0f1";
var backgroundColorShadowBox = "rgb(239, 240, 241)";

var ret = [];
var rettool = [];

/*
 **	/brief 	Generate CV into PDF
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function pdf()
{
	return ;
	document.getElementById('name_header').innerHTML = "Curriculum Vitae";

	document.getElementById('main_div').innerHTML = '<p style="text-align: center;"><object id="cv" data="http://mozilla.github.io/pdf.js/web/viewer.html?file=http%3A%2F%2Finfluence-pc.fr%2Fenvois%2Fdocuments%2Fcv.pdf#zoom=page-fit" type="text/html">La visualisation n’est pas encore disponible sur votre navigateur, veillez à le mettre à jour.</object></p>';
	pdfDocument = document.getElementById("cv");
	pdfDocument.style.width = "710px";
	pdfDocument.style.height = "742px";
	alert("tu fait koi la xd");
}
/*
 **	/brief 	Main Function Initialisation Web Site
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function init_body()
{
	var info = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Info!</strong> WebSite In Progress.';
	document.getElementById('print_info').innerHTML = info;

	location.href = location.href + "ip";
	document.getElementById("sidebarColor").style.backgroundColor = backgroundColor;
	init_skill();
	print_sidebar();
	home();
}
/*
 **	/brief 	Initialisation Skill and Parsing into Array
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function init_skill()
{
	const req = new XMLHttpRequest();
	req.open('GET', 'project42.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('allproject')[0];
		for (var i = 0 ; i < xmlDoc.getElementsByTagName('project').length ; ++i)
		{
			var split;
			var node = mainNode.getElementsByTagName('project')[i];
			split = node.getElementsByTagName('language')[0].childNodes[0].nodeValue.split(' ');
			for (var j = 0 ; j < split.length ; ++j)
			{
				var index;
				if ((index = search(ret, split[j])) > -1)
					ret[index].nb++;
				else
					ret.push({name: split[j], nb: 1});
			}
			split = node.getElementsByTagName('tool')[0].childNodes[0].nodeValue.split(' ');
			for (var j = 0 ; j < split.length ; ++j)
			{
				var index;
				if ((index = search(rettool, split[j])) > -1)
					rettool[index].nb++;
				else
					rettool.push({name: split[j], nb: 1});
			}
		}	
	}
	req.open('GET', 'opensource.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('allproject')[0];
		for (var i = 0 ; i < xmlDoc.getElementsByTagName('project').length ; ++i)
		{
			var split;
			var node = mainNode.getElementsByTagName('project')[i];
			split = node.getElementsByTagName('language')[0].childNodes[0].nodeValue.split(' ');
			for (var j = 0 ; j < split.length ; ++j)
			{
				var index;
				if ((index = search(ret, split[j])) > -1)
					ret[index].nb++;
				else
					ret.push({name: split[j], nb: 1});
			}
			split = node.getElementsByTagName('tool')[0].childNodes[0].nodeValue.split(' ');
			for (var j = 0 ; j < split.length ; ++j)
			{
				var index;
				if ((index = search(rettool, split[j])) > -1)
					rettool[index].nb++;
				else
					rettool.push({name: split[j], nb: 1});
			}
		}
	}
	req.open('GET', 'xp.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('work')[0];
		for (var i = 0 ; i < xmlDoc.getElementsByTagName('job').length ; ++i)
		{
			var split;
			var node = mainNode.getElementsByTagName('job')[i];

			var splitDate = node.getElementsByTagName('date')[0].childNodes[0].nodeValue.split(' ');

			var skill = skillInDate(splitDate);
			split = node.getElementsByTagName('language')[0].childNodes[0].nodeValue.split(' ');
			for (var j = 0 ; j < split.length ; ++j)
			{
				var index;
				if ((index = search(ret, split[j])) > -1)
					ret[index].nb += skill;
				else
					ret.push({name: split[j], nb: skill});
			}
			split = node.getElementsByTagName('tool')[0].childNodes[0].nodeValue.split(' ');
			for (var j = 0 ; j < split.length ; ++j)
			{
				var index;
				if ((index = search(rettool, split[j])) > -1)
					rettool[index].nb += skill;
				else
					rettool.push({name: split[j], nb: skill});
			}
		}
	}
	rettool.sort(compare);
	ret.sort(compare);
}
/*
 **	/brief 	Print SideBar With XML parsing link
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function print_sidebar()
{
	const req = new XMLHttpRequest();
	req.open('GET', 'ip.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");

		var mainNode = xmlDoc.getElementsByTagName('allip');
		var nodeIp = xmlDoc.getElementsByTagName('ip');
		var divCount = 	'<li style="padding-left:15px;padding-right:15px;">' +
						'<div class="panel panel-inverse">' +
			            '<div class="panel-heading">Compteur Visiteur</div>' +
						'<div class="panel-body">' + nodeIp.length + " Visiteurs" +'</div></div></li>';
		document.getElementById('side_bar').innerHTML = divCount; 
	}

	req.open('GET', 'contact.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");

		var mainNode = xmlDoc.getElementsByTagName('contact')[0];

		var github = 	'<a target="_blank" href="' +
			mainNode.getElementsByTagName('github')[0].childNodes[0].nodeValue 
			+ '">' + "Github" + '</a>';
		var linkedin = 	'<a target="_blank" href="' + 
			mainNode.getElementsByTagName('linkedin')[0].childNodes[0].nodeValue 
			+ '">' 
			+ "Linkedin" + '</a>';
		var viadeo = 	'<a target="_blank" href="' + 
			mainNode.getElementsByTagName('viadeo')[0].childNodes[0].nodeValue 
			+ '">' + "Viadeo" + '</a>';
		var school = 	'<a target="_blank" href="' + 
			mainNode.getElementsByTagName('school')[0].childNodes[0].nodeValue 
			+ '">' + 
			"CV 42" + '</a>';
		var email = 	'<a href="' + 
			"mailto:" + 
			mainNode.getElementsByTagName('email')[0].childNodes[0].nodeValue
			+ '">' + "Contact Email" + '</a>';
		var email42 = 	'<a href="' + 
			"mailto:" + 
			mainNode.getElementsByTagName('email42')[0].childNodes[0].nodeValue
			+ '">' + "Contact Email42" + '</a>';
		var pdf = '<a href="#" onclick="pdf()">CV Pdf</a>';
		var style =		"style=font-size:16px;padding-right:15px;height:42px;";
		document.getElementById('side_bar').innerHTML += 
			"<li>" + github + "</li>" + 
			"<li>" + linkedin + "</li>" + 
			"<li>" + viadeo + "</li>" + 
			"<li>" + school + "</li>" + 
			"<li>" + email + "</li>" + 
			"<li>" + email42 + "</li>" + 
			"<li>" + pdf + "</li>"; 
	}
}
/*
 **	/brief 	Function Traduction English/French
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function my_translate()
{
	if (langue == "fr")
	{
		document.getElementById('home').innerHTML = '<span class="glyphicon glyphicon-home"></span> Home'; 
		document.getElementById('projet').innerHTML = '<span class="glyphicon glyphicon-file"></span> Project 42'; 
		document.getElementById('opensource').innerHTML = '<span class="glyphicon glyphicon-folder-open"></span> Self-Educated/OpenSource'; 
		document.getElementById('xp').innerHTML = '<span class="glyphicon glyphicon-briefcase"></span> Professional Experience'; 
		document.getElementById('school').innerHTML = '<span class="glyphicon glyphicon-education"></span> Education'; 
		document.getElementById('skill').innerHTML = '<span class="glyphicon glyphicon-cog"></span> Skill'; 
		//				document.getElementById('tutorial').innerHTML = '<span class="glyphicon glyphicon-book"></span> Tutorial'; 
		document.getElementById('aboutme').innerHTML = '<span class="glyphicon glyphicon-user"></span> About Me'; 
		langue = "eng";
		document.getElementById('langue').innerHTML = '<span class="glyphicon glyphicon-globe"></span> Eng/Fr';
	}
	else
	{
		document.getElementById('home').innerHTML = '<span class="glyphicon glyphicon-home"></span> Accueil'; 
		document.getElementById('projet').innerHTML = '<span class="glyphicon glyphicon-file"></span> Projet 42'; 
		document.getElementById('opensource').innerHTML = '<span class="glyphicon glyphicon-folder-open"></span> Autodidacte/OpenSource'; 
		document.getElementById('xp').innerHTML = '<span class="glyphicon glyphicon-briefcase"></span> Expérience Professionnel'; 
		document.getElementById('school').innerHTML = '<span class="glyphicon glyphicon-education"></span> Formation'; 
		document.getElementById('skill').innerHTML = '<span class="glyphicon glyphicon-cog"></span> Compétence'; 
		//				document.getElementById('tutorial').innerHTML = '<span class="glyphicon glyphicon-book"></span> Tutoriel'; 
		document.getElementById('aboutme').innerHTML = '<span class="glyphicon glyphicon-user"></span> A Propos de Moi'; 
		langue = "fr";
		document.getElementById('langue').innerHTML = '<span class="glyphicon glyphicon-globe"></span> Fr/Eng';
	}
	if (document.getElementById('name_header').innerHTML == "Accueil"
			|| document.getElementById('name_header').innerHTML == "Home")
		home();
	else if (document.getElementById('name_header').innerHTML == "Projet 42"
			|| document.getElementById('name_header').innerHTML == "Project 42")
		project();
	else if (document.getElementById('name_header').innerHTML == "Autodidacte/OpenSource"
			|| document.getElementById('name_header').innerHTML == "Self-Educated/OpenSource")
		opensource();
	else if (document.getElementById('name_header').innerHTML == "Expérience Professionnel"
			|| document.getElementById('name_header').innerHTML == "Professional Experience")
		work();
	else if (document.getElementById('name_header').innerHTML == "Formation"
			|| document.getElementById('name_header').innerHTML == "Education")
		school();
	else if (document.getElementById('name_header').innerHTML == "Compétence"
			|| document.getElementById('name_header').innerHTML == "Skill")
		skill();
	//			else if (document.getElementById('name_header').innerHTML == "Tutoriel"
	//			|| document.getElementById('name_header').innerHTML == "Tutorial")
	//					tutorial();
	else if (document.getElementById('name_header').innerHTML == "A Propos de Moi"
			|| document.getElementById('name_header').innerHTML == "About Me")
		aboutme();
}
/*
 **	/brief 	Parsing Into Paragraph HTML
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function parseIntoParagraph(text)
{
	var ret = "";
	for (var i = 0 ; text.charAt(i) ; ++i)
	{
		if (text.charAt(i) == '.' && text.charAt(i + 1) == ' ')
		{
			ret += text.charAt(i);
			ret += "</p><p>";
		}
		else if (text.charAt(i) == ':' && text.charAt(i + 1) == ' ')
		{
			ret += text.charAt(i);
			ret += "</p><p>";
		}
		else
			ret += text.charAt(i);
	}
	ret += "</p>";
	return (ret)
}
/*
 **	/brief 	Print Home Page In Web Site
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function home()
{
	$('.navbar-collapse').collapse('hide');
	document.getElementById(oldpage).className = '';
	oldpage = 'homeid';
	document.getElementById(oldpage).className = 'active';
	if (langue == "fr")
		document.getElementById('name_header').innerHTML = "Accueil";
	else
		document.getElementById('name_header').innerHTML = "Home";


	const req = new XMLHttpRequest();

	req.open('GET', 'xp.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var formation =  '<div class="col-md-6">' + 
			'<div id="box-shadow-object" style="height:442px;box-shadow: rgba(0, 0, 0, 0.75) 10px 10px 5px 0px; background-color:' + backgroundColorShadowBox + ';">'; 
		if (langue == "fr")
			formation += '<h3>Expérience Professionnel</h3>';
		else
			formation += '<h3>Professional Experience</h3>';
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('work')[0];
		for (var i = 0 ; i < 3 ; ++i)
		{
			var node = mainNode.getElementsByTagName('job')[i];

			formation += "<hr/>";
			formation += 	"<b>" + 
				node.getElementsByTagName('entreprise')[0].childNodes[0].nodeValue +
				"</b>";
			formation += 	"<p>" + "Language: " +
				node.getElementsByTagName('language')[0].childNodes[0].nodeValue +
				"</p>";
			formation += 	"<p>" + "Tool: " +
				node.getElementsByTagName('tool')[0].childNodes[0].nodeValue +
				"</p>";
		}
		formation += '</div></div>'; 
	}

	req.open('GET', 'school.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var school =  '<div class="col-md-6">' + 
			'<div id="box-shadow-object" style="height:442px;box-shadow: rgba(0, 0, 0, 0.75) 10px 10px 5px 0px; background-color:' + backgroundColorShadowBox + ';">'; 
		if (langue == "fr")
			school += '<h3>Formation</h3>';
		else
			school += '<h3>Education</h3>';
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('allschool')[0];
		for (var i = 0 ; i < 3 ; ++i)
		{
			var node = mainNode.getElementsByTagName('school')[i];

			school += "<hr/>";
			school += 	"<b>" + 
				node.getElementsByTagName('name')[0].childNodes[0].nodeValue +
				"</b>";
			if (langue == "fr")
			{
				school += 	"<p>" +
					node.getElementsByTagName('description')[0].childNodes[0].nodeValue +
					"</p>";
			}
			else
			{
				school += 	"<p>" +
					node.getElementsByTagName('descriptionEN')[0].childNodes[0].nodeValue +
					"</p>";
			}
			school += 	"<p>" +
				node.getElementsByTagName('country')[0].childNodes[0].nodeValue +
				"</p>";
		}
		school += '</div></div>'; 
	}

	req.open('GET', 'project42.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var project42 =  '<div class="col-md-6">' + 
			'<div id="box-shadow-object" style="margin-bottom:42px;height:442px;box-shadow: rgba(0, 0, 0, 0.75) 10px 10px 5px 0px; background-color:' + backgroundColorShadowBox + ';">'; 
		if (langue == "fr")
			project42 += '<h3>Projet42</h3>';
		else
			project42 += '<h3>Project 42</h3>';
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('allproject')[0];
		for (var i = 0 ; i < 3 ; ++i)
		{
			var node = mainNode.getElementsByTagName('project')[i];

			project42 += "<hr/>";
			project42 += 	"<b>" + 
				node.getElementsByTagName('name')[0].childNodes[0].nodeValue +
				"</b>";
			project42 += 	"<p>" + "Language: " +
				node.getElementsByTagName('language')[0].childNodes[0].nodeValue +
				"</p>";
			project42 += 	"<p>" + "Tool: " +
				node.getElementsByTagName('tool')[0].childNodes[0].nodeValue +
				"</p>";
		}
		project42 += '</div></div>'; 
	}

	req.open('GET', 'opensource.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var opensource =  '<div class="col-md-6">' + 
			'<div id="box-shadow-object" style="margin-bottom:42px;height:442px;box-shadow: rgba(0, 0, 0, 0.75) 10px 10px 5px 0px; background-color:' + backgroundColorShadowBox + ';">'; 
		if (langue == "fr")
			opensource += '<h3>Autodidacte/OpenSource</h3>';
		else
			opensource += '<h3>Self-Educated/OpenSource</h3>';
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('allproject')[0];
		for (var i = 0 ; i < 3 ; ++i)
		{
			var node = mainNode.getElementsByTagName('project')[i];

			opensource += "<hr/>";
			opensource += 	"<b>" + 
				node.getElementsByTagName('name')[0].childNodes[0].nodeValue +
				"</b>";
			opensource += 	"<p>" + "Language: " +
				node.getElementsByTagName('language')[0].childNodes[0].nodeValue +
				"</p>";
			opensource += 	"<p>" + "Tool: " +
				node.getElementsByTagName('tool')[0].childNodes[0].nodeValue +
				"</p>";
		}
		opensource += '</div></div>'; 
	}

	var skill =  '<div class="col-md-6">' + 
		'<div id="box-shadow-object" style="height:442px;box-shadow: rgba(0, 0, 0, 0.75) 10px 10px 5px 0px; background-color:' + backgroundColorShadowBox + ';">'; 
	if (langue == "fr")
		skill += '<h3>Compétence</h3><hr/>';
	else
		skill += '<h3>Skill</h3><hr/>';
	skill += '<div id="donutchart" style="height:342px;"></div></div></div>'; 
	var tool =  '<div class="col-md-6">' + 
		'<div id="box-shadow-object" style="height:442px;box-shadow: rgba(0, 0, 0, 0.75) 10px 10px 5px 0px; background-color:' + backgroundColorShadowBox + ';">'; 
	if (langue == "fr")
		tool += '<h3>Outils</h3><hr/>';
	else
		tool += '<h3>Tools</h3><hr/>';
	tool += '<div id="donutchart1" style="height:342px;"></div></div></div>'; 


	google.charts.load("current", {packages:["corechart"]});
	google.charts.setOnLoadCallback(drawChart);
	google.charts.setOnLoadCallback(drawChartTool);

	//draw chart after resize web page
	$(window).resize(function(){
		drawChart();
		drawChartTool();
	});

	function drawChart() {
		var data = google.visualization.arrayToDataTable([
				['Language', 'Number'],
				['Sleep',    0]
		]);
		for (var l = 0 ; ret[l] ; ++l)
			data.addRows([[ret[l].name, ret[l].nb]]);

		var options = {
			width: '100%',
			height: '100%',
			is3D: true,
			chartArea: {left: "3%",top: "3%",height: "94%",width: "94%"},
			title: 'Language',
			pieHole: 0.3,
			backgroundColor: backgroundColor,
		};

		var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
		chart.draw(data, options);
	}
	function drawChartTool() {
		var data = google.visualization.arrayToDataTable([
				['Tool', 'Number'],
				['Sleep',    0]
		]);
		for (var l = 0 ; rettool[l] ; ++l)
			data.addRows([[rettool[l].name, rettool[l].nb]]);

		var options = {
			width: '100%',
			height: '100%',
			is3D: true,
			chartArea: {left: "3%",top: "3%",height: "94%",width: "94%"},
			title: 'Tool/Library',
			pieHole: 0.3,
			backgroundColor: backgroundColor,
		};

		var chart = new google.visualization.PieChart(document.getElementById('donutchart1'));
		chart.draw(data, options);
	}
	document.getElementById("main_div").style.padding = "0px";
	document.getElementById("main_div").style.backgroundColor = "white";
	document.getElementById('main_div').innerHTML = '<div>' +
		formation + school + skill + tool + project42 + opensource + '</div>';
}
/*
 **	/brief 	Print Project Page In Web Site
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function project()
{
	$('.navbar-collapse').collapse('hide');
	document.getElementById("main_div").style.backgroundColor = backgroundColor;
	document.getElementById("main_div").style.padding = "15px";

	document.getElementById(oldpage).className = '';
	oldpage = 'projetid';
	document.getElementById(oldpage).className = 'active';
	if (langue == "fr")
		document.getElementById('name_header').innerHTML = "Projet 42";
	else
		document.getElementById('name_header').innerHTML = "Project 42";
	const req = new XMLHttpRequest();
	req.open('GET', 'project42.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var ret = "";
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('allproject')[0];
		for (var i = 0 ; i < xmlDoc.getElementsByTagName('project').length ; ++i)
		{
			var node = mainNode.getElementsByTagName('project')[i];

			ret += "<h4>" + 
				node.getElementsByTagName('name')[0].childNodes[0].nodeValue + 
				"</h4>";
			ret += 	"<i>" + 
				node.getElementsByTagName('date')[0].childNodes[0].nodeValue +
				"</i></br>";
			if (langue == "fr")
			{
				var text = node.getElementsByTagName('description')[0].childNodes[0].nodeValue;
				ret += 	"<p>" + 
					parseIntoParagraph(text) +
					"</p>";
			}
			else
			{
				var textEN = node.getElementsByTagName('descriptionEN')[0].childNodes[0].nodeValue;
				ret += 	"<p>" + 
					parseIntoParagraph(textEN) +
					"</p>";
			}
			ret += 	"<p>" + "Language: " +
				node.getElementsByTagName('language')[0].childNodes[0].nodeValue +
				"</p>";
			ret += 	"<p>" + "Tool: " +
				node.getElementsByTagName('tool')[0].childNodes[0].nodeValue +
				"</p>";
			ret += "<hr/>";
		}
		document.getElementById('main_div').innerHTML = ret; 
	}
}	
/*
 **	/brief 	Print OpenSource Page In Web Site
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function opensource()
{
	$('.navbar-collapse').collapse('hide');
	document.getElementById("main_div").style.backgroundColor = backgroundColor;
	document.getElementById("main_div").style.padding = "15px";

	document.getElementById(oldpage).className = '';
	oldpage = 'opensourceid';
	document.getElementById(oldpage).className = 'active';
	if (langue == "fr")
		document.getElementById('name_header').innerHTML = "Autodidacte/OpenSource";
	else
		document.getElementById('name_header').innerHTML = "Self-Educated/OpenSource"; 
	const req = new XMLHttpRequest();
	req.open('GET', 'opensource.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var ret = "";
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('allproject')[0];
		for (var i = 0 ; i < xmlDoc.getElementsByTagName('project').length ; ++i)
		{
			var node = mainNode.getElementsByTagName('project')[i];

			ret += "<h4>" + 
				node.getElementsByTagName('name')[0].childNodes[0].nodeValue + 
				"</h4>";
			ret += 	"<i>" + 
				node.getElementsByTagName('date')[0].childNodes[0].nodeValue +
				"</i></br>";
			if (langue == "fr")
			{
				var desc = node.getElementsByTagName('description')[0].childNodes[0].nodeValue;
				ret += 	"<p>" + 
					parseIntoParagraph(desc) +
					"</p>";
			}
			else
			{
				var descEN = node.getElementsByTagName('descriptionEN')[0].childNodes[0].nodeValue;
				ret += 	"<p>" + 
					parseIntoParagraph(descEN) +
					"</p>";
			}
			ret += 	"<p>" + "Language: " +
				node.getElementsByTagName('language')[0].childNodes[0].nodeValue +
				"</p>";
			ret += 	"<p>" + "Tool: " +
				node.getElementsByTagName('tool')[0].childNodes[0].nodeValue +
				"</p>";
			ret += "<hr/>";
		}
		document.getElementById('main_div').innerHTML = ret; 
	}
}
/*
 **	/brief 	Print Work Page In Web Site
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function work()
{
	$('.navbar-collapse').collapse('hide');
	document.getElementById("main_div").style.backgroundColor = backgroundColor;
	document.getElementById("main_div").style.padding = "15px";

	document.getElementById(oldpage).className = '';
	oldpage = 'xpid';
	document.getElementById(oldpage).className = 'active';
	if (langue == "fr")
		document.getElementById('name_header').innerHTML = "Expérience Professionnel";
	else
		document.getElementById('name_header').innerHTML = "Professional Experience"; 
	const req = new XMLHttpRequest();
	req.open('GET', 'xp.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var ret = "";
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('work')[0];
		for (var i = 0 ; i < xmlDoc.getElementsByTagName('job').length ; ++i)
		{
			var node = mainNode.getElementsByTagName('job')[i];

			if (langue == "fr")
			{
				ret += "<h4>" + 
					node.getElementsByTagName('description')[0].childNodes[0].nodeValue + 
					"</h4>";
			}
			else
			{
				ret += "<h4>" + 
					node.getElementsByTagName('descriptionEN')[0].childNodes[0].nodeValue + 
					"</h4>";
			}
			if (langue == "fr")
			{
				ret += 	"<i>" + 
					node.getElementsByTagName('date')[0].childNodes[0].nodeValue +
					"</i></br>";
			}
			else
			{
				var res = node.getElementsByTagName('date')[0].childNodes[0].nodeValue.replace("Aujourd'hui", "Today");
				ret += 	"<i>" + res + "</i></br>";
			}
			ret += 	"<b>" + 
				node.getElementsByTagName('entreprise')[0].childNodes[0].nodeValue +
				"</b>";
			if (langue == "fr")
			{
				var info = node.getElementsByTagName('info')[0].childNodes[0].nodeValue;
				ret += 	"<p>" + 
					parseIntoParagraph(info) +
					"</p>";
			}
			else
			{
				var infoEN = node.getElementsByTagName('infoEN')[0].childNodes[0].nodeValue;
				ret += 	"<p>" + 
					parseIntoParagraph(infoEN) +
					"</p>";
			}
			ret += 	"<p>" + "Language: " +
				node.getElementsByTagName('language')[0].childNodes[0].nodeValue +
				"</p>";
			ret += 	"<p>" + "Tool: " +
				node.getElementsByTagName('tool')[0].childNodes[0].nodeValue +
				"</p>";
			ret += "<hr/>";
		}
		document.getElementById('main_div').innerHTML = ret; 
	}
}
/*
 **	/brief 	Print School Page In Web Site
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function school()
{
	$('.navbar-collapse').collapse('hide');
	document.getElementById("main_div").style.backgroundColor = backgroundColor;
	document.getElementById("main_div").style.padding = "15px";

	document.getElementById(oldpage).className = '';
	oldpage = 'schoolid';
	document.getElementById(oldpage).className = 'active';
	if (langue == "fr")
		document.getElementById('name_header').innerHTML = "Formation";
	else
		document.getElementById('name_header').innerHTML = "Education"; 
	const req = new XMLHttpRequest();
	req.open('GET', 'school.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var ret = "";
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");
		var mainNode = xmlDoc.getElementsByTagName('allschool')[0];
		for (var i = 0 ; i < xmlDoc.getElementsByTagName('school').length ; ++i)
		{
			var node = mainNode.getElementsByTagName('school')[i];

			if (langue == "fr")
			{	
				ret += "<h4>" + 
					node.getElementsByTagName('description')[0].childNodes[0].nodeValue + 
					"</h4>";
			}
			else
			{
				ret += "<h4>" + 
					node.getElementsByTagName('descriptionEN')[0].childNodes[0].nodeValue + 
					"</h4>";
			}
			ret += 	"<i>" + 
				node.getElementsByTagName('date')[0].childNodes[0].nodeValue +
				"</i></br>";
			ret += 	"<b>" + 
				node.getElementsByTagName('name')[0].childNodes[0].nodeValue +
				"</b>";
			ret += 	"<p>" + 
				parseIntoParagraph(node.getElementsByTagName('country')[0].childNodes[0].nodeValue) +
				"</p>";
			ret += 	'<a target="__blank" class="btn btn-default" href=' + 
				node.getElementsByTagName('website')[0].childNodes[0].nodeValue +
				">Website</a>"; 
			ret += "<hr/>";
		}
		document.getElementById('main_div').innerHTML = ret; 
	}

}
/*
 **	/brief 	Search Occurence Char and Return Index
 **	/author mbougrin
 **
 **	/param	ret is a string to check
 **	/param	find is string to search
 **	/return	return index or error
 */
function search(ret, find)
{
	for (var i = 0 ; ret[i] ; ++i)
	{
		if (ret[i].name == find)
			return (i);
	}
	return (-1);
}
/*
 **	/brief 	Function for print a debug
 **	/author mbougrin
 **
 **	/param	ret is a struct of information to print
 **	/return	None
 */
function debug(ret)
{
	for (var i = 0 ; ret[i] ; ++i)
	{
		console.log(ret[i].name + " " + ret[i].nb);
	}
}
/*
 **	/brief 	Print Skill Page In Web Site
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function skill()
{
	$('.navbar-collapse').collapse('hide');
	document.getElementById("main_div").style.backgroundColor = backgroundColor;
	document.getElementById("main_div").style.padding = "15px";

	document.getElementById(oldpage).className = '';
	oldpage = 'skillid';
	document.getElementById(oldpage).className = 'active';
	if (langue == "fr")
		document.getElementById('name_header').innerHTML = "Compétence";
	else
		document.getElementById('name_header').innerHTML = "Skill"; 

	document.getElementById('main_div').innerHTML = 
		'<div class="" style="padding-top:10px;padding-bottom:10px;">' + 
		'<span onclick="sortList()" class="glyphicon glyphicon-list btn btn-default">' + 
		'<span style="padding-left:5px;">list</span></span>' +
		'<span onclick="sortGraph()" class="glyphicon glyphicon-cd btn btn-default">' +
		'<span style="padding-left:5px;">graph</span></span>' +
		'</div>';
	if (sortSkill == "list")
		drawList(ret, rettool);
	else if (sortSkill == "graph")
		drawChartGoogle(ret, rettool, skill);	
}
/*
 **	/brief 	Function for print skill into list
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function sortList()
{
	sortSkill = "list";
	skill();
}
/*
 **	/brief 	Function for print skill into graph
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function sortGraph()
{
	sortSkill = "graph";
	skill();
}
/*
 **	/brief 	Function for print a list into html
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function drawList(ret, rettool)
{
	var divlanguage = '<div class="col-md-12" id="donutchart"><h3>Language</h3><table class="table-bordered">';
	for (var n = 0 ; ret[n] ; ++n)
		divlanguage += '<tr><td style="width:100px;">' + 
			ret[n].name + '</td><td style="width:100px;text-align:center;">' + 
			ret[n].nb + ' Project</td></tr>';
	divlanguage += '</table></div>';
	var divtool = '<div class="col-md-12" id="donutchart1"><h3>Tools</h3><table class="table-bordered">';
	for (var k = 0 ; rettool[k] ; ++k)
		divtool += '<tr><td style="width:100px;">' + 
			rettool[k].name + '</td><td style="width:100px;text-align:center;">' + 
			rettool[k].nb + ' Project</td></tr>';
	divtool += '</table></div>';
	document.getElementById('main_div').innerHTML += 
		'<div class="row">' + 
		divlanguage + divtool + '</div>'; 
}
/*
 **	/brief 	Function for print a graph GoogleChart into html
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function drawChartGoogle(ret, rettool, skill)
{
	var divlanguage = '<div class="col-md-12"><div id="donutchart" style="height:442px;"></div></div>';
	var divtool = '<div class="col-md-12"><div id="donutchart1" style="height:442px;"></div></div>';
	google.charts.load("current", {packages:["corechart"]});
	google.charts.setOnLoadCallback(drawChart);
	google.charts.setOnLoadCallback(drawChartTool);

	//draw chart after resize web page
	$(window).resize(function(){
		drawChart();
		drawChartTool();
	});

	function drawChart() {
		var data = google.visualization.arrayToDataTable([
				['Language', 'Number'],
				['Sleep',    0]
		]);
		for (var l = 0 ; ret[l] ; ++l)
			data.addRows([[ret[l].name, ret[l].nb]]);

		var options = {
			height: '100%',
			is3D: true,
			title: 'Language',
			pieHole: 0.3,
			backgroundColor: backgroundColor,
		};

		var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
		chart.draw(data, options);
	}
	function drawChartTool() {
		var data = google.visualization.arrayToDataTable([
				['Tool', 'Number'],
				['Sleep',    0]
		]);
		for (var l = 0 ; rettool[l] ; ++l)
			data.addRows([[rettool[l].name, rettool[l].nb]]);

		var options = {
			height: '100%',
			is3D: true,
			title: 'Tool/Library',
			pieHole: 0.3,
			backgroundColor: backgroundColor,
		};

		var chart = new google.visualization.PieChart(document.getElementById('donutchart1'));
		chart.draw(data, options);
	}
	document.getElementById('main_div').innerHTML += 
		'<div class="row" style="padding-bottom:42px;">' + 
		divlanguage + divtool + '</div>'; 
}
/*
 **	/brief 	Calculate a skill into a date
 **	/author mbougrin
 **
 **	/param	SplitDate is a begin date and end date
 **	/return	None
 */
function skillInDate(splitDate)
{
	var skill;
	var beginSplit = splitDate[0].split('/');
	var endSplit = splitDate[1].split('/');

	var beginMonth = parseInt(beginSplit[0]);
	var beginYear = parseInt(beginSplit[1]);
	if (splitDate[1] == "Aujourd'hui")
	{
		var today = new Date();
		var endMonth = today.getMonth() + 1;
		var endYear = today.getFullYear();
	}
	else
	{
		var endMonth = parseInt(endSplit[0]);
		var endYear = parseInt(endSplit[1]);
	}
	var skill = 0;
	skill += beginMonth - endMonth;
	if (skill < 0)
		skill *= -1;
	skill += (endYear - beginYear) * 12;
	return (skill);
}
/*
 **	/brief 	Comparaison for a sort DESC
 **	/author mbougrin
 **
 **	/param	a is a string compare
 **	/param	b is a string compare
 **	/return	None
 */
function compare(a,b) 
{
	if (a.nb > b.nb)
		return -1;
	if (a.nb < b.nb)
		return 1;
	return 0;
}
/*
 **	/brief 	Print tutorial page into a web site
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function tutorial()
{
	$('.navbar-collapse').collapse('hide');
	document.getElementById("main_div").style.backgroundColor = backgroundColor;
	document.getElementById("main_div").style.padding = "15px";

	document.getElementById(oldpage).className = '';
	oldpage = 'tutorialid';
	document.getElementById(oldpage).className = 'active';
	if (langue == "fr")
		document.getElementById('name_header').innerHTML = "Tutoriel";
	else
		document.getElementById('name_header').innerHTML = "Tutorial"; 
	document.getElementById('main_div').innerHTML = ""; 
}
/*
 **	/brief 	Print aboutme page into a web site
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function aboutme()
{
	$('.navbar-collapse').collapse('hide');
	document.getElementById("main_div").style.backgroundColor = backgroundColor;
	document.getElementById("main_div").style.padding = "15px";

	document.getElementById(oldpage).className = '';
	oldpage = 'aboutmeid';
	document.getElementById(oldpage).className = 'active';
	if (langue == "fr")
		document.getElementById('name_header').innerHTML = "A Propos de Moi";
	else
		document.getElementById('name_header').innerHTML = "About Me";

	var text = "";
	const req = new XMLHttpRequest();
	req.open('GET', 'aboutme.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");

		var mainNode = xmlDoc.getElementsByTagName('aboutme')[0];
		if (langue == "fr")
			text = mainNode.getElementsByTagName('fr')[0].childNodes[0].nodeValue;
		else
			text = mainNode.getElementsByTagName('en')[0].childNodes[0].nodeValue;
	}
	document.getElementById('main_div').innerHTML = parseIntoParagraph(text); 
}
/*
 **	/brief 	Print contact page into a web site
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function contact()
{
	$('.navbar-collapse').collapse('hide');
	document.getElementById("main_div").style.backgroundColor = backgroundColor;
	document.getElementById("main_div").style.padding = "15px";

	document.getElementById(oldpage).className = '';
	oldpage = 'contactid';
	document.getElementById(oldpage).className = 'active';
	document.getElementById('name_header').innerHTML = "Contact";

	const req = new XMLHttpRequest();
	req.open('GET', 'contact.xml', false);
	req.overrideMimeType('text/xml');
	req.send(null);
	if (req.status === 200 && req.readyState === XMLHttpRequest.DONE)
	{
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(req.responseText, "text/xml");

		var mainNode = xmlDoc.getElementsByTagName('contact')[0];

		var github = 	'<div class="btn btn-default" ' + stylea + ' onclick="openInNewTab(' + "'" +
			mainNode.getElementsByTagName('github')[0].childNodes[0].nodeValue + "'"
			+ ');">' + "Github" + '</div>';
		var linkedin = 	'<div class="btn btn-default" ' + stylea + ' onclick="openInNewTab(' + "'" +
			mainNode.getElementsByTagName('linkedin')[0].childNodes[0].nodeValue + "'"
			+ ');">' 
			+ "Linkedin" + '</div>';
		var viadeo = 	'<div class="btn btn-default" ' + stylea + ' onclick="openInNewTab(' + "'" +
			mainNode.getElementsByTagName('viadeo')[0].childNodes[0].nodeValue  + "'"
			+ ');">' + "Viadeo" + '</div>';
		var school = 	'<div class="btn btn-default" ' + stylea + ' onclick="openInNewTab(' + "'" +
			mainNode.getElementsByTagName('school')[0].childNodes[0].nodeValue + "'"
			+ ');">' + 
			"CV 42" + '</a>';
		var email = 	'<a class="btn btn-default" ' + stylea + ' href="' + 
			"mailto:" + 
			mainNode.getElementsByTagName('email')[0].childNodes[0].nodeValue
			+ '">' + "Contact Email" + '</a>';
		var email42 = 	'<a class="btn btn-default" ' + stylea + ' href="' + 
			"mailto:" + 
			mainNode.getElementsByTagName('email42')[0].childNodes[0].nodeValue
			+ '">' + "Contact Email42" + '</a>';
		var pdf = '<a href="#" class="btn btn-default" ' + stylea + ' onclick="pdf()">CV Pdf</a>';
		var style =		"style=font-size:16px;padding-right:15px;height:42px;";
		document.getElementById('main_div').innerHTML = 
			"<table>" +
			"<tr><td " + style + ">MyGithub</td><td>" + github + "</td></tr>" + 
			"<tr><td " + style + ">MyLinkedin</td><td>" + linkedin + "</td></tr>" + 
			"<tr><td " + style + ">MyViadeo</td><td>" + viadeo + "</td></tr>" + 
			"<tr><td " + style + ">MyCV42</td><td>" + school + "</td></tr>" + 
			"<tr><td " + style + ">MyMail</td><td>" + email + "</td></tr>" + 
			"<tr><td " + style + ">MyMail42</td><td>" + email42 + "</td></tr>" + 
			"<tr><td " + style + ">MyCvPdf</td><td>" + pdf + "</td></tr>" + 
			"</table>";
		var form = '<div class="col-md-12"><div class="form-area">' + 
			'<form role="form"><br style="clear:both">' + 
			'<h3 style="margin-bottom: 25px; text-align: center;">Contact Form</h3>' +
			'<div class="form-group">' + 
			'<input type="text" class="form-control" id="name" name="name" placeholder="Name" required>' +
			'</div><div id="name_id"></div><div class="form-group">' + 
			'<input type="text" class="form-control form-control-warning" id="email" name="email" placeholder="Email" required>' + 						
			'</div><div id="email_id"></div><div class="form-group">' + 
			'<input type="text" class="form-control" id="mobile" name="mobile" placeholder="Mobile Number" required>' + 
			'</div><div id="mobile_id"></div><div class="form-group">' + 
			'<input type="text" class="form-control" id="subject" name="subject" placeholder="Subject" required>' +
			'</div><div id="subject_id"></div><div class="form-group">' + 
			'<textarea class="form-control" type="textarea" id="message" placeholder="Message" maxlength="140" rows="7"></textarea>' +
			'<span class="help-block">' +
			'<p id="characterLeft" class="help-block ">140 character limit</p>' +
			'</span></div><div id="message_id"></div>' +
			'<button type="button" id="submit" name="submit" class="btn btn-primary pull-right" onclick="formSendMail()">Submit Form</button>' +
			'</form></div></div>';
		document.getElementById('main_div').innerHTML += form;
	}
}
/*
 **	/brief 	Function for send mail with a form
 **	/author mbougrin
 **
 **	/param	None
 **	/return	None
 */
function formSendMail()
{
	var check = true;
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var reg_number = /^\d+$/;
	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var mobile = document.getElementById('mobile').value;
	var subject = document.getElementById('subject').value;
	var message = document.getElementById('message').value;
	var name_warning = '<div class="alert alert-danger alert-dismissable" style="margin-top:5px;padding-top:5px;padding-bottom:5px;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning!</strong> Le Champs nom est vide.</div>';
	var mail_warning = '<div class="alert alert-danger alert-dismissable" style="margin-top:5px;padding-top:5px;padding-bottom:5px;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning!</strong> Le champs email non valide.</div>';
	var mobile_warning = '<div class="alert alert-danger alert-dismissable" style="margin-top:5px;padding-top:5px;padding-bottom:5px;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning!</strong> Le champs mobile non valide.</div>';
	var subject_warning = '<div class="alert alert-danger alert-dismissable" style="margin-top:5px;padding-top:5px;padding-bottom:5px;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning!</strong> Le champs subject est vide.</div>';
	var message_warning = '<div class="alert alert-danger alert-dismissable" style="margin-top:5px;padding-top:5px;padding-bottom:5px;"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning!</strong> Le champs message est vide.</div>';
	if (name.length == 0)
	{
		check = false;
		document.getElementById('name_id').innerHTML = name_warning;
	}
	else
		document.getElementById('name_id').innerHTML = "";
	if (reg.test(email) == false)
	{
		check = false;
		document.getElementById('email_id').innerHTML = mail_warning;
	}
	else
		document.getElementById('email_id').innerHTML = "";
	if (mobile.length != 10 || reg_number.test(mobile) == false)
	{
		check = false;
		document.getElementById('mobile_id').innerHTML = mobile_warning;
	}
	else
		document.getElementById('mobile_id').innerHTML = "";
	if (subject.length == 0)
	{
		check = false;
		document.getElementById('subject_id').innerHTML = subject_warning;
	}
	else
		document.getElementById('subject_id').innerHTML = "";
	if (message.length == 0)
	{
		check = false;
		document.getElementById('message_id').innerHTML = message_warning;
	}
	else
		document.getElementById('message_id').innerHTML = "";
	if (check == false)
	{
//		setTimeout(function()
//				{
//					document.getElementById('name_id').innerHTML = "";
//					document.getElementById('email_id').innerHTML = "";
//					document.getElementById('mobile_id').innerHTML = "";
//					document.getElementById('subject_id').innerHTML = "";
//					document.getElementById('message_id').innerHTML = "";
//
//				}, 5000);
		return ;
	}
	var link = "mailto:mbougrindev@gmail.com"
		+ "?cc=mbougrin@student.42.fr"
		+ "&subject=" + escape(subject)
		+ "&body=" + escape("Name: " + name + "\nPhone: " + mobile + "\nEmail: " + email + "\n" + message)
		;
	window.location.href = link;
}
/*
 **	/brief 	Function for Open url in a new tab
 **	/author mbougrin
 **
 **	/param	url is a string with a url
 **	/return	None
 */
function openInNewTab(url)
{
	var win = window.open(url, '_blank');
	win.focus();
}
