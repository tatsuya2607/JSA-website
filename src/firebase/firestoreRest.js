// Public reads go through the Firestore REST API instead of the SDK's
// realtime channel transport. On some origins/networks that streaming
// channel is aborted repeatedly and getDocs hangs forever; plain REST
// request/response always completes. Security Rules still apply.

import { firebaseProjectId, firebaseApiKey } from "./firebase";

const apiKey = firebaseApiKey;
const BASE = `https://firestore.googleapis.com/v1/projects/${firebaseProjectId}/databases/(default)/documents`;

function convertValue(value) {
  if (value == null) return null;
  if ("nullValue" in value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("mapValue" in value) return convertFields(value.mapValue.fields || {});
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(convertValue);
  return undefined;
}

function convertFields(fields) {
  const result = {};
  for (const [key, value] of Object.entries(fields)) {
    result[key] = convertValue(value);
  }
  return result;
}

function docId(name) {
  return name.split("/").pop();
}

export async function restGetCollection(collectionName) {
  const docs = [];
  let pageToken = "";

  do {
    const url =
      `${BASE}/${collectionName}?key=${apiKey}&pageSize=300` +
      (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : "");

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Firestore REST error ${response.status} for ${collectionName}`);
    }

    const data = await response.json();
    for (const document of data.documents || []) {
      docs.push({ id: docId(document.name), ...convertFields(document.fields || {}) });
    }
    pageToken = data.nextPageToken || "";
  } while (pageToken);

  return docs;
}

export async function restGetDocument(collectionName, id) {
  const url = `${BASE}/${collectionName}/${id}?key=${apiKey}`;
  const response = await fetch(url);

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Firestore REST error ${response.status} for ${collectionName}/${id}`);
  }

  const document = await response.json();
  return { id: docId(document.name), ...convertFields(document.fields || {}) };
}
