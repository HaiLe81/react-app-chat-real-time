const env = {
    SERVER_URL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3300',
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3300/api/v1',
    COOKIE_KEY: process.env.REACT_APP_COOKIE_KEY || 'acr-local',
    SOCKET: process.env.REACT_APP_SOCKET || "http://localhost:3300"

}

export default {env}