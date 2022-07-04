
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

return the updated node
*/
var updateNode = function (elNode, content, options) {
	//arguments
	var ni = getNodeInfo(elNode, true);
	if (!ni) return null;

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
			if (typeof name !== "string") {
				console.error("name is not string");
				return null;
			}
		}
	}
	else {
		if (typeof content === "undefined") {
			console.error("content is undefined");
			return null;
		}
		hasValue = true;
		value = content;
	}

	if (!hasName && !hasValue) {
		console.error("nothing to uppdate");
		return null;
	}

	//dataset
	var dataset = getDataset(elNode, options, true);

	//get data before dom changed
	var di = getDataInfo(elNode, null, dataset);
	var diData = di[DATA_PARENT_JSON];
	if (hasName) {
		//check name
		if (diData instanceof Array) {
			console.error("array index can not be changed");
			return null;
		}
		else if (name in diData) {
			console.error("name already existed, " + name);
			return null;
		}
	}
	if (hasValue) {
		var diValue = getDataValue(di);
		if (isJsonContainer(diValue) && !isContainerEmpty(diValue)) {
			console.error("json container is not empty");
			return null;
		}
	}

	//update dom
	if (hasName) {
		elNode = baseUpdate(elNode, name + ":", options);
		if (!elNode) return null;
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
