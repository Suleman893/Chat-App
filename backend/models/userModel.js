const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://www.google.com/search?q=user&sxsrf=ALiCzsY4kAkosVCYGmHqFWShDHgZAHTt6A:1654718461225&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjKptbQ0p74AhWKQvEDHarECY4Q_AUoAXoECAIQAw&biw=768&bih=720&dpr=1.25#imgrc=f3iPe5pB9diemM",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
