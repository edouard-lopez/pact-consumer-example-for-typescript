install-pact-cli:
	@curl -fsSL \
	https://raw.githubusercontent.com/pact-foundation/pact-ruby-standalone/master/install.sh \
	| bash

show-metadata:
	echo "pact-broker version: $$(./pact/bin/pact-broker version)"
	echo "PACT_BROKER_URL: $${PACT_BROKER_URL}" # Globally defined in GitLab by our loved SREs 💖
	echo "CI_PIPELINE_URL: $${CI_PIPELINE_URL:-no-pipeline-url}"

# pull variables from .env
#	FILES: files or directory to publish
publish-contracts: files?=./pact/pacts
publish-contracts:
	./pact/bin/pact-broker publish \
		"${files}" \
		--consumer-app-version="$$(npx absolute-version)" \
		--auto-detect-version-properties \
		--broker-base-url="$${PACT_BROKER_URL}" \
		--build-url="${CI_PIPELINE_URL:-no-pipeline-url}" \
		--verbose

# for vscode devcontainer
config-container:
	@echo "nothing to do"
	