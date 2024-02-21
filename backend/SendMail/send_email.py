#!/usr/bin/python3
import os
from email.message import EmailMessage
import ssl
import smtplib
import re

def is_valid_email(email):
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email) is not None
password = os.environ.get("EMAIL_PASSWORD")
sender = "workhubconnect.2024@gmail.com"


def SendMail(receiver, subject, body):
    if not is_valid_email(receiver):
        print(f"Invalid Email Address: {receiver}")
        return 
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
        print(f"An error occurred: {e}") 
