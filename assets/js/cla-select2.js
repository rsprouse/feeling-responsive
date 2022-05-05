// File globals
let aws_endpoint = '';
let showall = {'coll': true, 'bndl': true};
let baseurl = '';

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
 * params is a URLSearchParams object
 * TODO: whitelist filts
*/
function populate_form_from_params(params) {
    $('#cla-search-select').empty().trigger('change');
    const hparams = ['tab', 'with_js', 'size', 'bndlfrom', 'collfrom', 'bndlsort', 'collsort'];
    const filts = ['bndlid', 'collid', 'langid', 'pplid', 'placeid', 'repoid'];
    const sep = '=';
    $.each(Array.from(params.entries()), function(i, p) {
        if (hparams.includes(p[0])) {
            const hsel = '#cla-search-form > input[name="' + p[0] + '"]';
            $(hsel).val(p[1]);
        } else if (p[0] === 'sparams[]') {
            let title = p[1];
            const parts = p[1].split(sep);
            if (parts.length > 1 && filts.includes(parts[0])) {
                if (parts.length == 3) {
                    title = parts[2] + '\u2006';
                }
            }
//            if (title !== '\u2006' && title !== '') {
// TODO: sanitize title (or does select2 do that automatically)?
// TODO: maybe hide option if title is empty?
                newOption = new Option(title, p[1], true, true);
                $('#cla-search-select').append(newOption).trigger('change');
//            }
        } else if (filts.includes(p[0])) {
            let title = p[1];
            const parts = p[1].split(sep);
            if (parts.length > 1 && filts.includes(parts[0])) {
                if (parts.length == 3) {
                    title = parts[2] + '\u2006';
                }
            }
//            if (title !== '\u2006' && title !== '') {
// TODO: sanitize title (or does select2 do that automatically)?
// TODO: maybe hide option if title is empty?
                newOption = new Option(title, p[1], true, true);
                $('#cla-search-select').append(newOption).trigger('change');
//            }
        }
    });
}

function display_bndlrec(recid) {
  const action = rectype == 'coll' ? 'collection' : 'item';
  $.ajax({
      method: 'GET',
      url: aws_endpoint + action + '/' + recid,
      success: function(data) {
          if (rectype === 'coll') {
            const query = get_query_from_form('cla-search-form');
            query['collid'] = recid;
            query['q'] = [];
            query['qstr'] = [];
            update_tab_content(data, query, 'coll', false);
	  } else if (rectype === 'bndl') {
            const rsource = data['hits']['hits'][0]['_source'];
            $('#collbndlrec').html(get_bndllicontent(rsource, -1));
	  }
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
  $('#cla-search-form > input[name="collfrom"]').val('0');
  $('#cla-search-form > input[name="bndlfrom"]').val('0');
  $('#cla-search-form > input[name="tab"]').val('bndl');
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
	  paginate();
          //update_pagination('coll', collpg);
          //update_pagination('bndl', bndlpg);
          // Add event handlers for all <a href=""> metadata elements that
          // should be handled by a POST instead of a GET, if possible.
          //$("a.post").on('click', handleMetadataLinkClick);
      }
  });
}

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

/*
 * On entry, populate the form from the query string in the url, then
 * submit the form as normal.
 *
 */
function do_page_entry() {
  // If we re-entered page via forward/back button rather
  // than submitting the form from the homepage, then use history state.
  if (history.state == null) {
    populate_form_from_query_string(window.location.search);
  } else {
    populate_form_from_query_string(history.state);
  }
  const s = $.param($('#cla-search-form').serializeArray());
// TODO: remove hardcoded url
  history.replaceState(s, '', `/list/index.html?${s}`);
  $('#cla-search-form').submit();
}

/*
 * Handle click on a pagination link.
 *
 */
function pagination_click(e) {
  e.preventDefault();
  populate_form_from_query_string(e.target.href);
  do_search();
  const s = $.param($('#cla-search-form').serializeArray());
// TODO: remove hardcoded url
  history.pushState(s, '', `/list/index.html?${s}`);
}

/*
 * When the submit button is clicked, reset page-related values and submit
 * the form.
 *
 */
function do_submit(e) {
  if(e !== null) {
    e.preventDefault();
  }
  $('#collpgidx').val('0');
  $('#bndlpgidx').val('0');
  $('#cla-search-form > input[name="tab"]').val('bndl');
  const s = $.param($('#cla-search-form').serializeArray());
// TODO: remove hardcoded url
  history.pushState(s, '', `/list/index.html?${s}`);
  do_search();
  paginate();
}

/*
 * Set showall controls to default values for tab.
 *
 */
function set_showall_defaults(tab) {
  $('#show-all-caret-' + tab).toggleClass('fa-caret-right', true);
  $('#show-all-caret-' + tab).toggleClass('fa-caret-down', false);
  const sel = '[name="checkbox-' + tab + '"]';
  $(sel).prop('checked', true);
  showall[tab] = true;
}

/*
 * Do a catalog search based on current form values and
 * update results <div>.
 *
 */
function do_search(collid=null) {
  //const s = $.param($('#cla-search-form').serializeArray());
  if (collid !== null) {
    populate_form_from_query_string(`?sparams%5B%5D=collid%3D${collid}=`)
  }
  const query = get_query_from_form('cla-search-form');
  const tab = $('#cla-search-form > input[name="tab"]').val();
  $.ajax({
      method: 'POST',
      url: aws_endpoint + 'sq',
      data: JSON.stringify(query),
      dataType: 'json',
        success: function(data) {
          $('#tablist').show();
          if (collid != null) {
            const title = data["coll"]["hits"]["hits"][0]['_source'].title;
            const selval = $('#cla-search-form').find(':selected').first().val();
            $('#cla-search-select').val(null).trigger('change');
            const sep = selval.endsWith('=') ? '' : '=';
            const newOption = new Option(title, `${selval}${sep}${title}`, true, true);
            $('#cla-search-select').append(newOption).trigger('change');
//            set_showall_defaults('coll');
//            set_showall_defaults('bndl');
	  }
          set_showall_defaults(tab);

          if (collid != null) {
            $(`#colltab_title`).html('Collection description');
            update_coll_list(null, data["coll"]["hits"]["hits"]);
	  } else {
            collpg = get_pagination('coll', query, data);
            update_counts('coll', collpg);
            update_coll_list(query, data["coll"]["hits"]["hits"]);
            update_pagination('coll', collpg);
	  }

          const bndlpg = get_pagination('bndl', query, data);
          update_counts('bndl', bndlpg, (collid !== null));
          update_bndl_list(query, data["bndl"]["hits"]["hits"]);
          if (collid !== null) {
            const title = data["coll"]["hits"]["hits"][0]['_source'].title;
            update_pagination('bndl', bndlpg, {'collid': collid, 'title': title});
	  } else {
            update_pagination('bndl', bndlpg);
	  }

//          $('#tablist').show();
          $('label.showall').show();
          $('div.pagination > a').on('click', handlePaginationClick);
      }
  });
}


/*
 * Handle resubmitting searches when forward/back buttons are clicked.
 *
 */
function popstate(e) {
  // The hash links in pagination will fire off a popstate event, and
  // we don't want to handle that here.
  if(e.state === null) {
    e.preventDefault();
    return false;
  }
// TODO: foundation tab has its own way of tracking tab; should we not duplicate it in the form?
  const curtab = $('#cla-search-form > input[name="tab"]').val();
  populate_form_from_query_string(e.state);
  const histtab = $('#cla-search-form > input[name="tab"]').val();
  if (histtab !== curtab) {
    $('#cla-search-form')[0].scrollIntoView(true);
    $(`li.tab-title[data-tabname="${histtab}"] > a`).click();
  } else {
    if (window.location.pathname.includes('/collection')) {
      do_search(collid=sp.get('collid'));
    } else {
      do_search();
    }
    paginate();
    $('#cla-search-form')[0].scrollIntoView(true);
  }
//  const u = new URL(e.state);  // from popstate event
//  const curtab = $('#tablist > li.active').data('tabname');
}

function tabclick(e) {
// TODO: sometimes the target is the coll/bndl cnt element, and not the <a> element, and the .href value is not there
  let u = null;
  try {
    u = new URL(e.target.href);  // direct click on <a>
  } catch (error) {
    return; // popstate event
  }
// TODO: foundation tab has its own way of tracking tab; should we not duplicate it in the form?
  const curtab = $('#cla-search-form > input[name="tab"]').val();
  const clicktab = u.hash.substring(1);
  if (clicktab !== curtab) {
// TODO: it's possible the right data for the tab is already loaded, in which case it is not necessary to submit a new search
    $('#cla-search-form > input[name="tab"]').val(clicktab);
    const s = $.param($('#cla-search-form').serializeArray());
// TODO: remove hardcoded url
    history.pushState(s, '', e.target.href);
    if (u.search.includes('collid=')) {
      const params = new URLSearchParams(u.search);
      do_search(collid=params.get('collid'));
    } else {
      do_search();
    }
    paginate();
    $('#cla-search-form')[0].scrollIntoView(true);
  } else {
    e.preventDefault();
  }
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

/*
function changefrom(type, val) {
    var from = type + 'from';
    var query = $('#results').data('query');
    $('#'+from).prop('value', val);
    query[from] = val;
    $('#results').data('query', query);
    //document.getElementById('go').click({formid: formid});
    if (type == 'coll') {
        $('#cla-search-form > input[name="collfrom"]').val().toString();
    } else {
        $('#cla-search-form > input[name="bndlfrom"]').val().toString();
    }
    $('#cla-search-form').submit();
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
function update_counts(tab, pg, colldetail=false) {
    const results = (pg.total == 1 ? 'Result ' : 'Results ');
    let tabtitle = ''
    if (tab == 'bndl' && colldetail) {
      tabtitle = 'Collection item';
    } else if (tab == 'bndl') {
      tabtitle = 'Item';
    } else if (tab == 'coll') {
      tabtitle = 'Collection';
    }
    if (pg.total != 1) {
      tabtitle += "s";
    }
    $(`#${tab}tab_title`).html(`${tabtitle}`);
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
    const collfirst = (q === null ? 1 : parseInt(q['collfrom']) + 1);
    const liclass = (q === null ? "nocount" : "itemlist");
    const lblclass = (q === null ? "showall" : "showmore");
    $('#colllist').prop('start', collfirst);
    let collhtml = '';
    $.each(recs, function(i, r) {
         let count = collfirst + i;
         collhtml += `<li class="${liclass}">`;
         collhtml += '<input id="_coll' +  count + '" type="checkbox" name="checkbox-coll">';
         collhtml += `<label class="${lblclass}" for="_coll${count}">`;
         collhtml += '<a href="' + baseurl + 'collection?collid=' + r['_source']['collid'] + '" class="post">' + r['_source']['title'] +'</a>';
        if (q !== null) {
          collhtml += '&nbsp;<i class="icon fa-caret-right"></i>';
        }
        collhtml += '</label>' + r['_source']['ul_md'];
    });
    $('#colllist').html(collhtml);
}

/* Get the Bndl metadata content from an elasticsearch response.
 * bsource contains the Bndl's _source value from elasticsearch.
 * count is the number associated with the Bndl metadata in a list
 * of Bndls. Use a negative value for a non-list context, such as
 * the detail page for a single Bndl.
 */
function get_bndllicontent(bsource, count) {
    let bndlhtml = '';
    if (count >= 0) {
        bndlhtml += '<input id="_bndl' +  count + '" type="checkbox" name="checkbox-bndl">';
        bndlhtml += '<label class="showmore" for="_bndl' + count + '">';
        bndlhtml += '<a href="' + baseurl + 'item?bndlid=' + bsource['bndlid'] + '">' + bsource['title'] + '</a>';
        let datestr = bsource['datestr'];
        if (typeof(datestr) != 'undefined' && datestr != '') {
            bndlhtml += ' (' + datestr + ') ';
        }
    } else {
        bndlhtml += '<span class="title">' + bsource['title'] + '</span>';
    }
    let assetcnt = bsource['assetcnt'];
    if (typeof(assetcnt) != 'undefined' && assetcnt > 0) {
        bndlhtml += ' (' + assetcnt + '&nbsp;digital file';
        if (assetcnt > 1) {
            bndlhtml += 's';
        }
        let has_audio = bsource['has_audio'];
        if (typeof(has_audio) != 'undefined' && has_audio) {
            bndlhtml += ', with audio';
        }
        bndlhtml += ')';
        if (typeof(has_audio) != 'undefined' && has_audio) {
            bndlhtml += '&nbsp;<i class="icon fa-file-audio"></i>';
        }
    }
    if (count >= 0) {
        bndlhtml += '&nbsp;<i class="icon fa-caret-right"></i></label>';
    }
    bndlhtml += bsource['ul_md'];
    if (count < 0 & 'boxurl' in bsource) {
        bndlhtml += '<p>By using digital assets, you accept our <a href="using-cla.html">Terms and Conditions</a>.<br />';
        bndlhtml += 'If files do not appear below, you may also <a href="' + bsource['boxurl'] + '">go directly to the asset folder</a>.</p>';
        bndlhtml += '<iframe src="' + bsource['boxurl'] + '" width="100%" height="1250" frameborder="1" allowfullscreen webkitallowfullscreen msallowfullscreen></iframe>';
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

/*
 * Update the pagination <div> for 'bndl' and 'coll' tabs.
*/
function update_pagination(tab, pg, coll=null)  {
    if (pg === null) {
        const from = parseInt(
            $(`#cla-search-form > input[name="${tab}from"]`).val()
        );
        const total = parseInt(
            $(`#${tab}resultscnt >> span[name="total"]`).html()
        );
        const end = from + total -  1;
        const size = parseInt(
            $(`#cla-search-form > input[name="size"]`).val()
        );
        pg = { from, end, total, size };
    }
    const dlen = 10; // display length (number of pages to display in paginator).
    const numpages = Math.ceil(pg.total / pg.size);
    const curpage = Math.ceil(pg.from / pg.size);
    const first = (curpage <= dlen ? 1 : curpage - (curpage % dlen));
    let last = (curpage <= dlen ? first + dlen - 1 : first + dlen);
    last = (last > numpages ? numpages : last);
    let html = '';
    const params = coll ?
      {'sparams[]': 'collid=' + coll['collid'] + '=' + coll['title']} :
      $('#cla-search-form').serializeArray();
    const s = $.param(params);
// TODO: don't hardcode href
    const href = coll ? `/collection/?collid=${s}` : `/list/index.html?${s}`;
    if (first > 1) {
        html += `<a href="${href}" id="${tab}laquo" data-page="1">&laquo;</a>`;
        const dest = (first - dlen < 1 ? 1 : first - dlen);
        html += `<a href="${href}" id="${tab}lhellip" data-page="${dest}">&hellip;</a>`;
    }
    if (numpages > 1) {
        for (let n = first; n <= last; n++) {
            let add = '';
            if (n == 1) {
                add = ` id="${tab}page1paginate"`;
            }
            if (n == curpage) {
                add = ' class="active"';
            }
            html += `<a href="${href}"${add} data-page="${n}">${n}</a>`;
        }
    }
    if (last < numpages) {
        html += `<a href="${href}" id="${tab}rhellip" data-page="${last + 1}">&hellip;</a>`;
        html += `<a href="${href}" id="${tab}raquo" data-page="${numpages}">&raquo;</a>`;
    }

    $(`#${tab}paginator`).html(html);
}

function populate_form_from_state() {
  $('#cla-search-form').empty().trigger("change");
  const p = new URLSearchParams(window.history.state)
  populate_form_from_params(p);
  $('#search_button').click();
}

function populate_form_from_query_string(qs) {
  const params = new URLSearchParams(qs);
  populate_form_from_params(params);
/*
 * TODO: remove this section
  $.each(Array.from(params.entries()), function(i, p) {
    $(`#cla-search-form > input[name="${p[0]}"]`).val(p[1]);
  });
 */
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
      psel = '#' + formid + ' > [name="' + p + '"]';
      query[p] = $(psel).val();
  });

  return query;
}

function handlePaginationClick(e) {
  e.preventDefault();
  const page = parseInt(e.target.dataset.page);
  const pgsize = parseInt($('#cla-search-form > input[name="size"]').val());
// TODO: which way of getting tab is better here?
  const tab = $('#tablist > li.active').data('tabname');
//  const tab = $('#cla-search-form > input[name="tab"]').val();
  const fromsel = `#cla-search-form > input[name="${tab}from"]`;
  $(fromsel).val((page - 1) * pgsize);
  const s = $.param($('#cla-search-form').serializeArray());
// TODO: remove hardcoded url
  history.pushState(s, '', `${window.location.pathname}?${s}`);

  //$('#cla-search-form').submit();
  if (window.location.pathname.includes('/collection')) {
    do_search(collid=sp.get('collid'));
  } else {
    do_search();
  }
  //const s = do_search();
  paginate();
  $('#cla-search-form')[0].scrollIntoView(true);
}

function paginate() {
  paginate_tab('coll');
  paginate_tab('bndl');
  $('div.pagination > a').on('click', handlePaginationClick);
  const curtab = $('#cla-search-form > input[name="tab"]').val();
  if (curtab === 'coll') {
    $(`#collpagination`).html("");
    $(`#collpagination`).show();
    $(`#bndlpagination`).hide();
  } else {
    $(`#bndlpagination`).html("");
    $(`#bndlpagination`).show();
    $(`#collpagination`).hide();
  }
}

function paginate_tab(tab) {
    const params = $('#cla-search-form').serializeArray();
//  const query = get_query_from_form('cla-search-form');
    let pgidx = -1;
    $.each(params, function(i, p) {
        if (p["name"] === `${tab}page`) {
            pgidx = i;
        }
    });
    if (pgidx === -1) {
        const hsel = `#cla-search-form > input[name="${tab}page"]`;
        $(hsel).val('1');
    }
    update_pagination(tab, null);
}
