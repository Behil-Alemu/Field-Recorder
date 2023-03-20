function convertTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}
export {convertTimestamp}