<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Email Verification for SoulAPI</title>
    <style>
        body {
            background-color: whitesmoke;
            font-family: sans-serif;
            margin: 0;
            padding: 0;
        }

        #content {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        h1 {
            font-size: 24px;
            margin-bottom: 15px;
        }

        p {
            line-height: 1.5;
        }

        .code {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 3px;
            font-family: monospace;
        }

        footer {
            text-align: center;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div id="content">
        <h1>Hi {{$fname}}</h1>

<div>
   {{$msg}}
</div>
        <div class="code">
            <strong><B>
               {{ $verifcode }}  
            </B></strong>
           
        </div>

        <footer>
            {{$footer}}
        </footer>
    </div>

</body>
</html>