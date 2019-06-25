/**
 * MBRController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    newApplication: async function(req,res){

        // Fetch data of the form
        var email = req.param('email');
        var address = req.param('address');
        var name = req.param('name');
        var phone = req.param('phone');
        var employer = req.param('employer');
        var password = req.param('password');
        var employment_duration = req.param("duration");
        var employee_salary = req.param("salary");
        
        // ORM to insert data into table
        // Here, the status will be "pending" for new application
        MBR.create({
            name:name,
            email:email,
            phone:phone,
            mailing_address:address,
            employer_name:employer,
            password:password,
            employment_duration:employment_duration,
            employee_salary:employee_salary,
            status:"pending"
        }, async function(err, MBRdata){
            if(err){
                return res.send({data: err});
            }
            
            var fetch_data = await MBR.findOne({name:name, email:email, phone:phone, mailing_address:address,
                employer_name:employer, password:password, employment_duration:employment_duration,
                employee_salary:employee_salary, status:"pending"}, function(err, row){
                    return res.send({data: row});
                });
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
                error_message = "The credentials are not matched. Try again with correct credentials.";
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
    },

    validateApplication: async function(req, res){
        // Fetch variables
        var employer_name = req.param("employer_name");
        var mortgageID = req.param("mortgageID");
        var webServiceLinkID = req.param("webServiceLink").split('/')[4];   // https://stackoverflow.com/a/25965556
        var employeeName = req.param("employeeName");
        var authenticated = false;   // will be set to true if request is accepted
        var error_message = '';

        
        if (mortgageID == webServiceLinkID){
            // Check credentials
            MBR.findOne({id: mortgageID, name: employeeName, employer_name: employer_name, status: "pending"}).exec(async function(err, data){
                if (err){
                    error_message = "Something went wrong while fetching data.";
                }
                else if (!data){
                    error_message = "Wrong data submitted. Application has been rejected.";
                    // https://sailsjs.com/documentation/reference/waterline-orm/models/update-one
                    var updateRequest = await MBR.updateOne({id: mortgageID, status: "pending"}).set({status: "rejected"});
                    if (updateRequest){
                        return res.send({
                            status: "REJECTED",
                            error_message: error_message
                        });
                    }
                    else{
                        error_message = "Something went wrong while updating request. Please try again later or check broker page for status.";
                        return res.send({
                            status: "ERROR",
                            error_message: error_message
                        });
                    }
                }

                if (error_message == ''){

                    // https://sailsjs.com/documentation/reference/waterline-orm/models/update-one
                    var updateRequest = await MBR.updateOne({id: mortgageID, status: "pending"}).set({status: "accepted"});
                    if (updateRequest){
                        authenticated = true;
                        return res.send({
                            status: "ACCEPTED",
                            error_message: error_message
                        });
                    }
                    else{
                        error_message = "Something went wrong while updating request. Please try again later or check broker page for status.";
                        return res.send({
                            status: "ERROR",
                            error_message: error_message
                        });
                    }
                }
                else {
                    return res.send({
                        status: "ERROR",
                        error_message: error_message
                    });  
                }
            });

        }
        else {
            error_message = "The credentials are not matched. Try again with correct credentials.";
            return res.send({
                status: "ERROR",
                error_message: error_message
            });
        }

    },

};

