const getPublishedTime = (createdAt: Date) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInSeconds = Math.floor(
        (now.getTime() - created.getTime()) / 1000
    );
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);
    if (diffInSeconds < 60) {
        return "just now";
    }
    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }
    if (hours < 24) {
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }
    if (days < 30) {
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months !== 1 ? "s" : ""} ago`;
    }
    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
}

export default getPublishedTime;