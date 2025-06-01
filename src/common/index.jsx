


const backendDomin = "https://edunotify.onrender.com"

const SummaryApi={
    signup:{
        url: `${backendDomin}/signup`,
        method: "POST"
    },
    login:{
        url: `${backendDomin}/login`,
        method: "POST"
    },
    userDetails:{
        url: `${backendDomin}/userDetails`,
        method: "GET"
    },
    logout:{
        url: `${backendDomin}/logout`,
        method: "GET"
    },
    sendEmail:{
        url: `${backendDomin}/sendEmail`,
        method: "POST"
    },
    clearData:{
        url: `${backendDomin}/clear-uploads`,
        method: "Post"
    }
}
export default SummaryApi
