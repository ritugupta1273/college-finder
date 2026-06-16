<?php
$conn = new mysqli("localhost", "root", "", "finder_db");

// --- FIX: Must match the timezone in send_otp.php ---
date_default_timezone_set('Asia/Kolkata');
$conn->query("SET time_zone = '+05:30'");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $otp = $_POST['otp'];
    $new_pass = password_hash($_POST['new_password'], PASSWORD_DEFAULT);

    // Check if OTP is valid and NOT expired using MySQL NOW() which is now IST
    $stmt = $conn->prepare("SELECT * FROM password_resets WHERE email = ? AND otp = ? AND expires_at > NOW()");
    $stmt->bind_param("ss", $email, $otp);
    $stmt->execute();
    
    if ($stmt->get_result()->num_rows > 0) {
        // Update user password[cite: 2]
        $update = $conn->prepare("UPDATE users SET password_hash = ? WHERE email = ?");
        $update->bind_param("ss", $new_pass, $email);
        $update->execute();

       // --- NEW CODE (KEEPS THE RECORD) ---
      $update_status = $conn->prepare("UPDATE password_resets SET status = 'completed' WHERE email = ? AND otp = ?");
      $update_status->bind_param("ss", $email, $otp);
      $update_status->execute();

        echo "<script>alert('Password updated successfully!'); window.location.href='index (2).php';</script>";
    } else {
        echo "<script>alert('Invalid or expired OTP. Please try again.'); window.location.href='send_otp.php';</script>";
    }
}
?>