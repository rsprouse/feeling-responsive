var aws_endpoint = ''; // File global.

function configure_select2(endpoint) {
    aws_endpoint = endpoint;  // Set file global variable.
    $('#cla-search-select').select2({
        dropdownParent: $('#cla-search-form'),
        placeholder: 'Search languages, people, topics, identifiers.',
        allowClear: true,
        minimumInputLength: 2,
        multiple: true,
        tags: true,
        selectOnClose: true,
        ajax: {
            url: aws_endpoint + 'ac',
            dataType: 'json',
            delay: 250,
        }
    });
    // Let php know that javascript is available.
    $('#with_js')[0].value = "1";
}

/*
 * Return 'bndl' or 'coll' if the 'bndl' or 'coll' tab is
 * currently displayed. Return '' if neither.
*/
function coll_or_bndl_tab() {
    var id = $('input[name="tabs"]:checked').prop('id');
    var type = '';
    if (id == 'tab1') {
        type = 'coll';
    } else if (id == 'tab2') {
        type = 'bndl';
    }
    return type;
}

/**
 * A handler function to handle clicks on <a href=""> elements
 * in Collection and Bundle metadata.
 * Transforms the link GET to a POST with prepopulated select2
 * search box based on the query param in the link target.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
const handleMetadataLinkClick = event => {

    var idSearch = event.target.href.split('?')[1];

    // If we got URL params, skip GET and perform AJAX search.
    // If we didn't get any url params, then use default GET.
    if (typeof(idSearch) != 'undefined') {
        // Stop the link's GET action.
        event.preventDefault();

        // Clear the select2 search box.
        $('#cla-search-select').val(null).trigger('change');

        var title = event.target.innerHTML + '\u2006';
// TODO: remove brackets from possible inputs
//        idSearch = idSearch.replace("[", "");
//        idSearch = idSearch.replace("]", "");
        idSearch += '=' + title
        newOption = new Option(title, idSearch, true, true);
        $('#cla-search-select').append(newOption).trigger('change');
        document.getElementById('go').click();
    }
}

/*
 * Use param data to repopulate select2 element.
*/
function populate_select2_from_params(params) {
    sep = '=';
    $.each(params, function(i,p) {
        var title = p;
        var parts = p.split(sep);
        if (parts.length == 3) {
            title = parts[2] + '\u2006';
        }
	if (title !== '\u2006' && title !== '') {
            newOption = new Option(title, p, true, true);
            $('#cla-search-select').append(newOption).trigger('change');
        }
    });
}

/*
 * Find query data in #qdata-form and use it to repopulate select2
 * element.
*/
function populate_select2_from_qdata_form() {
/*
TODO: mapping to extract p.value is not tested
*/
    params = $.map($('#qdata-form > input[name="sparams[]"]'), function (p) {
        p.value;
    });
    populate_select2_from_params(params);
}

/**
 * A handler function to handle the select option elements created by
 * select2. Transform to a JSON object suitable for POSTing to the
 * CLA api.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
const handleSelect2FormSubmit = event => {
  // Stop the form from submitting since we'll POST from here.
  event.preventDefault();
  tab = coll_or_bndl_tab();
  var query = get_query_from_form(event.currentTarget.id);
  $.post({
      url: aws_endpoint + 'sq',
      data: JSON.stringify(query),
      dataType: 'json',
      success: function(data) {
          // Put 'showall' controls into proper state.
          $('#show-all-caret-' + tab).toggleClass('fa-caret-right', true);
          $('#show-all-caret-' + tab).toggleClass('fa-caret-down', false);
          var sel = '[name="checkbox-' + tab + '"]';
          $(sel).prop('checked', true);
          showall[tab] = true;

          let { collHTML, bndlHTML, collcntHTML, bndlcntHTML, searchstrHTML } = render_metadata(data);
          $('#coll-tab').replaceWith(collHTML);
          $('#bndl-tab').replaceWith(bndlHTML);
          make_pagination(event.currentTarget.id);
          // Add event handlers for all <a href=""> metadata elements that
          // should be handled by a POST instead of a GET, if possible.
          $("a.post").on('click', handleMetadataLinkClick);
      }
  });
};

/*
const handleSelect2FormSubmit2 = event => {
  // Stop the form from submitting since weâ€™ll POST from here.
  event.preventDefault();
  const query = get_query_json();
  $.post({
      url: aws_endpoint + 'sq',
      data: query,
      dataType: 'json',
      success: function(data) {
          //console.log(document.getElementById("cla-search-form"));
          document.getElementById("langs").value = searchterm;
          $('#cla-search-form').unbind('submit').submit();
      }
  });
};
*/

/**
 * A handler function for when the select2 element loses focus.
 * If a user enters a string but does not select an element from
 * the options returned from the server, the the string is preserved
 * as a string query.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */

/*
 * This function requires that the select2 'tags' parameter be set to true,
 * which means the string appears twice in the select options (once from
 * tags, and once returned by the server. (If the server doesn't return the
 * string, then it's not possible to search by a language name and filter
 * by the language name--maybe that's okay?)
const handleFocusOut = event => {
  console.log(event.target.className);
  if (event.target.className != "select2-search__field") {
    console.log('Early return from handler.');
    return true;
  }
  //console.log('stopping propagation');
  //event.stopPropagation();  // Stop event bubbling?
  console.log('continuing handler');
  console.log(event);
  orphan = $('[data-select2-tag*="true"]');  // Select the element containing the string
  console.log(orphan.length);
  if (orphan.length > 0) {
    var sval = "'" + orphan.val() + "'";
    var newopt = new Option(sval, sval, false, true);
    $('#cla-search-select').append(newopt).trigger('change');  // Add to selected options
  }
};
*/

/*
* Show full metadata for all collection/items records in display list.
*/
function toggle_showall(type) {
    var sel = '[name="checkbox-' + type + '"]';  // type = 'coll'|'bndl'
    $(sel).prop('checked', showall[type]);
    showall[type] = !showall[type];
    // Change the arrow direction.
    $('#show-all-caret-' + type).toggleClass('fa-caret-right fa-caret-down');
}

function onclickSearch(idSearch, title) {
    $('#cla-search-select').val(null).trigger('change');
    idSearch = idSearch.replace("[", "");
    idSearch = idSearch.replace("]", "");
    newOption = new Option(title, idSearch, true, true);
    $('#cla-search-select').append(newOption).trigger('change');
    document.getElementById('go').click();
    //return false;
}

function changefrom(type, val) {
//    var from = type + 'from';
//    var query = $('#results').data('query');
//    $('#'+from).prop('value', val);
//    query[from] = val;
//    $('#results').data('query', query);
    //document.getElementById('go').click({formid: formid});
    if (type == 'coll') {
        $('#cla-search-form > [name="collfrom"]').prop('value', val);
    } else {
        $('#cla-search-form > [name="bndlfrom"]').prop('value', val);
    }
    $('#cla-search-form').submit();
}

/*
function changeBndlfrom(val) {
    document.getElementById('bndlfrom').value = val;
    document.getElementById('tab').value = "bndl";
    document.getElementById('go').click();
    reset();
}

function changeCollfrom(val) {
    document.getElementById('collfrom').value = val;
    document.getElementById('tab').value = "coll";
    document.getElementById('go').click();
    reset();
}
*/

function reset() {
    document.getElementById('bndlfrom').value = 0;
    document.getElementById('collfrom').value = 0;
    //document.getElementById('tab').value = "bndl";
}

function render_metadata(data) {
    HTMLcode = "";
    collHTML = "";
    bndlHTML = "";
    collcntHTML = "";
    bndlcntHTML = "";
    searchstrHTML = "";
    count = 0;

    // total number collection and bundle items
    total_coll = 0;
    total_bndl = 0;

    // 'from' parameter value
    //collfrom = parseInt($('#collfrom').prop('value'));
    //bndlfrom = parseInt($('#bndlfrom').prop('value'));
    collfrom = parseInt($('#cla-search-form > [name="collfrom"]').prop('value'));
    bndlfrom = parseInt($('#cla-search-form > [name="bndlfrom"]').prop('value'));

    // HTML code for list view of collection and bundle items
    collList = "";
    bndlList = "";

    // count for tracking collection and bundle items in loop
    collCount = 0;
    bndlCount = 0;

    // this displays what the user queried for
    searchstrHTML += '<div id="results" class="container">';
    qstr = $('#cla-search-form > [name="qstr"]').prop('value');
    searchstrHTML += '<h4>You searched for: ' + qstr + '</h4>';

    var tab = coll_or_bndl_tab();
    try {
        // checks if collection list is empty
        if (data['coll'] != "{}") {
            total_coll = data['coll']['hits']['total'];
            results_coll = data['coll']['hits']['hits'];
            // iterate through the collection list
            for (var i = 0, len = results_coll.length; i < len; i++) {
                count++;
                collCount++;
                temp = results_coll[i]['_source'];
                title = temp['title'];
                collList += '<li class="itemlist">';
                collList += '<input id="_coll' +  count + '" type="checkbox" name="checkbox-coll">';
                collList += '<label class="showmore" for="_coll' +  count + '">';
                collList += '<a href="list.php?collid=' + temp['collid'] + '" class="post">' + title +'</a>';
                collList += '&nbsp;<i class="icon fa-caret-right"></i></label>';
                collList += temp['ul_md'];
            }
        }

        // If bundle list is not empty.
        if (data['bndl'] != "{}") {
            total_bndl = data['bndl']['hits']['total'];
            results_bndl = data['bndl']['hits']['hits'];
            for (var i = 0, len = results_bndl.length; i < len; i++) {
                count++;
                bndlCount++;
                temp = results_bndl[i]['_source'];
                title = temp['title'];
                bndlList += '<li class="itemlist">';
                bndlList += '<input id="_bndl' +  count + '" type="checkbox" name="checkbox-bndl">';
                bndlList += '<label class="showmore" for="_bndl' + count + '">';
                bndlList += '<a href="item.php?bndlid=' + temp['bndlid'] + '">' + title + '</a>';
                var datestr = temp['datestr'];
                if (typeof(datestr) != 'undefined' && datestr != '') {
                    bndlList += ' (' + temp['datestr'] + ') ';
                }
                var assetcnt = temp['assetcnt'];
                if (typeof(assetcnt) != 'undefined' && assetcnt > 0) {
                    bndlList += ' (' + assetcnt + ' digital file';
                    if (assetcnt > 1) {
                        bndlList += 's';
                    }
                    var has_audio = temp['has_audio'];
                    if (typeof(has_audio) != 'undefined' && has_audio) {
                        bndlList += ', with audio';
                    }
                    bndlList += ')';
                    if (typeof(has_audio) != 'undefined' && has_audio) {
                        bndlList += ' <img src="images/audio.gif" alt="Item contains audio" />';
                    }
                }
                bndlList += '&nbsp;<i class="icon fa-caret-right"></i></label>';
                bndlList += temp['ul_md'];
            }
        }

    // checks if the user is paginating through the bundle or collection list
    if (tab == "bndl") {
        bndlHTML += '<input id="tab1" type="radio" name="tabs" style="display:none"><label class="tabs" for="tab1">Collections  (' + total_coll + ')</label>';
        bndlHTML += '<input id="tab2" type="radio" style="display:none" name="tabs" checked><label class="tabs" for="tab2">Items (' + total_bndl + ')</label>';
    } else {
        collHTML += '<input id="tab1" type="radio" name="tabs" style="display:none" checked><label class="tabs" for="tab1">Collections  (' + total_coll + ')</label>';
        collHTML += '<input id="tab2" type="radio" style="display:none" name="tabs"><label class="tabs" for="tab2">Items (' + total_bndl + ')</label>';
    }

    // beginning of the collection section
    collHTML += '<div class="sectiontab" id="coll-tab"><div class="12u 12u$(small)">';
    collcntHTML += '<p><b>';
    if (total_coll != 0) {
        collcntHTML += (collfrom+1);
    } else {
        collcntHTML += 0;
    }

    collcntHTML += '</b> - <b>' + (collfrom+collCount) + '</b> of <b><span id="colltotal">' + total_coll + '</span></b> results</p><label class="showall" onclick="toggle_showall(' + "'" + "coll" + "'" + ')">Show All/Collapse All&nbsp;<i id="show-all-caret-coll" class="icon fa-caret-right"></i></label><ol class="alt" start="' + (collfrom + 1) + '">';

    // list of collection items
    collHTML += collList;

    collHTML += '</ol>';

    // end of coll tab
    collHTML += '<div class="pagination" id="collpaginator"></div>';
    collHTML += '</div></div>';

    // list of bundle items
    bndlHTML += '<div class="sectiontab" id="bndl-tab"><div class="12u 12u$(small)">';
    bndlcntHTML += '<p><b>';
    if (total_bndl != 0) {
        bndlcntHTML += (bndlfrom+1) + '</b> - <b>';
    } else {
        bndlcntHTML +=  '0</b> - <b>';
    }

    bndlcntHTML += (bndlfrom + bndlCount);
    bndlcntHTML += '</b> of <b><span id="bndltotal">';
    bndlcntHTML += total_bndl;

    bndlcntHTML += '</span></b> results</p><label class="showall" onclick="toggle_showall(' + "'" + "bndl" + "'" + ')">Show All/Collapse All&nbsp;<i id="show-all-caret-bndl" class="icon fa-caret-right"></i></label>';

    bndlHTML += '<ol class="alt" start="' + (bndlfrom + 1) + '">';
    bndlHTML += bndlList;
    bndlHTML += '</ol>';

    // end of bndl tab
    bndlHTML += '<div class="pagination" id="bndlpaginator"></div>';
    bndlHTML += '</div></div>';

    // end of results <div>
//    HTMLcode += '</div>';

    // catch error; the error is displayed in the console
    } catch (err) {
        console.log(err.message);
        collHTML += "<br><br><br><center><h3><code>There seems to be an error. Please try again.</code></h3></center>";
    }

    return { collHTML, bndlHTML, collcntHTML, bndlcntHTML, searchstrHTML };
//    return HTMLcode;
}

/*
 * Create the pagination <div> for 'bndl' and 'coll' tabs.
*/
function make_pagination(formid) {
    var dlen = 10; // display length (number of pages to display in paginator).
    var tabs = ['bndl', 'coll'];
    for (var tabn = 0; tabn < tabs.length; tabn++) {
        var tab = tabs[tabn];
        var selpfx = '#' + formid + ' > [name="';
        //var type = $(selpfx + 'tab"]').prop('value');
        var fromsel = selpfx + tab + 'from"]';
        var from = $(fromsel).prop('value');
        var totalsel = '#' + tab + 'total';
        var total = parseInt($(totalsel).prop('innerHTML'));
        var size = $(selpfx + 'size"]').prop('value');
        var numpages = Math.ceil(total / size);
        var curpage = Math.ceil(from / size) + 1;
        var first = (curpage <= dlen ? 1 : curpage - (curpage % dlen));
        var last = (curpage <= dlen ? first + dlen - 1 : first + dlen);
        last = (last > numpages ? numpages : last);
        var html = '<div class="pagination" id="' + tab + 'paginator">';
        if (first > 1) {
            html += '<a href="#" id="' + tab + 'laquo" data-page="1">&laquo;</a>';
            //html += '<a href="#" id="' + tab + 'lsaquo" data-page="' + (curpage - 1) + '">&lsaquo;</a>';
            var dest = (first - dlen < 1 ? 1 : first - dlen);
            html += '<a href="#" id="' + tab + 'lhellip" data-page="' + dest + '">&hellip;</a>';
        }
        if (numpages > 1) {
            for (var n = first; n <= last; n++) {
                var add = '';
                if (n == 1) {
                    add = ' id="' + tab + 'page1paginate"';
                }
                if (n == curpage) {
                    add = ' class="active"';
                }
                html += '<a href="#"' + add + ' data-page="' + n + '">' + n + '</a>';
            }
        }
        if (last < numpages) {
            html += '<a href="#" id="' + tab + 'rhellip" data-page="' + (last + 1) + '">&hellip;</a>';
            //html += '<a href="#" id="' + tab + 'rsaquo" data-page="' + (curpage + 1) + '">&rsaquo;</a>';
            html += '<a href="#" id="' + tab + 'raquo" data-page="' + numpages + '">&raquo;</a>';
        }
 
        html += '</div>';
        $('#' + tab + 'paginator').replaceWith(html);
        $('#' + tab + 'paginator > a').on('click', function(event) {
            var page = event.target.dataset.page;
            var size = parseInt($('#cla-search-form > [name="size"]').prop('value'));
            var tab = coll_or_bndl_tab();
            changefrom(tab, (page - 1) * size);
        });
    }
}

function populate_form_from_query_string(formid) {
  const formsel = '#' + formid;
  const form = $(formsel);
  const qsparams = new URLSearchParams(window.location.search);
  populate_select2_from_params(qsparams.getAll('sparams[]'));
/*
  const filts = ['bndlid', 'collid', 'langid', 'pplid', 'placeid', 'repoid'];
  $.each(filts, function(i,f) {
      let fsel = formsel + ' > [name="' + f + '"]';
      var val = qsparams.get(f);
      if (val != null) {
          $(fsel).prop('value', val);
      }
  });
*/
  const params = ['tab', 'with_js', 'size', 'bndlfrom', 'collfrom', 'bndlsort', 'collsort'];
  $.each(params, function(i, p) {
      psel = formsel + ' > [name="' + p + '"]';
      var val = qsparams.get(p);
      if (val != null) {
          $(psel).prop('value', val);
      }
  });
}

  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  // E.g. {"q":"basket song","langid":["3","1256"],"repoid":["45"],"size":"10","from":"0"}
  // Note that the query string 'q' is a space-delimited string of words.
  // The filters are the *id parameters that contain an array of integer ids.
function get_query_from_form(formid) {
  // The names in filts must match keyword fields in elasticsearch index.
  const filts = ['bndlid', 'collid', 'langid', 'pplid', 'placeid', 'repoid'];
  const sep = '=';

  // query is the object that will be POSTed.
  // The 'q' element has the query string(s), and other elements are filters.
  var query = {'q': [], 'qstr': []};
  $.each(filts, function(i,f) {
      query[f] = [];
  });

  // Add query strings and filters from select2 option elements.
  if (formid == 'cla-search-form') {
      inputs = $('#' + formid).find(':selected');
  } else {
      inputs = $('#' + formid + ' > input[name="sparams[]"]');
  }

  inputs.each(function() {
      var val = $(this).val();
      if (val.includes(sep)) {
          var parts = val.split(sep);
          if ((parts.length == 3) && ($.inArray(parts[0], filts) >= 0)) {
              query[parts[0]].push(parts[1]);
          }
          else {
              query['q'] = query['q'].concat(parts);
          }
      }
      else {
          query['q'].push(val);
      }
  });

  // Transform 'q' to space-delimited query string or remove if unused.
  if (query['q'].length > 0) {
      query['q'] = query['q'].join(' ');
  }
  else {
      delete query['q'];
  }
  // Remove unused filters from query.
  $.each(filts, function(i,f) {
      if (query[f].length == 0) {
        delete query[f];
      }
  });

  // Add size value.
  // TODO: use default (or ignore) if incorrect/missing size value.
  const params = ['tab', 'with_js', 'size', 'bndlfrom', 'collfrom', 'bndlsort', 'collsort'];
  $.each(params, function(i, p) {
      psel = '#' + formid + ' > [name="' + p + '"]';
      query[p] = $(psel).prop('value');
  });

  return query;
}
