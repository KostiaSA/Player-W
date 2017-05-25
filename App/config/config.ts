export interface IConfig {
    appName: string;
    apiUrl: string;
    apkUrl: string;
}

let developDir: IConfig = {
    appName: "Buhta Player 1.0",
//    apiUrl: "http://5.19.239.191:3000/api",
//    apkUrl: "http://5.19.239.191:3000/downloads/r.apk",
    apiUrl: "http://192.168.0.14:3001/api",
    apkUrl: "http://192.168.0.14:3001/downloads/BuhtaPlayer.apk",
}

let cloudDir: IConfig = {
    appName: "Buhta Player 1.0",
    apiUrl: "http://player.buhta.ru/api",
    apkUrl: "http://player.buhta.ru/downloads/BuhtaPlayer.apk",
}


export let config: IConfig = developDir;