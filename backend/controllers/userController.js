const User = require("../models/User");
const Address = require("../models/Address");

const login = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("User ID : ", userId);

        const user = await User.findOne({ userId: userId });
        const address = await Address.findOne({ userId: userId });
        return res.status(200).json({ user, address });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

const register = async (req, res) => {
    try {
        const registrationData = req.body;
        console.log(registrationData);

        const newUser = new User({
          userId: registrationData.userId,
          fullName: registrationData.fullName,
          email: registrationData.email,
          phone: registrationData.phone,
          gender: registrationData.gender,
          dob: registrationData.dob
        });
        console.log("checkpoint1");

        const newAddress = new Address({
          userId: registrationData.userId,
          addressLine1: registrationData.addressLine1,
          addressLine2: registrationData.addressLine2,
          city: registrationData.city,
          state: registrationData.state,
          zip: registrationData.zip,
          country: registrationData.country
        });
        console.log("checkpoint2");

        await newUser.save();
        console.log("checkpoint3");
        await newAddress.save();
        console.log("checkpoint4");

        const user = await User.findOne({ email: registrationData.email });
        const address = await Address.findOne({ userId: registrationData.userId });
        console.log("checkpoint5");
        return res.status(200).json({ user, address });
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}

module.exports = { login, register };