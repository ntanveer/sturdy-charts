var SC = SC || {};
if (!SC.chart) { SC.chart = {}; }

SC.chart.scatter = function () {

	var chartData, chartWidth, chartHeight;

	function chart(elementSelector) {
		var svg = d3.select(elementSelector).append("svg");
		chart.draw(svg);
	}

	chart.data = function (data) {
		chartData = data;
		return chart;
	};

	chart.height = function (value) {
		chartHeight = value;
		return chart;
	};

	chart.width = function (value) {
		chartWidth = value;
		return chart;
	};

	chart.draw = function (svg) {
		//KPI color
		function salesKPI(d) {
			if (d >= 250) { return "#33CC66"; } else
				if (d < 250) { return "#666666"; }
		}

		//create our SVG
		svg.attr({ width: chartWidth, height: chartHeight });

		//add min/max to array
		Array.max = function (array) {
			return Math.max.apply(Math, array);
		};

		Array.min = function (array) {
			return Math.min.apply(Math, array);
		};

		//function for showing labels
		function showMinMax(ds, col, val, type) {
			var max = d3.max(ds, function (d) { return d[col]; });
			var min = d3.min(ds, function (d) { return d[col]; });

			if (type == 'minmax' && (val == max || val == min)) {
				return val;
			} else

				if (type == 'all') {
					return val;
				}

		}
		//add dots
		var dots = svg.selectAll("circle")
			.data(chartData)
			.enter()
			.append("circle")
			.attr({
				cx: function (d) { return d.month * 3; },
				cy: function (d) { return chartHeight - d.sales; },
				r: 5,
				"fill": function (d) { return salesKPI(d.sales); }
			});

		var labels = svg.selectAll("text")
			.data(chartData)
			.enter()
			.append("text")
			.text(function (d) { return showMinMax(chartData, 'sales', d.sales, 'minmax'); })
			.attr({
				x: function (d) { return (d.month * 3) - 25; },
				y: function (d) { return chartHeight - d.sales; },
				"font-size": "12px",
				"font-family": "sans-serif",
				"fill": "#666666",
				"text-anchor": "start"
			});
	};

	return chart;
};