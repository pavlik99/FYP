// const passport = require('passport')
//const GoogleStrategy = require('passport-google-oauth20').Strategy

import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import keys from '../services/keys.js'

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/google/redirect',
  }),
  () => {}
)

// try {
//   const currentUser = await MemberModel.findOne({
//     googleId: profile.id,
//   });
//   // In case database doesn't find the user, we must create a new one:
//  if(!currentUser){
//    const newUser = await new MemberModel({
//      googleId:profile.id,
//      userName:profile.name.familyName,
//      email: profile.email,
//      password:null
//    }).save();
