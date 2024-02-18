import API from "../src/js/API.js"
import createElements from "../src/js/createElements.js"


//Initial setup of the page
let server = new API("http://localhost:3000/countries")
let getTemplate = new createElements()
let templateDetails = {
    countries: await server.getCountries(),
    addRow:true
}
$(".table_section").html(getTemplate.TABLE(templateDetails))

//Event handlers

$("#get_btn").on("click", async () => {
    let templateDetails = {
        countries: [await server.getCountry($('#ID').val)],
        editCountry: null,
        addRow:false
    }
    $(".table_section").html(getTemplate.TABLE(templateDetails))
})

$("#ge_all_btn").on("click", async () => {
    let templateDetails = {
        countries: await server.getCountries(),
        addRow:true
    }
    $(".table_section").html(getTemplate.TABLE(templateDetails))

})

$(".del_btn").on("click", async () => {
    let id = event.target.id.split("-")[1]//Button id is "del-ID#", extracting the ID
    await server.deleteCountry(id)
    let templateDetails = {
        countries: await server.getCountries(),
        addRow:true
    }
    $(".table_section").html(getTemplate.TABLE(templateDetails))
})

$(".upd_btn").on("click", async () => {
    let id = event.target.id.split("-")[1]//Button id is "upd-ID#", extracting the ID
    let templateDetails = {
        countries: await server.getCountries(),
        editCountry: await server.getCountry(id),
        addRow:false
    }
    $(".table_section").html(getTemplate.TABLE(templateDetails))
})
