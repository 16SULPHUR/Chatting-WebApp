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


    <!-- sign up php script -->
    <?php 
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            if(isset($_POST["signup_submit"])){
                
                $email = $_POST["email"];
                $username = $_POST["username"];
                $password = $_POST["password"];

                $sql = "INSERT INTO `user information` (`id`, `email`, `name`, `password`) VALUES ('', '$email', '$username', '$password');";
                $result = mysqli_query($conn, $sql);
            }
            
            // else if(isset($_POST["login_submit"])){
                
            //     $email = $_POST["email"];
            //     $password = $_POST["password"];

            //     $sql = "INSERT INTO `user information` (`id`, `email`, `name`, `password`) VALUES ('', '$email', '$username', '$password');";
            //     $result = mysqli_query($conn, $sql);
            // }
        }
    ?>

    <main>
        <div class="info main-div">
            <h2>Login to start chatting with your friends.</h2><br>
            This is a chatting app that has been created to help people connect with each other no matter where they
            are.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste tenetur voluptatum error exercitationem
            doloribus vero, ipsa, veritatis quis sapiente assumenda corporis quos. Maxime animi facilis fugit est
            voluptatum sequi porro nihil odit, vero ipsum, officiis similique. Excepturi praesentium commodi rerum
            suscipit asperiores? Praesentium maxime omnis, voluptatum totam repellat ipsa dolor!
        </div>
        <div class="login main-div">
            <h1>Login</h1>
            <form action="">
                <label for="login" class="login-username label">email:</label><br>
                <input type="email" id="email" class="login-email input" name="email" placeholder="e-mail"><br>

                <label for="password" class="login-password-label label">Password:</label><br>
                <input type="password" name="password" id="" class="login-password input" placeholder="Password">

                <input type="button" name="login_submit" value="Submit" class="btn submit" onclick="loginto()"><br>

                <a href=" signup.php">Sign up</a>
            </form>
        </div>
        <div class="signup main-div">

        </div>
    </main>
    <footer>
        Byte Talk chatting app. Created to connect people.
    </footer>

    <script>
    function loginto() {
        window.location.href = "home.php?email=" + document.getElementById('email').value;
    }
    </script>

</body>

</html>