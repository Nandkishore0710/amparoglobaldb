import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'amparo_main_config'
  },
  data: {
    type: Object,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);
