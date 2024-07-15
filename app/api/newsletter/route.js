import { connectToMongoDB } from "@/app/lib/mongodb";
import NewsletterSub from "@/models/newsletterEmail";


export async function POST(request) {
  const { email } = await request.json();
  try {
    await connectToMongoDB();
    await NewsletterSub.create({ email });
    console.log("Email added to newsletter");
    return new Response("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
