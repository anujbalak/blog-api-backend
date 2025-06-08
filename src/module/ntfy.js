import 'dotenv/config'

export const messageOnNtfy = async (message) => {
    fetch(process.env.NTFY, {
        method: 'POST',
        body: message
    }).then(res => res.json()).then(res => console.log(res))
}