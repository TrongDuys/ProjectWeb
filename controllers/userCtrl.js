const Users = require('../models/useModel');

const userCtrl = {
    updateUser: async (req, res) => {
        try {
          const {
            avatar,
            firstname,
            lastname,
            mobile,
            address,
            story,
            role,
            id,
          } = req.body;
        //   if (!fullname)
        //     return res.status(400).json({ msg: "Please add your fullname." });
          await Users.findOneAndUpdate(
            { _id: id },
            {
              avatar,
              firstname,
              lastname,
              mobile,
              address,
              story,
              role,
            }
          );
          res.json({ msg: "Update Success!" });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      searchUser: async (req, res) => {
        try {
          const users = await Users.find({
            firstname: { $regex: new RegExp(req.query.firstname.toLowerCase(), "i") }
          })
            .limit(10)
            .select("firstname lastname avatar email mobile address ");
    
          res.json({ users });
        } catch (error) {
          
        }
      },
      getUser: async (req, res) => {
        
        try {
          const users = await Users.find({
           
          }).select("-password");
          // console.log(users);
      
          res.json({
            msg: "Success!",
            result: users.length,
            users,
          });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      }
}
module.exports = userCtrl;

