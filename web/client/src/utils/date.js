
const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
/**
* Converts a date object to legible date
* @param {date} pressDate 
*/
export const getDateTitle = pressDate => {
    const date = new Date(pressDate);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

/**
* Converts date to a shorthanded mm/dd/yy format
* @param {date} pressDate 
*/
export const getShortDate = pressDate => {
    const date = new Date(pressDate);
    return `${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getFullYear().toString().substring(2)}`
}

/**
* Converts a date object time to legible 12 hour time
* @param {date} pressDate 
*/
export const getTime = pressDate => {
    const date = new Date(pressDate);
    const suffix = date.getHours() > 12 ? "PM" : "AM"
    const hours = ((date.getHours() + 11) % 12 + 1);
    return `${hours}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${suffix}`
    }

/**
* Converts a date object time to 12 hour time without minutes
* @param {date} pressDate 
*/
export const getHourtime = pressDate => {
    const date = new Date(pressDate);
    const suffix = date.getHours() > 12 ? "pm" : "am"
    const hours = ((date.getHours() + 11) % 12 + 1);
    return `${hours}${suffix}`
}

/**
* Converts a date object time to legible 12 hour time with seconds
* @param {date} pressDate 
*/
export const getPerscisetime = pressDate => {
    const date = new Date(pressDate);
    const suffix = date.getHours() > 12 ? "PM" : "AM"
    const hours = ((date.getHours() + 11) % 12 + 1);
    return `${hours}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}.${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()} ${suffix}`
    }

/**
* Calculates the duration in DD:HH:MM:SS time
* @param {date} startTime 
*/
export const calculateDuration = (startTime) => {
    const diff = new Date(Date.now()) - new Date(startTime);
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days < 10 ? `0${days}` : days}:${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

/**
* Converts milliseconds to DD:HH:MM:SS
* @param {integer} time in MS 
*/
export const convertTime = time => {
    const days = Math.floor((time / (1000 * 60 * 60 * 24)))
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliSeconds = Math.floor((time % 1000));

    return `${days < 10 ? `0${days}` : days}:${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}.${milliSeconds < 0 ? `0${milliSeconds}` : milliSeconds}`

}

/**
* Capitalizes the first letter of a string
* Removes underscores and replaces with spaces
* @param {string} name 
*/
export const prettyName = name => {
    const spaced = name.replace(/_/g, " ");
    return spaced.charAt(0).toUpperCase() + spaced.substring(1).toLowerCase().trim();
};

/**
* Converts ISO time to proper timezone time.
*/
export const getLocalISO = date => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
}