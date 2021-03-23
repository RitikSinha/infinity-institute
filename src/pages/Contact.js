const contact = () => {
    return ( <>
             
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <form method="POST" class="register-form" id="register-form">
                        <h2>Contact Us</h2>                 
                        <div class="form-group">
                            <label for="address">Name :</label>
                            <input type="text" name="address" id="address" required/>
                        </div> 
                          
                        <div class="form-group">
                            <label for="address">Email:</label>
                            <input type="email" name="address" id="address" required/>
                        </div>   
                        <label for="address">Message:</label>
                        <div class="form-group">
                            
                            <textarea style={{width:400,height:200}}type="text" name="address" id="address" required/>
                        </div> 
                                           
                    </form>
                </div>
            </div>
        </div>

 
    
    
    </> );
}
 
export default contact;