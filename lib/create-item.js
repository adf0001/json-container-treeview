
var { isContainer: isJsonContainer, getDataset, isContainerEmpty } = require("json-type-tool");

var { setToExpandState, add, nodeChildren, nodeName, INFO_NODE, INFO_TYPE } = require("treeview-model");

var { updateValue } = require("./update-value.js");

var ele_id = require("ele-id");

var createItem = function (ni, name, value, options) {
	var el = add(
		ni[INFO_NODE],
		{
			innerHtml: "<span class='tree-to-expand tree-disable'>.</span>" +
				"<span class='tree-name'></span>" +
				"<span class='json-tree-value'></span>"
		},
		options,
		!!ni[INFO_TYPE]
	);

	nodeName(el).textContent = name;

	if (isJsonContainer(value)) {
		if (!isContainerEmpty(value)) setToExpandState(el, true);

		//data index of children
		var dataset = options?.dataset || getDataset(ni[INFO_NODE]);
		dataset[ele_id(nodeChildren(el, options?.childrenTemplate || true))] = value;
	}

	updateValue(el, value);

	return el;
}

//module exports

module.exports = {
	createItem,
};
