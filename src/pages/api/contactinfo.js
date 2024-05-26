import { v4 as uuidv4 } from "uuid";
import { config } from 'dotenv';
import neo4j from 'neo4j-driver';

// Load environment variables from the .env file
config({path:'Neo4j-5e58d9d9-Created-2024-05-26.env'});

// Debugging: Log the environment variables to ensure they are loaded correctly
const neo4jUri = process.env.NEO4J_URI;
const neo4jUser = process.env.NEO4J_USERNAME;
const neo4jPassword = process.env.NEO4J_PASSWORD;

console.log('NEO4J_URI:', neo4jUri);
console.log('NEO4J_USER:', neo4jUser);
console.log('NEO4J_PASSWORD:', neo4jPassword ? '******' : undefined); // Mask password for security

// Ensure that all environment variables are defined
if (!neo4jUri || !neo4jUser || !neo4jPassword) {
    throw new Error("Missing required environment variables: NEO4J_URI, NEO4J_USERNAME, or NEO4J_PASSWORD");
}

const driver = neo4j.driver(
    neo4jUri,
    neo4j.auth.basic(neo4jUser, neo4jPassword)
);

// Function to add a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Function to check if the database is available
const checkDatabaseAvailability = async (retries = 5, delayMs = 12000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const session = driver.session();
            await session.run("RETURN 1");
            await session.close();
            return true;
        } catch (error) {
            console.log(`Database not available. Retrying in ${delayMs / 1000} seconds... (${i + 1}/${retries})`);
            await delay(delayMs);
        }
    }
    throw new Error("Database is not available after multiple attempts");
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const session = driver.session();

        try {
            // Check if the database is available
            await checkDatabaseAvailability();

            // Validate request body
            const { name, phone_no, date_of_enquiry } = req.body;
            if (!name || !phone_no || !date_of_enquiry) {
                return res.status(400).json({ message: "Invalid input data" });
            }

            // Create new contact object with a unique ID
            const contactinfo = {
                id: uuidv4(),
                name,
                phone_no,
                date_of_enquiry
            };

            // Save the contact data to Neo4j
            const result = await session.run(
                `CREATE (c:Contact {
                    id: $id,
                    name: $name,
                    phone_no: $phone_no,
                    date_of_enquiry: $date_of_enquiry
                }) RETURN c`,
                contactinfo
            );

            const savedContact = result.records[0].get('c').properties;

            return res.status(201).json({ message: "Data added successfully", contactinfo: savedContact });
        } catch (error) {
            console.error('Error saving data to Neo4j:', error);
            return res.status(500).json({ message: "Internal Server Error" });
        } finally {
            await session.close();
        }
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
