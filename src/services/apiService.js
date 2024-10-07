import axios from 'axios';


const getTexts = async () => {
    const response = await axios.get(`${apiUrl}/texts`);
    return response.data;
};

const submitAnswers = async (answers) => {
    const response = await axios.post(`${apiUrl}/submit`, { answers });
    return response.data;
};

export default { getTexts, submitAnswers };
