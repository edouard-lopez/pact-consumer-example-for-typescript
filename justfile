set dotenv-load

install-pact-cli force="":
    @curl -fsSL https://raw.githubusercontent.com/pact-foundation/pact-ruby-standalone/master/install.sh | bash

# for vscode devcontainer
config-container:
    just --completions fish > $HOME/.config/fish/completions/just.fish