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
				y: function (d) { return chartHeight - d.sales; },
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
