const express = require('express'),
    app = express()
const dbservice = require('./src/firestoreservice')
const port = 9000

app.use(express.json())

//Service for displaying all  patients
app.get('/getAllPatients', async function (req, res) {
    const response = await dbservice.getAllPatients()
    res.json(response)
});

//Service for displaying a patient details
app.get('/getPatient/:patientId', async function (req, res) {
    const response = await dbservice.getPatient(req.params.patientId)
    res.json(response)
});

//Service for deleting a patient
app.delete('/deletePatient/:patientId', async function (req, res) {
    const response = await dbservice.deletePatient(req.params.patientId)
    res.json(response)
});

//Service for adding new patients
app.post('/addPatient', async function (req, res) {
    const response = await dbservice.addPatient(req.body)
    res.json(response)
});

//Service for modify a patient details
app.post('/updatePatient:patientId', async function (req, res) {
    const response = await dbservice.updatePatient(req.params.patientId, req.body) 
    res.json(response)
});

app.all("*", catchAllError)
function catchAllError(){
    throw new Error("Bad Request")
}

app.use(handleErrorMessages)
function handleErrorMessages(e, req, res, next){
    if(e.message === "Bad Request"){
        return res.status(400).json({error: "Bad request. Incorrect Url"})
    }
}

app.listen(port, () => {
    console.log(`server started at port ${port}`)
})