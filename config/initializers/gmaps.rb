if Rails.env == 'development' || ENV['STAGING'] == 'yes'
  GOOGLE_API_KEY = "AIzaSyBmMwTQNURf5Alm1F_qk4IQAv5DE9q2NZw"
else
  GOOGLE_API_KEY = "AIzaSyAa_Co2CAy9HFbCgA3A8teQabO8K8EeCPg"
end
