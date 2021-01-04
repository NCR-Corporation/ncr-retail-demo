#!/bin/sh

set -e

ASSET_FILE="/usr/share/nginx/html/index.html"

[ ! -z "$IN_RESTRICTED_MODE" ] || IN_RESTRICTED_MODE="false"

sed -i "/\/\* start-environment/,/end-environment \*\// s|{{API_URL_BASE}}|$API_URL_BASE|g" "$ASSET_FILE"
sed -i "/\/\* start-environment/,/end-environment \*\// s|{{URL_BASE}}|$URL_BASE|g" "$ASSET_FILE"
sed -i "/\/\* start-environment/,/end-environment \*\// s|{{DX_URL}}|$DX_URL|g" "$ASSET_FILE"
sed -i "/\/\* start-environment/,/end-environment \*\// s|{{ENV_NAME}}|$ENV_NAME|g" "$ASSET_FILE"
sed -i "/\/\* start-environment/,/end-environment \*\// s|{{IN_RESTRICTED_MODE}}|$IN_RESTRICTED_MODE|g" "$ASSET_FILE"
sed -i "/\/\* start-environment/,/end-environment \*\// s|{{HIDE_MARKETPLACE}}|$HIDE_MARKETPLACE|g" "$ASSET_FILE"

sed -i "/\/\* start-environment/d" "$ASSET_FILE"
sed -i "/end-environment \*\//d" "$ASSET_FILE"

exec nginx -g "daemon off;"