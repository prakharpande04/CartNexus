const User = require("../models/User");
const Address = require("../models/Address");

const login = async (req, res) => {
    try {
        console.log("Login request received");
        const userId = req.params.sub;
        console.log("User ID : ", userId);

        console.log("CP1" + userId);

        const user = await User.findOne({ userId: userId });
        console.log("CP2" + user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const address = await Address.findOne({ userId: userId });
        console.log("CP3" + address);

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

const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updateData = req.body;

        const user = await User.findOneAndUpdate(
            { 
                userId: userId,
                fullName: updateData.fullName,
                email: updateData.email,
                phone: updateData.phone,
                gender: updateData.gender
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
};


const updateAddress = async (req, res) => {
    console.log("Update address request received");
    console.log("Request body:", req.body);

    try {
        const userId = req.params.userId;
        const updateData = req.body;

        const address = await Address.findOneAndUpdate(
            { userId: userId },
            { $set: updateData },
            { new: true }
        );

        console.log("Address after update:", address);

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        return res.status(200).json({ address });
    } catch (error) {
        console.error("Error updating address:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
};


module.exports = { login, register, updateUser, updateAddress };