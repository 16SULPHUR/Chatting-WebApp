<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Byte Talk</title>
    <link rel="stylesheet" href="styles/style.css">
    <link rel="icon" href="resources/logo.png">
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

                $sql = "INSERT INTO `user information` (`email`, `username`, `password`) VALUES ('$email', '$username', '$password');";
                $result = mysqli_query($conn, $sql);
            }
            
            else if(isset($_POST["login_submit"])){
                
                $email = $_POST["email"];
                $enteredPassword = $_POST["password"];

                $sql = "SELECT * FROM `user information` WHERE `email` = '$email'";
                $result = mysqli_query($conn, $sql);
                $row = mysqli_fetch_assoc($result);
                $actualPassword = $row['password'];
                $username = $row['username'];
                
                if($enteredPassword == $actualPassword){
                    header("location:home.php?username=$username");
                }
                else{
                    echo "<h1>wrong Password</h1>";
                }
            }
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
            <form action="" method="POST">
                <label for="login" class="login-username label">email:</label><br>
                <input type="email" id="email" class="login-email input" name="email" placeholder="e-mail"><br>

                <label for="password" class="login-password-label label">Password:</label><br>
                <input type="password" name="password" id="password" class="login-password input"
                    placeholder="Password">

                <input type="submit" name="login_submit" value="Submit" class="btn submit"><br>

                <a href=" signup.php">Sign up</a>
            </form>
        </div>
        <div class="signup main-div">

        </div>
    </main>
    <footer>
        Byte Talk chatting app. Created to connect people.
    </footer>



</body>

</html>