import axios from 'axios'
const authService = {
    registerUser: async (user) => {
        const response = await axios.post('/register', user);
        return response.data
    },
    loginUser: async (user) => {
        try {
            const response = await axios.post('/login', user);
            console.log(response.data);
            return response.data
        } catch (error) {

            console.error(error);
            return error
        }
    }

};

export default authService;
