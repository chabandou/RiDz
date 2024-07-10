import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  visits: { type: Number, default: 0 },
  timestamps: { type: [Date], default: [] }
});


const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);
export default Page
