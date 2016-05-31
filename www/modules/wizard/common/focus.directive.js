angular.module('modules').directive("nextFocus", nextFocus);

/** Usage:
  <input next-focus id="field1">
  <input next-focus id="field2">
  <input id="field3">
  Upon pressing ENTER key the directive will switch focus to
  the next field id e.g field2
  The last field should not have next-focus directive to avoid
  focusing on non-existing element.
  Works for Web, iOS (Go button) & Android (Next button) browsers, 
**/

function nextFocus() {

  console.log('bindeando nextFocus');
  var directive = {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind('keydown', function(e) {
        var partsId = attrs.id.match(/field(\d{1})/);
        var currentId = parseInt(partsId[1]);

        var code = e.keyCode || e.which;
        if (code === 13) {
          e.preventDefault();
          document.querySelector('#field' + (currentId + 1)).focus();
        }
      });
    }
  };
  return directive;

}
