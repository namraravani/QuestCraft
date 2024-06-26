const userService = require('./auth.service'); // Importing the user service

// Controller function to handle user registration
async function registerUser(req, res) {
    const { username, email, password, roleId, firstName, lastName, contactNo, officeLocation } = req.body;
    try {
        // Check if the user already exists with the given username or email
        const existingUsername = await userService.findUserByUsername(username);
        const existingEmail = await userService.findUserByEmail(email);
        if (existingUsername || existingEmail) {
            return res.status(400).json({ message: "User already exists." });
        }
        // Create a new user
        const user = await userService.createUser(username, email, password, roleId, firstName, lastName, contactNo, officeLocation);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to handle user login
async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await userService.findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Compare the provided password with the user's password
        const isMatch = await userService.comparePassword(user, password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password." });
        }
        // Password is correct, user is authenticated
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to handle updating user details
async function updateUser(req, res) {
    const userId = req.params.id;
    const updates = req.body;
    try {
        const updatedUser = await userService.updateUser(userId, updates);
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to handle deleting a user
async function deleteUser(req, res) {
    const userId = req.params.id;
    try {
        const deletedUser = await userService.deleteUser(userId);
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
};
