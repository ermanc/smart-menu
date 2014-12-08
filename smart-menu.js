(function() {
  function createMenu(containerId, menuJson) {
    $("#"+containerId).html('').append(
      $("<nav>").append(
        createSubmenu(menuJson, [])
      )
    );
  }

  function createSubmenu(menuJson, parents) {
    var ul = $("<ul>");

    var elems = [];

    _.each(menuJson, function(value, key) {
      if (key === "_root") return; // special key, used for parent, ignore here.

      if (typeof value !== "string")
        elems.push([
          getSelectionCount(getLinkId(parents, key)),
          createLinkElement(parents, key, value._root, true)
            .append(createSubmenu(value, parents.concat(key)))
        ]); //submenu
      else
        elems.push([
          getSelectionCount(getLinkId(parents, key)),
          createLinkElement(parents, key, value, false)
        ]); // link
    });

    // Order by simple popularity (click count)
    elems.sort(function(a, b) { return b[0] - a[0]; });

    return ul.append(_.map(elems, function(e) { return e[1]; }));
  }

  function createLinkElement(parents, text, href, submenu) {
    var link = $("<a>")
      .on("click")
      .attr("href", getHref(href))
      .html(getSelectionCount(getLinkId(parents, text)) + " - " + text +
        (submenu ? " <span class='caret'></a></li>" : "")
      );

    attachSelectionHandler(link, text, parents, submenu);

    return $("<li>").append(link);
  }

  function getHref(uri) {
    return (uri ? uri : "javascript:;");
  }

  function attachSelectionHandler(link, text, parents, submenu) {
    link.on("click", function(e) {
      var linkId = getLinkId(parents, text);
      console.log("Clicked: ", linkId);

      handleClickOn(text, parents);

      // return false;
    });
  }

  function handleClickOn(link, parents) {
    if (link)
      incrementSelectionCount(getLinkId(parents, link));

    if (parents.length)
      handleClickOn(parents.pop(), parents);
  }

  function getLinkId(parents, link) {
    var sep = ">>";

    var links = _.map(parents.concat(link), function(l) {
      return l.replace(/\s+/g, "_").replace(/(^_+|\W|_+$)/g, "");
    });

    return links
      .join(">>")
      .toLowerCase();
  }

  function getSelectionCount(linkId) {
    var selections = getLocal("SmartMenu", {});
    return (selections[linkId] || 0);
  }

  function incrementSelectionCount(linkId) {
    var selections = getLocal("SmartMenu", {});
    selections[linkId] = (selections[linkId] || 0) + 1;
    setLocal("SmartMenu", selections);
  }

  function getLocal(key, defaultVal) {
    try {
      return JSON.parse(localStorage[key]);
    } catch (ex) {
      return defaultVal;
    }
  }

  function setLocal(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  window.smartMenu = createMenu;
})();
