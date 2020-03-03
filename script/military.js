//load google charts API
google.charts.load('current',{'packages':['corechart']});
google.charts.setOnLoadCallback(drawAllSheets);

function drawAllSheets() {

	drawSheetName('military', 
				  'SELECT A,G',
				  military_pie2016_ResponseHandler);				  
				  
	// drawSheetName('military_percent',
	// 			  'SELECT I,J,K,L,M,N,O,P,Q,R,S',
	// 			  military_percent_ResponseHandler);
	
	drawSheetName('military_percent',
				  'SELECT A, H',
				  military_percent_ResponseHandler);
	
	drawSheetName('compare_percap',
				  'SELECT A,B,E',
				  compare_percap_military_ResponseHandler);

	drawSheetName('growth_abs',
				  'SELECT B,C,D,E,F,G,H',
				  growth_abs_military_ResponseHandler); 

	drawSheetName('growth_percent',
				  'SELECT B,C,D,E,F,G,H',
				  growth_percent_military_ResponseHandler); 				  			                  
} //drawAllSheets

function drawSheetName(sheetName, query, responseHandler) {
	var queryString = encodeURIComponent(query);
	var query = new google.visualization.Query(
		'https://docs.google.com/spreadsheets/d/1qjb5vdA_JAwp6WQ_Y2yRa88Drt8CGHD1k69oMhx7GbE/gviz/tq?sheet=' +
					sheetName + '&headers=1&tq=' + queryString);
	query.send(responseHandler);
}


// military_pie2016_ResponseHandler start here
function military_pie2016_ResponseHandler(response) {
	var data = response.getDataTable();
	var options = {
		width: 600,
		height: 400,
		// backgroundColor: 'none',
	};	
	
	var chart = new google.visualization.PieChart(document.getElementById('military_pie2016_div'));        
	chart.draw(data, options);
}

// military_percentResponseHandler start here
function military_percent_ResponseHandler(response) {
	var data = response.getDataTable();
	var options = {
		colorAxis:'green',
		// backgroundColor: 'none',
	};
		
	var chart = new google.visualization.GeoChart(document.getElementById('military_percent_div'));        
	chart.draw(data, options);
}

//compare_percap_militaryResponseHandler start here
function compare_percap_military_ResponseHandler(response) {
	var data = response.getDataTable();
	var options = {
		hAxis: {title: 'Military Spending per capita($)'},
		vAxis: {title: 'GDP per capita ($) '},
		bubble: {textStyle: {fontSize: 10, bold: true}},
		colors: ['green'],
	};

	var chart = new google.visualization.BubbleChart(document.getElementById('compare_percap_military_div'));
	chart.draw(data, options);
}


function growth_abs_military_ResponseHandler(response) {
	var data = response.getDataTable();
	var options = {
		// backgroundColor: 'none',
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('growth_abs_military_div'));
	chart.draw(data, options);
}


function growth_percent_military_ResponseHandler(response) {
	var data = response.getDataTable();
	var options = {
		vAxis: {title: 'Growth in % '},
		// backgroundColor: 'none',
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('growth_percent_military_div'));
	chart.draw(data, options);
}