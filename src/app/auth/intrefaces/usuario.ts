export interface User{
    username:string,
    pass:string
}

export interface UserLog {
    ok:   boolean;
    msg:  string;
    jswt: string;
    puesto:string;
}