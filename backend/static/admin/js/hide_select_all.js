// Hide "Choose all" and "Remove all" buttons and limit to 2 categories
(function() {
    var MAX_CATEGORIES = 2;

    function hideSelectAllButtons() {
        document.querySelectorAll('a.selector-chooseall').forEach(function(el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('a.selector-clearall').forEach(function(el) {
            el.style.display = 'none';
        });
    }

    function enforceMaxCategories() {
        var toBox = document.getElementById('id_categories_to');
        var fromBox = document.getElementById('id_categories_from');
        var addLink = document.querySelector('a.selector-add');

        if (!toBox || !fromBox) return;

        var selectedCount = toBox.options.length;

        // Disable/enable the add link and from box based on count
        if (selectedCount >= MAX_CATEGORIES) {
            if (addLink) {
                addLink.style.opacity = '0.3';
                addLink.style.pointerEvents = 'none';
            }
            fromBox.disabled = true;
            fromBox.style.opacity = '0.5';

            // Add warning message if not exists
            var warning = document.getElementById('category-limit-warning');
            if (!warning) {
                warning = document.createElement('p');
                warning.id = 'category-limit-warning';
                warning.style.color = '#ba2121';
                warning.style.fontWeight = 'bold';
                warning.style.marginTop = '5px';
                warning.textContent = 'Maximum 2 categories allowed.';
                toBox.parentNode.appendChild(warning);
            }
        } else {
            if (addLink) {
                addLink.style.opacity = '1';
                addLink.style.pointerEvents = 'auto';
            }
            fromBox.disabled = false;
            fromBox.style.opacity = '1';

            // Remove warning if exists
            var warning = document.getElementById('category-limit-warning');
            if (warning) {
                warning.remove();
            }
        }
    }

    function init() {
        hideSelectAllButtons();
        enforceMaxCategories();

        // Watch for changes to the "to" box
        var toBox = document.getElementById('id_categories_to');
        if (toBox) {
            var observer = new MutationObserver(function() {
                enforceMaxCategories();
            });
            observer.observe(toBox, { childList: true });
        }

        // Also intercept double-clicks on the from box
        var fromBox = document.getElementById('id_categories_from');
        if (fromBox) {
            fromBox.addEventListener('dblclick', function(e) {
                var toBox = document.getElementById('id_categories_to');
                if (toBox && toBox.options.length >= MAX_CATEGORIES) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    setTimeout(init, 500);
    setTimeout(init, 1000);
})();
