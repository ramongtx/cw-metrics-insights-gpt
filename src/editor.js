window.addEventListener("message", (event) => {
  if (event.data.type && (event.data.type === "MI_GTP_EXTENSION_EVENT")) {
    ace.edit('q1').setValue(event.data.text);
  }
}, false);
