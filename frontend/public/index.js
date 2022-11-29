let selectedRow = null;

let tables = {};

let tableSelect = document.getElementById("table-select");
let formDiv = document.getElementById("form-div");
let connectionForm = document.getElementById("connection-form");
let tablesDiv = document.getElementById("tables");
let rowForm = document.getElementById("add-row-form");
let rowFormContent = document.querySelector(
  "#add-row-form .modal-content .box .content"
);
console.log(rowFormContent);
let rowDeleteBtn = document.getElementById("row-delete-btn");

async function fetchTable(tableName) {
  let res = await fetch("http://localhost:3000/tableData", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      table: tableName,
    }),
  });
  let { success, data } = await res.json();
  if (success) tables[tableName] = data;
  return data;
}

async function fetchTables() {
  let res = await fetch("http://localhost:3000/tables");
  let { success, data } = await res.json();
  console.log(data);
  data = data;
  let names = [];
  data.map(({ TABLE_NAME }) => names.push(TABLE_NAME));
  return names;
}

async function handleConnect(event) {
  event.target.classList.toggle("is-loading");
  let tables = await fetchTables();
  console.log({ retTables: tables });
  setTables(tables);
  // setTables(["employee", "salaries"]);
  await displayTable(tables[0]);
  // displayTable("employee");
  connectionForm.style.display = "none";
  formDiv.style.display = "block";
  formDiv.dataset.tableName = "employee";
  event.target.classList.toggle("is-loading");
}

async function handleTableSelection(event) {
  await displayTable(event.target.value);
}

async function handleAddRow(e) {
  e.target.classList.toggle("is-loading");
  let { table, data } = await collectRowData();
  // Send a post request ded
  let res = await fetch("http://localhost:3000/addRow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      table,
      data,
    }),
  });
  let d = await res.json();
  e.target.classList.toggle("is-loading");
  tables[table] = await fetchTable(table);
  await displayTable(table);

  closeAllModals();
}

async function collectRowData() {
  let tableName = tableSelect.value;
  let inps = document.querySelectorAll(
    "#add-row-form .modal-content .box .content input"
  );
  console.log(inps, tableName);
  let rowDataObj = {};
  Array.from(inps, (inp) => (rowDataObj[inp.getAttribute("name")] = inp.value));
  return { table: tableName, data: rowDataObj };
}

function handleRowSelect(e) {
  if (selectedRow) {
    selectedRow.classList.toggle("is-selected");
  }
  if (selectedRow == e.target.parentNode) {
    selectedRow = null;
    rowDeleteBtn.disabled = true;
  } else {
    selectedRow = e.target.parentNode;
    selectedRow.classList.toggle("is-selected");
    rowDeleteBtn.disabled = false;
  }
}

async function handleRowDelete(e) {
  let table = tablesDiv.dataset.tableName;
  e.target.classList.toggle("is-loading");
  let data = getRowJson(selectedRow.innerHTML, Object.keys(tables[table][0]));
  let res = await fetch("http://localhost:3000/deleterow", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      table,
      data,
    }),
  });
  let d = await res.json();
  console.log({ table, data });
  e.target.classList.toggle("is-loading");
  tables[table] = fetchTable(table);
  await displayTable(table);
}

// Utils

function getRowJson(htmlStr, cols) {
  console.log(htmlStr);
  let data = {};
  let regex = /<td>([^<\/>]+)<\/td>/g,
    str = htmlStr,
    match,
    i = 0;
  while ((match = regex.exec(str))) {
    data[cols[i++]] = match[1]; // First capturing group of each match
  }
  return data;
}

// UI Modifiers

function setRowForm(cols) {
  let str = "";
  for (let col of cols) {
    str += `<div class="field">
  <label class="label">${col.charAt(0).toUpperCase() + col.slice(1)}</label>
  <div class="control">
    <input class="input row-form-inps" type="text" placeholder="Type Something" name="${col}" />
  </div>
</div>`;
  }
  rowFormContent.innerHTML = str;
}

function setTables(tables) {
  let str = "";
  for (let table of tables) {
    str += `<option>${table}</option>`;
  }
  tableSelect.innerHTML = str;
}

async function displayTable(tableName) {
  // if (!tables?.[tableName]) {
  let tableData = await fetchTable(tableName);
  let cols = [];
  let str = "";
  console.log({ tableData });
  str += `<table class="table is-fullwidth is-hoverable is-striped"><thead>
      <tr>
  ${Object.keys(tableData[0])
    .map((key) => {
      cols.push(key);
      return `<th>${key}</th>`;
    })
    .join("")}
      </tr>
    </thead>`;
  str += `<tbody>
    
${tableData
  .map((row) => {
    return `<tr onclick="handleRowSelect(event)">${cols
      .map((col) => `<td>${row[col]}</td>`)
      .join("")}</tr>`;
  })
  .join("")}`;
  str += "</tbody></table>";
  tablesDiv.innerHTML = str;
  tablesDiv.style.display = "block";
  tablesDiv.dataset.tableName = tableName;
  setRowForm(cols);
  // }
}

function closeModal($el) {
  $el.classList.remove("is-active");
}

function closeAllModals() {
  (document.querySelectorAll(".modal") || []).forEach(($modal) => {
    closeModal($modal);
  });
}

// MODAL

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});
