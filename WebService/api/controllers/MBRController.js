/**
 * MBRController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    getFundData: function(req,res){
        var email = req.param('email');
        var address = req.param('address');
        var name = req.param('name');
        var phone = req.param('phone');
        var employer = req.param('employer');
        var password = req.param('password');
        
        MBR.create({
            name:name,
            email:email,
            phone:phone,
            mailing_address:address,
            employer_name:employer,
            password:password
        },function(err, MBRdata){
            if(err){
                return res.json(err)
            }
            
            return res.json(MBRdata);
        })

    }
};

