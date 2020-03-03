//load google charts API
google.charts.load('current',{'packages':['corechart']});
google.charts.setOnLoadCallback(drawAllSheets);

function drawAllSheets() {	
	drawSheetName('compare_percap',
				  'SELECT A,B,C,D,E',
				  compare_percap_ResponseHandler);

	drawSheetName('compare_overall',
				  'SELECT A,G,H,I',
				  compare_overall_ResponseHandler);			  			                  
} //drawAllSheets

function drawSheetName(sheetName, query, responseHandler) {
	var queryString = encodeURIComponent(query);
	var query = new google.visualization.Query(
		'https://docs.google.com/spreadsheets/d/1qjb5vdA_JAwp6WQ_Y2yRa88Drt8CGHD1k69oMhx7GbE/gviz/tq?sheet=' +
					sheetName + '&headers=1&tq=' + queryString);
	query.send(responseHandler);
}


// compare_percap_ResponseHandler
function compare_percap_ResponseHandler(response) {
	var data = response.getDataTable();
	var options = {
		hAxis: {title: 'Military spending per capita ($)'},
		vAxis: {title: 'Education Spending per capita ($) '},
		bubble: {textStyle: {fontSize: 10, bold: true}, sortBubblesBySize: true},
		colorAxis: {colors: ['orange', 'red']},
	};
  
	var chart = new google.visualization.BubbleChart(document.getElementById('compare_percap_div'));
	chart.draw(data, options);
}

function compare_overall_ResponseHandler(response) {
	var data = response.getDataTable();
	var options = {
		legend: {position: 'top', maxLines: 1},
		bar: {groupWidth: '75%'},
		isStacked: true
	};
  
	var chart = new google.visualization.BarChart(document.getElementById('compare_overall_div'));
	chart.draw(data, options);
}

