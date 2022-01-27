// File globals
let aws_endpoint = '';
let showall = {'coll': true, 'bndl': true};

function configure_select2(endpoint, placeholder) {
    aws_endpoint = endpoint;  // Set file global variable.
    $('#cla-search-select').select2({
        dropdownParent: $('#cla-search-form'),
        placeholder: placeholder,
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
    if ( $('#with_js').length) {
        $('#with_js')[0].value = "1";
    }
}

/**
 * Handle click of Search button in search form, which is an <a>
 * styled to look like a button rather than a <submit> button.
 */
const handleSelect2Submit = event => {
    // Stop the link's GET action.
    event.preventDefault();
    $.each($('#cla-search-form').find(':selected'), function(t) {
        t.value; // e.g. 'langid=243=Karuk'
    });
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

function display_collbndlrec(rectype, recid) {
  const action = rectype == 'coll' ? 'collection' : 'item';
  $.ajax({
      method: 'GET',
      url: aws_endpoint + action + '/' + recid,
      success: function(data) {
          const rsource = data['hits']['hits'][0]['_source'];
          $('#collbndlrec').html(get_bndllicontent(rsource, -1));
          // Add event handlers for all <a href=""> metadata elements that
          // should be handled by a POST instead of a GET, if possible.
          $("a.post").on('click', handleMetadataLinkClick);
      }
  });
}

/**
 * A handler function for a click on the Search button.
 */
const handleSearchButtonClick = event => {
  /* Don't POST the form automatically. */
  event.preventDefault();
  /* Start search results at the beginning and set to default tab. */
  $('#cla-search-form').data('collfrom', '0');
  $('#cla-search-form').data('bndlfrom', '0');
  $('#cla-search-form').data('tab', 'bndl');
  /* Start the search. */
  $('#cla-search-form').submit();
}

/**
 * A handler function to handle the select option elements created by
 * select2. Transform to a JSON object suitable for POSTing to the
 * CLA api. This handler might be called from a click on the search
 * button (indirectly) or on a pagination link.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
const handleSelect2FormSubmit = event => {
  // Stop the form from submitting since we'll POST from here.
  event.preventDefault();
  const tab = $('#tablist > li.active').data('tabname');
  const query = get_query_from_form('cla-search-form');
/* TODO: The data-size attribute gets cast to int instead of string.
 * Probably this is because size is an attribute of some elements
 * in html already and gets special treatment. (For comparison,
 * data-collfrom remains a string.)
 * As a hack, we cast back to string. Investigate whether renaming
 * the attribute data-pgsize would fix the issue. The API could be changed
 * to match.
 */
  query['size'] = query['size'].toString();
  $.ajax({
      method: 'POST',
      url: aws_endpoint + 'sq',
      data: JSON.stringify(query),
      dataType: 'json',
      success: function(data) {
          // Put 'showall' controls into proper state.
          $('#show-all-caret-' + tab).toggleClass('fa-caret-right', true);
          $('#show-all-caret-' + tab).toggleClass('fa-caret-down', false);
          const sel = '[name="checkbox-' + tab + '"]';
          $(sel).prop('checked', true);
          showall[tab] = true;

          collpg = get_pagination('coll', query, data);
          bndlpg = get_pagination('bndl', query, data);
          update_counts('coll', collpg);
          update_counts('bndl', bndlpg);
          update_coll_list(query, data["coll"]["hits"]["hits"]);
          update_bndl_list(query, data["bndl"]["hits"]["hits"]);
	  $('#tablist').show();
	  $('label.showall').show();
          update_pagination('coll', collpg);
          update_pagination('bndl', bndlpg);
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
* Show full metadata for all coll/bndl records in display list.
*/
function toggle_showall() {
    const tab = $('#tablist > li.active').data('tabname');
    const sel = '[name="checkbox-' + tab + '"]';
    $(sel).prop('checked', showall[tab]);
    showall[tab] = !showall[tab];
    // Change the arrow direction.
    $('#show-all-caret-' + tab).toggleClass('fa-caret-right fa-caret-down');
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
        //$('#cla-search-form > [name="collfrom"]').prop('value', val);
        $('#cla-search-form').data('collfrom', val.toString());
    } else {
        //$('#cla-search-form > [name="bndlfrom"]').prop('value', val);
        $('#cla-search-form').data('bndlfrom', val.toString());
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

/*
function reset() {
    document.getElementById('bndlfrom').value = 0;
    document.getElementById('collfrom').value = 0;
    //document.getElementById('tab').value = "bndl";
}
*/

/*
 * Get the pagination info and return in an object.
 */
function get_pagination(tab, q, data) {
    const from = parseInt(q[tab + 'from']) + 1;
    const end = from + data[tab]['hits']['hits'].length -  1;
    const total = (data[tab] != '{}' ? data[tab]['hits']['total'] : 0);
    const size = parseInt(q['size']);
    return { from, end, total, size };
}

/*
 * Update the display elements for coll/bndl counts.
 */
function update_counts(tab, pg) {
    let results = (tab == 'bndl' ? 'Item' : 'Collection');
    if (pg.total != 1) {
        results += "s";
    }
    /* Update the tab labels with number of Colls/Bndls. */
    $('#' + tab + 'cnt').html( " (" + pg.total + ")" );

    /* Update the 'X - Y of Z results' line. */
    const rsel = '#' + tab + 'resultscnt';
    $(rsel).find('span[name="start"]').html(pg.from);
    $(rsel).find('span[name="end"]').html(pg.end);
    $(rsel).find('span[name="total"]').html(pg.total);
    $(rsel).find('span[name="results"]').html(results);
    $(rsel).show()
}

function update_coll_list(q, recs) {
    const collfirst = parseInt(q['collfrom']) + 1;
    $('#colllist').prop('start', collfirst);
    let collhtml = '';
    $.each(recs, function(i, r) {
        let count = collfirst + i;
        collhtml += '<li class="itemlist">';
        collhtml += '<input id="_coll' +  count + '" type="checkbox" name="checkbox-coll">';
        collhtml += '<label class="showmore" for="_coll' +  count + '">';
        collhtml += '<a href="list.html?collid=' + r['_source']['collid'] + '" class="post">' + r['_source']['title'] +'</a>';
        collhtml += '&nbsp;<i class="icon fa-caret-right"></i></label>';
        collhtml += r['_source']['ul_md'];
    });
    $('#colllist').html(collhtml);
}

function get_bndllicontent(bsource, count) {
    let bndlhtml = '';
    if (count >= 0) {
        bndlhtml += '<input id="_bndl' +  count + '" type="checkbox" name="checkbox-bndl">';
        bndlhtml += '<label class="showmore" for="_bndl' + count + '">';
        bndlhtml += '<a href="item?bndlid=' + bsource['bndlid'] + '">' + bsource['title'] + '</a>';
    } else {
        bndlhtml += bsource['title'];
    }
    let datestr = bsource['datestr'];
    if (typeof(datestr) != 'undefined' && datestr != '') {
        bndlhtml += ' (' + datestr + ') ';
    }
    let assetcnt = bsource['assetcnt'];
    if (typeof(assetcnt) != 'undefined' && assetcnt > 0) {
        bndlhtml += ' (' + assetcnt + ' digital file';
        if (assetcnt > 1) {
            bndlhtml += 's';
        }
        let has_audio = bsource['has_audio'];
        if (typeof(has_audio) != 'undefined' && has_audio) {
            bndlhtml += ', with audio';
        }
        bndlhtml += ')';
        if (typeof(has_audio) != 'undefined' && has_audio) {
            bndlhtml += '<i class="icon file-audio"></i>';
        }
    }
    if (count >= 0) {
        bndlhtml += '&nbsp;<i class="icon fa-caret-right"></i></label>';
        bndlhtml += bsource['ul_md'];
    }
    return bndlhtml;
}

function update_bndl_list(q, recs) {
    const bndlfirst = parseInt(q['bndlfrom']) + 1;
    $('#bndllist').prop('start', bndlfirst);
    let bndlhtml = '';
    $.each(recs, function(i, r) {
        let count = bndlfirst + i;
        bndlhtml += '<li class="itemlist">';
        bndlhtml += get_bndllicontent(r['_source'], count);
        bndlhtml += '</li>';
    });
    $('#bndllist').html(bndlhtml);
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
                        bndlList += ' <img src="assets/img/audio.gif" alt="Item contains audio" />';
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
    collHTML += '<div class="sectiontab" id="coll"><div class="12u 12u$(small)">';
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
    bndlHTML += '<div class="sectiontab" id="bndl"><div class="12u 12u$(small)">';
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
 * Update the pagination <div> for 'bndl' and 'coll' tabs.
*/
function update_pagination(tab, pg)  {
    const dlen = 10; // display length (number of pages to display in paginator).
    const numpages = Math.ceil(pg.total / pg.size);
    const curpage = Math.ceil(pg.from / pg.size);
    const first = (curpage <= dlen ? 1 : curpage - (curpage % dlen));
    let last = (curpage <= dlen ? first + dlen - 1 : first + dlen);
    last = (last > numpages ? numpages : last);
    let html = '';
    if (first > 1) {
        html += '<a href="#" id="' + tab + 'laquo" data-page="1">&laquo;</a>';
        const dest = (first - dlen < 1 ? 1 : first - dlen);
        html += '<a href="#" id="' + tab + 'lhellip" data-page="' + dest + '">&hellip;</a>';
    }
    if (numpages > 1) {
        for (let n = first; n <= last; n++) {
            let add = '';
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
        html += '<a href="#" id="' + tab + 'raquo" data-page="' + numpages + '">&raquo;</a>';
    }

    $('#' + tab + 'paginator').html(html);
    $('#' + tab + 'paginator > a').on('click', function(event) {
        const page = parseInt(event.target.dataset.page);
        const pgsize = parseInt($('#cla-search-form').data('size'));
        const tab = $('#tablist > li.active').data('tabname');
        changefrom(tab, (page - 1) * pgsize);
    });
}

function populate_form_from_query_string(formid) {
  const formsel = '#' + formid;
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
      //psel = formsel + ' > [name="' + p + '"]';
      const val = qsparams.get(p);
      if (val != null) {
          //$(psel).prop('value', val);
          $(formsel).data(p, val);
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

  const sel = '#' + formid;

  // query is the object that will be POSTed.
  // The 'q' element has the query string(s), and other elements are filters.
  const query = {'q': [], 'qstr': []};
  $.each(filts, function(i,f) {
      query[f] = [];
  });

  // Add query strings and filters from select2 option elements.
  let inputs = [];
  if (formid == 'cla-search-form') {
      inputs = $(sel).find(':selected');
  } else {
      let inputs = $(sel + ' > input[name="sparams[]"]');
  }

  inputs.each(function() {
      const val = $(this).val();
      if (val.includes(sep)) {
          const parts = val.split(sep);
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

  // TODO: use default (or ignore) if incorrect/missing size value.
  const params = ['tab', 'with_js', 'size', 'bndlfrom', 'collfrom', 'bndlsort', 'collsort'];
  $.each(params, function(i, p) {
      //psel = '#' + formid + ' > [name="' + p + '"]';
      //query[p] = $(psel).prop('value');
      query[p] = $(sel).data(p);
  });

  return query;
}

