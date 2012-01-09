// ==UserScript==
// @name           Basecamp Tabber
// @namespace      de.knuspermagier
// @description    Tabs for better Todo-List-Management
// @include        https://quotefm.basecamphq.com/projects/*/todo_lists
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  jQuery.noConflict();
  var categories = {
    'Backend': 0,
    'Frontend': 0,
    'System': 0,
    'Gestaltung': 0
  };
  
  var tabstyle = {
      padding: '5px',
      background: '#EDF3FE',
      textDecoration: 'none',
      marginLeft: '20px',
      fontSize: '12px'
  };
  
  jQuery('.list_title a').each(function(e, v) {
    var name = jQuery(v).html();
    
      jQuery.each(categories, function(cat, count) {
        if(name.indexOf(cat) > -1) {
          var id = jQuery(v).parent().attr('id').replace('_name', '');
          jQuery('#' + id).addClass('k_' + cat);
          jQuery('#' + id).addClass('k_list');
        
          categories[cat]++;
        }
    });
  });
  
  jQuery('#swap_from .page_header').after('<div id="ktabs"></div>');
  
  jQuery('#ktabs').append(create_tab('All'));
  
  jQuery.each(categories, function(cat, count) {  
    jQuery('#ktabs').append(create_tab(cat));  
  });
  
  function create_tab(name) {
    var tab = jQuery('<a href="javascript:;" class="ktab"></a>');
    
    if(name == 'All') {
      tab.html('All');
      tab.bind('click', function(ev) {
        show_all_tabs();
        highlight_tab(jQuery(this));
      });
    } else {
      tab.html(name + ' (' + categories[name] + ')');
      tab.bind('click', function(ev) {
        show_tab(name);
        highlight_tab(jQuery(this));
      });
    }
    
    tab.css(tabstyle);
    return tab;
  }
  
  function show_all_tabs() {
    jQuery('.k_list').show();
  }
  
  function show_tab(name) {
      jQuery.each(categories, function(cat, count) {
        jQuery('.k_' + cat).hide();
      });
  
      jQuery('.k_' + name).show();
  }
  
  function highlight_tab(tab) {
    jQuery('.ktab').css('font-weight', 'normal');
    tab.css('font-weight', 'bold');
  }
  
}

addJQuery(main);







