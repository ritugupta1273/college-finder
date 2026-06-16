<?php
session_start();
$conn = new mysqli("localhost", "root", "", "finder_db");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $pass = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, username, password_hash FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($pass, $user['password_hash'])) {
            $_SESSION['user'] = $user['username'];
            header("Location: index (2).php"); // Redirect to home
        } else {
            echo "<script>alert('Wrong password'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('User not found'); window.history.back();</script>";
    }
}
?>