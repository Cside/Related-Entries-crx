chrome.tabs.getSelected(null, function(selectedTab){
    var currentUrl = selectedTab.url;
    //var currentUrl = "http://www.hatena.ne.jp/";
    $.get("http://b.hatena.ne.jp/entry/json/" + currentUrl, function(html, status) {
        var innerHTML = [];
        if (html) {
            if (html.related) {
                $.each(html.related, function (){
                    var url        = this.url;
                    var count      = this.count;
                    var entryUrl   = this.entry_url;
                    var title      = truncate(this.title, 40);
                    var entryHtml  = 
                        '<li><a target="_blank "href="' + url + '" class="favicon entry-link"><img src="http://favicon.st-hatena.com/?url=' + encodeURIComponent(url) + '" alt=""></a><a target="_blank "href="' + url + '" class="entry-link" title="' + title + '">' + title + '</a><span class="users"><a target="_blank "href="' + entryUrl + '" title="はてなブックマーク - ' + title + '">' + count + ' users</a></span></li>';

                    innerHTML.push(entryHtml);
                });
                $('ul.refered').html(innerHTML.join(''));
                return;
            }
        }
        $('ul.refered').html('関連エントリーはありませんでした。');
    });
});

function truncate(str, size, suffix) {
    if (!str) str = '';
    if (!size) size = 32;
    if (!suffix) suffix = '...';
    var b = 0;
    for (var i = 0;  i < str.length; i++) {
        b += str.charCodeAt(i) <= 255 ? 1 : 2;
        if (b > size) {
            return str.substr(0, i) + suffix;
        }
    }
    return str;
}
function a(s){alert(s);}
function c(s){console.log(s);}
