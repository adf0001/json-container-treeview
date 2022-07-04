
var { nodePart } = require("treeview-model");

var nodeValue = function (el) { return nodePart(el, "json-tree-value"); }

//module exports

module.exports = {
	nodeValue,
};
