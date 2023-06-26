<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Byte Talk</title>
    <link rel="stylesheet" href="styles/style.css">
</head>

<body>
    <!-- including header -->
    <?php include 'partials/_header.php';?>

    <div class="login main-div">
        <h1>Sign up</h1>
        <form action="index.php" method="POST">

            <label for="email" class="login-username label">email:</label><br>
            <input type="email" class="login-email input" id="email" name="email" placeholder="e-mail"><br>

            <label for="login" class="login-username label">Username:</label><br>
            <input type="text" class="login-email input" name="username" placeholder="Username"><br>

            <label for="login-password" class="login-password-label label">Password:</label><br>
            <input type="password" name="password" id="" class="login-password input" placeholder="Password">

            <input type="submit" name="signup_submit" value="Submit" class="btn submit"><br>

            <a href="index.php">Log in</a>
        </form>
    </div>
</body>

</html>