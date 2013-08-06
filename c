['201307221845', '201308051845', '201308201845'].each {|t| time = Time.parse(t) ; bc = BrewClass.new(:scheduled_at => t) ; bc.save}
['201307311845', '201308141845', '201308221845'].each {|t| time = Time.parse(t) ; bc = LatteArtClass.new(:scheduled_at => t) ; bc.save}
