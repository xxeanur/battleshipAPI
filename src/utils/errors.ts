//error classı oluşturduk
export class ClientSideException extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);//üst sınıf constructırını çağırdık. 
        this.statusCode = statusCode || 400;
        this.message = message;
    }
}


