import axios from 'axios'

function required(param) {
    throw new Error(`${param} is a required parameter!`);
}

class TrackTask {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
    async login() {
        const username = this.username
        const password = this.password
        const response = await axios({
            data: {
                username: username,
                password: password
            },
            url: 'https://tracktask.eu.org/api/auth',
            method: 'POST'
        })
        const json = await response.data
        const cookies = response.headers['set-cookie'][0]
        this.session = cookies.split(';')[0]
        return json
    }
    async logout() {
        const response = await axios({
            headers: {
                'Cookie': this.session
            },
            url: 'https://tracktask.eu.org/api/auth',
            method: 'DELETE'
        })
        const json = await response.data
        this.session = null
        return json
    }
    async getUser() {
        const response = await axios({
            headers: {
                'Cookie': this.session
            },
            url: `https://tracktask.eu.org/api/user`,
            method: 'GET'
        })
        const json = await response.data
        return json
    }
    async getTasks(id) {
        const response = await axios({
            headers: {
                'Cookie': this.session
            },
            url: `https://tracktask.eu.org/api/tasks${id ? '/' + id : ''}`,
            method: 'GET'
        })
        const json = await response.data
        return json
    }
    async editTask(id=required("id"), name, description, dueDate, completed, priority) {
        const response = await axios({
            headers: {
                'Cookie': this.session
            },
            data: {
                name: name || undefined,
                description: description || undefined,
                dueDate: dueDate || undefined,
                completed: completed || undefined,
                priority: priority || undefined
            },
            url: `https://tracktask.eu.org/api/tasks/${id || undefined}`,
            method: 'PATCH'
        })
        const json = await response.data
        return json
    }
    async newTask(name=required("name"), description, dueDate, collections, completed, priority) {
        const response = await axios({
            headers: {
                'Cookie': this.session
            },
            data: {
                name: name || undefined,
                description: description || undefined,
                dueDate: dueDate || undefined,
                addCollections: collections || undefined,
                completed: completed || undefined,
                priority: priority || undefined
            },
            url: `https://tracktask.eu.org/api/tasks`,
            method: 'POST'
        })
        const json = await response.data
        return json
    }
    async deleteTask(id=required("id")) {
        const response = await axios({
            headers: {
                'Cookie': this.session
            },
            url: `https://tracktask.eu.org/api/tasks/${id || undefined}`,
            method: 'DELETE'
        })
        const json = await response.data
        return json
    }
    async getCollections(id) {
        const response = await axios({
            headers: {
                'Cookie': this.session
            },
            url: `https://tracktask.eu.org/api/collections${id ? '/' + id : ''}`,
            method: 'GET'
        })
        const json = await response.data
        return json
    }
    async editCollection(id=required("id"), name, description, shared) {
        const response = await axios({
            headers: {
                'Cookie': this.session
            },
            data: {
                name: name || undefined,
                description: description || undefined,
                shared: shared || undefined
            },
            url: `https://tracktask.eu.org/api/collections/${id || undefined}`,
            method: 'PATCH'
        })
        const json = await response.data
        return json
    }
    async newCollection(name=required("name"), description) {
        const response = await axios({
            headers: {
                'Cookie': this.session
            },
            data: {
                name: name || undefined,
                description: description || undefined
            },
            url: `https://tracktask.eu.org/api/collections`,
            method: 'POST'
        })
        const json = await response.data
        return json
    }
    async deleteCollection(id=required("id")) {
        const response = await axios({
            headers: {
                'Cookie': this.session
            },
            url: `https://tracktask.eu.org/api/collections/${id || undefined}`,
            method: 'DELETE'
        })
        const json = await response.data
        return json
    }
    async ping() {
        const response = await axios({
            url: 'https://tracktask.eu.org/api',
            method: 'GET'
        })
        const json = await response.data
        if (json.isOnline.backend) {
          return json
        } else {
          return "Something went wrong, the TrackTask API might be down."
        }
    }
}

export { TrackTask }