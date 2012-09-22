# cosmUI

It's like Twitter Bootstrap and Zurb Foundation had a baby and we raised him right.

## Contributing

Want to contribute? Great! Here's how:

### SASS

#### Structure

The .scss file structure is based on partials inside folders which mirror the docs sectioning so if you've been to the Docs, you might be able to find files pretty quickly. Please ensure you keep this practice for smooth maintenance.

#### Compiled files

There's a folder named compiled/ holding the .css files which power the Docs, the relationships with the pages are:

* **docs.css** - it's the css that's specific for the docs, not related with the actual cosmUI in any way
* **docs-cosmui.css** - a compiled version of cosmUI that excludes layout partials because they screw up the default Docs styling
* **cosmui.css** - full compiled version of cosmUI used by the samples in layouts

#### How to compile

To compile the .scss files simply run this command on the root repository folder:

    bundle exec rake build

This will just do a one off build of the stylesheets, or to watch the folders continuously you can run:

    bundle exec rake watch

This will listen to changes in your .scss files and compile them into the right folder.

***

## Testing with jasmine

Jasmine has been installed with example specs.

To run the server:

    rake jasmine
