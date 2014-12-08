smart-menu
==========

CS1300 - Development project

### Purpose
SmartMenu library can be used to create smart navigation menus, elements of which reorder themselves automatically 
according to each user's usage history.
Basically, if a navigation entry anywhere in the navigation menu has been clicked more than it's peers 
(other items withing the same parent) it will be listed first 
(thus usually making it leftmost or top entry depending on the navigation implementation)

SmartMenu uses [localStorage](http://en.wikipedia.org/wiki/Web_storage#localStorage) to store user's click counts on user's browser making it 
easy to install and deploy personalized navigation menus without requiring any server-side changes.
It then returns a simple `<nav>` element with nested `<ul>` and `<li>` elements that are sorted according
to the usage data. Converting these basic structure into visually pleasing navigation menus is up to the user.
One way of doing so is shown in the demo. Navigation menu in demo is limited to 2 levels (top-level and sub-menus)
_however_ SmartMenu itself doesn't have nesting level limitations.

### Installation
Requirements: jQuery 1.11+, underscore.js 1.7+

Just include the `smart-menu.js` in your page and call global `smartMenu()` function as below:

```javascript
smartMenu(
    "navWrapper", // ID of the container element for navigation menu
    
    // SmartMenu definition.
    {
      "Home": "index.html",  // "<link text>": "<href>"
      
      "Our Products": {      // Nested menu
        _root: "index.html", // Optional parent link (what "Our Products" links to)
        
        "Chairs": "index.html",
        "Tables": "index.html",
        "Dinnerware": "index.html",
        "Cookware": "index.html",
      },
      
      "About Us": {          // Link-less parent
        "Careers": "index.html",
        "Contact Us": "index.html",
        "Our Vision": "index.html",
      }
    }
  );
});
```

### Demo

[CS1300 webpage with SmartMenu](http://ermanc.github.io/smart-menu/index.html) (on GitHub pages)

_[Note that menus include click-count prefixes in demo (e.g. "**3** - About Us"). 
It's enabled by setting `window.smartMenuDebug = true` and is normally disabled.]_

As you click around the navigation items, you should see the entries/menues move around 
according to the number of times you clicked on them (as shown by the counter prefix). 
Popular top-level menus move to the left while 
popular submenu items move to the top.

Note that, click increments on a nested element propogates all the way to the root. 
Meaning, clicking on a submenu item increases the popularity of it's parent 
(and it's parent's parent and so on) as well.


