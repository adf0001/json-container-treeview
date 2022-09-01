
var { getNode, getDataset, nodeName } = require("treeview-model");
var ele_id = require("ele-id");

var getElementIndex = function (elNode) {
	return Array.prototype.indexOf.call(elNode.parentNode.children, elNode);
}

var DATA_PARENT_JSON = 0;
var DATA_INDEX = 1;

/*
getDataInfo(elNode [, dataInfo [, dataset]])

return dataInfo= [parentJson, arrayIndex/index]
*/
var getDataInfo = function (elNode, dataInfo, dataset) {
	if (!dataInfo) dataInfo = [];

	elNode = getNode(elNode);
	var elText = nodeName(elNode).textContent;

	if (!dataset) dataset = getDataset(elNode);

	var json = dataset[ele_id(elNode.parentNode)];
	if (!json) throw Error("data info unfound, " + elNode?.parentNode?.id);

	var index;
	if (json instanceof Array) {
		index = getElementIndex(elNode);
		if (index !== parseInt(elText.slice(1, -1))) {		//confirm
			var err = "array index not match";
			console.log(err, index, elText);
			throw Error(err);
		}
	}
	else {
		index = elText.slice(0, -1);
		if (!(index in json)) {
			var err = "object index not match";
			console.log(err, index, elText);
			throw Error(err);
		}
	}

	dataInfo[DATA_PARENT_JSON] = json;
	dataInfo[DATA_INDEX] = index;

	return dataInfo;
}

//getDataValue: function ( elNode | dataInfo [, dataInfo [, dataset]])
var getDataValue = function (elNode, dataInfo, dataset) {
	dataInfo = (elNode instanceof Array) ? elNode : getDataInfo(elNode, dataInfo, dataset);
	return dataInfo[DATA_PARENT_JSON][dataInfo[DATA_INDEX]];
}

//module exports

module.exports = {
	DATA_PARENT_JSON,
	DATA_INDEX,

	getElementIndex,

	getDataInfo,

	getDataValue,

};
