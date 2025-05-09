function addFormulaNumber() {
    let title_list = document.getElementsByClassName("title-container");
    let title_number = 0;
    for (title of title_list) {
        title_number += 1;
        let tabel_list = title.getElementsByClassName("formula-table");
        addFormulaNumberForTitle(tabel_list,title_number);
    }

}

function addFormulaNumberForTitle(formula_table,title_number) {
    let end_number = 1;
    for (let i = 0; i < formula_table.length; i++) {
        let tr_list = formula_table[i].getElementsByTagName("tr");
        for (tr of tr_list) {
            let td = document.createElement("td");
            td.innerHTML = `(${title_number}.${end_number})`;
            td.className = "formula-number";
            td.style.fontSize = "10rem";
            tr.appendChild(td);
            end_number += 1;
        }
    }
}

addFormulaNumber();