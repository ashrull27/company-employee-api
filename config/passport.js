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
      // Check if user exists
      const userResult = await db.query(
        'SELECT * FROM users WHERE github_id = $1',
        [profile.id]
      );

      if (userResult.rows.length > 0) {
        return done(null, userResult.rows[0]);
      }

      // User doesn't exist, create new user
      const insertResult = await db.query(
        'INSERT INTO users (github_id, username, email, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *',
        [
          profile.id,
          profile.username,
          profile.emails && profile.emails[0] ? profile.emails[0].value : null,
          profile.photos && profile.photos[0] ? profile.photos[0].value : null
        ]
      );

      return done(null, insertResult.rows[0]);
    } catch (error) {
      console.error('Passport error:', error);
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (error) {
    console.error('Deserialize error:', error);
    done(error, null);
  }
});

module.exports = passport;