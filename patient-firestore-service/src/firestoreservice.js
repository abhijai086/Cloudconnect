//get dbconnection
const dbconn = require("./dbconfig");

async function getAllPatients() {
    try {
        const patientList = []
        await dbconn.collection("patientDetails").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const patientData = {}
                patientData['patientId'] = doc.id;
                patientData['details'] = doc.data();
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
        const documentidList = []
        await dbconn.collection('patientDetails').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                documentidList.push(doc.id)
            });
        });
        if (documentidList.length > 0) {
            const seq = await Math.max(documentidList) + 1
            return seq
        } else {
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
