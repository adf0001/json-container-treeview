
var { isContainer: isJsonContainer,isContainerEmpty } = require("json-type-tool");

var { nodeValue } = require("./part.js");

var updateValue = function (el, value) {
	var elValue = nodeValue(el);

	if (isJsonContainer(value)) {
		if(isContainerEmpty(value)){
			elValue.innerHTML = (value instanceof Array) ? "[ ]" : "{ }";
		}
		else{
			elValue.innerHTML = (value instanceof Array) ? "[...]" : "{...}";
		}

		elValue.classList.add("json-container");
	}
	else {
		elValue.textContent = JSON.stringify(value);
		elValue.classList.remove("json-container");
	}
}

//module exports

module.exports = {
	updateValue,
};
