import DiscoModel from './model/DiscoModel';

class DiscoController {
    async getDiscos() {
        try {
            const discos = await DiscoModel.fetchDiscos();
            return discos;
        } catch (error) {
            console.error('Erro ao buscar discos:', error);
            throw error;
        }
    }

    async addDisco(disco) {
        try {
            const novoDisco = await DiscoModel.createDisco(disco);
            return novoDisco;
        } catch (error) {
            console.error('Erro ao adicionar disco:', error);
            throw error;
        }
    }
}

export default new DiscoController();
