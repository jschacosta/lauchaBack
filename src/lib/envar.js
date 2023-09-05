export default function envar() {
    process.env.NODE_ENV = process.env.NODE_ENV.trim();
    const env = process.env.NODE_ENV;
    const dbs = new Map();
    dbs.set("dev", process.env.DB_DEV);
    dbs.set("test", process.env.DB_TEST);
    dbs.set("production", process.env.DB_PROD);
    return {
        SECRET: process.env.SECRET,
        DB_PASS: process.env.DB_PASS,
        DB_USER: process.env.DB_USER,
        DB_DEV: process.env.DB_DEV,
        DB_TEST: process.env.DB_TEST,
        DB_PROD: process.env.DB_PROD,
        BUCKET_NAME_FILES:process.env.BUCKET_NAME_FILES,
        IAM_USER_KEY:process.env.IAM_USER_KEY,
        IAM_USER_SECRET:process.env.IAM_USER_SECRET,
        REGION:process.env.REGION
    };
}
