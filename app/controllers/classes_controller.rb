class ClassesController < ApplicationController
  def index
    @brew_classes = {
      '201307221845' => :free,
      '201308051845' => :free,
      '201308201845' => :free
    }
    @latte_classes = {
      '201307311845' => :busy,
      '201308141845' => :free,
      '201308221845' => :free
    }
  end
end
