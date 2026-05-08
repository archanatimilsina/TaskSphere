<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
    <title>Login</title>
    <style>
        body {
            background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
            font-family: 'Baloo 2', sans-serif;
        }
        .ProjectTopic
        {
            font-family: 'Baloo 2', sans-serif;
       font-weight: bolder;
       text-align: center;
       font-size: 5rem;
       margin-top: 70px;
       color:  #30475e;
       text-shadow:  5px -5px 2px #30475e;
        }

        .login-form {
            width: 400px;
            padding: 30px;
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(15px);
            border-radius: 12px;
            margin: auto;
            margin-top: 30px;
        }

        .login-form h2 {
            text-align: center;
            font-size: 24px;
            margin-bottom: 30px;
            color: #30475e;
            font-weight: 600;
        }

        .login-form input {
            width: 100%;
            padding: 12px;
            margin-bottom: 18px;
            border-radius: 8px;
            border: 1px solid #ddd;
            font-size: 16px;
            color: #333;
        }

        .login-form input::placeholder {
            color: #a0a0a0;
            font-weight: normal;
        }

        .loginBtn {
            width: 100%;
            padding: 12px;
            background-color: #30475e;
            color: white;
            font-size: 18px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .loginBtn:hover {
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

        .login-form input:focus {
            border: 1px solid #6ab7ff;
            box-shadow: 0 0 8px rgba(106, 183, 255, 0.4);
        }
    </style>
</head>

<body>
    <h1 class="ProjectTopic">TaskSphere</h1>
    <div class="login-form">
        <h2>Login</h2>
        <input type="text" placeholder="E-mail or Username" name="email" required id="email">
        <input type="password" placeholder="Password" name="password" required id="password">
        <input type="password" placeholder="Secret Code" name="scode" required id="scode">
        <button class="loginBtn" name="login" id="login">Login</button>
        <p id="forgot-btn">Register Account? <a href="{{ route('registerView') }}">click here</a></p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
        crossorigin="anonymous"></script>
    <script>
        const login = document.getElementById('login');
        login.addEventListener('click', function (event) {
            event.preventDefault();
            const emailValue = document.getElementById('email').value;
            const passwordValue = document.getElementById('password').value;
            const scodeValue = document.getElementById('scode').value;

            const loginData = {
                email: emailValue,
                password: passwordValue,
                scode:scodeValue
            };
            
            fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
               if(data.status === true) {
                    const token = data.token;
                    localStorage.setItem('token', token);
                    localStorage.setItem("userId",data.data.id);
                    localStorage.setItem("role",data.data.role);
                    localStorage.setItem("email",data.data.email);
                    if (data.data.role === "admin") {
                        
            window.location.href = "/react/admin";
        } else if (data.data.role === "Project Manager") {
            window.location.href = "/react/projectManager";
        } else {
            window.location.href = "/react/user";
        }
               } else {
                    alert(data.message);
               }
            }).catch(err => {
                console.log(err);
            });
        });
    </script>
</body>

</html>
