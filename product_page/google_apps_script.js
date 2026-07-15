/**
 * Google Apps Script - AGGC Product Enquiry Form Receiver (with Gmail Notifications)
 * 
 * INSTRUCTIONS FOR DEPLOYMENT:
 * -------------------------------------------------------------
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1r_rbQboRSLWl1C6sGCCXLrCYWgWEARkS0UNhyjTdfVY/edit
 * 2. Click on "Extensions" in the top menu bar, then click "Apps Script".
 * 3. Delete any existing code in the editor, and paste this entire script inside the editor.
 * 4. Rename the project to "AGGC Form Receiver".
 * 5. Click the "Save" icon (or press Ctrl + S).
 * 6. Click the blue "Deploy" button in the top right, and choose "New deployment".
 * 7. Click the Gear icon next to "Select type" and choose "Web app".
 * 8. Enter a description (e.g. "Added Email Notifications").
 * 9. Set "Execute as" to "Me (your-email@gmail.com)".
 * 10. Set "Who has access" to "Anyone" (This is critical so the website can submit to it).
 * 11. Click "Deploy". You will be asked to authorize access to your Google Account.
 *     (Ensure you grant the authorization to run Gmail/Mail services).
 * 12. Copy the "Web app URL" (it ends with "/exec").
 * 13. Open your project file: product_page/product_renderer.js and paste the URL in the variable:
 *     const GOOGLE_SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";
 * 14. Save product_renderer.js. You are all set!
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var timestamp = new Date();
  
  var name = "";
  var email = "";
  var phone = "";
  var message = "";
  var product = "";
  
  try {
    // Parse data regardless of content type (FormData URLSearchParams or JSON)
    if (e && e.postData && e.postData.type === "application/json") {
      var data = JSON.parse(e.postData.contents);
      name = data.name || "";
      email = data.email || "";
      phone = data.phone || "";
      message = data.message || "";
      product = data.product || "";
    } else if (e && e.parameter) {
      name = e.parameter.name || "";
      email = e.parameter.email || "";
      phone = e.parameter.phone || "";
      message = e.parameter.message || "";
      product = e.parameter.product || "";
    }
    
    // 1. Add data to Google Sheet
    sheet.appendRow([timestamp, product, name, email, phone, message]);
    
    // 2. Send email notification to digitalnest278@gmail.com
    sendEmailNotification(product, name, email, phone, message, timestamp);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
      
  } catch (error) {
    // Return error message if failure occurs
    return ContentService.createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}

/**
 * Sends a premium-designed HTML notification email to the business email address.
 */
function sendEmailNotification(product, name, email, phone, message, timestamp) {
  var recipient = "digitalnest278@gmail.com";
  var subject = "[AGGC Enquiry] New Product Request: " + product;
  
  // Format the date/time string safely
  var formattedTime = "";
  try {
    formattedTime = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
  } catch (err) {
    formattedTime = timestamp.toLocaleString();
  }
  
  var htmlBody = 
    "<div style='font-family: \"Segoe UI\", Helvetica, Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.04);'>" +
      // Header Banner with AGGC brand colors (navy #180733 & gold #e1ae31)
      "<div style='background-color: #180733; padding: 28px 24px; text-align: center; border-bottom: 4px solid #e1ae31;'>" +
        "<h2 style='color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;'>Aung Gyi Group of Companies</h2>" +
        "<p style='color: #e1ae31; margin: 6px 0 0 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;'>Product Enquiry Notification</p>" +
      "</div>" +
      
      // Content Area
      "<div style='padding: 32px 24px; background-color: #ffffff; color: #2d3748; line-height: 1.6;'>" +
        "<p style='margin-top: 0; font-size: 14px; color: #4a5568;'>Dear Team,</p>" +
        "<p style='font-size: 14px; color: #4a5568; margin-bottom: 24px;'>A new customer inquiry has been submitted from the product catalog page. Below are the details:</p>" +
        
        // Data Table
        "<table style='width: 100%; border-collapse: collapse; margin-bottom: 28px; font-size: 14px;'>" +
          "<tr style='border-bottom: 1px solid #edf2f7;'>" +
            "<td style='padding: 12px 0; font-weight: bold; width: 35%; color: #718096;'>Product Requested</td>" +
            "<td style='padding: 12px 0; font-weight: 700; color: #180733;'>" + product + "</td>" +
          "</tr>" +
          "<tr style='border-bottom: 1px solid #edf2f7;'>" +
            "<td style='padding: 12px 0; font-weight: bold; color: #718096;'>Customer Name</td>" +
            "<td style='padding: 12px 0; color: #2d3748; font-weight: 600;'>" + name + "</td>" +
          "</tr>" +
          "<tr style='border-bottom: 1px solid #edf2f7;'>" +
            "<td style='padding: 12px 0; font-weight: bold; color: #718096;'>Email Address</td>" +
            "<td style='padding: 12px 0;'><a href='mailto:" + email + "' style='color: #e1ae31; text-decoration: none; font-weight: 600;'>" + email + "</a></td>" +
          "</tr>" +
          "<tr style='border-bottom: 1px solid #edf2f7;'>" +
            "<td style='padding: 12px 0; font-weight: bold; color: #718096;'>Phone Number</td>" +
            "<td style='padding: 12px 0; color: #2d3748; font-weight: 600;'>" + (phone || "N/A") + "</td>" +
          "</tr>" +
          "<tr style='border-bottom: 1px solid #edf2f7;'>" +
            "<td style='padding: 12px 0; font-weight: bold; color: #718096;'>Date & Time</td>" +
            "<td style='padding: 12px 0; color: #718096;'>" + formattedTime + "</td>" +
          "</tr>" +
        "</table>" +
        
        // Message Block
        "<div style='background-color: #f8fafc; border-left: 4px solid #e1ae31; padding: 18px; border-radius: 8px; margin-bottom: 12px;'>" +
          "<h4 style='margin: 0 0 10px 0; font-size: 12px; color: #718096; text-transform: uppercase; letter-spacing: 0.5px;'>Message / Requirement Details:</h4>" +
          "<p style='margin: 0; font-size: 14px; font-style: italic; color: #2d3748; white-space: pre-wrap;'>" + message + "</p>" +
        "</div>" +
      "</div>" +
      
      // Footer Area
      "<div style='background-color: #f7fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #edf2f7; font-size: 11px; color: #a0aec0;'>" +
        "<p style='margin: 0 0 6px 0;'>&copy; 2026 Aung Gyi Group of Companies. All rights reserved.</p>" +
        "<p style='margin: 0;'>This is an automated notification. Please reply directly to the customer's email address listed above.</p>" +
      "</div>" +
    "</div>";

  // Use MailApp to send the email notification
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });
}

// GET test verification function
function doGet() {
  return ContentService.createTextOutput("AGGC Form Receiver (with Email) is running successfully!")
    .setMimeType(ContentService.MimeType.TEXT);
}
