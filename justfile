set dotenv-load

install-pact-cli force="":
    @curl -fsSL https://raw.githubusercontent.com/pact-foundation/pact-ruby-standalone/master/install.sh | bash

# pull variables from .env
publish-contract contracts_to_publish="./pact/pacts":
    pact-broker publish \
        {{contracts_to_publish}} \
        --consumer-app-version=\"$(npx --yes absolute-version)\" \
        --auto-detect-version-properties \
        --broker-base-url=$PACT_BROKER_URL \
        --build-url="${CI_PIPELINE_URL:-no-pipeline-url}" \
        --verbose

# for vscode devcontainer
config-container:
    just --completions fish > $HOME/.config/fish/completions/just.fish