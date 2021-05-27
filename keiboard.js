/*

	keiboard - onscreen keyboard yo
	(C) 2021 Shaped Technica (Jai B)
*/

class Keiboard {
	constructor (_parent = null) {
		if (this.parent !=  null) this.parent = _parent;
	}

	initialize (options) {
		this.options = options || {
			theme : "/js/lib/",
			inputClass : null,
			baseThemeURI	: '/js/lib/keiboard/css/keiboard-dark-base.css',
			shadowThemeURI	: '/js/lib/keiboard/css/keiboard-dark-shadow.css',
			templateURI		: '/js/lib/keiboard/templates/keiboard-dark-templates.html'
		};

		let style = document.createElement('link');

		style.setAttribute('rel','stylesheet');
		style.setAttribute('href',this.options.baseThemeURI);

		document.head.appendChild(style);

		this.insertTemplatesIntoDocument().then(() => {
			customElements.define('keiboard-numeric', KeiboardNumpadElementClass);
			customElements.define('keiboard-qwerty', KeiboardQwertyElementClass);
		});
	}


	async insertTemplatesIntoDocument() {
		let response = await fetch(this.options.templateURI);

		if (!response.ok) {
			throw new Error(response.status);
		}

		let html = await response.text();
		
		let parser = new DOMParser();
		let doc = parser.parseFromString(html, 'text/html');

		var _self = this;
	
		Array.from(doc.getElementsByTagName('template')).forEach((el, i) => {
			let style = doc.createElement('link');

			style.setAttribute('rel','stylesheet');
			style.setAttribute('href',_self.options.shadowThemeURI);

			el.content.prepend(style);

			document.head.appendChild(el.cloneNode(true));
		});

	}

	enableKeyboard() {

	}

	disableOSK() {

	}
}

class KeiboardNumpadElementClass extends HTMLElement {
	constructor(...args) {
		super(...args);
		this.self = self;

		// NOTE: this might need toLower on non xhtml5 (regular html5) pages!!
		this.template = document.getElementById(this.nodeName).cloneNode(true);

		//this.shadow = this.attachShadow({mode: 'open'});
		
		//this.shadow.appendChild(this.template.content.cloneNode(true));
		
		return this;
	}
	connectedCallback() {
		if (this.getAttribute('placeholder') != null)
			this.template.content.firstElementChild.firstElementChild.setAttribute('placeholder', this.getAttribute('placeholder'));

		let numpadContainer =this.template.content.firstElementChild.getElementsByClassName('keypad_numpadContainer')[0];

		let numpadKeys = [];

		for (let x = 1;x < 10; x++) {
			numpadKeys.push({
				'id' : parseInt(x),
				'label' : `${x}`
			});
		}

		numpadKeys.push({
			'id': 'Delete',
			'label': 'DEL'
		});

		numpadKeys.push({
			'id': 0,
			'label': '0'
		});

		numpadKeys.push({
			'id': 'Enter',
			'label': 'OK'
		});

		numpadKeys.forEach((el, i) => {
			let key = document.createElement('button');

			key.textContent = el.label;
			key.value = el.id;

			numpadContainer.appendChild(key);
		});

		this.appendChild(this.template.content.cloneNode(true));
	}
}

class KeiboardQwertyElementClass extends HTMLElement {
	constructor(...args) {
		super(...args);
		this.self = self;

		// NOTE: this might need toLower on non xhtml5 (regular html5) pages!!
		this.template = document.getElementById(this.nodeName).cloneNode(true);

		//this.shadow = this.attachShadow({mode: 'open'});
		
		//this.shadow.appendChild(this.template.content.cloneNode(true));
		
		return this;
	}
	connectedCallback() {
		this.appendChild(this.template.content.cloneNode(true));
	}
}
