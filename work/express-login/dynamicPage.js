const dynamicPage = {
    loginPage: function() {
        return `
            <!doctype html>
            <html>
            <head>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <div class="login-page">
                    <form action="/login" method="POST">
                        Username: <input name="username">
                        <button type="submit">Login</button>
                    </form>
                </div>
            </body>
            </html>
        `;
    },

    errorPage: function () {
        return `
            <!doctype html>
            <html>
            <head>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <div class="error-page">
                    <p>Username is invalid, username can't be empty or "dog" </p> 
                    <p>A valid username is made up by letters or numbers or the combiantion of letters and numebers only</p>
                    <p>Please <a href="/">Back to login page and Re-enter a valid username</a></p>                    
                </div>
            </body>
            </html>
        `;
    },

    dataPage: function (username, word) {
        return `
            <!doctype html>
            <head>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <div class="data-page">
                    <div class="show-data">
                        <p>Welcome, ${username}</p>
                        <p>Your stored word is: ${word}</p>
                    </div>
                    <div class="change-data">
                        <form action="/update" method="POST">
                            Change your word: <input name="word">
                            <button type="submit">Update</button>
                        </form>
                    </div> 
                    <div class="logout-page">
                        <form action="/logout" method="POST">
                            <button type="submit">Logout</button>
                        </form>
                    </div>                   
                </div>
            </body>
            </html>
        `;
    }
}

module.exports = dynamicPage;