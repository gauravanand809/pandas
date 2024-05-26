import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const filePath = path.join(process.cwd(), "contactinfo", "contact.json");
    let contactData = [];

    try {
      // Ensure the directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Check if the file exists
      try {
        const data = await fs.readFile(filePath, "utf-8");
        contactData = JSON.parse(data);
      } catch (fileReadError) {
        if (fileReadError.code !== "ENOENT") {
          console.error("Error reading file:", fileReadError);
          return res.status(500).json({ message: "Internal Server Error while reading file" });
        }
        // File does not exist, proceed with an empty array
      }

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

      // Append new data
      contactData.push(contactinfo);

      // Write updated data back to file
      try {
        await fs.writeFile(filePath, JSON.stringify(contactData, null, 2));
        return res.status(201).json({ message: "Data added successfully", contactinfo });
      } catch (fileWriteError) {
        console.error("Error writing file:", fileWriteError);
        return res.status(500).json({ message: "Internal Server Error while writing file" });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
