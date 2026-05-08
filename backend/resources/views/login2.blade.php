<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <title>Title</title>
    <style>
        .login-form {
            border: 2px solid rgba(255, 255, 255, 0.18);

            box-shadow: 0px 0px 30px rgba(227, 228, 237, 0.37);

            backdrop-filter: blur(10px);
            height: 500px;
            width: 500px;
            margin: auto;
            border-radius: 10px;
            margin-top: 80px;

        }

        .login-form form input {
            margin: 10px auto 10px;
            padding: 20px;
        }

        .login-form form input::placeholder {
            color: black;
            font-family: 'Arial', sans-serif;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            letter-spacing: 1px;
            opacity: 0.5;
            text-indent: 10px;
        }


        .loginBtn {
            width: 300px;
            outline: none;
            border: 1px solid black;
            background-color: #7AB2D3;
            margin: 50px auto 0px;
            height: 40px;

        }

        #forgot-btn {
            margin-top: 20px;
        }

        .login-form {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;


        }

        .login-form input {

            height: 30px;
            border-radius: 10px;
            background-color: transparent;
            outline: none;
            border: 1px solid black;
            margin-top: 20px;

        }
    </style>
</head>

<body>
    <div class="login-form">

        <h2 class="reset-heading">
            <span class="popup-heading">Login</span>
        </h2>
        <input type="text" placeholder="E-mail or Username" name="email" required id="email">
        <input type="password" placeholder="Password" name="password" required id="password">
        <button class="loginBtn" name="login" id="login">Login</button>
        <p id="forgot-btn">Forget password?
            <a href="">click here</a>
        </p>
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
            const loginData = {
                email: emailValue,
                password: passwordValue
            };
            
            fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log(response);
                return response.json();
            }).then(data => {
               if(data.status==true)
               {
                      const token = data.token;
                    //   const role= data.role;
                   
                localStorage.setItem('token', token);
                // localStorage.setItem('role', role);
                if (localStorage.getItem('token')) {
 localStorage.setItem('isLoggedIn', 'true');
window.location.href="/";    
    } else {
        console.log("User is not logged in.");
    }
               }
               else{
                alert(data.message);
               }
          
            }).catch(err => {
                console.log(err);
            }
            );
        });

    </script>
</body>

</html>