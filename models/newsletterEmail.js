import mongoose from 'mongoose';

const newsletterSubSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});


export default mongoose.models.newsletterSub || mongoose.model('newsletterSub', newsletterSubSchema)
