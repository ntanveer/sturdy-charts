/*global d3 */

var SC = SC || {};
if (!SC.chart) { SC.chart = {}; }

SC.chart.bar = function() {
	"use strict";
	var barHeight = 20,
		color,
		data,
		outerHeight = 270,
		outerWidth = 600,
		svgGroup;

	var margin = { top: 0, right: 0, bottom: 0, left: 0 };
	var innerWidth = function() {
		return outerWidth - margin.left - margin.right;
	};

	var x = d3.scale.linear().range([0, innerWidth()]);

	function chart(elementSelector) {
		var svg = d3.select(elementSelector).append("svg");
		chart.draw(svg);
	}

	chart.draw = function(svg) {
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
		x.domain([0, d3.max(data, function(d) { return d.value; })]);

		bar = svgGroup.selectAll("g")
			.data(data, function(d) { return d.key; });

		bar.enter().append("g")
			.attr("class", "bar")
			.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

		rect = bar.append("rect")
			.attr("width", function(d) { return x(d.value); })
			.attr("height", barHeight - 1);

		if (color) {
			rect.attr("style", function(d) { return "fill: " + color(d.key); });
		}

		bar.append("text")
			.attr("x", "10px")
			.attr("y", barHeight / 2)
			.attr("dy", ".30em")
			.text(function(d) { return d.label || d.key; });

		bar.exit().remove();
	}

	chart.color = function(value) {
		if (!arguments.length) {
			return color;
		}
		color = value;

		return chart;
	};

	chart.data = function(values) {
		if (!arguments.length) {
			return data;
		}
		data = values;

		return chart;
	};

	chart.height = function(value) {
		if (!arguments.length) {
			return outerHeight;
		}
		outerHeight = value;

		return chart;
	};

	chart.margin = function(value) {
		if (!arguments.length) {
			return margin;
		}
		margin = value;
		x.range([0, innerWidth()]);

		return chart;
	};

	chart.updateData = function(values) {
		data = values;
		render();

		return chart;
	};

	chart.width = function(value) {
		if (!arguments.length) {
			return outerWidth;
		}
		outerWidth = value;
		x.range([0, innerWidth()]);

		return chart;
	};

	return chart;
};
