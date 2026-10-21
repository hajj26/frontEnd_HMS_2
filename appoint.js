const tableBody = document.getElementById("AppointTable");
const noDataMessage = document.getElementById("noAppointment");
const viewAll = document.getElementById("view_table");
const TotalAppointment = document.getElementById("TotalAppointment");
const ConfirmedElement = document.getElementById("ConfirmedElement");
const pendingElement = document.getElementById("pendingElement");

fetch("http://127.0.0.1:8000/api/admin_after_login_api/")
.then(response => response.json())
.then(data => {


    tableBody.innerHTML = "";

    if (data.appoint.length === 0) {

        noDataMessage.style.display = "block";
        viewAll.style.display = "none";
        document.querySelector("table").style.display = "none";

    } else {

        noDataMessage.style.display = "none";
        viewAll.style.display = "block";
        document.querySelector("table").style.display = "table";

        const confirmedCount = data.appoint.filter(
            function(item){
                return item.status === "Confirmed";
            }
        ).length;

        ConfirmedElement.textContent = confirmedCount;

        const pendingCount = data.appoint.filter(
            function(item){
                return item.status === "Pending";
            }
        ).length;
        pendingElement.textContent = pendingCount;


        const totalAppoint = data.appoint.length;
        TotalAppointment.textContent = totalAppoint;


        data.appoint.forEach((item, index) => {

            

            tableBody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.patient_full_name}</td>
                    <td>${item.doctor_full_name}</td>
                    <td>${item.appointment_date}</td>
                    <td>${item.symptoms}</td>
                    <td>
                        <button class="btn1">Confirm</button>
                        |
                        <button class="btn2">Cancel</button>
                    </td>
                </tr>
            `;
        });
    }
})
.catch(error => {
    console.error("Error:", error);

    noDataMessage.textContent = "Failed to load appointments";
    noDataMessage.style.display = "block";
});