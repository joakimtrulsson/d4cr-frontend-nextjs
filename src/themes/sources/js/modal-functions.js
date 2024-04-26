export function ensureValidUrl(url) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  } else if (url.startsWith("www.")) {
    return `http://${url}`;
  } else {
    return url;
  }
}

