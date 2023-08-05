export function debounce(callback, delay = 500) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args), delay);
    };
}

export function formatSeconds(durationInSeconds, seperator = ":") {
    const secondsInOneHour = 3600;
    const secondsInOneMinute = 60;

    let timeRemaining = durationInSeconds;
    const times = [];

    const pad = (d) => (d > 9 ? d : "0" + d.toString());

    const hours = Math.floor(timeRemaining / secondsInOneHour);
    if (hours > 0) times.push(hours);
    timeRemaining = timeRemaining % secondsInOneHour;

    const minutes = Math.floor(timeRemaining / secondsInOneMinute);
    if (hours > 0) {
        times.push(pad(minutes));
    } else {
        times.push(minutes);
    }
    timeRemaining = timeRemaining % secondsInOneMinute;

    times.push(pad(timeRemaining));

    return times.join(seperator);
}

export function formatMilliseconds(durationInMillis, seperator = ":") {
    const millisInOneHour = 3600000;
    const millisInOneMinute = 60000;
    const millisInOneSecond = 1000;

    let timeRemaining = durationInMillis;
    const times = [];

    const pad = (d) => (d > 9 ? d : "0" + d.toString());

    const hours = Math.floor(timeRemaining / millisInOneHour);
    if (hours > 0) times.push(hours);
    timeRemaining = timeRemaining % millisInOneHour;

    const minutes = Math.floor(timeRemaining / millisInOneMinute);
    if (hours > 0) {
        times.push(pad(minutes));
    } else {
        times.push(minutes);
    }
    timeRemaining = timeRemaining % millisInOneMinute;

    const seconds = Math.floor(timeRemaining / millisInOneSecond);
    times.push(pad(seconds));

    return times.join(seperator);
}

export function formatArtworkURL(url, sideLength) {
    return window.MusicKit.formatArtworkURL(url, sideLength, sideLength);
}
