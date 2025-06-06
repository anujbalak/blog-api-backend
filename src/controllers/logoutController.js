export const logoutUser = async (req, res, next) => {
    const {accessToken, refreshToken} = req.body;

    res.json({user: null, message: 'Logout Successfully!'})
}