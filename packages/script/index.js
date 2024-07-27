instance = null
class Flux {
    constructor(projectId = null) {
        this.projectId = projectId
    }

    setKey(projectId) {
        if (instance) throw new Error('Not Authorized')
        if (!projectId) throw new Error('ProjectId is invalid')
        this.projectId = projectId
    }

    get() {
        if (this.projectId === null) throw new Error('ProjectId required')

        if (this.projectId && instance) {
            return this
        }

        const newInstance = new Flux(this.projectId)
        instance = newInstance
        return newInstance
    }

    async render() {
        const templateData = await fetchTemplateData(this.projectId);
        console.log(templateData)

    }
}

const fetchTemplateData = async (projectId) => {
    try {
        const response = await fetch(`http://localhost:3170/v1/script-handler/${projectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Include this if your server requires credentials
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Parse the JSON response
        return response.json();

    } catch (error) {
        console.error('Fetch error: ', error);
    }
};

