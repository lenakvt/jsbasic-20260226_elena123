function truncate(str, maxlength) {
  if (str.length <= maxlength) return str;

  let tail = "…";

  return str.substring(0, maxlength - 1) + tail;

}
