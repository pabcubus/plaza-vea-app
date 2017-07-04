app.service('HelperService', function(lodash){
	var vm = this;

	vm.constants = {
		LOCALSTORAGE_USER_TAG: 'plaza-vea-app-user',
		LOCALSTORAGE_SHOPPING_CART_TAG: 'plaza-vea-app-shopping-cart'
	};

	vm.converters = {
		json2csv: function(objArray, structure) {
			if (!Array.isArray(objArray) || objArray.length === 0)
				return '';

			var str = '';

			var header = structure.header;
			if (lodash.isArray(header) && header.length > 0) {
				header.forEach(function(field){
					str += field + '\t';
				});
			}

			str = str.substring(0, str.length - 1);

			str += '\r\n';

			var line = '';
			var body = structure.body;
			if (lodash.isArray(body) && body.length > 0) {
				objArray.forEach(function(object){
					line = '';
					body.forEach(function(field){
						line += object[field] + '\t';
					});

					line = line.substring(0, line.length - 1);

					str += line + '\r\n';
				});
			}

			return str;
		}
	};

	vm.export = {
		exportToPDF: function(leftTitle, centerTitle, rightTitle, filename, array, structure){
			if (!Array.isArray(array) || array.length === 0)
				return '';

			var docDefinition = {
				pageSize: 'LEGAL',
				pageOrientation: 'landscape',
				pageMargins: [ 10, 10, 10, 10 ],
				content: []
			};

			var titleFields = [];
			var isValid = lodash.countBy([leftTitle, centerTitle, rightTitle], lodash.isString);
			if (lodash.has(isValid, 'true')){
				if (lodash.isString(leftTitle))		titleFields.push({ text: leftTitle, bold: true, fontSize: 12, width: Math.floor(100 / isValid.true)+'%' });
				if (lodash.isString(centerTitle))	titleFields.push({ text: centerTitle, bold: true, fontSize: 12, width: Math.floor(100 / isValid.true)+'%' });
				if (lodash.isString(rightTitle))	titleFields.push({ text: rightTitle+'\n\n', bold: true, fontSize: 12, width: Math.floor(100 / isValid.true)+'%' });
			}
			docDefinition.content.push({alignment: 'center', 'columns': titleFields});

			var headerFields = [];
			lodash.forEach(structure.header, function(field){
				headerFields.push({ text: field, bold: true, fontSize: 8, width: Math.floor(100 / structure.header.length)+'%' });
			});
			docDefinition.content.push({alignment: 'center', 'columns': headerFields});

			lodash.forEach(array, function(dev){
				var bodyFields = [];
				lodash.forEach(structure.body, function(field){
					bodyFields.push({ text: (lodash.isString(dev[field]) ? dev[field] : ''), fontSize: 7, width: Math.floor(100 / structure.body.length)+'%' });
				});
				docDefinition.content.push({alignment: 'center', 'columns': bodyFields});
			});

			// open the PDF
			pdfMake.createPdf(docDefinition).open();

			// print the PDF
			pdfMake.createPdf(docDefinition).print();

			// download the PDF
			pdfMake.createPdf(docDefinition).download(lodash.isString(filename) ? filename+'pdf' : 'report.pdf');
		},
		exportToXLS: function(leftTitle, centerTitle, rightTitle, filename, array, structure){
			array = angular.copy(array);

			var sqlString = 'select ';
			if (lodash.isString(filename) && lodash.has(structure, 'header') && lodash.has(structure, 'body')) {
				var titleObj = {};
				titleObj[structure.body[0]] = leftTitle.toUpperCase();
				titleObj[structure.body[1]] = centerTitle.toUpperCase();
				titleObj[structure.body[2]] = rightTitle.toUpperCase();

				var subtitleObj	= {};

				for(var i = 0; i < structure.header.length; i++) {
					subtitleObj[structure.body[i]] = structure.header[i];

					sqlString += (i > 0 ? ', ' : '') + structure.body[i];
				}

				array = lodash.concat(titleObj, subtitleObj, array);

				var string2 = ' INTO XLSX("' + (lodash.isString(filename) ? filename : 'report') + '.xlsx", { headers : false, sheetid: "' + (lodash.isString(leftTitle) ? leftTitle : 'Report') + '" }) FROM ?';
				sqlString = sqlString + string2;

				var res = alasql(sqlString, [array]);
			}
		}
	};

	vm.validation = {
		getBrowser: function(){
			var result = '';

			// Opera 8.0+
			var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

			// Firefox 1.0+
			var isFirefox = typeof InstallTrigger !== 'undefined';

			// Safari 3.0+ "[object HTMLElementConstructor]"
			var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);

			// Internet Explorer 6-11
			var isIE = /*@cc_on!@*/false || !!document.documentMode;

			// Edge 20+
			var isEdge = !isIE && !!window.StyleMedia;

			// Chrome 1+
			var isChrome = !!window.chrome && !!window.chrome.webstore;

			// Blink engine detection
			var isBlink = (isChrome || isOpera) && !!window.CSS;

			if (isOpera) 	return 'opera';
			if (isFirefox) 	return 'firefox';
			if (isSafari) 	return 'safari';
			if (isIE) 		return 'ie';
			if (isEdge) 	return 'edge';
			if (isChrome) 	return 'chrome';
			if (isBlink) 	return 'blink';
		},
		convertToFloat: function(value, decimals, defaultVal) {
			if (lodash.isString(value))
				value = parseFloat(value);

			defaultVal = lodash.isNumber(defaultVal) ? defaultVal : 0;
			var result = (!lodash.isNaN(value) && lodash.isNumber(value)) ? value : defaultVal;
			return result;
		}
	};

	vm.storage = {
		/**
		 * Sets a key/value pair to localStorage
		 * @public
		 * @memberof src.esr-app.shared.services.HelperService
		 * @param {String} key the key to use
		 * @param {String} value the value to set
		 * @return {undefined}
		 */
		set: function(key, value, stringify) {
			localStorage.setItem(key, (stringify ? JSON.stringify(value) : value));
		},

		/**
		 * Gets an object form localstorage
		 * @public
		 * @memberof src.esr-app.shared.services.HelperService
		 * @param {String} key the key to get
		 * @returns {Object} the object retrieved
		 */
		get: function(key, parse) {
			var value = (parse ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key));
			return value;
		},

		/**
		 * Removes an object form localstorage
		 * @public
		 * @memberof src.esr-app.shared.services.HelperService
		 * @param {String} key the key to remove
		 * @returns {Object} the object retrieved
		 */
		remove: function(key) {
			return localStorage.removeItem(key);
		}
	};

	vm.string = {
		checkStringRegex: function(str, regex) {
			return regex.test(str);
		}
	};

	vm.object = {
		getSimilarProperty: function(object, propertyString) {
			for(var key in object){
				if (key.toLowerCase().indexOf(propertyString.toLowerCase()) != -1){
					return object[key];
				}
			}

			return null;
		}
	};
});
