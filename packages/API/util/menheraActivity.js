class Activities {

     defaullt_activivies = [
        // Atividades padrões 
        { name: '🚨 | Meu servidor de suporte m!suporte', type: 'LISTENING' },
        { name: '🎇 | Já votou em mim hoje? m!votar', type: 'PLAYING' },
        { name: '🎮 | Caçe demônios com XANDÃO. m!caçar', type: 'PLAYING' },
        { name: '🔮 | Tem ideia de um comando interessante? Use m!sugerir', type: 'PLAYING' },
        { name: '💌 |Dificuldade com um comando? Use m!help comando', type: 'PLAYING' },
        { name: '🐛 | Encontrou um bug? Reporte com m!bug', type: 'PLAYING' },
        { name: '❓ | Duvidas? Entre em meu servidor de suporte m!suporte', type: 'PLAYING' },
        { name: '🔔 | Fique por dentro das minhas novidades em meu servidor de suporte', type: 'PLAYING' },
        { name: '🎲 | Sabia que eu tenho um rpg? m!help', type: 'PLAYING' },
        { name: '🎲 | Registre-se um aventureiro com m!register, e vá para aventuras na dungeon com m!dungeon', type: 'PLAYING' },
    ];

    constructor() {
        this._activities = this.defaullt_activivies;
    }

    getAllActivities(){
        return this._activities;
    }

    getRandomActivity() {
        const randomActivity = this._activities[Math.floor(Math.random() * this._activities.length)];
        return randomActivity;
    }

    addActivity(name, type) {
        this._activities.push({ name, type });
    }

    clearActivities(){
        this._activities = [];
    }

    resetActivities(){
        this._activities = this.defaullt_activivies;
    }
}

const activities = new Activities();

module.exports = activities;