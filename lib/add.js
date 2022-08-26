
var { getNode, getNodeInfo, isContainer: isTreeContainer, setToExpandState, getToExpandState,
	verifyChildrenContainer, getDataset, nodeName } = require("treeview-model");

var { getDataInfo, DATA_PARENT_JSON, DATA_INDEX, getDataValue } = require("./data-info.js");
var { tryUpdateChildren } = require("./update-children.js");
var { createItem } = require("./create-item.js");

var { isContainer: isJsonContainer } = require("json-type-tool");
var { repairArrayIndex } = require("./repair-array-index.js");
var { updateValue } = require("./update-value.js");

/*
refer treeview-model.addNode()
	content.outerHtml/innerHtml/nameHtml are ignored;

addNode(el, content | name, options, childrenContainer)
	content
		.name
			the name part of a json property, or a json container;
		.value
			the value part of a json property;
			ignore if 'name' is a json container;

	options
		.depth
			1-N, -1(all), for adding json container;
*/
var addNode = function (el, content, options, childrenContainer) {
	//arguments

	//content
	if (typeof content === "string") content = { name: content };
	else if (!content) content = { name: "name" };

	var name = content.name || content.nameHtml || "name";

	if (typeof name !== "string") throw "invalid name, " + name;

	var value = content.value || "value";

	//verify insert
	el = verifyChildrenContainer(el, options?.insert, childrenContainer);

	//options
	if (!options?.dataset) {
		options = options ? Object.create(options) : {};
		options.dataset = getDataset(el);
	}

	var insert = options.insert;
	var dataset = options.dataset;

	//get data before dom changed
	var isTop = childrenContainer && isTreeContainer(el);

	var di, diData, diValue;
	if (isTop) { diValue = dataset[" "]; }
	else {
		di = getDataInfo(getNode(el), null, dataset);
		diData = di[DATA_PARENT_JSON];
		diValue = getDataValue(di);
	}

	if (
		(insert && !isJsonContainer(diData))
		|| (!insert && !isJsonContainer(diValue))
	) {
		throw "node is not json container";
	}

	//expand existed
	if (!insert && !childrenContainer && getToExpandState(el) === true) {
		tryUpdateChildren(el, null, options);
		setToExpandState(el, false);
	}

	//display name
	var displayName, isIndex;
	if (insert) {
		if (diData instanceof Array) {
			displayName = "[" + di[DATA_INDEX] + "]";
			isIndex = true;
		}
		else if (name in diData) {
			throw "name is already existed, " + name;
		}
		else displayName = name + ":";
	}
	else {
		if (diValue instanceof Array) {
			displayName = "[" + diValue.length + "]";
			isIndex = true;
		}
		else if (name in diValue) {
			throw "name is already existed, " + name;
		}
		else displayName = name + ":";
	}

	//add dom
	var ni = getNodeInfo(el);

	var elNew = createItem(ni, displayName, value, options);

	if (isIndex) {
		nodeName(elNew).classList.add("json-array-index");
	}

	//add data
	if (insert) {
		//insert data
		if (diData instanceof Array) {
			diData.splice(di[DATA_INDEX], 0, value);
			repairArrayIndex(elNew);
		}
		else diData[name] = value;
	}
	else {
		//append to children
		if (diValue instanceof Array) diValue.push(value);
		else diValue[name] = value;
	}

	if (!isTop && !isTreeContainer(elNew.parentNode)) {
		updateValue(elNew.parentNode, insert ? diData : diValue);
	}

	return elNew;
}

//module exports

module.exports = {
	addNode,		//overwrite
	add: addNode,	//overwrite
};
