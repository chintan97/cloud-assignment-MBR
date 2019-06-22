/**
 * MBRController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    newApplication: function(req,res){

        // Fetch data of the form
        var email = req.param('email');
        var address = req.param('address');
        var name = req.param('name');
        var phone = req.param('phone');
        var employer = req.param('employer');
        var password = req.param('password');
        
        // ORM to insert data into table
        // Here, the status will be "pending" for new application
        MBR.create({
            name:name,
            email:email,
            phone:phone,
            mailing_address:address,
            employer_name:employer,
            password:password,
            status:"pending"
        },function(err, MBRdata){
            if(err){
                return res.json(err);
            }
            
            return res.json(MBRdata);
        });

    },

    check_credentials: function(req, res){

        // Fetch the data
        var user_id = req.param("user_id");
        var password = req.param("password");
        var error_message = '';

        // Check credentials
        MBR.findOne({id: user_id, password: password}).exec(function(err, data){
            if (err){
                error_message = "Something went wrong while fetching data.";
            }
            else if (!data){
                error_message = "The credentials are not matched. Try again with currect credentials.";
            }
            if (error_message == ''){
                return res.send({
                    data: {
                        id: data.id, name: data.name, email: data.email, phone: data.phone, mailing_address: data.mailing_address, employer_name: data.employer_name, status: data.status
                    },
                    error_message: error_message
                });  // Send data to show status
            }
            else{
                return res.send({
                    error_message: error_message
                });  // Send data to show status
            }
            
        });
    }

};

