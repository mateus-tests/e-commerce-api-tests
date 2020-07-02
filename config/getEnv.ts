import dotenv from 'dotenv';

export default dotenv.config({
    path : process.argv[2] === 'testing' ? './.env/.env.testing' : './.env/.production'
});//
    
