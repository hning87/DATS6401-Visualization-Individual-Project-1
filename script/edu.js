google.charts.load('current',{'packages':['corechart']});
google.charts.setOnLoadCallback(drawAllSheets);


function drawAllSheets() {                  
    drawSheetName('edu_percent',  
                //   'SELECT I,J,K,L,M,N,O,P,Q,R,S',
                  'SELECT A,B,C,D,E,F,G',
                  edu_percent_ResponseHandler);
 
    drawSheetName('compare_overall',
				  'SELECT A,B,C',
				  compare_overall_edu_ResponseHandler);                    
                
    drawSheetName('compare_percap',
				  'SELECT A,C,E',
          compare_percap_edu_ResponseHandler);  
    
    drawSheetName('growth_abs',
				  'SELECT J,K,L,M,N,O,P',
				  growth_abs_edu_ResponseHandler); 

	  drawSheetName('growth_percent',
				  'SELECT J,K,L,M,N,O,P',
				  growth_percent_edu_ResponseHandler);                             
} //drawAllSheets


function drawSheetName(sheetName, query, responseHandler) {
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1qjb5vdA_JAwp6WQ_Y2yRa88Drt8CGHD1k69oMhx7GbE/gviz/tq?sheet=' +
                    sheetName + '&headers=1&tq=' + queryString);
    query.send(responseHandler);
}



// edu_percentResponseHandler start here
function edu_percent_ResponseHandler(response) {
    var data = response.getDataTable();
    data.sort({column: 6, desc: true});
    var options = {
        vAxis: {title: 'Percent (%)'},
        hAxis: {title: 'Year', "type":"string", showTextEvery:1},
    };
        
        
    var chart = new google.visualization.ColumnChart(document.getElementById('edu_percent_div'));        
    chart.draw(data, options);
}


// compare_overall_edu_ResponseHandler start here
function compare_overall_edu_ResponseHandler(response) {

	var data = response.getDataTable();

	var options = {
        bars: 'horizontal'
 	};

	var chart = new google.visualization.BarChart(document.getElementById('compare_overall_edu_div'));
	chart.draw(data, options);
}

// compare_percap_eduResponseHandler start here
function compare_percap_edu_ResponseHandler(response) {
	var data = response.getDataTable();
	var options = {
	  hAxis: {title: 'Education Spending per capita($)'},
      vAxis: {title: 'GDP per capita ($) '},
	  bubble: {textStyle: {fontSize: 10, bold: true}},
	  colors: ['red'],
	};

	var chart = new google.visualization.BubbleChart(document.getElementById('compare_percap_edu_div'));
	chart.draw(data, options);
}


function growth_abs_edu_ResponseHandler(response) {

	var data = response.getDataTable();

	var options = {
		// backgroundColor: 'none',
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('growth_abs_edu_div'));
	chart.draw(data, options);
}


function growth_percent_edu_ResponseHandler(response) {
	var data = response.getDataTable();
	var options = {
    vAxis: {title: 'Growth in % '},
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('growth_percent_edu_div'));
	chart.draw(data, options);
}