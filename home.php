<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Byte Talk</title>
    <link rel="stylesheet" href="styles/style.css">
</head>

<body>
    <!-- Connecting to database -->
    <?php include 'partials/_connectdb.php';?>

    <!-- including header -->
    <?php include 'partials/_header.php';?>


    <?php 
        if($_SERVER['REQUEST_METHOD'] === 'GET'){
        global $email;
        $email = $_GET['email'];
        }
        
        echo $email;
    ?>


</body>

</html>