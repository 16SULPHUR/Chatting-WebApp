<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Byte Talk</title>
    <link rel="stylesheet" href="styles/style.css">

    <!-- password encription-decription library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"
        integrity="sha256-/H4YS+7aYb9kJ5OKhFYPUjSJdrtV6AeyJOtTkw6X72o=" crossorigin="anonymous"></script>
</head>

<body>
    <!-- Connecting to database -->
    <?php include 'partials/_connectdb.php';?>

    <!-- including header -->
    <?php include 'partials/_header.php';?>


    <?php 
        if($_SERVER['REQUEST_METHOD'] === 'GET'){
        global $username;
        $username = $_GET['username'];



    // $sql = "SELECT * FROM `userinformation`";
    // $result = mysqli_query($conn, $sql);
    // $row = mysqli_fetch_assoc($result);
    // $password = $row['password'];
    }

    
    ?>



</body>

</html>