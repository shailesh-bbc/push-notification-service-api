# Push Notification API
API for sending push notifications to mobile/web devices using just a username. Integrates the Push Bullet API to send notifications to a user's device.
This API requires you to sign-up/log-in into your Push Bullet account and create an access token from the accounts page.

## Usage
To run the express server.
1) Clone the repo:

        https://github.com/MuhammadAHussain/push-notification-service-api.git
2) Run `npm install` at the root of the project.
3) Run `npm run start-server`, from the root of the project, to start the server.
4) This is run the express server at the following address

        http://localhost:8080
## Creating a user
Before sending a push notification, you'll need to create a user by sending a request to `/user` endpoint with a username and access token. 

Create a post request providing the `username` in the body of the request and the access token as a Bearer token in the Authorization header.
Eg:

    curl --location --request POST 'localhost:8080/user' \
    --header 'Authorization: Bearer my-access-token' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "username": "my-username"
    }'

## Getting all registered users
You can view all registered users by making a request to the `/users` endpoint.
E.g.

    curl --location --request GET 'localhost:8080/users'

## Sending push notifications
Once a user has been registered, you can send push notifications for that user to the `/push` endpoint. There are three different type of notifications, each have a different body.

To send a push notification, it requires the username and type of notification. Username can be provided in the parameters of the request, the type can be supplied in the body. The request body must be in `JSON` format.

A successful response will return a response that looks like

    {
      "username": "my-username",
      "accessToken": "my-access-token",
      "creationTime": "2021-06-14T21:17:24.373Z",
      "numOfNotificationsPushed": 1
    }
### Pushing a note notification
A note notification requires the `type` in the body of the request. Additionally, you can provide a `title` and `body` to the request.
An example request can be found below.

    curl --location --request POST 'localhost:8080/push?username=my-username' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "type": "note",
      "title": "mytitle",
      "body": "mybody"
    }'

### Pushing a link notification
A link notification requires the `type` in the body of the request. Additionally, you can provide `title`, `body` and `url` to the request.
An example request can be found below.

    curl --location --request POST 'localhost:8080/push?username=my-username' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "type": "note",
      "title": "mytitle",
      "body": "mybody",
      "url": "myurl"
    }'

### Pushing a file notification
A link notification requires the `type` in the body of the request. Additionally, you can provide `body`, `fileName`, `fileType` and `fileUrl`. It will attempt to read the file at the specified path. If a invalid file path is provided, it will throw an error. The endpoint will make a request to Push Bullet to upload the file found at `fileUrl`. It will then push the notification with the field's specified in the request.
An example request can be found below.

    curl --location --request POST 'localhost:8080/push?username=test' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "type": "file",
      "body": "mybody",
      "fileName": "myfilename.jpeg",
      "fileType": "image/jpeg",
      "fileUrl": "path/to/file"
    }'
