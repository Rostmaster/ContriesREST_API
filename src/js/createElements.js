export default class createElements {

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

        let td0 = document.createElement("td")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        let td5 = document.createElement("td")
        let td6 = document.createElement("td")

        let input0 = document.createElement("input")
        let input1 = document.createElement("input")
        let input2 = document.createElement("input")
        let input3 = document.createElement("input")
        let input4 = document.createElement("input")
        let input5 = document.createElement("input")
        let btn6 = document.createElement("button")

        if (country === null) {
            input0.type = "text"
            input1.type = "text"
            input2.type = "text"
            input3.type = "number"
            input4.type = "text"
            input5.type = "text"

            input0.id = `add-id`
            input1.id = `add-name`
            input2.id = `add-capital`
            input3.id = `add-number_of_citizens`
            input4.id = `add-continent`
            input5.id = `add-flag`

            btn6.textContent = "Add"
            btn6.id = `add-btn`
        }

        else {
            input0.type = "text"
            input1.type = "text"
            input2.type = "text"
            input3.type = "number"
            input4.type = "text"
            input5.type = "text"

            input0.id = `update-id`
            input1.id = `update-name`
            input2.id = `update-capital`
            input3.id = `update-number_of_citizens`
            input4.id = `update-continent`
            input5.id = `update-flag`

            input0.value = country.id
            input1.value = country.name
            input2.value = country.capital
            input3.value = country.number_of_citizens
            input4.value = country.continent
            input5.value = country.url_to_flag_picture

            btn6.textContent = "Update"
            btn6.id = `update-btn`
        }

        td0.appendChild(input0);
        td1.appendChild(input1);
        td2.appendChild(input2);
        td3.appendChild(input3);
        td4.appendChild(input4);
        td5.appendChild(input5);
        td6.appendChild(btn6)

        row.appendChild(td0);
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);

        return row

    }

    createTBODY = (countries, editCountry = null) => {

        let tbody = document.createElement("tbody")

        for (let i = 0; i < countries.length; i++) {

            if (editCountry !== null && editCountry.id === countries[i].id) {
                let tr = this.createADDrow(countries[i])
                tbody.appendChild(tr)
            }
            else {
                let tr = document.createElement("tr")
                tr.id = `row-${countries[i].id}`

                let td0 = document.createElement("td")
                let td1 = document.createElement("td")
                let td2 = document.createElement("td")
                let td3 = document.createElement("td")
                let td4 = document.createElement("td")
                let td5 = document.createElement("td")
                let td6 = document.createElement("td")

                td0.textContent = countries[i].id
                td1.textContent = countries[i].name
                td2.textContent = countries[i].capital
                td3.textContent = countries[i].number_of_citizens
                td4.textContent = countries[i].continent

                let img = document.createElement("img")
                //img.src = countries[i].url_to_flag_picture
                td5.appendChild(img)

                let upd_btn = document.createElement("button")
                upd_btn.textContent = "🖊️"
                upd_btn.id = `upd-${countries[i].id}`
                upd_btn.classList.add("upd_btn")
                td6.appendChild(upd_btn)

                let del_btn = document.createElement("button")
                del_btn.textContent = "❌"
                del_btn.id = `del-${countries[i].id}`
                del_btn.classList.add("del_btn")
                td6.appendChild(del_btn)


                tr.appendChild(td0);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6)

                tbody.appendChild(tr)
            }

        }

        return tbody
    }

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
    // countries: await server.getCountries(),
    // editCountry: await server.getCountry(id),
    // addRow:false

}