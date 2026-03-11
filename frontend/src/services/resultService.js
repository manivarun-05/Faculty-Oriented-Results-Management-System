import api from './api';

const resultService = {
    // Single Query 
    getResultByDetails: async (rollNo, subjectName, branch) => {
        const response = await api.get('/results/query', {
            params: { rollNo, subjectName, branch }
        });
        return response.data;
    },

    // Bulk Upload
    uploadCSV: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/results/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    // Get All ledger 
    getLedger: async () => {
        const response = await api.get('/results');
        return response.data;
    }
};

export default resultService;
