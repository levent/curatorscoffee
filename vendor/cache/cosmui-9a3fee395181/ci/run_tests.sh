#!/bin/bash

set -e
set -u
set -x

echo "Started custom build script $0 at `date`"
echo "PWD is `pwd`"
export INLINEDIR=`pwd` #don't let ruby_inline write to /var/lib/hudson/

outdir="build_artefacts"

rm -rf $outdir
mkdir -p $outdir
#BUILD_NUMBER is only set by hudson, not go or devs, so this can fail
# on set -u, but we don't want to stop the script, so we use || true
(date ; uname -a; echo BUILD_NUMBER=$BUILD_NUMBER) > $outdir/timestamp.txt || true

set +ux
echo "sourcing rvm scripts"
# Load RVM into a shell session *as a function*
if [[ -s "$HOME/.rvm/scripts/rvm" ]] ; then
  source "$HOME/.rvm/scripts/rvm"
elif [[ -s "${rvm_path:=/usr/local/rvm}/scripts/rvm" ]]; then
  source "${rvm_path:=/usr/local/rvm}/scripts/rvm"
else
  printf "ERROR: RVM installation was not found.\n"
  exit 1
fi
rvm rvmrc trust `pwd`/.rvmrc && rvm rvmrc load `pwd`/.rvmrc
ruby -v
gem env
rvm info | tee $outdir/rvm_info.txt
set -ux

echo "STEP: running bundle install.  logging to bundle_install.log"
#add to log to file 
# > $outdir/bundle_install.log
set +e
bundle install --path=.gem/ --local
local_bundle_rc=$?
set -e

if [ $local_bundle_rc -eq 127 ]; then
  echo "Bundle is missing.  Installing now"
  gem install bundler --no-ri --no-rdoc
fi


if [ $local_bundle_rc -ne 0 ]; then
  echo "Bundle --local failed.  Running slower full bundle"
  bundle install --path=.gem/
fi

#=============================================================================== 
# Run the actual tests
#=============================================================================== 
#allow script to continue even if rake spec returns failure, as we want to post-process rspec report 
set +e

bundle exec rake spec > $outdir/test.log
test_rc=$?

if [ $test_rc -ne 0 ]; then
  echo "Test of cosmui failed (rake spec).  See test.log"
  exit 1
fi

#allow script to continue even if rake spec returns failure, as we want to post-process rspec report 
set +e
bundle exec xvfb-run -a rake jasmine:ci > $outdir/jasmine_test.log
test_rc=$?
set -e

if [ $test_rc -ne 0 ]; then
  echo "Test of cosmui failed (rake jasmine:ci).  See jasmine_test.log"
  exit 1
fi

#return return code from rake/rspec so cruise understands when rake specs failed.
exit $test_rc
