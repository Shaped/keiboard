/*

	keiboard - onscreen keyboard yo
	(C) 2021 Shaped Technica (Jai B)
*/

class Keiboard {
	constructor ({
		  inputClass = null,
		  theme = 'dark',
		  displaySpecialKeys = false,
		  qwertyShowNumbers = true,
		  singleKeySpread = true
		} = {}) {

		this.options = {
			inputClass:inputClass,
			theme:theme,
			displaySpecialKeys: displaySpecialKeys,
			qwertyShowNumbers: qwertyShowNumbers,
			singleKeySpread: singleKeySpread
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

		this.qwertyKeys = [ // Generic QWERTY 'US' Keyboard Layout
			[
			// `12345687890=|BKSP + SYMBOLS
			{
				keyUpper:{
					name: 'tilde',
					label: "~",
					keyCode: "~"
				},
				keyLower: {
					name: 'backquote',
					label: "`",
					keyCode: "`"
				}
			},
			{
				keyUpper: {
					label: "!",
					keyCode: "!"
				},
				keyLower:{
					label: "1",
					keyCode: "1"
				}
			},
			{
				keyUpper: {
					label: "@",
					keyCode: "@"
				},
				keyLower:{
					label: "2",
					keyCode: "2"
				}
			},
			{
				keyUpper: {
					label: "#",
					keyCode: "#"
				},
				keyLower:{
					label: "3",
					keyCode: "3"
				}
			},
			{
				keyUpper: {
					label: "$",
					keyCode: "$"
				},
				keyLower:{
					label: "5",
					keyCode: "5"
				}
			},
			{
				keyUpper: {
					label: "^",
					keyCode: "^"
				},
				keyLower:{
					label: "6",
					keyCode: "6"
				}
			},
			{
				keyUpper: {
					label: "&",
					keyCode: "&"
				},
				keyLower:{
					label: "7",
					keyCode: "7"
				}
			},
			{
				keyUpper: {
					label: "*",
					keyCode: "*"
				},
				keyLower:{
					label: "8",
					keyCode: "8"
				}
			},
			{
				keyUpper: {
					label: "(",
					keyCode: "("
				},
				keyLower:{
					label: "9",
					keyCode: "9"
				}
			},
			{
				keyUpper: {
					label: ")",
					keyCode: ")"
				},
				keyLower:{
					label: "0",
					keyCode: "0"
				}
			},
			{
				keyUpper: {
					label: "_",
					keyCode: "_"
				},
				keyLower:{
					label: "-",
					keyCode: "-"
				}
			},
			{
				keyUpper: {
					label: "+",
					keyCode: "+"
				},
				keyLower:{
					label: "=",
					keyCode: "="
				},
			},
			{
				keyUpper: {
					label: "DEL",
					keyCode: "Delete"
				},
				keyLower:{
					label: "BKSP",
					keyCode: "Backspace"
				},
			}
			],
			// TAB|QWERTYUIOP[]\
			[
			{
				keyUpper:{
					//label: "SHIFT+TAB",
					label: "TAB",
					keyCode: "Tab",
					keyModifier: "Shift",
					keyIsSpecial: true					
				},
				keyLower:{
					label: "TAB",
					keyCode: "Tab",
					keyIsSpecial: true
				}
			},
			{
				keyUpper: {
					label: "Q",
					keyCode: "Q"
				},
				keyLower:{
					label: "q",
					keyCode: "q"
				}
			},
			{
				keyUpper: {
					label: "W",
					keyCode: "W"
				},
				keyLower:{
					label: "w",
					keyCode: "w"
				}
			},
			{
				keyUpper: {
					label: "E",
					keyCode: "E"
				},
				keyLower:{
					label: "e",
					keyCode: "e"
				}
			},
			{
				keyUpper: {
					label: "R",
					keyCode: "R"
				},
				keyLower:{
					label: "r",
					keyCode: "r"
				}
			},
			{
				keyUpper: {
					label: "T",
					keyCode: "T"
				},
				keyLower:{
					label: "t",
					keyCode: "t"
				}
			},
			{
				keyUpper: {
					label: "Y",
					keyCode: "Y"
				},
				keyLower:{
					label: "y",
					keyCode: "y"
				}
			},
			{
				keyUpper: {
					label: "U",
					keyCode: "U"
				},
				keyLower:{
					label: "u",
					keyCode: "u"
				}
			},
			{
				keyUpper: {
					label: "I",
					keyCode: "I"
				},
				keyLower:{
					label: "i",
					keyCode: "i"
				}
			},
			{
				keyUpper: {
					label: "I",
					keyCode: "I"
				},
				keyLower:{
					label: "i",
					keyCode: "i"
				}
			},
			{
				keyUpper: {
					label: "O",
					keyCode: "O"
				},
				keyLower:{
					label: "o",
					keyCode: "o"
				}
			},
			{
				keyUpper: {
					label: "P",
					keyCode: "P"
				},
				keyLower:{
					label: "p",
					keyCode: "p"
				}
			},
			{
				keyUpper: {
					label: "{",
					keyCode: "{"
				},
				keyLower:{
					label: "[",
					keyCode: "["
				},
			},
			{
				keyUpper: {
					label: "}",
					keyCode: "}"
				},
				keyLower:{
					label: "]",
					keyCode: "]"
				},
			},
			{
				keyUpper: {
					name: "Backslash",
					label: "\\",
					keyCode: "\\"
				},
				keyLower:{
					name: "Pipe",
					label: "|",
					keyCode: "|"
				},
			},
			],
			[ // CAPS|ASDFGHJKL;'|ENTER
			{
				keyLower:{
					label: "CAPS",
					keyCode: "CapsLock",
					keyIsSpecial: true,
					keyIsToggle: true
				}
			},
			{
				keyUpper: {
					label: "A",
					keyCode: "A"
				},
				keyLower:{
					label: "a",
					keyCode: "a"
				}
			},
			{
				keyUpper: {
					label: "S",
					keyCode: "S"
				},
				keyLower:{
					label: "s",
					keyCode: "s"
				}
			},
			{
				keyUpper: {
					label: "D",
					keyCode: "D"
				},
				keyLower:{
					label: "d",
					keyCode: "d"
				}
			},
			{
				keyUpper: {
					label: "F",
					keyCode: "F"
				},
				keyLower:{
					label: "f",
					keyCode: "f"
				}
			},
			{
				keyUpper: {
					label: "G",
					keyCode: "G"
				},
				keyLower:{
					label: "g",
					keyCode: "g"
				}
			},
			{
				keyUpper: {
					label: "H",
					keyCode: "H"
				},
				keyLower:{
					label: "h",
					keyCode: "h"
				}
			},
			{
				keyUpper: {
					label: "J",
					keyCode: "J"
				},
				keyLower:{
					label: "j",
					keyCode: "j"
				}
			},
			{
				keyUpper: {
					label: "K",
					keyCode: "K"
				},
				keyLower:{
					label: "k",
					keyCode: "k"
				}
			},
			{
				keyUpper: {
					label: "L",
					keyCode: "L"
				},
				keyLower:{
					label: "l",
					keyCode: "l"
				}
			},
			{
				keyUpper: {
					label: ":",
					keyCode: ":"
				},
				keyLower:{
					label: ";",
					keyCode: ";"
				}
			},
			{
				keyUpper: {
					label: "\"",
					keyCode: "\""
				},
				keyLower:{
					label: "'",
					keyCode: "'"
				}
			},
			{
				keyUpper: {
					//label: "SHIFT+Enter",
					label: "Enter",
					keyCode: "Enter",
					keyModifier: "Shift"
				},
				keyLower:{
					label: "Enter",
					keyCode: "Enter"
				},
			}
			],
			[ // SHIFT|ZXCVBNM,./|SHIFT
			{
				keyLower:{
					label: "Shift",
					keyCode: "Shift",
					keyIsModifier: true,
//					keyIsSpecial: true,
					keyIsToggle: true
				}
			},
			{
				keyUpper: {
					label: "Z",
					keyCode: "Z"
				},
				keyLower:{
					label: "z",
					keyCode: "z"
				}
			},
			{
				keyUpper: {
					label: "X",
					keyCode: "X"
				},
				keyLower:{
					label: "x",
					keyCode: "x"
				}
			},
			{
				keyUpper: {
					label: "C",
					keyCode: "C"
				},
				keyLower:{
					label: "c",
					keyCode: "c"
				}
			},
			{
				keyUpper: {
					label: "V",
					keyCode: "V"
				},
				keyLower:{
					label: "v",
					keyCode: "v"
				}
			},
			{
				keyUpper: {
					label: "B",
					keyCode: "B"
				},
				keyLower:{
					label: "b",
					keyCode: "b"
				}
			},
			{
				keyUpper: {
					label: "N",
					keyCode: "N"
				},
				keyLower:{
					label: "n",
					keyCode: "n"
				}
			},
			{
				keyUpper: {
					label: "M",
					keyCode: "M"
				},
				keyLower:{
					label: "m",
					keyCode: "m"
				}
			},
			{
				keyUpper: {
					label: "<",
					keyCode: "<"
				},
				keyLower:{
					label: ",",
					keyCode: ","
				}
			},
			{
				keyUpper: {
					label: ">",
					keyCode: ">"
				},
				keyLower:{
					label: ".",
					keyCode: "."
				}
			},
			{
				keyUpper: {
					label: "?",
					keyCode: "?"
				},
				keyLower:{
					label: "/",
					keyCode: "/"
				}
			},
			{
				keyLower:{
					label: "Shift",
					keyCode: "Shift",
					keyIsModifier: true,
//					keyIsSpecial: true,
					keyIsToggle: true
				}
			}
			],
			[ // CTRL|META|ALT|SPACE|ALT|META|CONTEXTMENU|CTRL
			{
				keyLower: {
					label: "CTRL",
					keyCode: "Control",
					keyCodeAlt: "ControlLeft",
					keyIsModifier: true,
					keyIsSpecial: true
				}
			},
			{
				keyLower: {
					label: "META",
					keyCode: "Meta",
					keyCodeAlt: "MetaLeft",
					keyIsSpecial: true,
				}
			},
			{
				keyLower: {
					label: "Alt",
					keyCode: "Alt",
					keyCodeAlt: "AltLeft",
					keyIsModifier: true,
					keyIsSpecial: true
				}
			},
			{
				keyLower: {
					label: "Space",
					keyCode: " ",
					keyCodeAlt: "Space",
					keyIsBar: true
				}
			},
			{
				keyLower: {
					label: "Alt",
					keyCode: "Alt",
					keyCodeAlt: "AltRight",
					keyIsModifier: true,
					keyIsSpecial: true
				}
			},
			{
				keyLower: {
					label: "META",
					keyCode: "Meta",
					keyCodeAlt: "MetaRight",
					keyIsSpecial: true
				}
			},
			{
				keyLower: {
					label: "CONTEXT",
					keyCode: "ContextMenu",
					keyIsSpecial: true
				}
			},
			{
				keyLower: {
					label: "CTRL",
					keyCode: "Control",
					keyCodeAlt: "ControlRight",
					keyIsModifier: true,
					keyIsSpecial: true
				}
			}			
			]
		];

		this.qwertyKeysNoNumbers = [ // Generic QWERTY 'US' Keyboard Layout without Numbers
			// TAB|QWERTYUIOP[]\
			[
			{
				keyUpper:{
					//label: "SHIFT+TAB",
					label: "TAB",
					keyCode: "Tab",
					keyIsSpecial: true,
					keyModifier: "Shift"
				},
				keyLower:{
					label: "TAB",
					keyCode: "Tab",
					keyIsSpecial: true
				}
			},
			{
				keyUpper: {
					label: "Q",
					keyCode: "Q"
				},
				keyLower:{
					label: "q",
					keyCode: "q"
				}
			},
			{
				keyUpper: {
					label: "W",
					keyCode: "W"
				},
				keyLower:{
					label: "w",
					keyCode: "w"
				}
			},
			{
				keyUpper: {
					label: "E",
					keyCode: "E"
				},
				keyLower:{
					label: "e",
					keyCode: "e"
				}
			},
			{
				keyUpper: {
					label: "R",
					keyCode: "R"
				},
				keyLower:{
					label: "r",
					keyCode: "r"
				}
			},
			{
				keyUpper: {
					label: "T",
					keyCode: "T"
				},
				keyLower:{
					label: "t",
					keyCode: "t"
				}
			},
			{
				keyUpper: {
					label: "Y",
					keyCode: "Y"
				},
				keyLower:{
					label: "y",
					keyCode: "y"
				}
			},
			{
				keyUpper: {
					label: "U",
					keyCode: "U"
				},
				keyLower:{
					label: "u",
					keyCode: "u"
				}
			},
			{
				keyUpper: {
					label: "I",
					keyCode: "I"
				},
				keyLower:{
					label: "i",
					keyCode: "i"
				}
			},
			{
				keyUpper: {
					label: "I",
					keyCode: "I"
				},
				keyLower:{
					label: "i",
					keyCode: "i"
				}
			},
			{
				keyUpper: {
					label: "O",
					keyCode: "O"
				},
				keyLower:{
					label: "o",
					keyCode: "o"
				}
			},
			{
				keyUpper: {
					label: "P",
					keyCode: "P"
				},
				keyLower:{
					label: "p",
					keyCode: "p"
				}
			},
			{
				keyUpper: {
					label: "{",
					keyCode: "{"
				},
				keyLower:{
					label: "[",
					keyCode: "["
				},
			},
			{
				keyUpper: {
					label: "}",
					keyCode: "}"
				},
				keyLower:{
					label: "]",
					keyCode: "]"
				},
			},
			{
				keyUpper: {
					name: "Backslash",
					label: "\\",
					keyCode: "\\"
				},
				keyLower:{
					name: "Pipe",
					label: "|",
					keyCode: "|"
				},
			},
			{
				keyLower:{
					label: "BKSP",
					keyCode: "Backspace"
				},
			}			
			],
			[ // CAPS|ASDFGHJKL;'|ENTER
			{
				keyLower:{
					label: "CAPS",
					keyCode: "CapsLock",
					keyIsSpecial: true,
					keyIsToggle: true
				}
			},
			{
				keyUpper: {
					label: "A",
					keyCode: "A"
				},
				keyLower:{
					label: "a",
					keyCode: "a"
				}
			},
			{
				keyUpper: {
					label: "S",
					keyCode: "S"
				},
				keyLower:{
					label: "s",
					keyCode: "s"
				}
			},
			{
				keyUpper: {
					label: "D",
					keyCode: "D"
				},
				keyLower:{
					label: "d",
					keyCode: "d"
				}
			},
			{
				keyUpper: {
					label: "F",
					keyCode: "F"
				},
				keyLower:{
					label: "f",
					keyCode: "f"
				}
			},
			{
				keyUpper: {
					label: "G",
					keyCode: "G"
				},
				keyLower:{
					label: "g",
					keyCode: "g"
				}
			},
			{
				keyUpper: {
					label: "H",
					keyCode: "H"
				},
				keyLower:{
					label: "h",
					keyCode: "h"
				}
			},
			{
				keyUpper: {
					label: "J",
					keyCode: "J"
				},
				keyLower:{
					label: "j",
					keyCode: "j"
				}
			},
			{
				keyUpper: {
					label: "K",
					keyCode: "K"
				},
				keyLower:{
					label: "k",
					keyCode: "k"
				}
			},
			{
				keyUpper: {
					label: "L",
					keyCode: "L"
				},
				keyLower:{
					label: "l",
					keyCode: "l"
				}
			},
			{
				keyUpper: {
					label: ":",
					keyCode: ":"
				},
				keyLower:{
					label: ";",
					keyCode: ";"
				}
			},
			{
				keyUpper: {
					label: "\"",
					keyCode: "\""
				},
				keyLower:{
					label: "'",
					keyCode: "'"
				}
			},
			{
				keyUpper: {
					//label: "SHIFT+Enter",
					label: "Enter",
					keyCode: "Enter",
					keyModifier: "Shift"
				},
				keyLower:{
					label: "Enter",
					keyCode: "Enter"
				},
			}
			],
			[ // SHIFT|ZXCVBNM,./|SHIFT
			{
				keyUpper: {
					label: "Z",
					keyCode: "Z"
				},
				keyLower:{
					label: "z",
					keyCode: "z"
				}
			},
			{
				keyUpper: {
					label: "X",
					keyCode: "X"
				},
				keyLower:{
					label: "x",
					keyCode: "x"
				}
			},
			{
				keyUpper: {
					label: "C",
					keyCode: "C"
				},
				keyLower:{
					label: "c",
					keyCode: "c"
				}
			},
			{
				keyUpper: {
					label: "V",
					keyCode: "V"
				},
				keyLower:{
					label: "v",
					keyCode: "v"
				}
			},
			{
				keyUpper: {
					label: "B",
					keyCode: "B"
				},
				keyLower:{
					label: "b",
					keyCode: "b"
				}
			},
			{
				keyUpper: {
					label: "N",
					keyCode: "N"
				},
				keyLower:{
					label: "n",
					keyCode: "n"
				}
			},
			{
				keyUpper: {
					label: "M",
					keyCode: "M"
				},
				keyLower:{
					label: "m",
					keyCode: "m"
				}
			},
			{
				keyUpper: {
					label: "<",
					keyCode: "<"
				},
				keyLower:{
					label: ",",
					keyCode: ","
				}
			},
			{
				keyUpper: {
					label: ">",
					keyCode: ">"
				},
				keyLower:{
					label: ".",
					keyCode: "."
				}
			},
			{
				keyUpper: {
					label: "?",
					keyCode: "?"
				},
				keyLower:{
					label: "/",
					keyCode: "/"
				}
			}
			],
			[ // CTRL|META|ALT|SPACE|ALT|META|CONTEXTMENU|CTRL
			{
				keyLower: {
					label: "CTRL",
					keyCode: "Control",
					keyCodeAlt: "ControlLeft",
					keyIsModifier: true,
					keyIsSpecial: true
				}
			},
			{
				keyLower: {
					label: "META",
					keyCode: "Meta",
					keyCodeAlt: "MetaLeft",
					keyIsSpecial: true,
				}
			},
			{
				keyLower: {
					label: "Alt",
					keyCode: "Alt",
					keyCodeAlt: "AltLeft",
					keyIsModifier: true,
					keyIsSpecial: true
				}
			},
			{
				keyLower:{
					label: "Shift",
					keyCode: "Shift",
					keyCodeAlt: "LeftShift",
					keyIsModifier: true,
//					keyIsSpecial: true,
					keyIsToggle: true
				}
			},			
			{
				keyLower: {
					label: "Space",
					keyCode: " ",
					keyCodeAlt: "Space",
					keyIsBar: true
				}
			},
			{
				keyLower: {
					label: "NumPad",
					keyCode: "ToggleNumeric"
				}
			},
			{
				keyLower:{
					label: "Shift",
					keyCode: "Shift",
					keyCodeAlt: "RightShift",
					keyIsModifier: true,
//					keyIsSpecial: true,
					keyIsToggle: true
				}
			},			
			{
				keyLower: {
					label: "Alt",
					keyCode: "Alt",
					keyCodeAlt: "AltRight",
					keyIsModifier: true,
					keyIsSpecial: true
				}
			},
			{
				keyLower: {
					label: "META",
					keyCode: "Meta",
					keyCodeAlt: "MetaRight",
					keyIsSpecial: true
				}
			},
			{
				keyLower: {
					label: "CONTEXT",
					keyCode: "ContextMenu",
					keyIsSpecial: true
				}
			},
			{
				keyLower: {
					label: "CTRL",
					keyCode: "Control",
					keyCodeAlt: "ControlRight",
					keyIsModifier: true,
					keyIsSpecial: true
				}
			}			
			]
		];		

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
		  	when user switches tasks/tabs, need to detect if this happens at the same
		  	time and allow the user to decide whether to hide or not when this happens?
		  	so that the keiboard isn't 'gone' when they return unexpectedly?
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

		this.target = target;

		switch(target.getAttribute('data-keiboard-type')) {
			case 'numeric':
				this.showNumericKeyboard();
			  break;
			case 'qwerty':
			case null:
			default:
				this.showQwertyKeyboard();

		}
	}

	toggleType() {
		if (this.keiboardContainer.keiboardQwerty.attributes['data-keiboard-is-visible'].value == 'true') {
			this.showNumericKeyboard();
		} else {
			this.showQwertyKeyboard();
		}
	}

	showQwertyKeyboard() {
		this.keiboardContainer.keiboardQwerty.target = this.target;

		this.keiboardContainer.keiboardQwerty.setAttribute('data-keiboard-is-visible', true);
		this.keiboardContainer.keiboardNumeric.setAttribute('data-keiboard-is-visible', false);

		this.isVisible = true;
	}

	showNumericKeyboard() {
		this.keiboardContainer.keiboardNumeric.target = this.target;

		this.keiboardContainer.keiboardNumeric.setAttribute('data-keiboard-is-visible', true);
		this.keiboardContainer.keiboardQwerty.setAttribute('data-keiboard-is-visible', false);

		this.isVisible = true;
	}

	hideKeyboard() {
		this.keiboardContainer.keiboardNumeric.setAttribute('data-keiboard-is-visible', false);
		this.keiboardContainer.keiboardQwerty.setAttribute('data-keiboard-is-visible', false);

		this.keiboardContainer.keiboardContainerDiv.setAttribute('data-keiboard-is-visible', false);

		// set container to invisible, css makes main container z-index:-9999
		// should be done last, after animation/transition
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

	enableKeiboard() {
		this.enabled=true;
		this.attachEvents();
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

		this.keiboardContainer.parent = this;

		this.keiboardContainer.setAttribute('data-keiboard-is-visible','false');

		document.body.appendChild(this.keiboardContainer);
	}

}

class KeiboardElementClass extends HTMLElement {
	constructor(...args) {
		super(...args);
		this.self = self;

		return this;
	}	
	handleKeypress(ev) {
		ev.preventDefault();

		var startPos = this.target.selectionStart;
		var endPos = this.target.selectionEnd;

		if (this.target != null) {
			switch(ev.currentTarget.value) {
				case "ToggleNumeric":
					this.parent.toggleType();
				  break;
				case "Enter":
					let enterKey = {
						view: window,
						bubbles: true,
						cancelable: true,
						key: 'Enter',
						code: 'Enter', //compat
						charCode: 0,  //compat
						keyCode: 13    //compat
					};

					let enterPress = new KeyboardEvent('keypress', enterKey);
					let enterDown = new KeyboardEvent('keydown', enterKey);
					let enterUp = new KeyboardEvent('keyup', enterKey);

					this.target.dispatchEvent(enterDown);

					setTimeout(()=>{
						this.target.dispatchEvent(enterUp);
						setTimeout(()=>{
							this.target.dispatchEvent(enterPress);
						});
					});
				  break;
				case "Tab":
					let tabKey = {
						view: window,
						bubbles: true,
						cancelable: true,
						key: 'Tab',
						code: 'Tab', //compat
						charCode: 0,  //compat
						keyCode: 9    //compat
					};

					let tabPress = new KeyboardEvent('keypress', tabKey);
					let tabDown = new KeyboardEvent('keydown', tabKey);
					let tabUp = new KeyboardEvent('keyup', tabKey);

					this.target.dispatchEvent(tabDown);

					setTimeout(()=>{
						this.target.dispatchEvent(tabUp);
						setTimeout(()=>{
							this.target.dispatchEvent(tabPress);
						});
					});
				  break;
				case "Shift":
					let shiftKey = {
						view: window,
						bubbles: true,
						cancelable: true,
						key: 'Shift',
						code: 'ShiftLeft', //compat
						charCode: 0,  //compat
						keyCode: 16    //compat
					};

					let shiftPress = new KeyboardEvent('keypress', shiftKey);
					let shiftDown = new KeyboardEvent('keydown', shiftKey);
					let shiftUp = new KeyboardEvent('keyup', shiftKey);

					if (!this.shiftIsDown) {
						this.shiftIsDown = true;
						this.target.dispatchEvent(shiftDown);
					} else {
						this.shiftIsDown = false;
						this.target.dispatchEvent(shiftUp);
						setTimeout(()=>{
							this.target.dispatchEvent(shiftPress);
						});
					}

					this.toggleKeyCase();
				  break;
				case "Backspace":
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
					// TODO: can we, even if 'untrusted', fake keypress/up/down events for all keys?
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

class KeiboardNumpadElementClass extends KeiboardElementClass {
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
				keyCode : parseInt(x),
				label : `${x}`
			});
		}

		numpadKeys.push({
			keyCode: 'Delete',
			label: 'DEL'
		});

		numpadKeys.push({
			keyCode: 0,
			label: '0'
		});

		numpadKeys.push({
			keyCode: 'Enter',
			label: 'OK'
		});

		numpadKeys.push({
			keyCode: 'ToggleNumeric',
			label: 'ABC'
		});

		numpadKeys.forEach((el, i) => {
			let key = document.createElement('button');

			key.addEventListener('mousedown', this.handleKeypress.bind(this));

			key.textContent = el.label;
			key.value = el.keyCode;

			key.classList.add("keiboard_key_"+el.keyCode);

			numpadContainer.appendChild(key);
		});
	}

}

class KeiboardQwertyElementClass extends KeiboardElementClass {
	constructor(...args) {
		super(...args);
		this.self = self;

		this.target = null;

		this.currentCase = "lower";

		// NOTE: this might need toLower on non xhtml5 (regular html5) pages!!
		this.template = document.getElementById(this.nodeName).cloneNode(true);

		this.shadow = this.attachShadow({mode: 'open'});
		
		this.shadow.appendChild(this.template.content.cloneNode(true));
		
		return this;
	}
	makeKeys(keyboard, container, keyCase) {
		this.currentCase = keyCase;

		keyboard.forEach((row, i) => {
			let keyRow = document.createElement('div');

			row.forEach((key,i) => {
				if (keyCase == "lower"
				||  typeof key.keyUpper === 'undefined') {
					if (!(key.keyLower.keyIsSpecial == true
					    &&
					    !this.parent.options.displaySpecialKeys)
					&& !key.keyLower.keyIsHidden) {
						let keyEl = document.createElement('button');

						if (key.keyLower.keyIsBar) {
							keyEl.classList.add('keiboard_keybar');
						} else
						if (key.keyLower.label.length == 1
						&& !this.parent.options.singleKeySpread) {
							keyEl.classList.add('keiboard_keysingle');
						}

						keyEl.addEventListener('mousedown', this.handleKeypress.bind(this));

						if (key.keyLower.keyCodeAlt) 
							keyEl.classList.add("keiboard_key_"+key.keyLower.keyCodeAlt);
						else
							keyEl.classList.add("keiboard_key_"+key.keyLower.keyCode);

						keyEl.textContent = key.keyLower.label;
						keyEl.value = key.keyLower.keyCode;

						keyRow.appendChild(keyEl);
					}
				} else {
					if (!(key.keyUpper.keyIsSpecial == true
					    &&
					    !this.parent.options.displaySpecialKeys)
					&& !key.keyUpper.keyIsHidden) {
						let keyEl = document.createElement('button');

						if (key.keyUpper.keyIsBar) {
							keyEl.classList.add('keiboard_keybar');
						} else
						if (key.keyUpper.label.length == 1
						&& !this.parent.options.singleKeySpread) {
							keyEl.classList.add('keiboard_keysingle');
						}

						keyEl.addEventListener('mousedown', this.handleKeypress.bind(this));

						if (key.keyUpper.keyCodeAlt) 
							keyEl.classList.add("keiboard_key_"+key.keyUpper.keyCodeAlt);
						else
							keyEl.classList.add("keiboard_key_"+key.keyUpper.keyCode);

						keyEl.textContent = key.keyUpper.label;
						keyEl.value = key.keyUpper.keyCode;

						keyRow.appendChild(keyEl);
					}					
				}
			});

			container.appendChild(keyRow);
		});
	}
	toggleKeyCase() {
		var qwertyContainer = this.shadow.querySelector('.keypad_qwertyContainer');

		qwertyContainer.innerHTML = "";

		var newCase = "lower";

		if (this.parent.options.qwertyShowNumbers)
			var qwertyKeys = this.parent.qwertyKeys;
		else 
			var qwertyKeys = this.parent.qwertyKeysNoNumbers;

		if (this.currentCase == "lower") {
			newCase = "upper";
		} else {
			newCase = "lower";
		}

		this.makeKeys(qwertyKeys, qwertyContainer, newCase);
	}
	connectedCallback() {
		var qwertyContainer = this.shadow.querySelector('.keypad_qwertyContainer');

		if (this.parent.options.qwertyShowNumbers)
			var qwertyKeys = this.parent.qwertyKeys;
		else 
			var qwertyKeys = this.parent.qwertyKeysNoNumbers;

		this.makeKeys(qwertyKeys, qwertyContainer, 'lower');
	}
}

class KeiboardContainerElementClass extends HTMLElement {
	constructor(...args) {
		super(...args);
		this.self = self;

		// NOTE: this might? need toLower on non xhtml5 (regular html5) pages!!
		this.template = document.getElementById(this.nodeName).cloneNode(true);

		this.shadow = this.attachShadow({mode: 'open'});		

		return this;
	}
	connectedCallback() {
		let style = document.createElement('link');

		style.setAttribute('rel','stylesheet');
		style.setAttribute('type','text/css');
		style.setAttribute('href',this.parent.themes[this.parent.options.theme].shadowThemeURI);

		this.shadow.appendChild(style);

		this.keiboardQwerty = document.createElement('keiboard-qwerty');
		this.keiboardNumeric = document.createElement('keiboard-numeric');

		this.keiboardQwerty.parent = this.parent;
		this.keiboardNumeric.parent = this.parent;

		this.keiboardContainerDiv = document.createElement('div');
		this.keiboardContainerDiv.classList.add('keiboard-container');

		this.keiboardContainerDiv.appendChild(this.keiboardQwerty);
		this.keiboardContainerDiv.appendChild(this.keiboardNumeric);

		this.shadow.appendChild(this.keiboardContainerDiv);

		this.shadow.appendChild(this.template.content.cloneNode(true));
	}
}