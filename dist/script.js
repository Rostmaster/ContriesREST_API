import API from "../src/js/API.js"
import createElements from "../src/js/createElements.js"
let focusedCountry = null

//Initial setup of the page
let server = new API("http://localhost:3000/countries")
let getTemplate = new createElements(server)
getTemplate.renderTable(await server.getCountries(), null, true)

//Event handlers
$("#get_btn").on("click", async () => {
    getTemplate.renderTable(
        [await server.getCountry($('#ID').val())],
        null,
        false
    )
})

$("#ge_all_btn").on("click", async () => {
    getTemplate.renderTable(
        await server.getCountries(),
        null,
        true
    )
    $('#ID').val("")
})
