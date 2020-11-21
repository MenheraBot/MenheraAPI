module.exports = class Command {
    constructor(client, options) {
        this.client = client

        this.config = {
            name: options.name || null,
            category: options.category || "dev",
            aliases: options.aliases || [],
            UserPermission: options.UserPermission || null,
            ClientPermissions: options.ClientPermissions || null,
            OnlyDevs: options.OnlyDevs || false,
        }
    }
    getOption(message, yes = ["adicionar", "adc", "add", "insert"], no = ["remover", "remove", "delete", "deletar"]) {
		const cleanMessage = message.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
		if (yes.filter(a => a === cleanMessage)[0]) return "yes"
		if (no.filter(a => a === cleanMessage)[0]) return "no"
		return null
	}
}