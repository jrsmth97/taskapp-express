class DateUtil {
    static getDate() {
        return (new Date(Date.now())).toLocaleString('id-ID').split(' ')[0].replace(/\//g, '-');
    }

    static getTime() {
        return (new Date(Date.now())).toLocaleString('id-ID').split(' ')[1].replace(/[.]/g, ':');
    }
}

module.exports = DateUtil;