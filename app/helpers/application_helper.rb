module ApplicationHelper
  def class_time(klass)
    brew_class = klass.doc
    time_string = brew_class.scheduled_at.strftime('%A %e %B, %l:%M%P')
    if brew_class.scheduled_at < 1.hours.ago || !brew_class.free
      content_tag :strike do
        time_string
      end
    else
      time_string
    end
  end
end
