#!/usr/bin/python3
# import os
from email.message import EmailMessage
import ssl
import smtplib
import re
from flask import make_response, jsonify

def is_valid_email(email):
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email) is not None
password = "avvv ogen hzzu mypj"
sender = "workhubconnect.2024@gmail.com"


def SendMail(receiver, subject, body):
    if not is_valid_email(receiver):
        return make_response(jsonify({"error": f"Invalid Email Address: {receiver}"}), 400)
    mail = EmailMessage()
    mail['From'] = sender
    mail['To'] = receiver
    mail['Subject'] = subject
    mail.set_content(body)
    context = ssl.create_default_context()
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(sender, password)
            smtp.sendmail(sender, receiver, mail.as_string())
    except Exception as e:
        return make_response(jsonify({"error": f"Failed to send email to {receiver}"}), 400)

