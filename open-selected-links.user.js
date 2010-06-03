// ==UserScript==
// @name           open-selected-links
// @namespace      http://www.strongasanox.co.uk/greasemonkey
// @description    Opens all the selected links in new tabs (one tab per link)
// @include        *
// ==/UserScript==
(function() {
	
	document.addEventListener('keydown', function(e) {
                var ctrlKeyCode = 17;
                var cmdKeyCode = 224;

                if (e.keyCode == ctrlKeyCode || e.keyCode == cmdKeyCode) {
	            document.addEventListener('mouseup', openSelectedLinks, true);
                }
	}, true);

        document.addEventListener('keyup', function(e) {
            // Remove the mousedown handler so it doesn't open links just
            // by selecting text *without* using ctrl / cmd
            document.removeEventListener('mouseup', openSelectedLinks, true);
        }, true);

        function openSelectedLinks(e) {
	    var selection = window.getSelection();
	    if (selection) {
	        var range = selection.getRangeAt(0);
	        var selectionDom = range.cloneContents();
                var selectedLinks = selectionDom.querySelectorAll('a');
			
                var link;
		for (var i = selectedLinks.length - 1; i >= 0; i--){
		    link = selectedLinks[i];
		    if (isGoogleResultsPage() && 
		            (isGoogleCachedLink(link) || isGoogleSimilarLink(link))) {
			continue;
	            }
				
	            GM_openInTab(selectedLinks[i].href);
	        }
	    }
        }
	
	function isGoogleResultsPage() {
		return document.location.host.indexOf('.google.') !== -1;
	}
	
	function isGoogleCachedLink(link) {
		return link && link.textContent === 'Cached';
	}
	
	function isGoogleSimilarLink(link) {
		return link && link.textContent === 'Similar';
	}
})();
