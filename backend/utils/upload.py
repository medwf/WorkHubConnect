from flask import Flask, request, render_template, make_response, jsonify, url_for
from datetime import datetime
import magic
import os


def generate_filename(file_extension, user_info):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    new_filename = f"{user_info}_{timestamp}.{file_extension}"
    return new_filename

def check_image_size(file_path):
    if os.path.exists(file_path):
        file_size = os.path.getsize(file_path)
        kb_size = file_size / 1024.0
        if kb_size > 10240:
            os.remove(file_path)
            return False
        return True


def upload_image(file):
        if not file:
            return make_response(jsonify({"message": "No selected file"}))

        if file.filename == '':
            return make_response(jsonify({"message": "No No selected file"}))
        allowed_extensions = ("png", "jpeg", "jpg")
        allowed_mime_types = ("image/jpeg", "image/png", "image/jpg")
        basename, file_extension = file.filename.rsplit('.', 1)
        if file_extension.lower() not in allowed_extensions:
            return make_response(jsonify({"message": "Please upload images in one of the following formats: PNG, JPEG, or JPG"}))

        new_filename = generate_filename(file_extension, 5)
        file.save('../images/' + new_filename)
        current_directory = os.getcwd()
        print(current_directory)
        file_path = f"{current_directory}/images/{new_filename}"
        mime = magic.Magic(mime=True)
        file_mime_type = mime.from_file(file_path)
        if file_mime_type not in allowed_mime_types:
            os.remove(file_path)
            return make_response(jsonify({"message": "Please upload images in one of the following mime_types : PNG, JPEG, or JPG"}))
        is_valid = check_image_size(file_path)
        if not is_valid:
            return jsonify({"message": "Image size must be less than 2MB"})
        url_img = f"/backend/images/{new_filename}"
        response = jsonify({"message": "Image uploaded succesfully", "imgurl" :{url_img} }), 200
        return response
        # return render_template("image.html", url_img=url_for('static', filename=new_filename))

    # return render_template('index.html')

