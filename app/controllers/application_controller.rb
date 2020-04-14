class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token # <- Add this line
    

  
end
