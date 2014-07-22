jQueryNestedList
================

![alt tag](http://i.imgur.com/VtcfWgm.png)

To use this plugin, first include the css, js file inside the html file, don't forget to include jquey file.
<b>Function to create list</b>

Create data array:
```javascript
var data = [1,2,[3,'one','two'],[1,2,3],4,5,[6,7,[8,9,10,[11,12,13]]]];
```

Call init() function with options:
```javascript
var nestedList = new NestedList();
nestedList.config({
	elemId: '#Element', //the id of html element, where the nested list created
	data: data, //the data array
	title: 'please choose one option', //the title of the nested list, also displayed
	collapsible: true, //make sub-tree collapsible
	topNoteSelectable: false, //make sub-tree top node selectable
	includeInputOption: true, //include <select></select> input, ready to send to form
	mobileResponsive: true //build a responsive version for mobile
});
nestedList.init(); 
```
To obtain current selected data, call:
```javascript
nestedList.retrieveData()
```
this function return blank string if there is no option selected

To completely remove the nested list, call:
```javascript
nestedList.selfDestroy()
```
