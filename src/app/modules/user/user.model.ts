import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userRegiStrationSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    profileImage: { type: String },
    address: { type: String, default: 'N/A' },
    phone: { type: String, default: 'N/A' },
    city: { type: String, default: 'N/A' },
    role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
  },
  {
    timestamps: true,
  },
);
// this function using for user password hash
userRegiStrationSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userRegiStrationSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});
// user find by email with static method
userRegiStrationSchema.statics.isUserExitsByEmail = async function (
  email: string,
) {
  return await User.findOne({ email }).select('+password');
};
// user password match checkin with static method
userRegiStrationSchema.statics.isPasswordMatched = async function (
  planeTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(planeTextPassword, hashedPassword);
};
export const User = model<IUser, UserModel>('User', userRegiStrationSchema);
