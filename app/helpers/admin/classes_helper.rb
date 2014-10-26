module Admin::ClassesHelper
  def show_class_details(klass)
    typeofclass = klass.class.to_s.underscore
    return unless ['tea_class', 'brew_class', 'latte_art_class'].include?(typeofclass)
    content_tag(:tr) do
      content_tag(:td, klass.scheduled_at.strftime('%A %e %B %Y, %l:%M%P')) +
        content_tag(:td, klass.available) +
        content_tag(:td, link_to('edit', self.send("edit_admin_#{typeofclass}_path", klass), class: 'label secondary')) +
        content_tag(:td, link_to('delete', self.send("admin_#{typeofclass}_path", klass), method: :delete, confirm: 'Are you sure?', class: 'label secondary'))
    end
  end
end
