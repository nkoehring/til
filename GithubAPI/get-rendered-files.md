To get file content via the github api, you call a URL like:

`https://api.github.com/repos/nkoehring/todayIlearned/contents/GithubAPI/get-rendered-files.md`

If it is a markdown file but you want the HTML version rendered with Githubs markup library, you can directly retrieve it by setting the `Accept` header to `application/vnd.github.VERSION.html`.

Example without setting Accept header (using the fantastic [httpie](https://github.com/jakubroztocil/httpie)):
```js
# http -b get https://api.github.com/repos/nkoehring/todayIlearned/contents/GithubAPI/get-rendered-files.md

{
    "_links": {
        "git": "https://api.github.com/repos/nkoehring/todayIlearned/git/blobs/0c1ee559f20d4a17a7e777cc8282491cefc928f4",
        "html": "https://github.com/nkoehring/todayIlearned/blob/master/JavaScript/forever.md",
        "self": "https://api.github.com/repos/nkoehring/todayIlearned/contents/JavaScript/forever.md?ref=master"
    },
    "content": "QSBzaW1wbGUgQ0xJIHRvb2wgZm9yIGVuc3VyaW5nIHRoYXQgYSBnaXZlbiBz\nY3JpcHQgcnVucyBjb250aW51b3VzbHkgKGkuZS4KZm9yZXZlcikuCgpodHRw\nczovL2dpdGh1Yi5jb20vZm9yZXZlcmpzL2ZvcmV2ZXIK\n",
    "download_url": "https://raw.githubusercontent.com/nkoehring/todayIlearned/master/JavaScript/forever.md",
    "encoding": "base64",
    "git_url": "https://api.github.com/repos/nkoehring/todayIlearned/git/blobs/0c1ee559f20d4a17a7e777cc8282491cefc928f4",
    "html_url": "https://github.com/nkoehring/todayIlearned/blob/master/JavaScript/forever.md",
    "name": "forever.md",
    "path": "JavaScript/forever.md",
    "sha": "0c1ee559f20d4a17a7e777cc8282491cefc928f4",
    "size": 123,
    "type": "file",
    "url": "https://api.github.com/repos/nkoehring/todayIlearned/contents/JavaScript/forever.md?ref=master"
}
```

Example with setting the Accept header:
```html
http -b get https://api.github.com/repos/nkoehring/todayIlearned/contents/GithubAPI/get-rendered-files.md Accept:application/vnd.github.v3.html

<div class="announce instapaper_body md" data-path="JavaScript/forever.md" id="file"><article class="markdown-body entry-content" itemprop="text"><p>A simple CLI tool for ensuring that a given script runs continuously (i.e.
forever).</p>

<p><a href="https://github.com/foreverjs/forever">https://github.com/foreverjs/forever</a></p>
</article></div>

```
Found at:
https://developer.github.com/v3/repos/contents/#custom-media-types
