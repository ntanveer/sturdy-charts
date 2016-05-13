var keyValueData, barData, lineData;

function visualizePie() {
	var pieChart = SC.chart.pie();
		var pieElement = $('#pie-container');
		pieChart
		.data(keyValueData)
		.height(250)
		.width(500)
		.options({ valueKey: 'taxable' });
		if (pieElement) {
		pieChart(pieElement[0]);
		}
};

function visualizeBar() {
  var barChart = SC.chart.bar();
	var barElement = $('#bar-container');

	barChart
		.data(barData)
		.height(130)
		.width(300)
		.color(d3.scale.category20());

		barChart(barElement[0]);
}

function generateBarData(d) {
		var newData = $.map(d.values, function (o) {
		return {
			key: o.key,
			value: o.values,
			label: o.values
		};
		}).sort(function (a, b) {
		return d3.ascending(a.key, b.key);
		});
		return newData;
};

$(document).ready(function () {

	d3.json("../data/products.json", function (error, json) {
		if (error) return console.warn(error);
		keyValueData = {
			values: d3.nest()
        .key(function (d) { return d.taxable; })
        .rollup(function (d) {
          return d3.sum(d, function (g) { return g.price; });
        }).entries(json)
		};

		visualizePie();

		barData = generateBarData(keyValueData);
		visualizeBar();
	});

	d3.json("../data/monthlySales.json", function (error, json) {
		var lineChart = SC.chart.line();
		lineChart
			.data(json)
			.height(350)
			.width(400);

		var scatterChart = SC.chart.scatter();
		scatterChart
			.data(json)
			.height(350)
			.width(400);

		scatterChart("#scatter-container");
		lineChart("#line-container");
	});
});
