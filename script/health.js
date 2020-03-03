google.charts.load('current',{'packages':['corechart']});
google.charts.setOnLoadCallback(drawAllSheets);


function drawAllSheets() {                  
    drawSheetName('health_percent',  
                  // 'SELECT I,J,K,L,M,N,O,P,Q,R,S',
                  'SELECT A,B,C,D,E,F,G',
                  health_percent_ResponseHandler);
 
    drawSheetName('compare_overall',
				  'SELECT A,B,D',
				  compare_overall_health_ResponseHandler);                    
                
    drawSheetName('compare_percap',
				  'SELECT A,D,E',
          compare_percap_health_ResponseHandler);  

    drawSheetName('growth_abs',
				  'SELECT R,S,T,U,V,W,X',
				  growth_abs_health_ResponseHandler); 

	  drawSheetName('growth_percent',
				  'SELECT R,S,T,U,V,W,X',
				  growth_percent_health_ResponseHandler);                             
} //drawAllSheets


function drawSheetName(sheetName, query, responseHandler) {
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1qjb5vdA_JAwp6WQ_Y2yRa88Drt8CGHD1k69oMhx7GbE/gviz/tq?sheet=' +
                    sheetName + '&headers=1&tq=' + queryString);
    query.send(responseHandler);
}



// health_percent_ResponseHandler start here
function health_percent_ResponseHandler(response) {
    var data = response.getDataTable();
    data.sort({column: 6, desc: true});
    var options = {
        vAxis: {title: 'Percent (%)'},
        hAxis: {title: 'Year'},
    };
                
    var chart = new google.visualization.ColumnChart(document.getElementById('health_percent_div'));        
    chart.draw(data, options);
}


// compare_overall_health_ResponseHandler start here
function compare_overall_health_ResponseHandler(response) {

  var data = response.getDataTable();
  data.sort({column: 2, desc: true});

	var options = {


 	};

	var chart = new google.visualization.BarChart(document.getElementById('compare_overall_health_div'));
	chart.draw(data, options);
}

// compare_percap_health_ResponseHandler start here
function compare_percap_health_ResponseHandler(response) {

  var data = response.getDataTable();
  data.sort({column: 2, desc: true});

	var options = {
    // vAxis: {title: 'Per Capita Spending ($)'},
    // hAxis: {title: 'Country'},
     // 
     hAxis: {title: 'health Spending per capita($)'},
     vAxis: {title: 'GDP per capita ($) '},
     bubble: {textStyle: {fontSize: 10, bold: true}},
     colors: ['blue'],
    };

	var chart = new google.visualization.BubbleChart(document.getElementById('compare_percap_health_div'));
	chart.draw(data, options);
}


function growth_abs_health_ResponseHandler(response) {

	var data = response.getDataTable();

	var options = {
		// backgroundColor: 'none',
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('growth_abs_health_div'));
	chart.draw(data, options);
}


function growth_percent_health_ResponseHandler(response) {
	var data = response.getDataTable();
	var options = {
    vAxis: {title: 'Growth in % '},
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('growth_percent_health_div'));
	chart.draw(data, options);
}