import knex from '../src/database/connection';

import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';

import './getEnv';

type User = {
    id:  number;
    userName: string;
    password: string;
    email: string;
    profile_picture: string; 
};

passport.serializeUser( (user : User, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id : number, done) => {
    const user = await knex('users')
                        .where('id', id)
                        .first();
    
    done(null, user);
});
passport.use(
    new GoogleStrategy.Strategy({
        callbackURL: "/auth/google/redirect",
        clientID: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }, async (accessToken, refreshToken, profile, done : any) => {
        //passport callback function
        //to check if user already exist in our database

        const user = await knex('users')
                .where('email', String(profile._json.sub))
                .first();
        if(!user) {
            const newUser = {
                userName: profile._json.name,
                password: "sign up social ways",
                email: profile._json.sub,
                profile_picture: profile._json.picture, 
            }
            const ids = await knex('users').insert(newUser);
            const id = Number(ids[0]);
            
            done(null, { ...newUser, id });
        }
        else {
            //already have the user
            done(null, user);
        }
    })
);


passport.use(
    new FacebookStrategy.Strategy({
        callbackURL: "/auth/facebook/redirect",
        clientID: String(process.env.FACEBOOK_APP_ID),
        clientSecret: String(process.env.FACEBOOK_APP_SECRET),
        profileFields: ['id', 'displayName', 'name', 'emails']
    }, async (accessToken, refreshToken, profile, done : any) => {
        //passport callback function
        //to check if user already exist in our database
        let user;
        let email;
        if(profile._json.email === "" || !profile._json.email){
            user = await knex('users')
                            .where('email', String(profile._json.id))
                            .first();
            email = String(profile._json.id);
        }
        else {
            user = await knex('users')
                            .where('email', String(profile._json.email))
                            .first();
            email = String(profile._json.email);
        }
        
        if(!user) {
            const newUser = {
                userName: profile._json.name,
                password: "sign up social ways",
                email,
                profile_picture: "default.png", 
            }
            const ids = await knex('users').insert(newUser);
            const id = Number(ids[0]);
            
            done(null, { ...newUser, id });
        }
        else {
            //already have the user
            done(null, user);
        }
    })
);


