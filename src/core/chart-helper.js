/*jshint sub: true */

; (function (d3, SC) {
	SC.ChartHelper = function () {

		function packFlatData(data, valuesNode, groupByAttributes, packSize, sizeBy) {
			var pack = d3.layout.pack()
					.size([packSize, packSize])
					.value(function (d) {
						if (d.children) {
							return d.children.length;
						} else {
							return sizeBy ? d[sizeBy] : d.uniqueId;
						}
					})
					.children(function (d) {
						return d.values;
					})
					.sort(function (a, b) { return b.value - a.value; })
					.padding(3),
				nested_data,
				uniqueId = 1,
				nest = d3.nest();

			data[valuesNode].forEach(function (valueNode) {
					valueNode.uniqueId = uniqueId;
					uniqueId = uniqueId + 0.000000000000001;
				});

			groupByAttributes.forEach(function (group) {
				nest.key(function (d) { return d[group]; });
			});
			nested_data = { "values": nest.entries(data[valuesNode]) };

			function findChildSizeByValue(valuesNode) {
				var sizeByValue = 0.5;
                
                if(valuesNode) {
                    if (valuesNode.values) {
                        if (valuesNode.values[0][sizeBy]) {
                            sizeByValue = valuesNode.values[0][sizeBy];
                        } else {
                            sizeByValue = findChildSizeByValue(valuesNode.values);
                        }
                    } else {
                        sizeByValue = findChildSizeByValue(valuesNode[0]);
                    }
                }
				return sizeByValue;
			}

			function addDummyNodeForSingleChildNodes(valuesNode) {
				valuesNode.forEach(function (valueNode) {
					if (valueNode.values) {
						addDummyNodeForSingleChildNodes(valueNode.values);
						if (valueNode.values.length === 1) {
							var dummyObject = {
								"uniqueId": 0.5,
								"dummy": 1
							};
							if (sizeBy) {
								dummyObject[sizeBy] = findChildSizeByValue(valueNode);
							}
							valueNode.values.push(dummyObject);
						}

					}
				});
			}
			addDummyNodeForSingleChildNodes(nested_data.values);
			return pack.nodes(nested_data).filter(function (d) { return !d.dummy; });
		}

		return {
			packFlatData: packFlatData
		};
	}();
}(this.d3, (this.SC = this.SC || {})));