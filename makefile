install-pact-cli:
	@curl -fsSL \
	https://raw.githubusercontent.com/pact-foundation/pact-ruby-standalone/master/install.sh \
	| bash

show-broker-url:
	echo $${PACT_BROKER_URL} # Globally defined in GitLab by our loved SREs 💖

# pull variables from .env
#	FILES: files or directory to publish
publish-contracts: files?=./pact/pacts
publish-contracts:
	./pact/bin/pact-broker publish \
		"${files}" \
		--consumer-app-version=\"$$(npx --yes absolute-version)\" \
		--auto-detect-version-properties \
		--broker-base-url=$${PACT_BROKER_URL} \
		--build-url="$${CI_PIPELINE_URL:-no-pipeline-url}" \
		--verbose

# for vscode devcontainer
config-container:
	@echo "nothing to do"
	