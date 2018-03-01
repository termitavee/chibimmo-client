//Save localStorage.setItem('key', JSON.stringify(value)) 
//load JSON.parse(localStorage.getItem('key'))


export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}
export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

export const setLang = (lang) => {
    localStorage.setItem('lang', JSON.stringify(lang))
}

export const getLang = () => {
    return JSON.parse(localStorage.getItem('lang'))
}

export const setRemember = (user) => {
    localStorage.setItem('remember', user)
}

export const getRemember = () => {
    const getted = localStorage.getItem('remember')
    return getted
}

export const setCharLaunch = (character) => {
    localStorage.setItem('character', JSON.stringify(character))
}

export const getCharLaunch = () => {
    return JSON.parse(localStorage.getItem('character'))
}

export const setIP = (ip) => {
    localStorage.setItem('ip', JSON.stringify(ip))
}

export const getIP = () => {
    return JSON.parse(localStorage.getItem('ip')) || "127.0.0.1"
}

const createMonster = (name, statistics, sprite, drop) => {
    /*{
            variable
            life
            magic
            hab
            money
            fixed
            fuerza
            resistencia
            inteligencia
            mente
            destreza
            carisma
        }*/
    return { name, statistics, sprite, drop }
}
