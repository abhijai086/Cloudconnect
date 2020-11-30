//get dbconnection
const dbconn = require("./dbconfig");

async function getAllPatients() {
    try {
        const patientList = []
        await dbconn.collection("patientDetails").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const patientData = {}
                patientData['patientId'] = doc.id;
                const data = doc.data()
                patientData['firstName'] = data.firstName
                patientData['lastName'] = data.lastName
                patientData['contact'] = data.contact
                patientData['hospitalName'] = data.hospitalName
                patientData['result'] = data.result
                patientList.push(patientData)
            });
        });
        if (patientList.length > 0) {
            return patientList
        } else {
            return { message: "No records found", status: 204 }
        }
    } catch (err) {
        return { message: err, status: 500 }
    }
}

async function getPatient(patientId) {
    try {
        const patientDoc = dbconn.collection('patientDetails').doc(patientId);
        const doc = await patientDoc.get();

        if (!doc.exists) {
            return { message: "Patient not found", status: 204 }
        } else {
            return doc.data()
        }
    } catch (err) {
        return { message: err, status: 500 }
    }
}

async function deletePatient(patientId) {
    try {
        const doc = await dbconn.collection("patientDetails").doc(patientId).get()
        if (doc.exists) {
            await doc.ref.delete()
            return { message: "Patient deleted  successfully" }
        } else {
            return { message: "Patient not found", status: 204 }
        }
    } catch (err) {
        return { message: err, status: 500 }
    }
}

async function addPatient(patientDetails) {
    try {
        const seq = await getSequence()
        await dbconn.collection("patientDetails").doc(seq.toString()).set(patientDetails)
        return { message: "New patient added successfully" }
    } catch (err) {
        return { message: err, status: 500 }
    }
}

async function getSequence() {
    try {
        const docIdList = []
        await dbconn.collection('patientDetails').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                docIdList.push(parseInt(doc.id))
            });
        });
        const arrLength = docIdList.length
        if(arrLength > 0){
            const sortArray = await docIdList.sort()
            const maxNumber = sortArray[arrLength - 1]
            return maxNumber + 1
        }else{
            return 1
        } 
    } catch (err) {
        return { message: err, status: 500 }
    }
}

async function updatePatient(patientId, patientDetails) {
    try {
        await dbconn.collection("patientDetails").doc(patientId)
            .update(patientDetails)
        return { message: "Patient details updated successfully" }
    } catch (err) {
        return { message: err, status: 500 }
    }
}

module.exports = { addPatient, getAllPatients, getPatient, deletePatient, updatePatient }
