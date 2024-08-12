const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0dGRFBLYzJ0dEVPRHRmQ1YxV2N6S1RKY1ZWNzlGZjcyb2N3T21BaDNVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ3F2TlZabm5rNlJZa3RIRVpkdEdJNWl2Y2RCYUpIc0RtNEtHMGZBMTVnTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRUFJudGRyaUk2M3ZPSjdTWWtqaE5VNTJFN09OUUs1eXdocGpFZjdGSVZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5T0UzNVlHS2UwN2tab1JLYW1Sazg4L1VyckN5ZE0vNUN5eGJieG92dG5NPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFOUVhocjhNZ1FSUllWWGtmMHB2WjczWEZIODl5M3lSNW4xdk96KzJZM3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5PUUxBcGhHeFV2NkNRVUI4TnRlTE9ld1BaWlc3ZC9OUGNxOFR2MmtCQjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUpyeHFQVzhNMDc1L0NvNjRiUE1iR3duaXZwNUFvcjVRWHVpZ29SMHJFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRFZPeURGN0VkakpLQXBtdHl6UUxkbTZiNzQ0TDd4Tnd0QVFWcnNvY01ucz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IksxU0FBSWlQM1IyRHpZM0lGMzBvSmxPRGxLTTFCVnpkT3ZQU2RBSmVKVXBHNDVYRXZpZ3ZMQU1DaUdzZng2aThNVlpwOTBoNFBJdUhCRWdyUDM2OGh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ3LCJhZHZTZWNyZXRLZXkiOiJCTCtkN1NOOStUYlFUV0hvNnZOdUJXRlB3ckgrRnhNZ0NsNWVaODJXZjB3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwNTA0NzU5MjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODIzNEVDRDRENzRBNEZBQzYyMkZGRjBGMjVDRkMzMjEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMzUwMzMzN30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTA1MDQ3NTkyNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJEMEVFQzVBMTJFNDMxNTQ0NEMyRTVFQzZCOUMwQzI0RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzNTAzMzM5fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIzOHlMakhXN1E0V2ZvdzJRZGl4S2JBIiwicGhvbmVJZCI6IjA5NDg4M2JhLTNlMjQtNDVmYS1hMzM4LWQ3YmI1NTdhMDE3MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDUjRCT3BtVXIwNlphY1RMQURnc3MvbWkvM1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYXlTRDVnL3UyWEZ2Z1YyOXFGYVhiVklGSjBvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNRMk1MNjJSIiwibWUiOnsiaWQiOiIyMzQ5MDUwNDc1OTI2OjMwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IsOjbHfDq3nDn3LDq3bDqsOxZ8Ovw7FnIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLR1lpMVlRMTZYcXRRWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJycG14dGordnV3cFNJdkhCeTNFVlF2b05oUTkzNm1lbjhYSHc1dGdjdlJRPSIsImFjY291bnRTaWduYXR1cmUiOiJuNDI4Y0lTaS80SWpmRnV5dzdQcGtOM2cwR0tsY2NxeW1FS2lQNFErV0JjdkE2NXdocDZvTEVhelVDSnlGM29zVE5WMDhOckhmT2RBZ01JUyt6V3NEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMzdaWXZ6K1dIZUFlQlFTSEpETlcxV2xSNmkrYmVBaE5GdStiSDBmS2tJQnluUVF2S3h0L1NCTUhoRWNFQ0FSZjN2UUdZbzVIQUpKSkFhaS9jMFQraWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDUwNDc1OTI2OjMwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmE2WnNiWS9yN3NLVWlMeHdjdHhGVUw2RFlVUGQrcG5wL0Z4OE9iWUhMMFUifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjM1MDMzMzMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRk5ZIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "dutchdking",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349050475926",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'dutchdking_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
