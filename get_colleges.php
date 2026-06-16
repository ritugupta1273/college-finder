<?php
// Set headers to allow reading data safely
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Enable error reporting to capture hidden warnings
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 1. Establish MySQL connection using your precise settings
$conn = mysqli_connect("localhost", "root", "", "finder_db");

if (!$conn) {
    die(json_encode(["error" => "Database Connection Failed: " . mysqli_connect_error()]));
}

// 2. Query your colleges table
$query = "SELECT * FROM colleges"; 
$result = mysqli_query($conn, $query);

$colleges = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        
        // DYNAMIC KEY MAPPING COUPLER:
        // This ensures that even if your column names are uppercase (e.g., 'Name' or 'FEES'),
        // it maps them properly into lowercase properties for the JavaScript engine.
        $rowLower = array_change_key_case($row, CASE_LOWER);

        $rawCutoff = isset($rowLower['cutoff']) ? trim($rowLower['cutoff']) : null;
        if ($rawCutoff === '0' || $rawCutoff === '0%' || $rawCutoff === '') {
            $rawCutoff = null;
        }

        // Use fallback keys if column names differ slightly (e.g., 'pkg' vs 'package')
        $colleges[] = [
            "name"      => isset($rowLower['name']) ? $rowLower['name'] : 'Unknown Name',      
            "type"      => isset($rowLower['type']) ? $rowLower['type'] : 'Engineering',      
            "ownership" => isset($rowLower['ownership']) ? $rowLower['ownership'] : 'Government', 
            "state"     => isset($rowLower['state']) ? $rowLower['state'] : 'Himachal Pradesh',     
            "pkg"       => isset($rowLower['pkg']) ? $rowLower['pkg'] : (isset($rowLower['package']) ? $rowLower['package'] : '0'),       
            "fee"       => isset($rowLower['fee']) ? $rowLower['fee'] : (isset($rowLower['fees']) ? $rowLower['fees'] : 0),       
            "cutoff"    => $rawCutoff         
        ];
    }
    
    // Output clean JSON array stream
    echo json_encode($colleges);
} else {
    echo json_encode(["error" => "SQL Query Error: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>