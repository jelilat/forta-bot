# Forta Bot Deployment Agent

## Description

This agent detects forta bot deployments by the Nethermind team (the address `0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8`).

## Supported Chains

- Ethereum

## Alerts

- FORTA-1
  - Fired when a the Nethermind team deploys or updates a forta bot.
  - Severity is always set to "info"
  - Type is always set to "info" 

## Test Data

The agent behaviour can be verified with the following transactions:

- 0x7bf8e5a83461bb9ae58361ed47be1b718752803519f85badae5cdd7957284dbd (deployer address `0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8`)
