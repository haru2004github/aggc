# News multiple-image format

`news.html` supports one or multiple image links in the existing `Hero_Image` or `Image` cell (matched by column header).

Recommended: edit the cell and paste one URL per line, keeping all links in the same cell:

```text
https://example.com/photo-1.jpg
https://example.com/photo-2.jpg
https://example.com/photo-3.jpg
```

Comma-separated HTTP/HTTPS links also work, as in Activities. Use direct publicly accessible image URLs, not private sharing pages. Do not put Markdown or HTML around them.

The first valid image is the news cover and homepage preview. Remaining images appear in the article gallery and can be opened full size. Repeated URLs are shown once. Existing Image / First / Second / Third / Fourth (or Forth) image columns remain supported and can also contain multiple links. Existing single-image posts work unchanged. There is no four-image limit when multiple links are placed inside a cell.

Title and Description columns remain unchanged. JSON and CSV feed paths use the same image normalization.

Tally signed URLs: keep the complete accessToken and signature query parameters. Newlines, spaces, and comma-separated URLs are supported. Markdown link wrappers are also recognized, but plain URLs are recommended. Duplicate links are removed. Links must still be accessible at viewing time.

Current live Sheet: Hero_Image is column F, description is G, and Image is H. Put additional image links in H (Image); the latest row uses this layout.
