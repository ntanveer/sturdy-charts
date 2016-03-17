var data; // a global

function visualizeit() {
    var pieChart = SC.chart.pie();
		var element = $('#chart-container');
		pieChart
			.data(data)
			.height(250)
			.width(500)
            .options({ valueKey : 'taxable' });
		if (element) {
			pieChart(element[0]);
		}
};

$( document ).ready(function() {
    d3.json("../data/products.json", function(error, json) {
      if (error) return console.warn(error);
      data = { values: d3.nest()
        .key(function(d) { return d.taxable;})
        .rollup(function(d) {
          return d3.sum(d, function(g) {return g.price; });
        }).entries(json)};

      visualizeit();
    });
});
