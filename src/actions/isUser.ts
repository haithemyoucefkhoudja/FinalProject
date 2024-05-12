import { getURL } from "@/lib/backend_baseurl";
import { User } from "next-auth"; 

// Function to check if user credentials are valid and retrieve user data
export default async function isUser({ credentials }: { credentials: Record<"email" | "password", string> }): Promise<User | null> {
  //  Get Login URL
  const loginURL = getURL('p/login'); // Construct the URL for the login endpoint

  // Send POST Request with Credentials
  const response = await fetch(loginURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(credentials) 
  });

  // Parse Response and Handle Errors
  const res_data = await response.json(); 
  if (!res_data.success) {
    throw new Error(res_data.message); 
  }
  // Extract and Return User Data and return the user object if found, otherwise return null
  const user = res_data.data.user; 
  return user || null;
}