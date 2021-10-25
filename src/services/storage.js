// session and local storage management 

export const setCache = (state) => {
    sessionStorage.setItem("AFKDC", JSON.stringify(state))
}

export const getCache = () => {
    return JSON.parse(sessionStorage.getItem("AFKDC"));
}

export const clearCache = () => {
    sessionStorage.removeItem("AFKDC");
}