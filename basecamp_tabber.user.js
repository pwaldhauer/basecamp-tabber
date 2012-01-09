// ==UserScript==
// @name           Basecamp Tabber
// @namespace      de.knuspermagier
// @description    Tabs for better Todo-List-Management
// @include        https://quotefm.basecamphq.com/projects/*/todo_lists
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

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

$('.list_title a').each(function(e, v) {
  var name = $(v).html();
  
    $.each(categories, function(cat, count) {
      if(name.indexOf(cat) > -1) {
        var id = $(v).parent().attr('id').replace('_name', '');
        $('#' + id).addClass('k_' + cat);
        $('#' + id).addClass('k_list');
      
        categories[cat]++;
      }
  });
});

$('#swap_from .page_header').after('<div id="ktabs"></div>');

$('#ktabs').append(create_tab('All'));

$.each(categories, function(cat, count) {  
  $('#ktabs').append(create_tab(cat));  
});

function create_tab(name) {
  var tab = $('<a href="javascript:;" class="ktab"></a>');
  
  if(name == 'All') {
    tab.html('All');
    tab.bind('click', function(ev) {
      show_all_tabs();
    });
  } else {
    tab.html(name + ' (' + categories[name] + ')');
    tab.bind('click', function(ev) {
      show_tab(name);
    });
  }
  
  tab.css(tabstyle);
  return tab;
}

function show_all_tabs() {
  $('.k_list').show();
}

function show_tab(name) {
    $.each(categories, function(cat, count) {
      $('.k_' + cat).hide();
    });

    $('.k_' + name).show();
}





