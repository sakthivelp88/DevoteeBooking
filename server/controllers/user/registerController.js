const { name, email, phone, password } = req.body;

const existingUser = await User.findOne({
  $or: [
    { email },
    { phone }
  ]
});

if (existingUser) {
  return res.status(400).json({
    message: "Email or Phone already registered",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  phone,
  password: hashedPassword,
});