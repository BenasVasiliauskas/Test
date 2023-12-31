function makeeditable(table) {
  for (let i = 1; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length - 1; j++) {
      const cell = table.rows[i].cells[j];
      cell.setAttribute("contenteditable", "true");
      cell.addEventListener("input", () => {
        calculateRowSum(table, i);
      });
    }
  }
}

function calculateRowSum(table, rowIndex) {
  const row = table.rows[rowIndex];
  let sum = 0;
  for (let j = 0; j < row.cells.length - 1; j++) {
    const cellValue = parseFloat(row.cells[j].textContent) || 0;
    sum += cellValue;
  }
  row.cells[row.cells.length - 1].textContent = sum;
}

function addpastelistener(table) {
  table.addEventListener("paste", (event) => {
    event.preventDefault();
    let paste = (event.clipboardData || window.clipboardData).getData("text");
    let col = event.target;
    while (col && col.tagName != "TD") col = col.parentElement;
    let row = col;
    while (row && row.tagName != "TR") row = row.parentElement;
    let tab = row;
    while (tab && tab.tagName != "TBODY" && tab.tagName != "TABLE")
      tab = tab.parentElement;
    let rows = paste.replace(/(\r\n)|\r|\n/g, "\n").split("\n");
    for (
      let i = 0, r = row.rowIndex;
      i < rows.length && r < table.rows.length;
      i++
    ) {
      let cells = rows[i].split("\t");
      for (
        let j = 0, c = col.cellIndex;
        j < cells.length && c < table.rows[r].cells.length;
        j++
      ) {
        table.rows[r].cells[c].innerHTML = cells[j].trim();
        c++;
      }
      r++;
    }
  });
}

function init() {
  const editabletables = document.getElementsByClassName("editabletable");
  for (let i = 0; i < editabletables.length; i++) {
    makeeditable(editabletables[i]);
    addpastelistener(editabletables[i]);
  }
}

init();
