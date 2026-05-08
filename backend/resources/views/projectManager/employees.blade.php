<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
     table,
        th,
        td {
            border: 3px solid black;
            border-collapse: collapse;

        }
        .adapplication {
            width: 100%;

        }

        .adapplication-head {
            text-align: center;
            font-size: 29px;

        }

        #adapplication-table {
            width: 100%;

        }

        #adapplication-table table {
            width: 100%;

        }

        #adapplication-table table th {
            font-size: 18px;
        }

        #adapplication-table table tr {
            height: 100px;

        }

        #adapplication-table table tr td {
            text-align: center;
            font-size: 19px;

        }
        #adapplication-head {
            text-align: center;
            font-size: 27px;
            font-family: cursive;
        }
</style>
<body>

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
                        <th scope="col" width="10%"> Role</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($users as $user)  
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $user['fname'] }}</td>
                            <td>{{ $user['lname'] }}</td>
                            <td>{{ $user['phone'] }}</td>
                            <td>{{ $user['email'] }}</td>
                            <td>{{ $user['role'] }}</td>
                        </tr>
                        @endforeach
                        </tbody>

</table>

</div>
</section>


<script>

</script>
</body>
</html>