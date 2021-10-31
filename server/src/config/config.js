module.exports = {
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'EOIqqF8KIl1bBrfBz9GZ6iw8M'
  },
  db: {
    database: process.env.DB_NAME || 'poller',
    user: process.env.DB_USER || 'poller',
    password: process.env.DB_PASS || 'GleNiaweJujAacpBLpwuK4D8N',
    connection_uri: 'mongodb+srv://PollerAdmin:5QgIpdNxAbOPCCAT@poller.ijegt.mongodb.net/poller?retryWrites=true&w=majority',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './poller.sqlite3'
    }
  },
  port: process.env.PORT || 8080,
  message: {
    error: {
      GROUP_UNSPECIFIED: "the 'group' of an opton was unspecified",
      INVALID_PAYLOAD: 'invalid payload!',
      ID_UNSPECIFIED: "the 'id' field was unspecified",
      INVALID_OPTION_TYPE: 'the option type supplied is invalid',
      LABEL_UNSPECIFIED: "the 'label' of an opton was unspecified",
      OPTIONS_UNSPECIFIED: "the 'options' field was unspecified",
      PLACEHOLDER_UNSPECIFIED: "the 'placeholder' field was unspecified",
      POLL_DELETED: 'poll deleted!',
      QUESTION_UNSPECIFIED: "the 'question' field was unspecified",
      VALUE_UNSPECIFIED: "the 'value' of an option was unspecified"
    },
    status_code: {
      400: 'poll not found',
      500: 'internal server error'
    },
    success: {
      POLL_CREATED: 'poll created',
      POLL_UPDATED: 'poll updated',
      VOTE_CASTED: 'vote casted'
    }
  }
}
