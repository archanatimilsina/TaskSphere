
const acceptModal = document.getElementById('acceptModal');
acceptModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const applicationId = button.dataset.applicationId;
    const acceptBtn = document.querySelector(".acceptConfirmBtn");
    acceptBtn.setAttribute("data-application-id", applicationId);
});
const rejectModal = document.getElementById('rejectModal');
rejectModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const applicationId = button.dataset.applicationId;
    const rejectBtn = document.querySelector(".rejectConfirmBtn");
    rejectBtn.setAttribute("data-application-id", applicationId);
});
const scodeModal = document.getElementById('scodeModal');
scodeModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const applicationId = button.dataset.applicationId;
    scodeModal.querySelector('#applicationIdInput').value = applicationId;
});

const table = document.getElementById("adapplication-table");
table.addEventListener("click", (e) => {
    if (e.target.classList.contains("scodeEnter")) {
        const secretCode = document.getElementById("scode").value;
        const role = document.getElementById("role").value;
        const applicationID = document.getElementById("applicationIdInput").value;

        const formData = new FormData();
        formData.append("scode", secretCode);
        formData.append("role", role);
        formData.append("applicationId", applicationID);
        console.log(formData);
        fetch('/api/passScode', {
            method: "POST",
            headers:
            {

            },
            body: formData
        }).then(response => { return response.json() }

        ).then(data => {
            console.log(data);
            if (data.status == true) {
                const dismissModal = document.getElementById("dismissModal").click();
                const msg = "user Registered successfully";
                showToast(msg);

                fetch('/api/removeData', {
                    method: "POST",
                    headers:
                    {

                    },
                    body: formData
                }).then(response => {
                    // console.log(response)
                    return response.json()
                })
                    .then(data => {
                        console.log(data);
                        if (data.status == true) {
                            location.reload();
                        }
                    }
                    )

            }
        }
        );
    }

if(e.target.classList.contains("rejectConfirmBtn"))
{
const applicationID= e.target.dataset.applicationId;
const data =
{
'applicationId':applicationID
}
fetch("/api/rejection",
{
method:"POST",
headers:
{
    'Content-Type':'application/json'
},
body:JSON.stringify(data)
}
).then(response=>
{
console.log(response)
return response.json()
}
).then(data=>
{
if(data.status==true)
{
msg="Application is rejected successfully!!"
showToast(msg);
location.reload();
}
}
)
}
});


//reject operation


//reject operation



function showToast(msg) {
    var ToastMsg = msg;
    const toastHtml = `
<div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
<div class="d-flex">
<div class="toast-body">
${ToastMsg}
</div>
<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
</div>
</div>`;
    const toastElement = document.createElement('div');
    toastElement.innerHTML = toastHtml;
    const toastContainer = document.getElementById('toast-container');
    toastContainer.appendChild(toastElement);
    const toast = new bootstrap.Toast(toastElement.querySelector('.toast'), {
        autohide: true,
        delay: 5000
    });

    toast.show();
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
        if (toastContainer.children.length === 0) {
            toastContainer.style.display = 'none';
        }
    });
    toastContainer.style.display = 'block';
}
