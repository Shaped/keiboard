Needed an On Screen Keyboard for some Kiosk/tablet style projects.

Saw a few on web, didn't likey. kioskboard wouldn't work with my xhtml5-nesss. opened code to try and fix..and..well..

Decided to make my own. Use as you wish HOWEVER it is GPLv3 so you have to share your code too. Otherwise, you can contact me for commercial licensing.

Code is still very early but it is sort of functional.

There are two main keyboard types, 'qwerty' and 'numpad'. 'qwerty' is based on a typical US layout. 'numpad' is mostly a generated layout for numeric entry.

Example:

https://codepen.io/forbiddenera-the-decoder/pen/VwzENdJ

![Numeric Example](https://github.com/Shaped/keiboard/raw/main/keiboardnumeric.png)
![QWERTY Example](https://github.com/Shaped/keiboard/raw/main/keiboardqwerty.png)

Usage:

```
var keiboardOptions = {
  inputClass: null,     // restricts keiboard to showing up only when elements of this class are focussed
  theme: 'dark',        // keiboard theme, dark is only working at the moment
  displaySpecialKeys: false,   // whether to display keys like alt, meta, control, etc..
  qwertyShowNumbers: true,     // whether or not to show the top row of numbers on the qwerty layout
  singleKeySpread: true,       // determines whether or not to add an additional class to each key button (allowing the key to have a minimum-width and 'spread-out')
  shiftSingle: true            // whether or not to return to lower-case after pressing a key on upper-case (ie: does shift act like a capslock?)
};

var keiboard = new Keiboard(keiboardOptions);

keiboard.enableKeiboard();
```

When enabled, if the user focusses an input element, keiboard will display. Key events will be fired as the user presses keys; these events will be 'untrusted' - this is a caveat of browser security - this doesn't particularly affect anything when you are listening for key events, however - it does make it difficult to have the browser respond to injected keypresses, for example, pressing the TAB key won't move to the next field (but you can listen for the tab key, as you would a normal key, and make it move to the next field).

You can set which type of keyboard displays (qwerty or numeric) by adding a 'data-keiboard-type' attribute to your input element. By default, the QWERTY layout is shown.

Example:

```
<input type="text" data-keiboard-type="numeric" />
```

If you want to have just a numeric keyboard on a certain element:

```
<input type="text" data-keiboard-type="numeric" data-keiboard-fixed="true" />
```


TODO:
- make light theme work
- make both themes better
- make tests, examples
- test integration with various layout styles
- make easier way to add/change keyboard layout definitions
- lots more, I said it was early :)

(C) 2021 Shaped Technica (Jai B)
