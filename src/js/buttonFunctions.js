export default class buttonFunctions {

    constructor(server, renderTable) {
        this.server = server
        this.render = renderTable
    }

    UPDATE = async (id) => {
        this.render(
            await this.server.getCountries(),
            await this.server.getCountry(id),
            false
        )
    }

    DELETE = async (id) => {
        await this.server.deleteCountry(id)
        this.render(
            await this.server.getCountries(),
            await this.server.getCountry(id),
            false
        )
    }

}