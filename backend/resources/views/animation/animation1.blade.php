<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animation1</title>
    <style>
        .hello{
width: 150px;
height: 300px;
border: 1px solid black;
background-color: red;
margin:300px auto;
}

@keyframes ullu{
    100% {
        transform:translateY(200px);
        
    }
}
h1{
    text-align: center;
    margin-top: 35%;
    font-size: 40px
}
i{
    width: 100px;
    height: 100px;
 animation: ullu 1s  40 alternate ;
 margin: auto;

            
        }
    </style>
</head>
<body>

    <div class="hello">
        
<h1 id="h1">

</h1>
    </div>
    <script>

// var x = 10;
// // console.log(x);
// console.alert(x);
const h1= document.getElementById("h1");
var x="MY name is Anuz" ;
 h1.textContent=x;
//         let counter=1;
//      setInterval(() => {
// //   const time = new Date(); // Get the current time
//   const h1= document.getElementById("h1");
//  h1.textContent=counter++;

// }, 1000); 

    </script>
</body>
</html>