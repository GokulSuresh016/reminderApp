Credentials

GOOGLE_CLIENT_ID=GOOLE-AUTH-CLIENT-ID
GOOGLE_CLIENT_SECRET=GOOLE-CLIENT-SECRET
NEXTAUTH_SECRET=NEXTAUT-SECRET 
NEXTAUTH_URL=YOUR_URL EG: http://localhost:3000
TWILIO_ACCOUNT_SID=TWILIO-ACCOUNT-SID
TWILIO_AUTH_TOKEN=TWILIO--TOKEN
TWILIO_PHONE_NUMBER=TWILIO-VERIFIED-PHONE

Set up instructions

Clone or unzip the code 
Run npm install command to install the dependencies
Add the Credential details 
Run npm run dev to run in local 

Details and workflow about the development of app 

Used NEXT latest (15.4.5) to develop
Login page is set up in the entry point (page.tsx)
Click on the button will call the google api, Since it is an api call code comes under api folder the redirection after the login is also handle in api route.
SessionWrapper is used to get the session details in the child componets.
Browser local storage is used to save event details(Used to avoid the backend and DB implementation)
Signout buttion will clear the session details.
