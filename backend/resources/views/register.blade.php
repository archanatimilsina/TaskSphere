<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
  <title>Register</title>
  <style>
    body {
      background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
      font-family: 'Arial', sans-serif;
    }

    #register-popup {
      width: 100%;
      max-width: 400px;
      margin: auto;
      padding: 30px 40px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      backdrop-filter: blur(8px);
    }

    h2 {
      text-align: center;
      color: #30475e;
      margin-bottom: 30px;
      font-size: 28px;
      font-weight: bold;
    }

    .popup input {
      width: 100%;
      padding: 12px;
      margin-bottom: 20px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }

    .popup input:focus {
      border-color: #30475e;
      outline: none;
    }

    .popup input::placeholder {
      color: #888;
      font-size: 14px;
    }

    .registerBtn {
      width: 100%;
      padding: 14px;
      background-color: #30475e;
      color: white;
      font-size: 18px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .registerBtn:hover {
      background-color: #1e293b;
    }

    .modal-header {
      background-color: #30475e;
      color: white;
      border-bottom: none;
    }

    .modal-body {
      padding: 20px;
      background-color: #f9f9f9;
    }

    #codeInput input {
      width: 100%;
      padding: 12px;
      margin-bottom: 20px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }

    #codeInput input:focus {
      border-color: #30475e;
      outline: none;
    }

    #code-submit {
      width: 100%;
      padding: 14px;
      background-color: #30475e;
      color: white;
      font-size: 18px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    #code-submit:hover {
      background-color: #1e293b;
    }
    #forgot-btn {
            text-align: center;
            margin-top: 20px;
        }

        #forgot-btn a {
            color: #1e293b;
            text-decoration: none;
            font-weight: bold;
        }

        #forgot-btn a:hover {
            text-decoration: underline;
        }


  </style>
</head>

<body>

  <div class="register popup" id="register-popup">
    <h2>Register</h2>
    <input type="text" placeholder="First Name" id="fname" name="firstname" required>
    <input type="text" placeholder="Last Name" id="lname" name="lastname" required>
    <input type="text" placeholder="Phone" id="phone" name="phone" required>
    <input type="email" placeholder="Email" id="email" name="email" required>
    <input type="password" placeholder="Password" id="password" name="password" required>
    <button class="registerBtn" name="register" id="register-btn" data-bs-toggle="modal" data-bs-target="#codemodal">Register</button>
    <p id="forgot-btn">Already have an Account? <a href="{{ route('loginView') }}">click here</a></p>
  </div>

  <!-- Modal for verification -->
  <div class="modal fade" id="codemodal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="CodemodalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="CodemodalLabel">Enter Verification Code</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="modalBody">
          <div id="codeInput">
            <input type="text" placeholder="Enter verification code" name="verifcodeUser" id="code">
            <input type="hidden" value="user" name="role" id="role">
            <button class="btn btn-primary" id="code-submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
    crossorigin="anonymous"></script>

  <script>
    const register = document.getElementById('register-btn');
    register.addEventListener('click', function(event) {
      let verifcode;
      event.preventDefault();
      const firstnameValue = document.getElementById('fname').value;
      const lastnameValue = document.getElementById('lname').value;
      const phoneValue = document.getElementById('phone').value;
      const emailValue = document.getElementById('email').value;
      const passwordValue = document.getElementById('password').value;
      const roleValue = document.getElementById('role').value;

      const emailVer = {
        firstname: firstnameValue,
        email: emailValue
      }

      async function sendEmailVerification() {
        const response = await fetch('/api/emailverify', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailVer)
        });
        const data = await response.json();
        verifcode = data.data;
        console.log(verifcode);
        const CodeSubmit = document.getElementById('code-submit');
        CodeSubmit.addEventListener("click", function(event) {
          event.preventDefault();
          const verifcodeUser = document.getElementById('code').value;
          if (verifcode == verifcodeUser) {
            const registerData = {
              firstname: firstnameValue,
              lastname: lastnameValue,
              email: emailValue,
              phone: phoneValue,
              password: passwordValue
            };

            fetch('/api/register', {
              method: "POST",
              body: JSON.stringify(registerData),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(response => {
              console.log(response);
              return response.json();
            }).then(data => {
              if (data.status == true) {
                window.location.href = "/loginView";
              }
            }).catch(err => {
              console.log(err);
            })
          }
        });
      }

      sendEmailVerification();
    });
  </script>

</body>
</html>
