
var { getContainer, getNode, getToExpandState, listenOnClick: baseListenOnClick,
	clickName } = require("treeview-model");

var { getDataValue } = require("./data-info.js");
var { tryUpdateChildren } = require("./update-children.js");

var listenOnClick = function (el, options) {
	var container = getContainer(el);
	if (!container) return;

	baseListenOnClick(container, options);
	var baseOnClick = container.onclick;
	options = baseOnClick("get-options");

	container.onclick = function (evt) {
		if (evt === "get-options") return options;

		//call treeview_model onclick as base
		var baseReturn = baseOnClick?.(evt);

		//this onclick
		var el = evt.target;

		if (el.classList.contains("tree-to-expand")) {
			var elNode = getNode(el);
			if (getToExpandState(elNode) === false) {
				tryUpdateChildren(elNode, getDataValue(elNode, null, options?.dataset), options);
			}
		}
		else if (el.classList.contains("json-tree-value")) {
			clickName(el);
		}

		return baseReturn;
	}
}

//module exports

module.exports = {
	listenOnClick,		//overwrite
}
