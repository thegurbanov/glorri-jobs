import { environment } from "../../environments/environment";


export class AppSettings {
    public static SITE_NAME = 'Idrak Liseyi';
    public static BASE_URL = environment.BASE_URL;
}

export function logOut() {
    localStorage.removeItem('user');
    window.location.href = '/login';
}

