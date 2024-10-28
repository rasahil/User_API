import { Button, Input } from '@material-tailwind/react';
import  { Component } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

class Captcha extends Component {

   componentDidMount() {
      loadCaptchaEnginge(6); 
   }

   doSubmit = () => {
       let user_captcha = document.getElementById('user_captcha_input').value;

       if (validateCaptcha(user_captcha) === true) {
           alert('Captcha Matched');
           loadCaptchaEnginge(6); 
           document.getElementById('user_captcha_input').value = "";
       } else {
           alert('Captcha Does Not Match');
           document.getElementById('user_captcha_input').value = "";
       }
   }

   render() {
       return (
           <div className="container flex justify-center">
               <div className="form-group">
                   <div className="text-center  mt-3">
                       <LoadCanvasTemplate />
                   </div>

                   <div className="col mt-3">
                       <Input 
                          placeholder="Enter Captcha Value" 
                          id="user_captcha_input" 
                          name="user_captcha_input" 
                          type="text" 
                          className="form-control text-white text-center"
                       />
                   </div>

                   <div className="col mt-3">
                       
                       <Button     className=" outline-double  " 
                          onClick={this.doSubmit}>
              Verify
            </Button>
                   </div>
               </div>
           </div>
       );
   }
}

export default Captcha;
