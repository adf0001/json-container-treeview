
var { nodeName } = require("treeview-model");

var repairArrayIndex = function (elNode, startIndex) {
	if (!startIndex && startIndex !== 0) {
		startIndex = parseInt(nodeName(elNode).textContent.slice(1, -1));
		if (!(startIndex >= 0)) {
			throw Error("reparing start index fail, " + nodeName(elNode).textContent);
		}
	}
	else {
		nodeName(elNode).textContent = "[" + startIndex + "]";
	}

	startIndex++;

	while (elNode = elNode.nextElementSibling) {
		nodeName(elNode).textContent = "[" + (startIndex++) + "]";
	}
}

//module exports

module.exports = {
	repairArrayIndex,
};
