const express = require('express');
const cors = require('cors');
const options = {
    origin: 'http://localhost:5173'
}

const app = express();
const port = 2007;
app.use(cors(options));

app.get('/api', (req, res)=>{
    console.log('Route req')
    res.send('whatever');
})

app.listen(port, ()=>{
    console.log(`Server running on port = ${port}`)
})