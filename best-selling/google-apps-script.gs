/** Digital Nest — single-owner Sheets bridge. Set script properties before deploying. */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const properties = PropertiesService.getScriptProperties();
    const secret = properties.getProperty('CONNECTION_KEY');
    if (!secret || secret.length < 24 || body.token !== secret) throw new Error('Invalid connection key.');
    const book = SpreadsheetApp.openById(properties.getProperty('SPREADSHEET_ID'));
    if (body.action === 'ping') return json_({ok: true, name: book.getName()});
    if (body.action !== 'sync' || !Array.isArray(body.records) || body.records.length > 25) throw new Error('Invalid request.');
    // Validate the whole batch before writing anything.
    const rows = body.records.map(recordRow_);
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sheet = book.getSheetByName('Vouchers') || book.insertSheet('Vouchers');
      if (!sheet.getLastRow()) {
        sheet.appendRow(['ID', 'Voucher No', 'Date', 'Customer', 'Items JSON', 'Subtotal MMK', 'Discount MMK', 'Total MMK', 'Note', 'Updated At']);
        sheet.setFrozenRows(1);
        sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#e8f3ee');
      }
      const ids = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow()-1, 1).getValues().flat() : [];
      const positions = new Map(ids.map((id, index) => [String(id), index+2]));
      rows.forEach(row => {
        const existing = positions.get(String(row[0]));
        if (existing) sheet.getRange(existing, 1, 1, row.length).setValues([row]);
        else { const next = sheet.getLastRow()+1; sheet.getRange(next, 1, 1, row.length).setValues([row]); positions.set(String(row[0]), next); }
      });
      SpreadsheetApp.flush();
    } finally { lock.releaseLock(); }
    return json_({ok: true, count: rows.length});
  } catch (error) { return json_({ok: false, error: String(error.message || error)}); }
}
function recordRow_(v) {
  if (!v || !/^[a-zA-Z0-9-]{1,80}$/.test(v.id) || typeof v.customer !== 'string' || !v.customer.trim() || v.customer.length > 150 || typeof v.number !== 'string' || !v.number.trim() || v.number.length > 50 || !/^\d{4}-\d{2}-\d{2}$/.test(v.date) || !Array.isArray(v.items) || !v.items.length || v.items.length > 200) throw new Error('Invalid voucher record.');
  let subtotal = 0;
  v.items.forEach(i => {
    if (!i || typeof i.desc !== 'string' || !i.desc.trim() || i.desc.length > 250 || !Number.isInteger(i.qty) || i.qty < 1 || i.qty > 100000 || !Number.isInteger(i.price) || i.price < 0 || i.price > 1000000000) throw new Error('Invalid item.');
    subtotal += i.qty*i.price;
  });
  if (!Number.isFinite(subtotal) || !['mmk', 'percent'].includes(v.discountType) || typeof v.discount !== 'number' || !Number.isFinite(v.discount) || v.discount < 0 || (v.discountType === 'percent' && v.discount > 100)) throw new Error('Invalid discount.');
  const discount = Math.round(Math.min(subtotal, v.discountType === 'percent' ? subtotal*v.discount/100 : v.discount));
  const items = JSON.stringify(v.items);
  if (items.length > 45000) throw new Error('Voucher has too many item details for one Sheet cell.');
  return [v.id, cell_(v.number), v.date, cell_(v.customer), items, subtotal, discount, subtotal-discount, cell_(String(v.note || '').slice(0, 300)), cell_(String(v.updatedAt || ''))];
}
function cell_(value) { return /^[=+\-@\t\r\n]/.test(value) ? "'" + value : value; }
function json_(data) { return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); }
