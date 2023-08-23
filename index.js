const express = require('express')
const bcrypt = require('bcrypt')


const app = express()
app.use(express.json())

const users = []

app.post('/signup',async (req, res) =>{
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 13)
    users.push({
        username,
        password: hash
    })

    console.log(users)

    res.send('ok')
})


app.post('/login', async(req, res) =>{
    const {username, password} = req.body;
    const user = users.find(u => u.username === username)
    if(!user) {
        res.send('no user')
        return
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        res.json('wrong password')
        return
    }
    res.send('ok')
})


app.listen(8080, () => console.log("listening on port 8080"))