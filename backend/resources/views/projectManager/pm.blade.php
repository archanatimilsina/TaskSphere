
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/c5a4938a4c.js" crossorigin="anonymous"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        nav {
            width: 100%;
            height: 60px;

            background: lavender;

        }

        /* .left-nav{
        width: 18%;
        height: 100%;
        position: relative;
        display: inline-block;
        padding-left: 30px;
    } */
        .right-nav {
            width: 100%;
            height: 100%;
            display: inline-block;
            position: relative;
            justify-content: center;
            align-items: center;
            display: flex;
        }

        /* .left-nav img{
        position: absolute;
        width: 30%;
        height: 60px;
       
    } */
        .right-nav ul {
            list-style-type: none;
            position: absolute;

        }

        .right-nav ul li {
            display: inline-block;
            margin: 20px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 17px;


        }

        .right-nav ul li a {
            text-decoration: none;
            color: black;
            font-size: 1.4rem;
            font-family: cursive;
        }

        .right-nav ul li a button {
            width: 100px;
            height: 30px;
            margin-top: -20px;
        }

        .login-button {
            width: 150px;
            height: 30px;
        }

        .register-button {
            width: 150px;
            height: 40px;

        }

        #scode-check {
            width: 340px;
            height: 200px;
            border: 1px solid black;
            margin: auto;
            padding: 20px;
            position: absolute;
            top: 150px;
            right: 45%;
            z-index: 10;
            background-color: white;
            display: none;
            flex-direction: column;
        }

        #scode-check form {

            padding: 10px;

        }

        #scode-check input {
            height: 40px;
        }

        #scode-check #submit-btn {
            width: 150px;
            height: 40px;
            margin-top: 10px;
            background-color: blue;
            color: white;
        }

        #scode-check h3 {

            margin: 30px 0 10px 0;

        }

        body {
            display: flex;
            flex-direction: column
        }

        .welcome {
            width: 94%;
            height: 700px;
            margin: auto;

            margin-top: 15px;

        }

        .welcome img {
            width: 100%;
            height: 100%;
        }

        #adminlogin-popup {
            width: 300px;
            height: 300px;
            border: 1px solid rgb(58, 46, 163);
            display: none;
            flex-direction: column;
            z-index: 1;
            background-color: #f0f0f0;
            border-radius: 5px;
            padding: 20px 25px 25px 25px;
            position: fixed;
            left: 400px;
            top: 90px;
        }



        .popup {
            background-color: #f0f0f0;
            border-radius: 5px;
            padding: 20px 25px 30px 25px;
            width: 100%;
            height: 100%;
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

        .login-btn {
            margin-bottom: 15px;
        }

        .popup input {
            width: 100%;
            margin-bottom: 8px;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #30475e;
            border-radius: 0px;
            padding: 2px 0;
            font-size: 12px;

        }

        #user-icon {
            padding: 10px;
            position: relative;
            display: inline-block;

        }

        .paste-button {
            position: relative;
            margin: auto;
            display: inline-block;

        }

        .dropdown-content {
            width: 150px;
            height: 150px;
            display: none;
            position: absolute;
            left: 30px;
            z-index: 1;
        }

        .paste-button:hover .dropdown-content {
            display: block;
        }

        .dropdown-content a {
            display: block;
            text-decoration: none;
            background-color: lavender;
            border: 2px solid black;
            color: black;
            height: 25%;
            border-radius: 5px;
        }

        .dropdown-content a:hover {
            background-color: white;
        }

        .reset-heading {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .welcome {
            width: 100%;
            height: 700px;
            margin: auto; 
            background: url("images/luffy.jpg") no-repeat;
            background-position: top;
            background-size: cover;

        }

        .welcome img {
            width: 100%;
            height: 100%;
        }

        .paste-button1 {
            position: relative;

            margin: auto;
            left: 30px;
            display: inline-block;

        }

        .paste-button1 button {
            width: 40px;
            position: absolute;
            height: 35px;
        }

        .paste-button1 button i {
            font-size: 30px;
            margin-top: 10px;

        }

        .paste-button2 {
            position: relative;
            width: 200px;
            margin: auto;

            display: inline-block;
            height: 40px;
        }

        .dropdown-content1 {
            display: none;
            position: absolute;
            left: 20px;
            z-index: 1;
            top: 27px;
        }

        .dropdown-content2 {
            display: none;
            position: absolute;
            left: 130px;
            top: 15px;
            z-index: 5;
            height: 40px;
        }

        .paste-button1:hover .dropdown-content1 {
            display: block;
        }

        .paste-button2:hover .dropdown-content2 {
            display: block;
        }

        .dropdown-content1 a {
            display: block;
            text-decoration: none;
            color: black;
            background-color: white;
            height: 100%;
            border-radius: 5px;
            border: 1px solid black;
            font-size: 20px;
            text-align: center;
            font-family: cursive;
        }

        .dropdown-content2 a {
            display: block;
            text-decoration: none;
            color: black;
            height: 55px;
            background-color: lavender;
            width: 200px;
            font-size: 20px;
            text-align: center;
            font-family: cursive;

        }

        .dropdown-content1 a:hover {
            border: 1px solid black;
            background-color: lavender;

        }

        .dropdown-content2 a:hover {
            border: 1px solid black;
            background-color: white;
        }
        /*  Footer  */ 

.footer{
    background-color: #222;
    padding: 5rem 1rem;
    line-height: 2rem;
}

.footer-center{
    margin-right: 1rem;

}

.footer-container{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    color: #fff;
}

.footer-center a:link,
.footer-center a:visited{
    display: block;
    color: #f1f1f1;
    font-size: 1.4rem;
    transition: 0.6s;
}

.footer-center a:hover{
    color: #f60091;
}
.footer-center p{
    font-size: 20px;
}

.footer-center div{
    color: #f1f1f1;
    font-size: 1.4rem;
}

.footer-center h3{
    font-size: 1.8rem;
    font-weight: 400;
    margin-bottom: 1rem;
}
/* footer */
    </style>
</head>
<body>
    <nav>
        <div class="right-nav">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="{{route('projectView')}}">Project</a></li>
                <li><a href="{{route('taskView')}}">Tasks</a></li>
                <li><a href="{{route('workspaceView')}}">Workspaces</a></li>
                <li><a href="{{ route('EmployeeData')}}">Employees</a></li>


            </ul>
        </div>

    </nav>



    <section class="welcome">
        <div class="paste-button1">
            <button class="button"><i class="fa-solid fa-bars fa-lg"></i></button>
            <div class="dropdown-content1">

                <div class="paste-button2">
                    <a href="index.php">User data</a>
                    <div class="dropdown-content2">
                        <a href="index.php">Admin</a>
                        <a href="index.php">professional</a>
                        <a href="index.php">Official Users</a>
                        <a href="index.php">Users</a>
                    </div>
                </div>
                <div class="paste-button2">
                    <a href="../index.php">Home page</a>
                </div>
                <div class="paste-button2">
                    <a href="../resources.php">Resources Page</a>
                </div>
                <div class="paste-button2">
                    <a href="index.php">Forum Page</a>
                    <div class="dropdown-content2">
                        <a href="../forum.php">Forum Page</a>
                        <a href="forum/edit.php">Edit Forum</a>
                        <a href="forum/delete.php">Delete Forum</a>
                        <a href="forum/report.php">Report Post</a>
                        <a href="createpost.php">create Forum</a>
                    </div>
                </div>
                <div class="paste-button2">
                    <a href="index.php">Quiz page</a>
                    <div class="dropdown-content2">
                        <a href="../quiz.php">Quiz Page</a>
                        <a href="quiz.php">create Quiz</a>
                        <a href="addquiz1.php">Add quiz 1</a>
                        <a href="addquiz2.php">Add quiz 2</a>
                        <a href="../work/quiz.html">quiz html</a>
                        <a href="../work/quiz1.php">Quiz 1</a>
                        <a href="../work/quiz2.php">Quiz 2</a>

                    </div>
                </div>
                <div class="paste-button2">
                    <a href="index.php">QNA page</a>
                    <div class="dropdown-content2">
                        <a href="qna.php">Qna page</a>
                        <a href="createqna.php">create Qna</a>
                        <a href="../work/qna.html"> Qna design</a>


                    </div>
                </div>
                
            </div>

    </section>
  
   

<section id="footer" class="section footer">
        <div class="container">
            <div class="footer-container">
                <div class="footer-center">
                <h3>ABOUT US</h3>
                <p>The majority of independent <br> properties are losing out <br> on a lot of business for <br> one very simple reason: <br> their hotel websites are poorly <br> designed.</p>
                </div>
                <div class="footer-center">
                    <h3>USEFUL LINKS</h3>
                    <a href="index.php">Home</a>
                    <a href="food.php">Task</a>
                    <a href="room.php">Attendance</a>
                    <a href="contact.php">Notices Us</a>
                    <a href="feedback.php">Feedback</a>

                </div>
                <div class="footer-center">
                    <h3>CONTACT INFO</h3>
                    <p>Sudal-9,Bhaktapur <br>9806531378<br>www.swiftstay.com</p>
                </div>
                <div class="footer-center">
                    <h3>OPENING HOURS</h3>
                    <div>
                        
                        Sun: 6AM-10PM
                    </div>
                  
                    <div>
                       
                       Mon-wed: 8AM-9PM
                    </div>
                    <div>
                       Thu: 7AM-10PM
                    </div>
                    <div>
                   Fri & Sat: 5AM-11PM
                    </div>
                </div>
            </div>
        </div>
    </section>

   
</body>

</html>