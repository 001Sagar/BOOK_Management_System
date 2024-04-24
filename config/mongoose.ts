import mongoose, { Connection } from 'mongoose';
mongoose.set('strictQuery', false);

// Connect to MongoDB Atlas cluster
async function connectToMongoDB(): Promise<Connection> {

    const username: string = encodeURIComponent('Sagar');
    const password: string = encodeURIComponent('Sagar@9760');
    const hostname: string = 'cluster0.ozi7tg0.mongodb.net';
    const dbName: string = 'Digital_Pani'; // Replace 'yourDatabaseName' with your actual database name

    const uri: string = `mongodb+srv://${username}:${password}@${hostname}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(uri);
        console.log(`Server is Connected to DataBase `, uri)
    } catch (error) {
        console.log("Error in connection to MongoDB ", error)
    }
    const db: Connection = mongoose.connection;
    return db;
}

export default connectToMongoDB;