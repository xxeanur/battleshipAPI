export class userModel {
    username: string;
    password: string;
    // passwordAgain: string;
    email: string;
    constructor(username: string, password: string, email: string) {
        this.username = username;
        this.password = password;
        this.email = email;
        // this.passwordAgain = passwordAgain; , passwordAgain: string
    }
}