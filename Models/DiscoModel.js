class DiscoModel {
    async fetchDiscos() {
        // Simulação de busca em uma API
        const response = await fetch('/api/discos');
        if (!response.ok) throw new Error('Erro ao buscar discos');
        return await response.json();
    }

    async createDisco(disco) {
        const response = await fetch('/api/discos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(disco),
        });
        if (!response.ok) throw new Error('Erro ao criar disco');
        return await response.json();
    }
}

export default new DiscoModel();
