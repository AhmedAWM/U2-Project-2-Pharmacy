const medicines = [];

const addMedicine = () => {
    const medicineName = document.getElementById('medicineName').value;
    const dosage = document.getElementById('dosage').value;
    const quantity = document.getElementById('quantity').value;
    const instructions = document.getElementById('instructions').value;

    if (medicineName && dosage && quantity && instructions) 
    {
        const medicine = 
        {
            name: medicineName,
            dosage: dosage,
            quantity: quantity,
            instructions: instructions
        };
        medicines.push(medicine);

        document.getElementById('medicineName').value = '';
        document.getElementById('dosage').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('instructions').value = '';

        displayMedicines();
    } else 

    {
        alert("Please fill out all the fields for the medicine.");
    }
};

const displayMedicines = () =>
{
    const medicinesList = document.getElementById('medicinesList');
    medicinesList.innerHTML = '';

    medicines.forEach((medicine, index) => 
    {
        const li = document.createElement('li');
        li.textContent = `Medicine ${index + 1}: ${medicine.name}, Dosage: 
        ${medicine.dosage}, Quantity: ${medicine.quantity}, Instructions: ${medicine.instructions}`;
        medicinesList.appendChild(li);
    });
};

    const generatePrescription = () => 
    {
    const patientName = document.getElementById('patientName').value;
    const patientAge = document.getElementById('patientAge').value;
    const doctorName = document.getElementById('doctorName').value;
    const doctorContact = document.getElementById('doctorContact').value;

    if (!patientName || !patientAge || !doctorName || !doctorContact) {
        alert("Please fill out all the fields for patient and doctor details.");
        return;
    }

    const prescription = 
    {
        patientName: patientName,
        patientAge: patientAge,
        doctorName: doctorName,
        doctorContact: doctorContact,
        medicines: medicines
    };

    displayPrescription(prescription);
    medicines.length = 0;
    displayMedicines();
};

