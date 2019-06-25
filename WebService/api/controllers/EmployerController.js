/**
 * EmployerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    authenticate :function (req, res) {

        console.log("[Authentication] Endpoint Reached");
        
        var authorized = false;
        var errorMessage = "";

        var id = req.param('id');
        var password = req.param('pwd');

        Employer.findOne({ userId: id, userPassword: password}).exec(function(err,employee){

            //Database error
            if(err){
            
                authorized = false;
                errorMessage =  "We are having troubles connecting to the database, please try again later";

            //If undefined, employee does not exist
            }else if(!employee){

                authorized = false;
                errorMessage = "Incorrect credentials, please try again";

            //If found, user credientials are valid    
            }else{

                authorized = true;
            }

            //return results
            return res.jsonp(
            {
                Authorized: authorized,
                ErrorMessage: errorMessage
            });

        });
    },

    retrieveData :function(req, res){

        console.log("[retrieveData] Endpoint Reached");

        var id = req.param('id');
        var errorMessage = "";

        Employer.findOne({ userId: id }).exec(function(err,employee){

            //Database error
            if(err){
                errorMessage =  "We are having troubles connecting to the database, please try again later";
            }
            
    
            if(employee){
                errorMessage = "Success"
            }else{
                errorMessage = "Employee not found";
            }

            //return results
            return res.jsonp(
            {
                Employee: employee,
                ErrorMessage: errorMessage
            });

        });

    }
  
};

