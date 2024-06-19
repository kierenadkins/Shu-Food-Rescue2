# ShareMyFood - README

## Overview

**ShareMyFood** is a mobile application designed to help students share unwanted food items with others in their community, similar to the concept of "Too Good To Go," but on a household level. Users can list food items they no longer need, and others can claim them, reducing food waste and fostering a sense of community.

## Features

- **User Authentication**: Register and log in securely.
- **Food Listings**: Post unwanted food items with descriptions and images.
- **Search and Filter**: Easily find available food items nearby.
- **Notifications**: Receive alerts for new listings and messages.
- **Messaging**: Communicate with other users to arrange food pick-ups.

## Technologies Used

- **Frontend**: React Native
- **Backend**: Firebase (for authentication, database, and storage)
- **Other Tools**: Expo, npm

## Prerequisites

- Node.js and npm installed
- Expo CLI installed
- Firebase account (for backend services)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/kierenadkins/Shu-Food-Rescue2.git
    cd Shu-Food-Rescue2
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Firebase**:
    - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    - Enable Firebase Authentication, Firestore Database, and Storage.
    - Obtain your Firebase config object and create a `firebaseConfig.js` file in the root of the project:
        ```javascript
        // firebaseConfig.js
        export const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };
        ```

4. **Start the Expo server**:
    ```bash
    expo start
    ```

5. **Run on a device**:
    - Download the Expo Go app from the [App Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).
    - Scan the QR code displayed in the terminal or the browser after starting the Expo server.

---

Feel free to reach out if you have any questions or need further assistance! Enjoy sharing food and reducing waste with ShareMyFood!
