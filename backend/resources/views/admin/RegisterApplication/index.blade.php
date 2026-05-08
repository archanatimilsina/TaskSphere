<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Employee Register Application</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>
    <style>
        *
        {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    body {
            background-color: #eef2f7;
            font-family: 'Baloo 2';
          
        }

        .container {
            margin-top: 60px;
        }

        .table-container {
            background: #ffffff;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

       #adapplication-head{
            text-align: center;
            margin-bottom: 40px;
            font-weight: 700;
            font-size: 2.8rem;
            color: #1f2937;
            margin-top: 30px;
            font-family: 'Baloo 2', cursive;
        }

        table {
            width: 96%;
            border-collapse: separate;
            border-spacing: 0 10px;
            margin: auto;
        }

        thead th {
            background-color: black;
            color: #fff;
            font-size: 1.1rem;
            font-weight: 600;
            padding: 12px;
            /* border-radius: 8px 8px 0 0; */
            text-align: center;
            font-family: 'Baloo','cursive';
        }

        tbody td {
            background-color: #ffffff;
            text-align: center;
            vertical-align: middle;
            padding: 12px;
            font-size: 1rem;
            font-weight: 500;
            color: #374151;
            border-top: 1px solid #dee2e6;
        }

        tbody tr:hover td {
            background-color: #f3f4f6;
        }

        .btn-custom-success {
            background-color: #10b981;
            border: none;
            color: #ffffff;
            padding: 8px 16px;
            font-weight: 500;
            border-radius: 6px;
            transition: background-color 0.3s;
        }

        .btn-custom-success:hover {
            background-color: #059669;
        }

        .btn-custom-danger {
            background-color: #ef4444;
            border: none;
            color: #ffffff;
            padding: 8px 16px;
            font-weight: 500;
            border-radius: 6px;
            transition: background-color 0.3s;
        }

        .btn-custom-danger:hover {
            background-color: #dc2626;
        }
#scode
{
    margin: 0 20px 10px 0 ;
}
      

        .scodeEnter, .acceptConfirmBtn, .rejectConfirmBtn {
            width: 100%;
            font-weight: 600;
        }
    </style>
</head>

<body>
    <div id="toast-container" aria-live="polite" aria-atomic="true" class="position-fixed top-0 end-0 p-3"
        style="z-index: 11">

    </div>
    <section class="adapplication">
        <h1 id="adapplication-head">Employee Register Application</h1>
        <div id="adapplication-table">
            <table>
                <thead>
                    <tr>
                        <th scope="col" width="2%">S.N</th>
                        <th scope="col" width="10%">First Name</th>
                        <th scope="col" width="10%">Last Name</th>
                        <th scope="col" width="10%">Phone Number</th>
                        <th scope="col" width="10%">Email</th>
                        <th scope="col" width="10%">Applied At</th>
                        <th scope="col" width="25%">Response</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($userApplication as $application)  
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $application['fname'] }}</td>
                            <td>{{ $application['lname'] }}</td>
                            <td>{{ $application['phone'] }}</td>
                            <td>{{ $application['email'] }}</td>
                            <td>{{ $application['created_at'] }}</td>
                            <td>
                                <a href="" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#acceptModal"
                                    data-application-id="{{ $application['id'] }}">Accept</a>
                                <a href="" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#rejectModal"
                                    data-application-id="{{ $application['id'] }}">Reject</a>

                            </td>
                        </tr>


                    @endforeach

                    <!-- secret code Modal -->
                    <div class="modal fade" id="scodeModal" data-bs-backdrop="static" data-bs-keyboard="false"
                        tabindex="-1" aria-labelledby="singlePostLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="singlePostLabel">Enter the secret code and role</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <input type="Password" id="scode" placeholder="secret code">
                                    <input type="text" id="role" placeholder="Role">
                                    <input type="hidden" name="applicationId" id="applicationIdInput">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success scodeEnter">okay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                   


                  
                    <div class="modal fade" id="rejectModal" data-bs-backdrop="static" data-bs-keyboard="false"
                        tabindex="-1" aria-labelledby="deleteLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="single-data" width="100%" height="100%">
                                        Are you sure you want to reject?
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary rejectConfirmBtn">Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- confirm reject -->

                    <!--confirm accept -->
                    <div class="modal fade" id="acceptModal" data-bs-backdrop="static" data-bs-keyboard="false"
                        tabindex="-1" aria-labelledby="deleteLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">

                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="single-data" width="100%" height="100%">
                                        Are you sure you want to Accept?
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary acceptConfirmBtn"
                                        data-bs-toggle="modal" data-bs-target="#scodeModal"
                                        data-bs-dismiss="modal">Accept</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </tbody>



            </table>

        </div>

    </section>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
        crossorigin="anonymous"></script>

    <script>

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

    </script>
</body>

</html>