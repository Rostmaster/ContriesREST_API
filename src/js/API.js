export default class API {

    constructor(url) {
        this.url = url
    }

    countryValidation = (country, previousInfo = null) => {

        let updatedCountry = {}

        let template = [
            "name",
            "capital",
            "number_of_citizens",
            "continent",
            "url_to_flag_picture"
        ]

        for (let i = 0; i < template.length; i++) {

            //if field is not blank, assign it to the updateCountry object
            if (country[template[i]] !== "")
                updatedCountry[template[i]] = country[template[i]]

            //if no field and no previous info, assign empty string (except id)
            if (!country[template[i]] && previousInfo === null
                && country[template[i]] !== "id")
                updatedCountry[template[i]] = ""

            //if no field and previous info present, use previous info (except id)
            if (!country[template[i]] && previousInfo !== null
                && country[template[i]] !== "id")
                updatedCountry[template[i]] = previousInfo[template[i]]

            //if field is blank and previous info present, use previous info
            if (country[template[i]] === "" && previousInfo !== null)
                updatedCountry[template[i]] = previousInfo[template[i]]

        }

        return updatedCountry

    }

    getCountries = async () => {
        return await fetch(this.url)
            .then(res => {
                if (res.ok) return res.json()
                console.log("Get countries responded as: ", res.statusText)
            })
            .then(countries => {
                console.log(countries)
                return countries
            })
    }

    getCountry = async (id) => {
        return await fetch(this.url + `/${id}`)
            .then(res => {
                if (res.ok) return res.json()
                else if (res.status === 404) return {
                    id: "THERE",
                    name: "IS",
                    capital: "NO",
                    number_of_citizens: "SUCH",
                    continent: "COUNTRY",
                    url_to_flag_picture: "!"
                }
                console.log(`Get country ${id} responded as: `, res.statusText)
            })
            .then(country => {
                console.log("Country:", country)
                return country
            })
    }

    createCountry = async (country) => {

        let validatedCountry = this.countryValidation(country)

        let details = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(validatedCountry)
        }
        return await fetch(this.url, details)
            .then(res => console.log(
                `Create country ${country.name} responded as: `, res.statusText))
            .then(country => country)
    }

    updateCountry = async (id, country) => {

        let currentInfo = await this.getCountry(id)

        let validatedCountry = this.countryValidation(country, currentInfo)

        let details = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(validatedCountry)
        }

        await fetch(this.url + `/${id}`, details)
    }

    replaceCountry = async (id, country) => {

        let validatedCountry = this.countryValidation(country)

        let details = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(validatedCountry)
        }
        await fetch(this.url + `/${id}`, details)
    }

    deleteCountry = async (id) => {
        let details = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        await fetch(this.url + `/${id}`, details)
    }

    testCountry = {
        "name": "",
        "capital": "Astana",
        "number_of_citizens": 45678,
        "continent": "Euroasia",
        "url_to_flag_picture": "https://example.com/flags/united-states.png"
    }
}


let server = new API("http://localhost:3000/countries")

let country = server.getCountry(2)

console.log(country)