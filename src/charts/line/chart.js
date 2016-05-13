var SC = SC || {};
if (!SC.chart) { SC.chart = {}; }

SC.chart.line = function () {

	var chartData, chartWidth, chartHeight;

	function chart(elementSelector) {
		var svg = d3.select(elementSelector).append("svg");
		chart.draw(svg);
	}

	chart.data = function (data) {
		chartData = data;
		return chart;
	};
	
	chart.height = function(value) {
		chartHeight = value;
		return chart;
	};
	
	chart.width = function(value) {
		chartWidth = value;
		return chart;
	};

	chart.draw = function (svg) {
		var lineFun = d3.svg.line()
			.x(function (d) { return d.month * 3; })
			.y(function (d) { return chartHeight - d.sales; })
			.interpolate("linear");

		svg.attr({ width: chartWidth, height: chartHeight });

		//build the viz
		var viz = svg.append("path")
			.attr({
				d: lineFun(chartData),
				"stroke": "purple",
				"stroke-width": 2,
				"fill": "none"
			});


		//add labels
		var labels = svg.selectAll("text")
			.data(chartData)
			.enter()
			.append("text")
			//.text(function(d){ return d.sales; } )
			.text(function (d) { return d.sales; })
			.attr({
				x: function (d) { return (d.month * 3) - 25; },
				y: function (d) { return h - d.sales; },
				"font-size": "12px",
				"font-family": "sans-serif",
				"fill": "#666666",
				"text-anchor": "start",
				"dy": ".35em",
				"font-weight": function (d, i) {
					if (i === 0 || i == (chartData.length - 1)) {
						return "bold";
					}
					else {
						return "normal";
					}
				}
			});
	};

	return chart;
};