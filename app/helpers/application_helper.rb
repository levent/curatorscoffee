module ApplicationHelper

  def format_date(timestamp)
    return nil unless timestamp
    timestamp.to_date.to_formatted_s(:long_ordinal)
  rescue
    return nil
  end

  def class_time(klass)
    time_string = klass.scheduled_at.strftime('%A %e %B, %l:%M%P')
    if klass.scheduled_at < 1.hours.ago || klass.available <= 0
      content_tag :strike do
        time_string
      end
    else
      time_string
    end
  end
end
