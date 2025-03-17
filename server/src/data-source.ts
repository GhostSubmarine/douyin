const { DataSource } = require('typeorm');
const path = require('path');

module.exports = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'douyin',
  entities: [
    path.resolve(__dirname, 'user/entities/user.entity.ts'),
    path.resolve(__dirname, 'video/entities/video.entity.ts'),
    path.resolve(__dirname, 'video/entities/like.entity.ts')
  ]
});
