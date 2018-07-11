chrome.tabs.getSelected(null, function(selectedTab){
    var currentUrl = selectedTab.url;
    $.get("http://b.hatena.ne.jp/entry/json/" + currentUrl, function(html, status) {
        const lists = [];
        if (html) {
            if (html.related) {
                $.each(html.related, function (){
                    const count      = this.count;
                    const entryUrl   = this.entry_url;
                    const title      = truncate(this.title, 40);
                    const url        = this.entry_url.
                                       replace(/.+entry\/s\//, 'https://').
                                       replace(/.+entry\//,    'http://');
                    const entryHtml  = `
                        <li>
                            <a target="_blank" href="${url}" class="favicon entry-link">
                                <img src="http://favicon.st-hatena.com/?url=${encodeURIComponent(url)}" alt="">
                            </a>
                            <a target="_blank" href="${url}" class="entry-link">
                                ${title}
                            </a>
                            <span class="users">
                                <a target="_blank" href="${entryUrl}">${count} users</a>
                            </span>
                        </li>`;

                    lists.push(entryHtml);
                });
                $('ul.refered').html(lists.join(''));
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
    let b = 0;
    for (let i = 0;  i < str.length; i++) {
        b += str.charCodeAt(i) <= 255 ? 1 : 2;
        if (b > size) {
            return str.substr(0, i) + suffix;
        }
    }
    return str;
}
