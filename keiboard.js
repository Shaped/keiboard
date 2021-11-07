/*

	keiboard - onscreen keyboard yo
	(C) 2021 Shaped Technica (Jai B)
*/

class Keiboard {
	constructor ({ // wtf es6..works tho
		  inputClass = null,
		  testVar = 'wtf',
		  theme = 'dark'
		} = {}) {

		this.options = {
			inputClass:inputClass,
			testVar:testVar,
			theme:theme
		};

		this.themes = {
			'light' : {
				baseThemeURI	: '/js/lib/keiboard/css/keiboard-light-base.css',
				shadowThemeURI	: '/js/lib/keiboard/css/keiboard-light-shadow.css',
				templateURI		: '/js/lib/keiboard/templates/keiboard-light.html'
			},
			'dark' : {
				baseThemeURI	: '/js/lib/keiboard/css/keiboard-dark-base.css',
				shadowThemeURI	: '/js/lib/keiboard/css/keiboard-dark-shadow.css',
				templateURI		: '/js/lib/keiboard/templates/keiboard-dark.html'
			}
		}

		this.enabled = false;
		this.isVisible = false;

		this.initialize();
	}

	initialize () {
		let style = document.createElement('link');

		style.setAttribute('rel','stylesheet');
		style.setAttribute('type','text/css');

		style.setAttribute('href',this.themes[this.options.theme].baseThemeURI);

		document.head.appendChild(style);

		this.insertTemplatesIntoDocument().then(() => {
			customElements.define('keiboard-container', KeiboardContainerElementClass);
			customElements.define('keiboard-numeric', KeiboardNumpadElementClass);
			customElements.define('keiboard-qwerty', KeiboardQwertyElementClass);
		});

		this.insertKeiboardIntoDocument();		
	}

	async insertTemplatesIntoDocument() {
		let response = await fetch(this.themes[this.options.theme].templateURI);

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
			style.setAttribute('type','text/css');
			style.setAttribute('href',_self.themes[_self.options.theme].shadowThemeURI);

			el.content.prepend(style);

			document.head.appendChild(el.cloneNode(true));
		});

	}

	attachEvents() {
		  /* we lose focus of window, document and input (if input was focused)
		  	when user switches tasks, we need to detect if this happens at the same
		  	time and allow the user to decide whether to hide or not during
		  	"alt tabbin'" out
		  	*/

		  this.focusHappenedEventBind = this.focusHappened.bind(this);
		  this.blurHappenedEventBind = this.blurHappened.bind(this);
		  window.addEventListener('focus', this.focusHappenedEventBind, true);
		  window.addEventListener('blur', this.blurHappenedEventBind, true);

	}

	detachEvents() {
		window.removeEventListener('focus', this.focusHappenedEventBind, true);
		window.removeEventListener('blur', this.blurHappenedEventBind, true);
	}

	showKeyboard(target) {
		// set container to visible, css makes main container z-index:9999
		// should be done first, before animation
		this.keiboardContainer.setAttribute('data-keiboard-is-visible', true);
		this.keiboardContainer.keiboardContainerDiv.setAttribute('data-keiboard-is-visible', true);

		switch(target.getAttribute('data-keiboard-type')) {
			case 'numeric':
				this.showNumericKeyboard(target);
			  break;
			case 'qwerty':
			case null:
			default:
				this.showQwertyKeyboard(target);

		}
	}

	showQwertyKeyboard(target) {
		this.keiboardContainer.keiboardQwerty.target = target;

		this.keiboardContainer.keiboardQwerty.setAttribute('data-keiboard-is-visible', true);
		this.keiboardContainer.keiboardNumeric.setAttribute('data-keiboard-is-visible', false);
		console.log("Show qwerty@");
		console.log(target);

		this.isVisible = true;
	}

	showNumericKeyboard(target) {
		this.keiboardContainer.keiboardNumeric.target = target;

		this.keiboardContainer.keiboardNumeric.setAttribute('data-keiboard-is-visible', true);
		this.keiboardContainer.keiboardQwerty.setAttribute('data-keiboard-is-visible', false);

		this.isVisible = true;
	}

	hideKeyboard() {
		this.keiboardContainer.keiboardNumeric.setAttribute('data-keiboard-is-visible', false);
		this.keiboardContainer.keiboardQwerty.setAttribute('data-keiboard-is-visible', false);

		this.keiboardContainer.keiboardContainerDiv.setAttribute('data-keiboard-is-visible', false);

		// set container to invisible, css makes main container z-index:-9999
		// should be done last, after animation

		this.keiboardContainer.keiboardContainerDiv.addEventListener('transitionend', (ev)=>{
			this.keiboardContainer.setAttribute('data-keiboard-is-visible', false);
			this.isVisible = false;
		}, { once: true});

	}

	focusHappened(ev) {
		if (ev.target instanceof HTMLInputElement) {
			if (this.options.inputClass != null
			&&	ev.target.classList.contains(this.options.inputClass)
			||  this.options.inputClass == null) {
				this.showKeyboard(ev.target);
			}
		} 
	}

	blurHappened(ev) {
		if (ev.target instanceof HTMLInputElement) {
			if (this.options.inputClass != null
			&&	ev.target.classList.contains(this.options.inputClass)
			||  this.options.inputClass == null) {
				this.hideKeyboard();
			}			
		}
	}

	enableKeiboard(show=false) {
		// so we need to pop up anytime an input gets focuseed...
		// can we just listen to windoiw for that 
		// window.focuschagne? 
		this.enabled=true;
		this.attachEvents();
		if (show == true) {
			// todo show on enable
		}
	}

	disableKeiboard(hide=false) {
		if (hide == true) {
			// hide before detach
		}
		this.enabled = false;
		this.detachEvents();
	}

	insertKeiboardIntoDocument() {
		this.keiboardContainer = document.createElement('keiboard-container');

		this.keiboardContainer.setAttribute('data-keiboard-is-visible','false');

		document.body.appendChild(this.keiboardContainer);


		//console.log(this.keiboardContainer.shadow);
		//setTimeout(()=>{console.log(this.keiboardContainer.shadow);},10);

	/*	
		this.keiboardNumeric = document.createElement('keiboard-numeric');
		this.keiboardQwerty = document.createElement('keiboard-qwerty');

		console.log(this.keiboardContainer.shadow);
		this.keiboardContainer.appendChild(this.keiboardNumeric);
		this.keiboardContainer.appendChild(this.keiboardQwerty);

		document.body.appendChild(this.keiboardContainer);
setTimeout( () => {
		console.log(this.keiboardContainer.querySelectorAll('*'))
	},123);*/
	}

}

class KeiboardNumpadElementClass extends HTMLElement {
	constructor(...args) {
		super(...args);
		this.self = self;

		this.target = null;

		// NOTE: this might need toLower on non xhtml5 (regular html5) pages!!
		this.template = document.getElementById(this.nodeName).cloneNode(true);

		this.shadow = this.attachShadow({mode: 'open'});
		
		this.shadow.appendChild(this.template.content.cloneNode(true));
		
		return this;
	}
	connectedCallback() {
		var numpadContainer = this.shadow.querySelector('.keypad_numpadContainer');

		var numpadKeys = [];

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

			key.addEventListener('mousedown', this.handleKeypress.bind(this));

			key.textContent = el.label;
			key.value = el.id;

			numpadContainer.appendChild(key);
		});

	//	this.appendChild(this.template.content.cloneNode(true));
	}
	handleKeypress(ev) {
		ev.preventDefault();

		var startPos = this.target.selectionStart;
		var endPos = this.target.selectionEnd;;

		if (this.target != null) {
			switch(ev.currentTarget.value) {
				case "Enter":
					const enter = {
						view: window,
						bubbles: true,
						cancelable: true,
						key: 'Enter',
						code: 'Enter', //compat
						charCode: 0,  //compat
						keyCode: 13    //compat
					};

					const enterPress = new KeyboardEvent('keypress', enter);
					const enterDown = new KeyboardEvent('keydown', enter);
					const enterUp = new KeyboardEvent('keyup', enter);

					this.target.dispatchEvent(enterDown);

					setTimeout(()=>{
						this.target.dispatchEvent(enterUp);
						setTimeout(()=>{
							this.target.dispatchEvent(enterPress);
						});
					});

				  break;
				case "Delete":
					const bksp = {
						view: window,
						bubbles: true,
						cancelable: true,
						key: 'Backspace',
						code: 'backspace', //compat
						charCode: 0,  //compat
						keyCode: 8    //compat
					}

					const del = {
						view: window,
						bubbles: true,
						cancelable: true,
						key: 'Delete',
						code: 'Delete', //compat
						charCode: 0,  //compat
						keyCode: 8    //compat						
					}

					//bksp and del don't seem to trigger a 'keypress', only down/up
					const bkspDown = new KeyboardEvent('keydown', bksp);
					const delDown = new KeyboardEvent('keydown', del);
					const bkspUp = new KeyboardEvent('keyup', bksp);
					const delUp = new KeyboardEvent('keyup', del);

					if (this.target.value.length != 0) {
						if (this.target.selectionStart != 0
						&&  this.target.selectionEnd != 0
						||	this.target.selectionStart == 0
						&&  this.target.selectionEnd != 0) {
							if (this.target.selectionStart != this.target.selectionEnd) {
								// delete selection (bksp)
								this.target.value = this.target.value.substring(0, startPos)
												  + this.target.value.substring(endPos, this.target.value.length);
								
								this.target.selectionStart = startPos;
								this.target.selectionEnd = startPos;

								this.target.dispatchEvent(bkspDown);
								setTimeout(()=>this.target.dispatchEvent(bkspUp));
							} else {
								// left delete (bksp)
								this.target.dispatchEvent(bkspDown);
								setTimeout(()=>this.target.dispatchEvent(bkspUp));

								if (this.target.selectionStart != this.target.value.length) {
									this.target.value = this.target.value.substring(0, startPos-1)
													  + this.target.value.substring(startPos, this.target.value.length);

									this.target.selectionStart = startPos-1;
									this.target.selectionEnd = startPos-1;
								} else {
									this.target.value = this.target.value.substring(0, this.target.value.length - 1);

									this.target.selectionStart = this.target.value.length;
									this.target.selectionEnd = this.target.value.length;
								}
							}
						} else {
							// right delete (del)
							if (this.target.selectionStart == 0
							&&  this.target.selectionEnd == 0) {
								
								this.target.dispatchEvent(delDown);
								setTimeout(()=>this.target.dispatchEvent(delUp));

								this.target.value = this.target.value.substring(1, this.target.value.length);

								this.target.selectionStart = 0;
								this.target.selectionEnd = 0;
							}
						}
					} else {
						this.target.dispatchEvent(bkspDown);
						setTimeout(()=>this.target.dispatchEvent(bkspUp));						
					}
				  break;
				default:
					// TODO:
					// 'untrusted' fake keypress/up/down events for all keys
					if (this.target.selectionStart == 0
					&& this.target.selectionEnd == 0
					&& this.target.value.length == 0
					|| this.target.selectionStart == this.target.value.length) {
					    this.target.value += ev.currentTarget.value;						
					} else {
					    this.target.value = this.target.value.substring(0, startPos)
					        + ev.currentTarget.value
					        + this.target.value.substring(endPos, this.target.value.length);

					    this.target.selectionStart = startPos+1;
					    this.target.selectionEnd = startPos+1;
					}
			}
		}
	}
}

class KeiboardContainerElementClass extends HTMLElement {
	constructor(...args) {
		super(...args);
		this.self = self;

		// NOTE: this might need toLower on non xhtml5 (regular html5) pages!!
		this.template = document.getElementById(this.nodeName).cloneNode(true);

		this.shadow = this.attachShadow({mode: 'open'});		

		return this;
	}
	connectedCallback() {
		this.keiboardQwerty = document.createElement('keiboard-qwerty');
		this.keiboardNumeric = document.createElement('keiboard-numeric');

		this.keiboardContainerDiv = document.createElement('div');
		this.keiboardContainerDiv.classList.add('keiboard-container');

		this.keiboardContainerDiv.appendChild(this.keiboardQwerty);
		this.keiboardContainerDiv.appendChild(this.keiboardNumeric);

		this.shadow.appendChild(this.keiboardContainerDiv);

		//this.shadow.appendChild(this.keiboardQwerty);
		//this.shadow.appendChild(this.keiboardNumeric);
	
		this.shadow.appendChild(this.template.content.cloneNode(true));
		//this.appendChild(this.template.content.cloneNode(true));

	}
}

class KeiboardQwertyElementClass extends HTMLElement {
	constructor(...args) {
		super(...args);
		this.self = self;

		// NOTE: this might need toLower on non xhtml5 (regular html5) pages!!
		this.template = document.getElementById(this.nodeName).cloneNode(true);

		this.shadow = this.attachShadow({mode: 'open'});
		
		//this.shadow.appendChild(this.template.content.cloneNode(true));
		
		return this;
	}
	connectedCallback() {
		this.shadow.appendChild(this.template.content.cloneNode(true));
	}
}
