# json-container-treeview
json object/array treeview

# Install
```
npm install json-container-treeview
```

# Usage example
```javascript

var json_container_treeview = require("json-container-treeview");

//dom

var container = document.getElementById('my-container');

var data = {
	a: 123,
	bb: "sss chk-update-select checked",
	d: ["aa", "bb", { cc: "ttttt", "ddd": null }, true],
	bb2: "sss chk-us chks chks chks chks chkpda\nte-select checked",
	cfgweterertefdsrgcc: 5.67,
};

/*
.updateView(el, json, options)		//update view / init
update view / init
	options:
		.dataset
			map eid of tree-children/tree-container, to json container
*/
json_container_treeview.initView(container, data);

```
