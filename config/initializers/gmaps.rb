if Rails.env == 'development' || ENV['STAGING'] == 'yes'
  GOOGLE_API_KEY = "AIzaSyCgLmq2efF5ZVkptbgnxm15OI70zZFzhyE"
else
  GOOGLE_API_KEY = "AIzaSyAa_Co2CAy9HFbCgA3A8teQabO8K8EeCPg"
end
