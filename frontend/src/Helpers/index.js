import axios from 'axios';

export const onChangeFormHandler = (target, self, callback) => {
    callback({ ...self, [target.id]: target.value});
    console.log(self); 
}

export const createAccountRequest = async (obj) => {
    return axios.post('http://localhost:4000/api/v1/users/register', obj)
    .then((response) => response.data);
};

export const loginUser = async (obj) => {
    return axios.post('http://localhost:4000/api/v1/users/login', obj)
    .then((response) => response.data);
};

export const getUser = async () => {
    const token = sessionStorage.getItem('userToken');
    return axios.get('http://localhost:4000/api/v1/users/profile', { headers: { token: token }} )
    .then((response) => response.data);
};

export const getTasks = async () => {
    const token = sessionStorage.getItem('userToken');
    return axios.get('http://localhost:4000/api/v1/tasks', { headers: { token: token }})
    .then((response) => response.data);
};

export const addTask = async (task) => {
    const token = sessionStorage.getItem('userToken');
    return axios.post('http://localhost:4000/api/v1/tasks', task, { headers: { 'token': token } })
    .then((response) => response.data);
};

export const updateTask = async (id, body) => {
    const token = sessionStorage.getItem('userToken');
    return axios.patch(`http://localhost:4000/api/v1/tasks/${id}`, body, { headers: { 'token': token } })
    .then((response) => response.data);
};

export const deleteTask = async (id) => {
    const token = sessionStorage.getItem('userToken');
    return axios.delete(`http://localhost:4000/api/v1/tasks/${id}`, { headers: { 'token': token } })
    .then((response) => response.data);
};

export const updateUser = async (payload) => {
    const token = sessionStorage.getItem('userToken');
    return axios.patch(`http://localhost:4000/api/v1/users/profile/`, payload, { headers: { 'token': token }})
    .then((response) => response.data);
};

export const forgotPasswordRequest = async (email) => {
    return axios.post(`http://localhost:4000/api/v1/users/forgotpassword`, email)
    .then((response) => response.data);
};


export const loginHandler = async (obj, navigate, errorCallback, auth) => {
    try {
        const request = await loginUser(obj);
        sessionStorage.setItem('userToken', request.userToken);
        auth.setLogedIn({ logedIn: true, user: request.user });
        return navigate('/task');
    } catch (err) {
        errorCallback({ message: err.response.data.message });
    }
};

export const profileHandler = async () => {
    try {
        const request = await getUser();
        return request;
    } catch (err) {
        console.log(err.response.data.message);
    }
};

export const registerHandler = async (obj, navigate, statusCallback) => {
    try {
        const request = await createAccountRequest(obj);
        statusCallback({ message: await request.status });
        setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
        statusCallback({ message: err.response.data.message });
    }
};

export const updateTaskHandler = async (id, obj, callback, counter) => {
    try {
        await updateTask(id, obj);
        callback(++counter);
    } catch (err) {
        console.log(err.response.data.message); 
    }
};

export const deleteTaskHandler = async (id, callback, counter) => {
    try {
        await deleteTask(id);
        callback(++counter);
    } catch (err) {
        console.log(err.response.data.message); 
    }
};

export const updateUserHandler = async (payload, callback) => {
    try {
        const request = await updateUser(payload);
        console.log(request);
        return callback(request.status);
    } catch (err) {
        console.log(err)
        callback(err.response.data.message);
    }
};

export const forgotPasswordHandler = async (email, [setStatus, setError, setLoading]) => {
    try {
        setLoading(true);
        const request = await forgotPasswordRequest(email);
        setLoading(false);
        setStatus(request.status);
    } catch (err) {
        setError(err.response.data.message);
        setLoading(false);
    }
};
