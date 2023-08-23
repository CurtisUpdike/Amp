export default function formatSeconds(durationInSeconds, seperator = ":") {
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
