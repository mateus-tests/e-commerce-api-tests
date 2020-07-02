"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../src/database/connection"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    const user = await connection_1.default('users')
        .where('id', id)
        .first();
    done(null, user);
});
passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
    callbackURL: "/auth/google/redirect",
    clientID: String(process.env.GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
}, async (accessToken, refreshToken, profile, done) => {
    //passport callback function
    //to check if user already exist in our database
    const user = await connection_1.default('users')
        .where('email', String(profile._json.sub))
        .first();
    if (!user) {
        const newUser = {
            userName: profile._json.name,
            password: "sign up social ways",
            email: profile._json.sub,
            profile_picture: profile._json.picture,
        };
        const ids = await connection_1.default('users').insert(newUser);
        const id = Number(ids[0]);
        done(null, { ...newUser, id });
    }
    else {
        //already have the user
        done(null, user);
    }
}));
passport_1.default.use(new passport_facebook_1.default.Strategy({
    callbackURL: "/auth/facebook/redirect",
    clientID: String(process.env.FACEBOOK_APP_ID),
    clientSecret: String(process.env.FACEBOOK_APP_SECRET),
    profileFields: ['id', 'displayName', 'name', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
    //passport callback function
    //to check if user already exist in our database
    let user;
    let email;
    if (profile._json.email === "" || !profile._json.email) {
        user = await connection_1.default('users')
            .where('email', String(profile._json.id))
            .first();
        email = String(profile._json.id);
    }
    else {
        user = await connection_1.default('users')
            .where('email', String(profile._json.email))
            .first();
        email = String(profile._json.email);
    }
    if (!user) {
        const newUser = {
            userName: profile._json.name,
            password: "sign up social ways",
            email,
            profile_picture: "default.png",
        };
        const ids = await connection_1.default('users').insert(newUser);
        const id = Number(ids[0]);
        done(null, { ...newUser, id });
    }
    else {
        //already have the user
        done(null, user);
    }
}));
