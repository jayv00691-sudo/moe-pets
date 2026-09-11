const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const key  = 'moe-' + crypto.randomBytes(5).toString('hex');
const salt = crypto.randomBytes(8).toString('hex');
const hash = crypto.createHash('sha256').update(salt + key).digest('hex');

const out = `/* 编辑密钥配置 —— 只包含盐值和哈希，密钥本身不在这份文件里 */
window.MOE_EDIT = {
  salt: "${salt}",
  hash: "${hash}"
};
`;
fs.writeFileSync(path.join(__dirname, '..', 'config.js'), out, 'utf8');
console.log('KEY=' + key);
console.log('SALT=' + salt);
console.log('HASH=' + hash);
