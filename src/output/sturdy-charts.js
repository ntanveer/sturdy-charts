var SC = SC || {};
if (!SC.chart) { SC.chart = {}; }

/*global d3 */

var SC = SC || {};
if (!SC.chart) { SC.chart = {}; }

SC.chart.bar = function () {
    "use strict";
    var barHeight = 20,
        color,
        data,
        outerHeight = 270,
        outerWidth = 600,
        svgGroup;

    var margin = { top: 0, right: 0, bottom: 0, left: 0 };
    var innerWidth = function () {
        return outerWidth - margin.left - margin.right;
    };

    var x = d3.scale.linear().range([0, innerWidth()]);

    function chart(elementSelector) {
        var svg = d3.select(elementSelector).append("svg");
        chart.draw(svg);
    }

    chart.draw = function (svg) {
        svgGroup = svg
            .attr("class", "sc-bar-chart")
            .attr("height", outerHeight)
            .attr("width", outerWidth)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        render();
    };

    function render() {
        var bar, rect;
        x.domain([0, d3.max(data, function (d) { return d.value; })]);

        bar = svgGroup.selectAll("g")
            .data(data, function (d) { return d.key; });

        bar.enter().append("g")
            .attr("class", "bar")
            .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

        rect = bar.append("rect")
            .attr("width", function (d) { return x(d.value); })
            .attr("height", barHeight - 1);

        if (color) {
            rect.attr("style", function (d) { return "fill: " + color(d.key); });
        }

        bar.append("text")
            .attr("x", "10px")
            .attr("y", barHeight / 2)
            .attr("dy", ".30em")
            .text(function (d) { return d.label || d.key; });

        bar.exit().remove();
    }

    chart.color = function (value) {
        if (!arguments.length) {
            return color;
        }
        color = value;

        return chart;
    };

    chart.data = function (values) {
        if (!arguments.length) {
            return data;
        }
        data = values;

        return chart;
    };

    chart.height = function (value) {
        if (!arguments.length) {
            return outerHeight;
        }
        outerHeight = value;

        return chart;
    };

    chart.margin = function (value) {
        if (!arguments.length) {
            return margin;
        }
        margin = value;
        x.range([0, innerWidth()]);

        return chart;
    };

    chart.updateData = function (values) {
        data = values;
        render();

        return chart;
    };

    chart.width = function (value) {
        if (!arguments.length) {
            return outerWidth;
        }
        outerWidth = value;
        x.range([0, innerWidth()]);

        return chart;
    };

    return chart;
};

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


// SC.chart.line = function() {
// 	"use strict";
// 	var colour_palette = ["#184064", "#5B3160", "#AB162B", "#2E5E86", "#EE5533", "#761A81", "#799900", "#CF0A2C", "#007AB1", "#F78600", "#8F10AF", "#AAB300", "#F2022B", "#0395D7", "#F7A700", "#C606E9", "#B8D22A", "#E14646", "#1B344A"],
// 		// autoXDomain = true,
// 		// autoYDomain = true,
// 		// chartRendered = false,
// 		color = d3.scale.ordinal().range(colour_palette),
// 		clipPathId = 'clipPath' + Math.random().toString(36).substr(2, 9),
// 		data,
// 		// drawAxis = true,
// 		// drawAxisTicks = true,
// 		// drawFocusLine = false,
// 		// drawGrid = false,
// 		// focus,
// 		// focusDate,
// 		// focusDateText,
// 		// focusValue,
// 		// focusValueRect,
// 		// focusValueText,
// 		metricsGroup,
// 		metricPaths,
// 		// negativeThreshold,
// 		// outerHeight = 270,
// 		// outerWidth = 600,
// 		// positiveThreshold,
// 		svgGroup; //,
// 		// xTicks = 6,
// 		// yTicks = 10;

// 	var margin = { top: 1, right: 1, bottom: 1, left: 1 };
// 	var innerWidth = function() {
// 		return outerWidth - margin.left - margin.right;
// 	};
// 	var innerHeight = function() {
// 		return outerHeight - margin.top - margin.bottom;
// 	};

// 	var x = d3.time.scale()
// 		.range([0, innerWidth()]);
// 	var y = d3.scale.linear()
// 		.range([innerHeight(), 0]);

// 	var line = d3.svg.line()
// 		.x(function(d) { return x(d.date); })
// 		.y(function(d) { return y(d.value); });

// 	// var minMax = function(nest, prop) {
// 	// 	var e, gather = [];
// 	// 	nest.forEach(function(o) {
// 	// 		e = d3.extent(o.values, function(d) { return d[prop]; });
// 	// 		gather = [].concat(gather, e);
// 	// 	});
// 	// 	return d3.extent(gather);
// 	// };

// 	// var focusDateFormatter = d3.time.format("%b %-d, %Y");
// 	// var focusValueFormatter = d3.format(",.0f");

// 	function chart(elementSelector) {
// 		var svg = d3.select(elementSelector).append("svg");
// 		// resetDomain();
// 		chart.draw(svg);
// 	}

// 	chart.draw = function(svg) {
// 		svgGroup = svg
// 			.attr("class", "sc-line-chart")
// 			.attr("height", outerHeight)
// 			.attr("width", outerWidth)
// 			.append("g")
// 			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 		svgGroup.append("defs").append("clipPath")
// 			.attr("id", clipPathId)
// 			.append("rect")
// 			.attr("width", innerWidth())
// 			.attr("height", innerHeight());

// 		// if (drawGrid) {
// 		// 	renderGrid();
// 		// }

// 		// if (negativeThreshold) {
// 		// 	svgGroup.append("line")
// 		// 		.attr("y1", y(negativeThreshold))
// 		// 		.attr("y2", y(negativeThreshold))
// 		// 		.attr("x1", 0)
// 		// 		.attr("x2", innerWidth())
// 		// 		.attr("class", "negative threshold");
// 		// }

// 		// if (positiveThreshold) {
// 		// 	svgGroup.append("line")
// 		// 		.attr("y1", y(positiveThreshold))
// 		// 		.attr("y2", y(positiveThreshold))
// 		// 		.attr("x1", 0)
// 		// 		.attr("x2", innerWidth())
// 		// 		.attr("class", "positive threshold");
// 		// }

// 		metricsGroup = svgGroup.append("g")
// 			.attr("class", "metrics-group");
// 		plotLines();

// 		// if (drawAxis) {
// 		// 	renderAxis();
// 		// }

// 		// if (drawFocusLine) {
// 		// 	renderFocusLine();
// 		// }
// 		// chartRendered = true;
// 	};

// 	// function renderGrid() {
// 	// 	svgGroup.append("g")
// 	// 		.attr("class", "x grid")
// 	// 		.attr("transform", "translate(0," + innerHeight() + ")")
// 	// 		.call(make_x_axis()
// 	// 			.tickSize(-innerHeight(), 0, 0)
// 	// 			.tickFormat(""));

// 	// 	svgGroup.append("g")
// 	// 		.attr("class", "y grid")
// 	// 		.call(make_y_axis()
// 	// 			.tickSize(-innerWidth(), 0, 0)
// 	// 			.tickFormat(""));
// 	// }

// 	// function renderAxis() {
// 	// 	svgGroup.append("g")
// 	// 		.attr("class", "x axis")
// 	// 		.attr("transform", "translate(0," + innerHeight() + ")")
// 	// 		.call(drawAxisTicks ? make_x_axis() : make_x_axis().outerTickSize(0).ticks(0));

// 	// 	svgGroup.append("g")
// 	// 		.attr("class", "y axis")
// 	// 		.call(drawAxisTicks ? make_y_axis() : make_y_axis().outerTickSize(0).ticks(0));
// 	// }

// 	// function renderFocusLine() {
// 	// 	focus = svgGroup.append("g")
// 	// 		.attr("class", "focus")
// 	// 		.style("display", "none");

// 	// 	focus.append("line")
// 	// 		.attr("x1", 0)
// 	// 		.attr("y1", 0)
// 	// 		.attr("x2", 0)
// 	// 		.attr("y2", innerHeight());

// 	// 	focusValue = focus.append("g")
// 	// 		.attr("class", "focus-value");
// 	// 	focusValueRect = focusValue.append("path")
// 	// 		.attr("d", "M-50,12.5L-43.75,0L50,0L50,25L-43.75,25Z");
// 	// 	focusValueText = focusValue.append("text")
// 	// 		.attr("x", 0)
// 	// 		.attr("y", 12.5)
// 	// 		.attr("dy", ".35em");

// 	// 	focusDate = focus.append("g")
// 	// 		.attr("class", "focus-date");
// 	// 	focusDate.append("rect")
// 	// 		.attr("x", -50)
// 	// 		.attr("y", 0)
// 	// 		.attr("width", 100)
// 	// 		.attr("height", 25);
// 	// 	focusDateText = focusDate.append("text")
// 	// 		.attr("x", 0)
// 	// 		.attr("y", 12.5)
// 	// 		.attr("dy", ".35em");

// 	// 	svgGroup.append("rect")
// 	// 		.attr("class", "overlay")
// 	// 		.attr("width", innerWidth())
// 	// 		.attr("height", innerHeight())
// 	// 		.on("mouseover", function() { focus.style("display", null); })
// 	// 		.on("mouseout", function() { focus.style("display", "none"); })
// 	// 		.on("mousemove", mousemove);
// 	// }

// 	// function mousemove() {
// 	// 	var mousePosition = d3.mouse(this);
// 	// 	focus.attr("transform", "translate(" + mousePosition[0] + ",0)");
// 	// 	var date = x.invert(mousePosition[0]);
// 	// 	var value = y.invert(mousePosition[1]);
// 	// 	focusDateText.text(focusDateFormatter(date));

// 	// 	if (mousePosition[0] < 50) {
// 	// 		focusDate.attr("transform", "translate(" + (50 - mousePosition[0]) + "," + innerHeight() + ")");
// 	// 	} else if ((innerWidth() - mousePosition[0]) < 50) {
// 	// 		focusDate.attr("transform", "translate(" + (-50 + (innerWidth() - mousePosition[0])) + "," + innerHeight() + ")");
// 	// 	} else {
// 	// 		focusDate.attr("transform", "translate(0," + innerHeight() + ")");
// 	// 	}

// 	// 	var closest = findClosestLine(mousePosition);
// 	// 	if (typeof closest == "undefined") {
// 	// 		focusValue.style("display", "none");
// 	// 	} else {
// 	// 		focusValueText.text(focusValueFormatter(value));
// 	// 		if (mousePosition[0] > innerWidth() - 100) {
// 	// 			focusValueText.attr("transform", "scale(-1,1)");
// 	// 		} else {
// 	// 			focusValueText.attr("transform", "");
// 	// 		}

// 	// 		var rect = focusValueRect;
// 	// 		var key = closest.metric.key;
// 	// 		var fillColor = color(key);
// 	// 		rect.attr("style", "fill: " + fillColor);
// 	// 		var transform = "";
// 	// 		if (mousePosition[0] > innerWidth() - 100) {
// 	// 			transform += "scale(-1,1) ";
// 	// 		}
// 	// 		transform += "translate(50, " + (mousePosition[1] - 12.5) + ")";
// 	// 		focusValue.style("display", null)
// 	// 			.attr("transform", transform);
// 	// 	}
// 	// }

// 	// function findYatXbyBisection(X, path, error) {
// 	// 	var length_end = path.getTotalLength(),
// 	// 		length_start = 0,
// 	// 		point = path.getPointAtLength((length_end + length_start) / 2),
// 	// 		bisection_iterations_max = 50,
// 	// 		bisection_iterations = 0;

// 	// 	error = error || 0.01;

// 	// 	while (X < point.x - error || X > point.x + error) {
// 	// 		point = path.getPointAtLength((length_end + length_start) / 2);

// 	// 		if (X < point.x) {
// 	// 			length_end = (length_start + length_end) / 2;
// 	// 		} else {
// 	// 			length_start = (length_start + length_end) / 2;
// 	// 		}

// 	// 		if (bisection_iterations_max < ++bisection_iterations)
// 	// 			break;
// 	// 	}
// 	// 	return point.y;
// 	// }

// 	// function findClosestLine(c) {
// 	// 	var closest;
// 	// 	metricPaths.forEach(function(o) {
// 	// 		var Y = findYatXbyBisection(c[0], o.path);
// 	// 		var dist = Math.abs(Y - c[1]);
// 	// 		if (dist < 10) {
// 	// 			if (typeof closest == "undefined") {
// 	// 				closest = {
// 	// 					"metric": o.metric,
// 	// 					"dist": dist
// 	// 				};
// 	// 			} else {
// 	// 				if (dist < closest.dist) {
// 	// 					closest = {
// 	// 						"metric": o.metric,
// 	// 						"dist": dist
// 	// 					};
// 	// 				}
// 	// 			}
// 	// 		}
// 	// 	});
// 	// 	return closest;
// 	// }

// 	function plotLines() {
// 		var metrics = metricsGroup.selectAll(".metric")
// 			.data(data, function(d) { return d.key; });

// 		metrics.selectAll("path")
// 			.attr("d", function(d) { return line(d.values); });

// 		metrics.enter().append("g")
// 			.attr("class", "metric")
// 			.attr("clip-path", "url(#" + clipPathId + ")")
// 			.append("path")
// 			.attr("class", "line")
// 			.attr("d", function(d) { return line(d.values); })
// 			.style("stroke", function(d) {
// 				return color(d.key);
// 			});

// 		metrics.exit().remove();

// 		updateMetricPaths();
// 	}

// 	function updateMetricPaths() {
// 		metricPaths = [];
// 		metricsGroup.selectAll("path").each(function(d) {
// 			metricPaths.push({
// 				"metric": d,
// 				"path": this
// 			});
// 		});
// 	}

// 	// function resetDomain() {
// 	// 	resetXDomain();
// 	// 	resetYDomain();
// 	// }

// 	// function resetXDomain() {
// 	// 	if (autoXDomain) {
// 	// 		var extent = minMax(data, "date");
// 	// 		x.domain(extent);
// 	// 	}
// 	// }

// 	// function resetYDomain() {
// 	// 	if (autoYDomain) {
// 	// 		var extent = minMax(data, "value");
// 	// 		y.domain(extent);
// 	// 	}
// 	// }

// 	// function make_x_axis() {
// 	// 	return d3.svg.axis()
// 	// 		.scale(x)
// 	// 		.ticks(xTicks)
// 	// 		.orient("bottom");
// 	// }

// 	// function updateXAxis() {
// 	// 	if (drawAxis) {
// 	// 		svgGroup.select(".x.axis")
// 	// 			.call(make_x_axis());
// 	// 	}

// 	// 	if (drawGrid) {
// 	// 		svgGroup.select(".x.grid")
// 	// 			.call(make_x_axis()
// 	// 				.tickSize(-innerHeight(), 0, 0)
// 	// 				.tickFormat(""));
// 	// 	}
// 	// }

// 	// function make_y_axis() {
// 	// 	return d3.svg.axis()
// 	// 		.scale(y)
// 	// 		.ticks(yTicks)
// 	// 		.orient("left");
// 	// }

// 	// function updateYAxis() {
// 	// 	if (drawAxis) {
// 	// 		svgGroup.select(".y.axis")
// 	// 			.call(make_y_axis());
// 	// 	}

// 	// 	if (drawGrid) {
// 	// 		svgGroup.select(".y.grid")
// 	// 			.call(make_y_axis()
// 	// 				.tickSize(-innerWidth(), 0, 0)
// 	// 				.tickFormat(""));
// 	// 	}
// 	// }

// 	function wrapData(d) {
// 		if (Array.isArray(d) &&
// 			d.length > 0 &&
// 			!d[0].hasOwnProperty("key")) {
// 			return [
// 				{
// 					key: "data" + Math.random().toString(36).substr(2, 9),
// 					values: d
// 				}
// 			];
// 		}
// 		return d;
// 	}

// 	// chart.color = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return color;
// 	// 	}
// 	// 	color = value;

// 	// 	return chart;
// 	// };

// 	chart.data = function(values) {
// 		if (!arguments.length) {
// 			return data;
// 		}
// 		data = wrapData(values);

// 		return chart;
// 	};

// 	// chart.xDomain = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return x.domain();
// 	// 	}

// 	// 	if (value) {
// 	// 		autoXDomain = false;
// 	// 		x.domain(value);
// 	// 	} else {
// 	// 		autoXDomain = true;
// 	// 		resetXDomain();
// 	// 	}
// 	// 	if (chartRendered) {
// 	// 		plotLines();
// 	// 		updateXAxis();
// 	// 	}

// 	// 	return chart;
// 	// };

// 	// chart.yDomain = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return y.domain();
// 	// 	}

// 	// 	if (value) {
// 	// 		autoYDomain = false;
// 	// 		y.domain(value);
// 	// 	} else {
// 	// 		autoYDomain = true;
// 	// 		resetYDomain();
// 	// 	}
// 	// 	if (chartRendered) {
// 	// 		plotLines();
// 	// 		updateYAxis();
// 	// 	}

// 	// 	return chart;
// 	// };

// 	// chart.drawAxis = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return drawAxis;
// 	// 	}
// 	// 	drawAxis = value;

// 	// 	return chart;
// 	// };

// 	// chart.drawAxisTicks = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return drawAxisTicks;
// 	// 	}
// 	// 	drawAxisTicks = value;

// 	// 	return chart;
// 	// };

// 	// chart.drawFocusLine = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return drawFocusLine;
// 	// 	}
// 	// 	drawFocusLine = value;

// 	// 	return chart;
// 	// };

// 	// chart.drawGrid = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return drawGrid;
// 	// 	}
// 	// 	drawGrid = value;

// 	// 	return chart;
// 	// };

// 	chart.height = function(value) {
// 		if (!arguments.length) {
// 			return outerHeight;
// 		}
// 		outerHeight = value;
// 		y.range([innerHeight(), 0]);

// 		return chart;
// 	};

// 	// chart.margin = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return margin;
// 	// 	}
// 	// 	margin = value;
// 	// 	x.range([0, innerWidth()]);
// 	// 	y.range([innerHeight(), 0]);

// 	// 	return chart;
// 	// };

// 	// chart.negativeThreshold = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return negativeThreshold;
// 	// 	}
// 	// 	negativeThreshold = value;

// 	// 	return chart;
// 	// };

// 	// chart.positiveThreshold = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return positiveThreshold;
// 	// 	}
// 	// 	positiveThreshold = value;

// 	// 	return chart;
// 	// };

// 	// chart.updateData = function(values, updateX, updateY) {
// 	// 	if (typeof updateX === 'undefined') updateX = true;
// 	// 	if (typeof updateY === 'undefined') updateY = true;

// 	// 	data = wrapData(values);

// 	// 	if (updateX) {
// 	// 		resetXDomain();
// 	// 	}
// 	// 	if (updateY) {
// 	// 		resetYDomain();
// 	// 	}

// 	// 	if (chartRendered) {
// 	// 		plotLines();

// 	// 		if (updateX) {
// 	// 			updateXAxis();
// 	// 		}
// 	// 		if (updateY) {
// 	// 			updateYAxis();
// 	// 		}
// 	// 	}

// 	// 	return chart;
// 	// };

// 	chart.width = function(value) {
// 		if (!arguments.length) {
// 			return outerWidth;
// 		}
// 		outerWidth = value;
// 		x.range([0, innerWidth()]);

// 		return chart;
// 	};

// 	// chart.xTicks = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return xTicks;
// 	// 	}
// 	// 	xTicks = value;

// 	// 	return chart;
// 	// };

// 	// chart.yTicks = function(value) {
// 	// 	if (!arguments.length) {
// 	// 		return yTicks;
// 	// 	}
// 	// 	yTicks = value;

// 	// 	return chart;
// 	// };

// 	return chart;
// };

/*global d3 */

!(function(SC) {
    if (!SC.layouts) SC.layouts = {};
    SC.layouts.pie = d3.layout.pie()
		.sort(null)
		.startAngle(0)
		.endAngle(2 * Math.PI)
		.value(function (d) { return d.values; });
})(SC);


!(function(SC) {
    if (!SC.common) SC.common = {};
    SC.common.keyFunction = function (dataValues) {
		var index = d3.range(dataValues.length);
		var keyData = [];
		index.forEach(function (i) {
			keyData[i] = { data: dataValues[i] };
		});
		return keyData;
	};
})(SC);



!(function(SC) {
SC.chart.pie = function () {
	"use strict";
	var data,
		outerHeight = 256,
		outerWidth = 600,
		pieChartWidth,
		keyChartWidth,
		svgGroup,
		keyIndicatorContainer,
		pieContainerSelector,
		options = {},
		keyColours = ["#256194", "#0494d7", "#8fb7e1", "#a3cf5d", "#7a9900", "#d00a2d", "#f15c21", "#fcce07", "#a743b3", "#593d83", "#65656a", "#193b53"],
		pieChartColours = d3.scale.ordinal().range(keyColours),
		container,
		pieChart,
		keyIndicator;

	function chart(elementSelector) {
		chart.reDrawChart(elementSelector);
	}

	chart.reDrawChart = function (elementSelector) {
		if (container) {
			container.remove();
		}

		if (options.HideLegend === true) {
			if (outerWidth > outerHeight) {
				pieChartWidth = outerHeight;
			} else {
				pieChartWidth = outerWidth;
			}
		} else {
			if (outerWidth / 2 > outerHeight) {
				pieChartWidth = outerHeight;
			} else {
				pieChartWidth = outerWidth / 2;
			}

			keyChartWidth = outerWidth - pieChartWidth;
		}

		pieContainerSelector = elementSelector;
		container = d3.select(elementSelector).append('div')
			.attr("class", "sc-pie-chart-container")
			.attr("height", outerHeight);

		this.drawChart();
	};

	chart.drawChart = function () {
		pieChart = container.append("div")
		.attr("class", "sc-pie-chart")
		.attr("width", pieChartWidth)
		.attr("height", outerHeight);

		pieChart.append("div")
			.attr("class", "sc-pie-chart-refresh-icon")
			.style("display", "none");

		var svg = pieChart.append("svg");

		if (options.HideLegend !== true) {
			keyIndicator = container
				.append("div")
				.attr("class", "sc-pie-chart-key")
				.style("width", keyChartWidth + 'px')
				.attr("height", outerHeight);

			if (data !== undefined && data.values.length > 0) {
				chart.drawKey(keyIndicator);
			}
			chart.drawPieChart(svg);

			return chart;
		}
	};

	chart.drawPieChart = function (svg) {
		svgGroup = svg
			.attr("height", outerHeight)
			.attr("width", pieChartWidth)
			.append("g")
			.attr("transform",
				"translate(" + pieChartWidth / 2 + "," + outerHeight / 2 + ")");

		drawArcs();
	};

	chart.drawKey = function (keyIndicator) {
		if (options.HideLegend === true) {
			return;
		}

		keyIndicator.append("div").attr('class', 'sc-pie-chart-keyHeader').text(data.title);
		var keyValues = SC.common.keyFunction(data.values);

		keyIndicatorContainer = keyIndicator.append("div");
		var list = keyIndicatorContainer.append('ul');
		var li = list.selectAll("li")
			.data(keyValues)
			.enter()
			.append("li").style("cursor", function (d) {
				return (d.data.url !== "other") ? "default" : "pointer";
			});

		var animationType = $(pieContainerSelector).data('animation-type') || 'exp-in-out';

		var animationSpeed = $(pieContainerSelector).data('animation-speed') || 1200;


		var KeyAnimationType = $(pieContainerSelector).data('key-animation-type') || animationType;

		var KeyAnimationSpeed = $(pieContainerSelector).data('key-animation-speed') || animationSpeed;

		li.append('div')
			.transition()
			.duration(KeyAnimationSpeed)
			.ease(KeyAnimationType)
			.style('width', '1.125em')
			.style('height', '1.125em')
			.style('background-color', function (d, i) { return keyColours[i]; });

		var keyText = li.append('div')
			.text(function (d) {
                return d.data.key;
            })
			.style('opacity', '0');

		keyText.transition()
			.duration(KeyAnimationSpeed)
			.ease(KeyAnimationType)
			.style('opacity', '1');
	};

	function drawArcs() {
		var arc = d3.svg.arc();

		var chartType = $(pieContainerSelector).data('chart-type') || 'pie';

		var animationType = $(pieContainerSelector).data('animation-type') || 'exp-in-out';

		var animationSpeed = $(pieContainerSelector).data('animation-speed') || 1200;

		if (options.HideLegend === true) {
				arc.outerRadius(outerHeight / 2.5)
					.innerRadius(0);
		} else {
            if ((outerWidth / 2) > outerHeight) {
                arc.outerRadius(outerHeight / 2.5)
                    .innerRadius(0);
            } else {
                arc.outerRadius(outerWidth / 4.5)
                    .innerRadius(0);
            }
		}

		var pieValues = SC.layouts.pie(data.values);

        var g = svgGroup.selectAll(".arc")
            .data(pieValues)
            .enter().append("g")
            .attr("class", "arc")
                .each(function (arc) {
                    if (isNaN(arc.startAngle))
                        arc.startAngle = 0;

                    if (isNaN(arc.endAngle))
                        arc.endAngle = 0;
                });

        g.append("path")
            .attr("d", arc)
                .style("fill", function (d, i) { return pieChartColours(i); })
            .transition()
            .ease(animationType)
            .duration(animationSpeed)
            .attrTween("d", tweenPie)
                .style("cursor", function (d) {
                    return (d.data.url !== "other") ? "default" : "pointer";
                });

		function drawEmptyPieChart() {
			var grads = svgGroup.append("defs").selectAll("radialGradient").data(SC.layouts.pie(pieValues))
			.enter().append("radialGradient")
			.attr("gradientUnits", "userSpaceOnUse")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", "50%")
			.attr("id", function (d, i) { return "grad" + i; });

			svgGroup.selectAll("path")
				.data(SC.layouts.pie(pieValues))
				.enter().append("path")
				.attr("fill", function (d, i) { return "url(#grad" + i + ")"; })
				.attr("d", arc);
		}

		function tweenPie(b) {
			var i = d3.interpolate({ startAngle: 0 * Math.PI, endAngle: 0 * Math.PI }, b);
			return function (t) {
				return arc(i(t));
			};
		}
	}

	chart.on = function (type, listener) {
		if (listener) {
			if (svgGroup) {
				svgGroup.selectAll("path")
					.on(type, listener);
			}
			if (keyIndicatorContainer) {
				keyIndicatorContainer.selectAll("li")
					.on(type, listener);
			}
		}
		return chart;
	};

	chart.colors = function (value) {
		if (!arguments.length) {
			return keyColours;
		}
		keyColours = value;
		pieChartColours = d3.scale.ordinal().range(keyColours);

		return chart;
	};

	chart.data = function (values) {
		data = values;
		return chart;
	};

	chart.height = function (value) {
		if (!arguments.length) {
			return outerHeight;
		}

		if (value > 0) {
			outerHeight = value;
		}

		return chart;
	};

	chart.width = function (value) {
		if (!arguments.length) {
			return outerWidth;
		}
		outerWidth = value;

		return chart;
	};

	chart.updateData = function (values) {
		data = values;
		drawArcs();

		return chart;
	};

	chart.options = function (value) {
		if (!arguments.length) {
			return options;
		}
		options = $.extend(options, value);

		return chart;
	};

	chart.updateChart = function () {
		if (container) {
			if (pieChart) {
				pieChart.remove();
			}
			if (keyIndicator) {
				keyIndicator.remove();
			}
		}

		this.drawChart();
	};

	return chart;
	};
})(SC);
