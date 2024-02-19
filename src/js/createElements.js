import BF from "./buttonFunctions.js"

export default class createElements {

    constructor(server) { this.server = server }

    //? Helper functions
    renderTable = (countries, editCountry, addRow) => {
        let templateDetails = {
            countries: countries,
            editCountry: editCountry,
            addRow: addRow
        }
        $("#table_section").html(this.TABLE(templateDetails))
    }

    createCells = (count, element = "td") => {
        let cells = []
        for (let i = 0; i < count; i++) {
            let cell = document.createElement(element)
            cells.push(cell)
        }
        return cells

    }

    appendCells = (childs, parent, oneParent = true) => {
        if (oneParent)
            for (let i = 0; i < childs.length; i++) parent.appendChild(childs[i])
        else
            for (let i = 0; i < childs.length; i++) parent[i].appendChild(childs[i])

    }

    inputIinit = (Element, Type, Id, Value = "") => {
        Element.id = Id
        Element.type = Type
        Element.value = Value
        return Element
    }

    createBTN = (text, id, Class, func) => {
        let upd_btn = document.createElement("button")
        upd_btn.textContent = text
        upd_btn.classList.add(Class)
        upd_btn.id = id
        upd_btn.onclick = func
        return upd_btn
    }

    //? Global elements
    createTHEAD = () => {
        let thead = document.createElement("thead")

        let tr = document.createElement("tr")

        let th0 = document.createElement("th")
        let th1 = document.createElement("th")
        let th2 = document.createElement("th")
        let th3 = document.createElement("th")
        let th4 = document.createElement("th")
        let th5 = document.createElement("th")
        let th6 = document.createElement("th")

        th0.textContent = "ID"
        th1.textContent = "Name"
        th2.textContent = "Capital"
        th3.textContent = "Number of Citizens"
        th4.textContent = "Continent"
        th5.textContent = "Flag"
        th6.textContent = "Options"

        tr.appendChild(th0);
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6)

        thead.appendChild(tr)

        return thead
    }

    createADDrow = (country = null) => {

        let row = document.createElement("tr")

        if (country !== null) {
            row.classList.add("row_focus")
            row.id = `row-${country.id}`
        }

        let td = this.createCells(7)

        let input = this.createCells(6, "input")


        if (country === null) {
            input[0] = this.inputIinit(input[0], "text", "add-id")
            input[1] = this.inputIinit(input[1], "text", "add-name")
            input[2] = this.inputIinit(input[2], "text", "add-capital")
            input[3] = this.inputIinit(input[3], "number", "add-number_of_citizens")
            input[4] = this.inputIinit(input[4], "text", "add-continent")
            input[5] = this.inputIinit(input[5], "text", "add-flag")

            let ADD = async () => {

                let newCountry = {
                    name: $("#add-name").val(),
                    capital: $("#add-capital").val(),
                    number_of_citizens: $("#add-number_of_citizens").val(),
                    continent: $("#add-continent").val(),
                    url_to_flag_picture: $("#add-flag").val()
                }

                await this.server.createCountry(newCountry)

                this.renderTable(
                    await this.server.getCountries(),
                    null,
                    false
                )
            }

            let add_btn = this.createBTN("Add", `add-btn`, "add_btn", ADD)

            let CLEAR = async () => {
                this.renderTable(
                    await this.server.getCountries(),
                    null,
                    true
                )
            }

            let cancel_btn = this.createBTN("Clear", `clear-btn`, "clear_btn", CLEAR)

            input = this.appendCells(input, td, false) //append inputs to cells

            td[6].appendChild(add_btn)
            td[6].appendChild(cancel_btn)

            td = this.appendCells(td, row) //append cells to row
        }

        else {

            input[0] = this.inputIinit(input[0], "text", "update-id", country.id)
            input[1] = this.inputIinit(input[1], "text", "update-name", country.name)
            input[2] = this.inputIinit(input[2], "text", "update-capital", country.capital)
            input[3] = this.inputIinit(input[3], "number", "update-number_of_citizens", country.number_of_citizens)
            input[4] = this.inputIinit(input[4], "text", "update-continent", country.continent)
            input[5] = this.inputIinit(input[5], "text", "update-flag", country.url_to_flag_picture)

            let UPDATE = async () => {
                let id = $("#update-id").val()
                let updatedCountry = {
                    name: $("#update-name").val(),
                    capital: $("#update-capital").val(),
                    number_of_citizens: $("#update-number_of_citizens").val(),
                    continent: $("#update-continent").val(),
                    url_to_flag_picture: $("#update-flag").val()
                }

                await this.server.updateCountry(id, updatedCountry)

                this.renderTable(
                    await this.server.getCountries(),
                    null,
                    true
                )
            }

            let CANCEL = async () => {
                this.renderTable(
                    await this.server.getCountries(),
                    null,
                    true
                )
            }

            let upd_btn = this.createBTN("✓", `add-btn`, "add_btn", UPDATE)
            let cancel_btn = this.createBTN("✕", `cancel-btn`, "cancel_btn", CANCEL)

            this.appendCells(input, td, false) //append inputs to cells

            td[6].appendChild(upd_btn)
            td[6].appendChild(cancel_btn)

            this.appendCells(td, row) //append cells to row

        }

        return row
    }

    createTBODY = (countries, editCountry = null) => {

        let tbody = document.createElement("tbody")

        for (let i = 0; i < countries.length; i++) {

            //if there is a row to edit - draw it with inputs
            if (editCountry !== null && editCountry.id === countries[i].id) {
                let tr = this.createADDrow(countries[i])
                tbody.appendChild(tr)
            }

            //else - draw it as normal row
            else {
                let tr = document.createElement("tr")
                let id = countries[i].id

                //create cells
                let td = this.createCells(7)

                //init cells with values
                td[0].textContent = countries[i].id
                td[1].textContent = countries[i].name
                td[2].textContent = countries[i].capital
                td[3].textContent = countries[i].number_of_citizens
                td[4].textContent = countries[i].continent

                let img = document.createElement("img")
                img.src = countries[i].url_to_flag_picture
                td[5].appendChild(img)

                //init buttons
                let EDIT = async () => {
                    this.renderTable(
                        await this.server.getCountries(),
                        await this.server.getCountry(id),
                        false
                    )
                }
                let edit_btn = this.createBTN("🖊️", `edit-${id}`, "edit_btn", EDIT)
                td[6].appendChild(edit_btn)

                let DELETE = async () => {
                    await this.server.deleteCountry(id)
                    this.renderTable(
                        await this.server.getCountries(),
                        await this.server.getCountry(id),
                        false
                    )
                }
                let del_btn = this.createBTN("❌", `del-${id}`, "del_btn", DELETE)
                td[6].appendChild(del_btn)

                //add cells to row

                this.appendCells(td, tr)

                tbody.appendChild(tr)
            }

        }

        return tbody
    }

    //? endpoint
    TABLE = (details) => {

        let table = document.createElement("table")
        let thead = this.createTHEAD()
        let tbody = this.createTBODY(details.countries, details.editCountry)
        table.appendChild(thead)
        table.appendChild(tbody)

        if (details.addRow)//The row that enable adding new country
            table.appendChild(this.createADDrow())

        return table
    }

}