const signOut = async (req, res) => {
  try {
    res.clearCookie("Authorization");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = signOut;
