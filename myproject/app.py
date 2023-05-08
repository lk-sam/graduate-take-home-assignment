from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

cnx = mysql.connector.connect(
    host="localhost", 
    user='root', 
    password='',
    database='user_profile'
)

print(cnx) 
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'This is the Authentication Service'

@app.route('/register', methods=['POST'])
def register():
    email = request.json['email']
    password = request.json['password']
    username = request.json['username']

    #check if username and email already exist
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    if user:
        return jsonify({"error": "Username already exists"}), 400
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    if user:
        return jsonify({"error": "Email already exists"}), 400
    
    #insert into database
    
    query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
    cursor.execute(query, (username, email, password))
    cnx.commit()
    cursor.close()
    return jsonify({"success": "User created successfully"}), 201
    
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    if user:
        return jsonify({"success": "Login successful", "user_id": user[0]}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401
    
@app.route('/profile', methods=['GET'])
def profile():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    if user:
        # Return user details without the password
        user_data = {
            "id": user[0],
            "username": user[1],
            "email": user[2],
        }
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)