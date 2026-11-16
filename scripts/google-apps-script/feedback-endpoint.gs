const FORM_DEFINITIONS = {
  "ai-advisory": {
    sheetName: "AI Advisory",
    row: (payload) => [
      payload.submittedAt,
      payload.formId,
      payload.responses.name || "",
      payload.responses.email || "",
      payload.responses.overall_usefulness || "",
      payload.responses.most_useful || "",
      payload.responses.what_became_clearer || "",
      payload.responses.describe_experience || "",
      payload.responses.could_improve || "",
      payload.responses.quote_permission || "",
      payload.responses.attribution || "",
    ],
  },
  "build-with-me": {
    sheetName: "Build With Me",
    row: (payload) => [
      payload.submittedAt,
      payload.formId,
      payload.responses.name || "",
      payload.responses.email || "",
      payload.responses.overall_usefulness || "",
      payload.responses.what_built || "",
      payload.responses.new_ai_capability || "",
      payload.responses.describe_experience || "",
      payload.responses.could_improve || "",
      payload.responses.quote_permission || "",
    ],
  },
  "reading-room": {
    sheetName: "Reading Room",
    row: (payload) => [
      payload.submittedAt,
      payload.formId,
      payload.responses.name || "",
      payload.responses.overall_usefulness || "",
      payload.responses.leaving_with || "",
      payload.responses.describe_experience || "",
      payload.responses.could_improve || "",
      payload.responses.quote_permission || "",
    ],
  },
};

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  const properties = PropertiesService.getScriptProperties();
  const expectedSecret = properties.getProperty("FEEDBACK_WEBHOOK_SECRET");
  const spreadsheetId = properties.getProperty("FEEDBACK_SPREADSHEET_ID");

  if (!expectedSecret || !spreadsheetId) return jsonResponse({ ok: false, error: "Not configured" });

  let payload;
  try {
    payload = JSON.parse(event.postData.contents);
  } catch (error) {
    return jsonResponse({ ok: false, error: "Invalid JSON" });
  }

  if (payload.secret !== expectedSecret) return jsonResponse({ ok: false, error: "Unauthorized" });

  const definition = FORM_DEFINITIONS[payload.formId];
  if (!definition || !payload.responses || typeof payload.responses !== "object") {
    return jsonResponse({ ok: false, error: "Unknown form" });
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(definition.sheetName);
    if (!sheet) return jsonResponse({ ok: false, error: "Missing response sheet" });
    sheet.appendRow(definition.row(payload));
    SpreadsheetApp.flush();
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: "Write failed" });
  } finally {
    lock.releaseLock();
  }
}
