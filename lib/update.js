
var { getNodeInfo, INFO_NODE, update: baseUpdate, getDataset, setToExpandState, nodeChildren } = require("treeview-model");

var { getDataInfo, DATA_PARENT_JSON, DATA_INDEX, getDataValue } = require("./data-info.js");
var { updateValue } = require("./update-value.js");
var { isContainerEmpty, isContainer: isJsonContainer } = require("json-type-tool");

var ele_id = require("ele-id");

/*
updateNode(elNode, content | value, options)
	content
		`undefined` is not accepted;

		.value
			json value;
			`undefined` is accepted;

		.name
			json name;

return the updated node;
*/
var updateNode = function (elNode, content, options) {
	//arguments
	var ni = getNodeInfo(elNode, true);

	elNode = ni[INFO_NODE];

	//get value & name
	var value, hasValue, name, hasName;
	if (content && typeof content === "object" && (("value" in content) || ("name" in content))) {
		if ("value" in content) {
			hasValue = true;
			value = content.value;
		}
		if ("name" in content) {
			hasName = true;
			name = content.name;
			if (typeof name !== "string") throw "name is not string";
		}
	}
	else {
		if (typeof content === "undefined") throw "content is undefined";

		hasValue = true;
		value = content;
	}

	if (!hasName && !hasValue) throw "nothing to uppdate";

	//dataset
	var dataset = getDataset(elNode, options, true);

	//get data before dom changed
	var di = getDataInfo(elNode, null, dataset);
	var diData = di[DATA_PARENT_JSON];
	if (hasName) {
		//check name
		if (diData instanceof Array) throw "array index can not be changed";
		else if (name in diData) throw "name already existed, " + name;
	}
	if (hasValue) {
		var diValue = getDataValue(di);
		if (isJsonContainer(diValue) && !isContainerEmpty(diValue)) {
			throw "json container is not empty";
		}
	}

	//update dom
	if (hasName) {
		elNode = baseUpdate(elNode, name + ":", options);
	}

	//update data
	if (hasName) {
		diData[name] = hasValue ? value : getDataValue(di);
		delete diData[di[DATA_INDEX]];
	}
	else {	//hasValue
		diData[di[DATA_INDEX]] = value;
	}

	//update value
	if (hasValue) {
		updateValue(elNode, value);

		//remove children-json binding
		var elChildren = nodeChildren(elNode);
		if (elChildren && elChildren.id) delete dataset[elChildren.id];

		if (isJsonContainer(value)) {
			if (!isContainerEmpty(value)) {
				setToExpandState(elNode, true);
			}
			dataset[ele_id(nodeChildren(elNode, options?.childrenTemplate || true))] = value;
		}
	}

	return elNode;
}

//module exports

module.exports = {
	updateNode,				//overwrite
	update: updateNode,		//overwrite
};
