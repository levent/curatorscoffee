# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "cosmui/rails/version"

Gem::Specification.new do |s|
  s.name        = "cosmui"
  s.version     = CosmUI::Rails::VERSION
  s.authors     = ["Pete Correia", "Levent Ali"]
  s.email       = ["contact@petecorreia.com", "lebreeze@gmail.com"]
  s.homepage    = "https://github.com/pachube/cosmui"
  s.summary     = %q{CosmUI}
  s.description = %q{Assets for CosmUI}

  s.rubyforge_project = "cosmui"

  s.add_dependency "railties", ">= 3.1.3"
  s.add_dependency "sass", ">= 3.1.10"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # specify any dependencies here; for example:
  s.add_development_dependency "jasmine"
  # s.add_runtime_dependency "rest-client"
end
