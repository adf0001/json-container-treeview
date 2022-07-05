
// json-container-treeview @ npm, json object/array treeview.

//module exports

Object.assign(exports,
	require("treeview-model"),

	require("./lib/add.js"),
	require("./lib/repair-array-index.js"),
	require("./lib/create-item.js"),
	require("./lib/insert.js"),
	require("./lib/part.js"),
	require("./lib/remove.js"),
	require("./lib/update.js"),
	require("./lib/data-info.js"),
	require("./lib/set-on-click.js"),
	require("./lib/update-children.js"),
	require("./lib/update-value.js"),
	require("./lib/update-view.js"),

);
