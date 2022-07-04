
var { getContainer, initDataset } = require("treeview-model");

var ele_id = require("ele-id");

var { listenOnClick } = require("./linsten-on-click.js");
var { updateChildren } = require("./update-children.js");

//css style
var add_css_text = require("add-css-text");
var css = require("../json-container-treeview.css");

/*
update view / init
	options:
		.dataset
			map eid of tree-children/tree-container, to json container

*/
var updateView = function (el, json, options) {
	//arguments
	var container = getContainer(el);
	if (!container) return;

	container.classList.add("json-container-treeview");

	//init css
	if (css) {
		add_css_text(css, "layered-text-treeview-css");
		css = null;
	}

	if (!options) options = {};

	//dataset
	options.dataset = initDataset(container, ele_id(container), json);

	//on-click event
	listenOnClick(container, options);

	//update view
	container.innerHTML = "";

	if (typeof json !== "undefined") updateChildren(container, json, options);

	setTimeout(function () { container.scrollTop = 0; }, 0);	//scroll to top
}

//module exports

module.exports = {
	updateView,

	initView: updateView,	//to initialize view
};
