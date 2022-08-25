
var { getNodeInfo, nodeName, nodeChildren, INFO_TYPE, getDataset } = require("treeview-model");

var ele_id = require("ele-id");

var { createItem } = require("./create-item.js");
var { isContainer: isJsonContainer } = require("json-type-tool");

/*
update a node children
updateChildren(elChildrenContainer [, jsonContainer [, options]])
*/
var updateChildren = function (elChildrenContainer, jsonContainer, options) {
	var ni = getNodeInfo(elChildrenContainer);

	if (!ni[INFO_TYPE])throw "not a children container";

	if (!options?.dataset) {
		if (!options) options = {};
		options.dataset = getDataset(elChildrenContainer);
	}
	var dataset = options.dataset;

	if (!jsonContainer) jsonContainer = dataset[elChildrenContainer.id];
	if (!isJsonContainer(jsonContainer)) throw "not json container";

	var i, imax, el;

	if (jsonContainer instanceof Array) {
		imax = jsonContainer.length;
		for (i = 0; i < imax; i++) {
			el = createItem(ni, "[" + i + "]", jsonContainer[i], options);
			nodeName(el).classList.add("json-array-index");
		}
	}
	else {
		for (i in jsonContainer) { el = createItem(ni, i + ":", jsonContainer[i], options); }
	}

	if (el) {
		//data index
		var eid = ele_id(el.parentNode);
		if (!(eid in dataset)) dataset[eid] = jsonContainer;
	}
}

//like .updateChildren(), but check children part firstly
var tryUpdateChildren = function (el, jsonContainer, options) {
	var elChildren = nodeChildren(el);
	if (!elChildren || !elChildren.firstElementChild) {
		if (!elChildren) elChildren = nodeChildren(el, options?.childrenTemplate || true);

		updateChildren(elChildren, jsonContainer, options);
	}
}

//module exports

module.exports = {
	updateChildren,
	tryUpdateChildren,
};
