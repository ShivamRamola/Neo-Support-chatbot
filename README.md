
# Neo Support Chatbot

Neo Support is a lightweight AI chatbot project created specifically for small businesses, especially targeting the E-commerce and Indian Restaurant industries. It helps automate customer queries, improve support quality, and drive sales with minimal technical setup.

## Features

- Intelligent customer query handling based on trained intents.
- Multi-language support (currently English and Hindi).
- Lightweight and fast backend using Flask.
- Simple, modern, and mobile-responsive frontend UI.
- Light/Dark theme toggle for better user experience.
- Typing indicator animation.
- Easy to extend and customize for different businesses.

## Project Structure

Neo Support project combines backend and frontend in the same folder.

```
Neo-Support/
├── assets/
│    └── dataset/
│         ├── chatbot_data.json
│         ├── words.py
│         └── classes.py
├── Model/
│    └── model.pth
├── app.py
├── prediction.py
├── train.py
├── index.html
├── style.css
├── script.js
└── README.md
```

## Setup Instructions

1. **Clone or Download the Repository**

If using Git:
```bash
git clone https://github.com/your-username/neo-support-chatbot.git
cd neo-support-chatbot
```
Or manually download and extract the ZIP file.

2. **Install Required Python Libraries**

```bash
pip install torch flask nltk scikit-learn flask-cors
```

3. **Train the Model (If model.pth not available)**

```bash
python train.py
```

This will generate `model.pth` in the `/Model/` directory automatically.

4. **Run the Backend Server**

```bash
python app.py
```

The backend server will be available at `http://localhost:5000/`.

5. **Open the Frontend**

Open `index.html` in your web browser.  
(For the best experience, use Live Server extension if you are using VS Code.)

Now your chatbot will be fully functional!

## How It Works

The user sends a message using the frontend chat UI.  
JavaScript sends the message as a POST request to the Flask backend at the `/predict` endpoint.  
The backend loads the trained model and predicts the most suitable response.  
The response is sent back to the frontend and displayed in the chat window.

## Future Plans

- WhatsApp Business API integration for customer support.
- Admin dashboard for dynamic FAQ/intents management.
- Payment links and order processing through chat.
- Voice-to-text messaging support.
- More multilingual support (Marathi, Tamil, etc.)

## About

Neo Support is built for small businesses in India to empower them with easy-to-use AI chatbots without the need for complex IT infrastructure.  
It is lightweight, scalable, and highly customizable to fit different industries like online stores, restaurants, and service businesses.

Made with ❤️ to support small businesses.
