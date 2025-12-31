<?php

    // Include PHPMailer
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/Exception.php';
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';

    // Create instance
    $mail = new PHPMailer(true);

    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@nowararealty.com'; // your Google Workspace email
    $mail->Password   = 'rvqqxxxljklwoxva';      // the App Password from Google
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;
    // DB credentials
    $host = "localhost";
    $dbname = "u410691859_nowararealty";      // replace with your database name
    $username = "u410691859_nowara";    // replace with your database username
    $password = "Nowara@000";// replace with your database password

    // Connect to DB
    $conn = new mysqli($host, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get form values
    $name = $_POST['brochure-name'];
    $email = $_POST['brochure-email'];
    $phone = $_POST['brochure-phone'];
    $category = $_POST['brochure-category'];

    // Sanitize input (basic)
    $name = $conn->real_escape_string($name);
    $email = $conn->real_escape_string($email);
    $phone = $conn->real_escape_string($phone);
    $category = $conn->real_escape_string($category);

    // Insert into DB
    $sql = "INSERT INTO contact_form (name, email, phone, category) VALUES ('$name', '$email','$phone', '$category')";

    if ($conn->query($sql) === TRUE) {
        echo "Message sent successfully!";
        try{
            // Email headers
            $mail->setFrom('info@nowararealty.com', 'Nowara Realty Enquiry');
            $mail->addAddress('crm@nowararealty.com', 'Nowara CRM'); // where you want to receive alerts

            // Email content
            $mail->isHTML(true);
            $mail->Subject = "New Brochure Request - " . $name;
            $mail->Body    = "
                <h3>A new brochure request has been submitted</h3>
                <p><b>Name:</b> $name</p>
                <p><b>Email:</b> $email</p>
                <p><b>Phone:</b> $phone</p>
                <p><b>Category:</b> $category</p>
            ";

            $mail->send();
        }catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
?>
