chrome.tabs.getSelected(null, async function (selectedTab) {
  var currentUrl = selectedTab.url;
  console.log(currentUrl);
  const res = await fetch("https://b.hatena.ne.jp/entry/json/" + currentUrl);
  const data = await res.json();
  console.log(data);
  const lists = [];
  console.log(0);
  if (data.related) {
    console.log(1);
    data.related.forEach((related) => {
      console.log(2);
      const count = related.count;
      const entryUrl = related.entry_url;
      const title = truncate(related.title, 40);
      const url = related.entry_url
        .replace(/.+entry\/s\//, "https://")
        .replace(/.+entry\//, "http://");
      const entryHtml = `
                        <li>
                            <a target="_blank" href="${url}" class="favicon entry-link">
                                <img src="http://favicon.st-hatena.com/?url=${encodeURIComponent(
                                  url
                                )}" alt="">
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
    console.log(lists);
    document.querySelector("ul.refered").innerHTML = lists.join("");
  } else {
    document.querySelector("ul.refered").innerHTML =
      "関連エントリーはありませんでした。";
  }
});

function truncate(str, size, suffix) {
  if (!str) str = "";
  if (!size) size = 32;
  if (!suffix) suffix = "...";
  let b = 0;
  for (let i = 0; i < str.length; i++) {
    b += str.charCodeAt(i) <= 255 ? 1 : 2;
    if (b > size) {
      return str.substr(0, i) + suffix;
    }
  }
  return str;
}
