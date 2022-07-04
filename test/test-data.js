
//global variable, for html page, refer tpsvr @ npm.
json_container_treeview = require("../json-container-treeview.js");
var json_type_tool = require("json-type-tool");

base_test_data = require("treeview-model/test/test-data.js");

module.exports = {

	"json_container_treeview": function (done, treeviewModel) {
		if (typeof window === "undefined") throw "disable for nodejs";

		if (treeviewModel) json_container_treeview = treeviewModel;

		base_test_data["level-3"](
			function (err, data) {
				if (err) { done(err); return; }

				var container = json_container_treeview.getContainer("nd1");

				container.style.fontSize = "10.5pt";

				var elTool = document.getElementById('div-tool');
				elTool.insertAdjacentHTML("beforeend",
					'<div style="border-bottom:1px solid gray;padding-bottom:0.3em;">' +
					'level-4/json-container-treeview: ' +

					"<span id='name-click-msg'>&nbsp;</span>" +
					"<div>" +
					"<span class='-ht-cmd' id='sp-cmd-add'>+add</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-add-object' title='object'>{...}</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-add-object-empty' title='empty object'>{ }</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-add-array' title='array'>[...]</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-add-array-empty' title='empty array'>[ ]</span> " +
					"<span class='-ht-cmd' id='sp-cmd-insert'>+insert</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-insert-json' title='json'>json</span> " +
					"<span class='-ht-cmd' id='sp-cmd-insert-next'>+insert-next</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-insert-next-json' title='json'>json</span> &nbsp; " +
					"<span class='-ht-cmd' id='sp-cmd-remove'>-remove</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-remove-children' title='remove children'>-children</span> &nbsp; " +
					"<span class='-ht-cmd' id='sp-cmd-update' title='update both name and value'>=update</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-update-name' title='update only name'>name</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-update-value' title='update only value'>value</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-update-value-object' title='update to an object value'>{...}</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-update-value-object-empty' title='update to an empty object value'>{ }</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-update-value-array' title='update to an array value'>[...]</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-update-value-array-empty' title='update to an empty array value'>[ ]</span> &nbsp; " +
					"<span class='-ht-cmd' id='sp-cmd-to-string' title='convert to string'>to s</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-to-number' title='to number'>n</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-to-boolean' title='to boolean'>b</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-to-object' title='to object'>o</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-to-array' title='to array'>a</span>/" +
					"<span class='-ht-cmd' id='sp-cmd-to-other' title='to other'>other</span> &nbsp; " +
					"</div>" +
					"</div>"
				);

				var data = {
					a: 123,
					bb: "sss chk-update-select checked",
					d: ["aa", "bb", { cc: "ttttt", "ddd": null }, true],
					bb2: "sss chk-us chks chks chks chks chkpda\nte-select checked",
					cfgweterertefdsrgcc: 5.67,
				};
				var dup = json_type_tool.copyContainer;

				/*
				.updateView(el, json, options)		//update view / init
				update view / init
					options:
						.dataset
							map eid of tree-children/tree-container, to json container

				*/
				json_container_treeview.initView(container, dup(data));

				container.addEventListener("click", function (evt) {
					var target = evt.target;

					var elSelOne = json_container_treeview.getOneSelected(target);
					if (elSelOne) {
						var s = json_container_treeview.nodeName(elSelOne).textContent;
						if ((s.length > 50)) s = s.slice(0, 50) + "...";

						//.getDataInfo(elNode, dataInfo)
						var prop = json_container_treeview.getDataValue(elSelOne);
						var s2 = JSON.stringify(prop);
						if ((s2.length > 50)) s2 = s2.slice(0, 50) + "...";
						s += " value=" + s2;

						document.getElementById('name-click-msg').innerHTML = s;
					}
				})

				function toType(el, destType) {
					var v = json_container_treeview.getDataValue(el);
					json_container_treeview.update(el, { value: json_type_tool.convert(v, destType) });
				}

				document.getElementById('sp-cmd-add').onclick =
					document.getElementById('sp-cmd-add-object').onclick =
					document.getElementById('sp-cmd-add-object-empty').onclick =
					document.getElementById('sp-cmd-add-array').onclick =
					document.getElementById('sp-cmd-add-array-empty').onclick =
					document.getElementById('sp-cmd-insert').onclick =
					document.getElementById('sp-cmd-insert-json').onclick =
					document.getElementById('sp-cmd-insert-next').onclick =
					document.getElementById('sp-cmd-insert-next-json').onclick =
					document.getElementById('sp-cmd-remove').onclick =
					document.getElementById('sp-cmd-remove-children').onclick =
					document.getElementById('sp-cmd-update').onclick =
					document.getElementById('sp-cmd-update-name').onclick =
					document.getElementById('sp-cmd-update-value').onclick =
					document.getElementById('sp-cmd-update-value-object').onclick =
					document.getElementById('sp-cmd-update-value-object-empty').onclick =
					document.getElementById('sp-cmd-update-value-array').onclick =
					document.getElementById('sp-cmd-update-value-array-empty').onclick =
					document.getElementById('sp-cmd-to-string').onclick =
					document.getElementById('sp-cmd-to-number').onclick =
					document.getElementById('sp-cmd-to-boolean').onclick =
					document.getElementById('sp-cmd-to-object').onclick =
					document.getElementById('sp-cmd-to-array').onclick =
					document.getElementById('sp-cmd-to-other').onclick =
					function (evt) {
						var cmdId = evt?.target?.id;

						var elSel = json_container_treeview.getSelected(container, true);
						var elSelOne = (elSel instanceof Array) ? elSel[elSel.length - 1] : elSel;

						var newName = "t" + Math.round((new Date()).getTime() / 1000);
						var newValue = (new Date()).toLocaleString();
						var elNew;

						if (cmdId === "sp-cmd-add") {
							elNew = json_container_treeview.add(elSelOne || container,
								{ name: newName, value: newValue }, null, !elSelOne);
						}
						else if (cmdId === "sp-cmd-add-object") {
							elNew = json_container_treeview.add(elSelOne || container,
								{ name: newName, value: dup(data) }, null, !elSelOne);
						}
						else if (cmdId === "sp-cmd-add-object-empty") {
							elNew = json_container_treeview.add(elSelOne || container,
								{ name: newName, value: {} }, null, !elSelOne);
						}
						else if (cmdId === "sp-cmd-add-array") {
							elNew = json_container_treeview.add(elSelOne || container,
								{ name: newName, value: dup(data.d) }, null, !elSelOne);
						}
						else if (cmdId === "sp-cmd-add-array-empty") {
							elNew = json_container_treeview.add(elSelOne || container,
								{ name: newName, value: [] }, null, !elSelOne);
						}
						else if (cmdId === "sp-cmd-insert") {
							if (elSelOne) elNew = json_container_treeview.insert(elSelOne,
								{ name: newName, value: newValue });
						}
						else if (cmdId === "sp-cmd-insert-json") {
							if (elSelOne) elNew = json_container_treeview.insert(elSelOne,
								{ name: newName, value: dup(data) }, null);
						}
						else if (cmdId === "sp-cmd-insert-next") {
							if (elSelOne) elNew = json_container_treeview.insertNext(elSelOne,
								{ name: newName, value: newValue });
						}
						else if (cmdId === "sp-cmd-insert-next-json") {
							if (elSelOne) elNew = json_container_treeview.insertNext(elSelOne,
								{ name: newName, value: dup(data) }, null);
						}
						else if (cmdId === "sp-cmd-remove") {
							if (elSel) json_container_treeview.remove(elSel);
						}
						else if (cmdId === "sp-cmd-remove-children") {
							if (elSel) json_container_treeview.removeChildren(elSel);
						}
						else if (cmdId === "sp-cmd-update") {
							if (elSelOne) json_container_treeview.update(elSelOne,
								{ name: newName, value: newValue });
						}
						else if (cmdId === "sp-cmd-update-name") {
							if (elSelOne) json_container_treeview.update(elSelOne,
								{ name: newName });
						}
						else if (cmdId === "sp-cmd-update-value") {
							if (elSelOne) json_container_treeview.update(elSelOne,
								{ value: newValue });
						}
						else if (cmdId === "sp-cmd-update-value-object") {
							if (elSelOne) json_container_treeview.update(elSelOne,
								{ value: dup(data) });
						}
						else if (cmdId === "sp-cmd-update-value-object-empty") {
							if (elSelOne) json_container_treeview.update(elSelOne,
								{ value: {} });
						}
						else if (cmdId === "sp-cmd-update-value-array") {
							if (elSelOne) json_container_treeview.update(elSelOne,
								{ value: dup(data.d) });
						}
						else if (cmdId === "sp-cmd-update-value-array-empty") {
							if (elSelOne) json_container_treeview.update(elSelOne,
								{ value: [] });
						}
						else if (cmdId === "sp-cmd-to-string") {
							if (elSelOne) toType(elSelOne, "string");
						}
						else if (cmdId === "sp-cmd-to-number") {
							if (elSelOne) toType(elSelOne, "number");
						}
						else if (cmdId === "sp-cmd-to-boolean") {
							if (elSelOne) toType(elSelOne, "boolean");
						}
						else if (cmdId === "sp-cmd-to-object") {
							if (elSelOne) toType(elSelOne, "object");
						}
						else if (cmdId === "sp-cmd-to-array") {
							if (elSelOne) toType(elSelOne, "array");
						}
						else if (cmdId === "sp-cmd-to-other") {
							if (elSelOne) toType(elSelOne, "other");
						}

						if (elNew && !json_container_treeview.isSelectedMultiple(elNew)) {
							json_container_treeview.clickName(elNew);
						}
						else {
							json_container_treeview.clickContainer(container);
						}
					};
			},
			json_container_treeview,
			true
		);
		return "ui-test";
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('json_container_treeview', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
