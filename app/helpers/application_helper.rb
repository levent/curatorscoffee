module ApplicationHelper
  def class_time(timestamp)
    time = timestamp.to_time
    time_string = time.strftime('%A %e %B, %l:%M%P')
    if time < 1.hours.ago
      content_tag :strike do
        time_string
      end
    else
      time_string
    end
  end
end
