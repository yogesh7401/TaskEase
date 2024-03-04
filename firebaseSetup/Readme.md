# To set up Firebase in Taskease, you'll need to follow a few steps:

### 1. Create a Firebase Project:

- Go to the Firebase Console: https://console.firebase.google.com/
- Click on "Add project" and follow the prompts to create a new project.
- Once your project is created, you'll be redirected to the project dashboard.

### 2. Add Firebase to Your Web App:

- In the Firebase Console, click on the "</>" icon to add Firebase to your web app.
- Register your app by providing a nickname (optional) and click "Register app".
- Take a note of the Firebase SDK configuration provided (this will be used in configuration).

### 3. Create firebase environment

- Create `.env` file in project root folder and add the following environment variable.

```
VITE_FIREBASE_APIKEY=< Firebase-api-key >
VITE_FIREBASE_AUTHDOMAIN=< Firebase-auth-domain >
VITE_FIREBASE_PROJECTID=< Firebase-project-id >
VITE_FIREBASE_STORAGEBUCKET=< Firebase-storage-bucket >
VITE_FIREBASE_MESSAGINGSENDERID=< Firebase-messaging-sender-id >
VITE_FIREBASE_APPID=< Firebase-app-id >
VITE_FIREBASE_MESUREMENTID=< Firebase-measurement-id >
```

Note: You can find these value in Firebase SDK configuration mentioned in step 2
