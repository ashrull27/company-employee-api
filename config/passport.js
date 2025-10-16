const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const db = require('./database');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const [users] = await db.query(
        'SELECT * FROM users WHERE github_id = ?',
        [profile.id]
      );

      if (users.length > 0) {
        return done(null, users[0]);
      }

      const [result] = await db.query(
        'INSERT INTO users (github_id, username, email, avatar_url) VALUES (?, ?, ?, ?)',
        [
          profile.id,
          profile.username,
          profile.emails && profile.emails[0] ? profile.emails[0].value : null,
          profile.photos && profile.photos[0] ? profile.photos[0].value : null
        ]
      );

      const [newUser] = await db.query(
        'SELECT * FROM users WHERE id = ?',
        [result.insertId]
      );

      return done(null, newUser[0]);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, users[0]);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;