import axios from 'axios'

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