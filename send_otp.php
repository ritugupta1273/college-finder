<?php
$conn = new mysqli("localhost", "root", "", "finder_db");

// --- FIX: Align PHP and MySQL to Indian Time ---
date_default_timezone_set('Asia/Kolkata'); 
$conn->query("SET time_zone = '+05:30'");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    
    // Check if user exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    
    if ($stmt->get_result()->num_rows > 0) {
        $otp = rand(100000, 999999);
        // Generates expiration 10 minutes from now in IST
        $expires = date("Y-m-d H:i:s", strtotime("+10 minutes"));

        // Insert or Update OTP
        $stmt = $conn->prepare("REPLACE INTO password_resets (email, otp, expires_at) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $email, $otp, $expires);
        $stmt->execute();

        // Alert shown for testing purposes[cite: 1]
        echo "<script>alert('OTP is $otp (Valid for 10 mins)'); window.location.href='verify_otp.php?email=$email';</script>";
    } else {
        echo "<script>alert('Email not found'); window.history.back();</script>";
    }
}
?>