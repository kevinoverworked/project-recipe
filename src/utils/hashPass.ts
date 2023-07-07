import bcrypt from "bcrypt";

export const hashPass = (unHashPass: string)  => {
    return bcrypt.hash(unHashPass, 10).then((hash: string) => hash);
};

export const checkPass = (unHashPass: string, hashPass: string) => {
    return bcrypt.compare(unHashPass, hashPass).then((result: boolean) => result);
};