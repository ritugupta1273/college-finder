<?php
// Database connection details
$servername = "localhost";
$db_username = "root"; // Default XAMPP username
$db_password = "";     // Default XAMPP password is empty
$dbname = "finder_db";

// Create connection
$conn = new mysqli($servername, $db_username, $db_password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get data from form
    $user = $_POST['username'];
    $email = $_POST['email'];
    $pass = $_POST['password'];

    // Encrypt the password for security
    $hashed_password = password_hash($pass, PASSWORD_DEFAULT);

    // Prepare SQL statement to prevent SQL Injection
    $stmt = $conn->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $user, $email, $hashed_password);

    if ($stmt->execute()) {
        // Success: Redirect back to login or show message
        echo "<script>
                alert('Registration successful!');
                window.location.href = 'login.php'; 
              </script>";
    } else {
        // Handle errors (like duplicate email)
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}
$conn->close();
?>