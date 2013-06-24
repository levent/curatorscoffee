class ClassesController < ApplicationController
  def index
    @brew_classes = [
      '201307011815',
      '201307221815',
      '201308051815',
      '201308201815'
    ]
    @latte_classes = [
      '201306271815',
      '201307101815',
      '201307311815',
      '201308141815',
      '201308221815'
    ]
  end
end
