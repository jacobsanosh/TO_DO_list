exports.getToday = () => {
    let date = new Date();
    let days = ['sunday', 'monday', 'thuesday', 'wednesday', 'thursday', 'saturday']
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return date.toLocaleDateString('en-US', options);
}