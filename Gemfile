source 'https://rubygems.org'

# GitHub Pages builds this site in "safe mode" using the github-pages gem,
# which pins Jekyll and the set of allowed plugins. Keep this gem so that the
# local build matches what GitHub Pages produces.
gem 'github-pages', group: :jekyll_plugins

# Plugins also listed in _config.yml (github-pages already bundles these,
# listed here for clarity / local dev).
group :jekyll_plugins do
  gem 'jekyll-feed'
  gem 'jekyll-seo-tag'
  gem 'jekyll-sitemap'
  gem 'jekyll-paginate'
  gem 'jekyll-include-cache'
  gem 'jekyll-redirect-from'
  gem 'jemoji'
end

# Windows / JRuby support
gem 'wdm', '~> 0.1.1', platforms: [:mingw, :x64_mingw, :mswin]
gem 'tzinfo-data', platforms: [:mingw, :x64_mingw, :mswin, :jruby]
gem 'webrick', '~> 1.8'
