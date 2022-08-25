
var { getNodeInfo, getNode, INFO_TYPE, INFO_NODE, remove: baseRemove, getContainer, getOptions,
	getDataset, nodeParent } = require("treeview-model");

var { getDataInfo, DATA_PARENT_JSON, DATA_INDEX, getDataValue } = require("./data-info.js");

var { isContainer: isJsonContainer, clearContainer } = require("json-type-tool");
var { repairArrayIndex } = require("./repair-array-index.js");
const { updateValue } = require("./update-value.js");

//return true if finisheds;
var removeNode = function (elNode, options) {
	if (typeof options === "undefined") options = getOptions(elNode);

	//dataset
	if (!options?.dataset) {
		options = options ? Object.create(options) : {};
		options.dataset = getDataset(elNode);
	}

	if (elNode instanceof Array) {
		//for elNode array
		var anyReturn;
		elNode.forEach(v => { anyReturn = removeNode(v, options) || anyReturn; });
		return anyReturn;
	}

	//arguments
	var onlyChildren = options?.onlyChildren;

	var ni = getNodeInfo(elNode);
	if (ni[INFO_TYPE] && !onlyChildren) throw "fail on container";

	elNode = ni[INFO_NODE];
	var isTop = ni[INFO_TYPE] === "container";
	var containerId = getContainer(elNode).id;

	var nextNode = elNode.nextElementSibling;

	//get data before dom changed
	var di, diData, diValue;
	if (isTop) { diData = this.data; }
	else {
		try {
			di = getDataInfo(getNode(elNode), null, options.dataset);
		}
		catch (ex) {
			return ex;		//node may have been removed in multiple removing;
		}

		diData = di[DATA_PARENT_JSON];
		diValue = getDataValue(di);
	}

	//prepare data-index set to be removed
	var dikArray = [];	//data-index key array

	if (onlyChildren && !isJsonContainer(diValue)) {
		throw "node is not json container";
	}

	//all descendant sub data index
	var nds = onlyChildren
		? elNode.querySelector(".tree-children").querySelectorAll(".tree-children")
		: elNode.querySelectorAll(".tree-children");
	var i, imax = nds.length, ndid;
	for (i = 0; i < imax; i++) { dikArray.push(nds[i].id); }

	//preserve parent node for later use
	var parentNode = nodeParent(elNode);

	//remove dom
	if (options.removeEmptyChildren) options.removeEmptyChildren = false;		//keep empty children

	baseRemove(elNode, options);

	//remove data
	if (onlyChildren) {
		clearContainer(diValue);
	}
	else {
		if (diData instanceof Array) {
			diData.splice(di[DATA_INDEX], 1);
			if (nextNode) repairArrayIndex(nextNode, di[DATA_INDEX]);
		}
		else delete diData[di[DATA_INDEX]];
	}

	if (!isTop) {
		if (onlyChildren) updateValue(elNode, diValue);
		else if (parentNode) updateValue(parentNode, diData);
	}

	//remove data index set
	var dataset = options.dataset;

	imax = dikArray.length;
	for (i = 0; i < imax; i++) {
		ndid = dikArray[i];
		//console.log("delete index "+ndid);
		if (ndid && (ndid in dataset) && ndid != containerId) delete dataset[ndid];
	}

	console.log(dataset);
	return true;
}

var removeAllChildren = function (elNode, options) {
	options = options ? Object.create(options) : {};
	options.onlyChildren = true;

	return removeNode(elNode, options)
}

//module exports

module.exports = {
	removeNode,				//overwrite
	remove: removeNode,		//overwrite

	removeAllChildren,					//overwrite
	removeChildren: removeAllChildren,	//overwrite

};
