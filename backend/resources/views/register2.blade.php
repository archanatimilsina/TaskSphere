<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
  <title>Register</title>
  <style>
    #register-popup {
      width: 300px;
      height: 300px;
      margin: auto;
      flex-direction: column;
      border-radius: 5px;
      padding: 20px 50px 50px 25px;
      position: fixed;
      left: 35%;
      top: 110px;
      outline: none;
      font-family: 'Arial', sans-serif;
      border: 2px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0px 0px 30px rgba(227, 228, 237, 0.37);
      backdrop-filter: blur(10px);
    }

    .registerBtn {
      width: 100%;
      height: 40px;
      background-color: blue;
      color: white;
      font-size: 24px;
      margin-bottom: 15px;
      outline: none;
      border-radius: 10px;
    }


    .popup input {
      width: 100%;
      margin-bottom: 27px;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #30475e;
      border-radius: 0px;
      padding: 2px 0;
      font-size: 12px;

    }

    .popup input::placeholder {
      font-size: 20px;
    }


    .popup h2 {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      color: #30475e;
      border: none;
      background-color: transparent;
      outline: none;
      font-size: 18px;
      font-weight: 550;

    }

    .reset-heading {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .popup-heading {
      font-size: 30px;
    }

    .register input::placeholder {
      color: black;
      font-family: 'Arial', sans-serif;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      letter-spacing: 1px;
      opacity: 0.5;
      text-indent: 10px;
    }
  </style>
</head>

<body>

  <div class="register popup" id="register-popup">

    <h2 class="reset-heading">
      <span class="popup-heading">Register</span>
    </h2>
    <input type="text" placeholder="firstname" id="fname" name="firstname" required>
    <input type="text" placeholder="lastname" id="lname" name="lastname" required>
    <input type="email" placeholder="phone" id="phone" name="phone" required>
    <input type="email" placeholder="email" id="email" name="email" required>
    <input type="password" placeholder="Password" id="password" name="password" required>
    <button class="registerBtn" name="register" id="register-btn" data-bs-toggle="modal" data-bs-target="#codemodal">Register</button>
  </div>

  <div class="modal fade" id="codemodal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="CodemodalLabel" aria-hidden="true">
      
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="CodemodalLabel">Enter verification code</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modalBody">
                <div id="codeInput">
      <input type="text" placeholder="Enter here" name="verifcodeUser" id="code">
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
const register=document.getElementById('register-btn');
register.addEventListener('click',function(event)
{
  let verifcode;
  event.preventDefault();
const firstnameValue=document.getElementById('fname').value;
const lastnameValue=document.getElementById('lname').value;
const phoneValue=document.getElementById('phone').value;
const emailValue=document.getElementById('email').value;
const passwordValue=document.getElementById('password').value;
const roleValue=document.getElementById('role').value;

const emailVer={
  firstname:firstnameValue,
  email:emailValue
}

async function sendEmailVerification()
{
const response= await fetch('/api/emailverify',{
  method: "POST",
  headers:{
   'Content-Type': 'application/json'
  },
  body:JSON.stringify(emailVer)
}
);
const data= await response.json();
 verifcode= data.data;
 console.log(verifcode);
const CodeSubmit= document.getElementById('code-submit');
CodeSubmit.addEventListener("click",function(event){
  event.preventDefault();
  const verifcodeUser= document.getElementById('code').value;
if(verifcode==verifcodeUser)
{
    const registerData= {
  firstname:firstnameValue,
  lastname:lastnameValue,
  email:emailValue,
  phone:phoneValue,
  password:passwordValue,

};

fetch('/api/register',{
  method: "POST",
  body: JSON.stringify(registerData),
  headers:{
    'Content-Type':'application/json'
  }
}).then(response=>{
  console.log(response);
return response.json();

})
.then(data=>
{ 
 
   if(data.status == true)
 {

  window.location.href="/loginView";
}
} ).catch(err=>{
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